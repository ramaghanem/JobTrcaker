<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class JobApplicationControllerTest extends TestCase
{
    use RefreshDatabase;

    private function createCompanyWithJob(): array
    {
        $companyUser = User::factory()->create(['role' => 'company']);
        $company     = Company::factory()->create(['user_id' => $companyUser->id]);
        $job         = Job::factory()->create(['company_id' => $company->id]);

        return [$companyUser, $company, $job];
    }

    private function actingAsJobseeker(): array
    {
        $user  = User::factory()->create(['role' => 'jobseeker']);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [$user, $token];
    }

    // ─────────────────────────────────────────
    //  INDEX
    // ─────────────────────────────────────────

    public function test_jobseeker_can_list_own_applications(): void
    {
        [$user, $token] = $this->actingAsJobseeker();
        [,, $job]       = $this->createCompanyWithJob();

        JobApplication::factory()->count(3)->create(['user_id' => $user->id, 'job_id' => $job->id]);

        $response = $this->withToken($token)->getJson('/api/applications');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_applications_index_fails_without_auth(): void
    {
        $response = $this->getJson('/api/applications');

        $response->assertStatus(401);
    }

    public function test_user_only_sees_own_applications(): void
    {
        [$user, $token] = $this->actingAsJobseeker();
        $otherUser      = User::factory()->create();
        [,, $job]       = $this->createCompanyWithJob();

        JobApplication::factory()->count(2)->create(['user_id' => $user->id,   'job_id' => $job->id]);
        JobApplication::factory()->count(5)->create(['user_id' => $otherUser->id, 'job_id' => $job->id]);

        $response = $this->withToken($token)->getJson('/api/applications');

        $response->assertStatus(200)
                 ->assertJsonCount(2);
    }

    // ─────────────────────────────────────────
    //  STORE (apply)
    // ─────────────────────────────────────────

    public function test_jobseeker_can_apply_to_job(): void
    {
        Notification::fake();
        Storage::fake('public');

        [$user, $token] = $this->actingAsJobseeker();
        [,, $job]       = $this->createCompanyWithJob();

        $cv = UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf');

        $response = $this->withToken($token)->postJson("/api/jobs/{$job->id}/apply", [
            'cv'       => $cv,
            'location' => 'Nablus, Palestine',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('job_applications', [
            'user_id' => $user->id,
            'job_id'  => $job->id,
        ]);
    }

    public function test_user_cannot_apply_to_same_job_twice(): void
    {
        Notification::fake();
        Storage::fake('public');

        [$user, $token] = $this->actingAsJobseeker();
        [,, $job]       = $this->createCompanyWithJob();

        JobApplication::factory()->create(['user_id' => $user->id, 'job_id' => $job->id]);

        $cv = UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf');

        $response = $this->withToken($token)->postJson("/api/jobs/{$job->id}/apply", [
            'cv'       => $cv,
            'location' => 'Nablus, Palestine',
        ]);

        $response->assertStatus(422)
                 ->assertJsonPath('message', 'You have already applied for this job');
    }

    public function test_apply_fails_without_cv(): void
    {
        [, $token] = $this->actingAsJobseeker();
        [,, $job]  = $this->createCompanyWithJob();

        $response = $this->withToken($token)->postJson("/api/jobs/{$job->id}/apply", [
            'location' => 'Nablus, Palestine',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['cv']);
    }

    public function test_apply_fails_with_non_pdf_file(): void
    {
        Storage::fake('public');

        [, $token] = $this->actingAsJobseeker();
        [,, $job]  = $this->createCompanyWithJob();

        $file = UploadedFile::fake()->create('resume.docx', 100, 'application/msword');

        $response = $this->withToken($token)->postJson("/api/jobs/{$job->id}/apply", [
            'cv'       => $file,
            'location' => 'Nablus, Palestine',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['cv']);
    }

    public function test_apply_fails_without_location(): void
    {
        Storage::fake('public');

        [, $token] = $this->actingAsJobseeker();
        [,, $job]  = $this->createCompanyWithJob();

        $cv = UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf');

        $response = $this->withToken($token)->postJson("/api/jobs/{$job->id}/apply", [
            'cv' => $cv,
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['location']);
    }

    public function test_apply_fails_without_auth(): void
    {
        [,, $job] = $this->createCompanyWithJob();

        $response = $this->postJson("/api/jobs/{$job->id}/apply", []);

        $response->assertStatus(401);
    }

    // ─────────────────────────────────────────
    //  UPDATE STATUS
    // ─────────────────────────────────────────

    public function test_company_owner_can_update_application_status(): void
    {
        Notification::fake();

        [$companyUser, , $job] = $this->createCompanyWithJob();
        $token                 = $companyUser->createToken('auth_token')->plainTextToken;

        $applicant   = User::factory()->create(['role' => 'jobseeker']);
        $application = JobApplication::factory()->create([
            'user_id' => $applicant->id,
            'job_id'  => $job->id,
            'status'  => 'pending',
        ]);

        $response = $this->withToken($token)
                         ->patchJson("/api/applications/{$application->id}/accepted");

        $response->assertStatus(200)
                 ->assertJsonPath('status', 'accepted');

        $this->assertDatabaseHas('job_applications', [
            'id'     => $application->id,
            'status' => 'accepted',
        ]);
    }

    public function test_non_owner_cannot_update_application_status(): void
    {
        [$user, $token] = $this->actingAsJobseeker();
        [,, $job]       = $this->createCompanyWithJob();

        $application = JobApplication::factory()->create([
            'user_id' => $user->id,
            'job_id'  => $job->id,
        ]);

        $response = $this->withToken($token)
                         ->patchJson("/api/applications/{$application->id}/accepted");

        $response->assertStatus(403);
    }

    // ─────────────────────────────────────────
    //  DESTROY
    // ─────────────────────────────────────────

    public function test_user_can_delete_own_application(): void
    {
        [$user, $token] = $this->actingAsJobseeker();
        [,, $job]       = $this->createCompanyWithJob();

        $application = JobApplication::factory()->create([
            'user_id' => $user->id,
            'job_id'  => $job->id,
        ]);

        $response = $this->withToken($token)
                         ->deleteJson("/api/applications/{$application->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('message', 'Application deleted');

        $this->assertDatabaseMissing('job_applications', ['id' => $application->id]);
    }

    public function test_delete_fails_without_auth(): void
    {
        [,, $job]    = $this->createCompanyWithJob();
        $application = JobApplication::factory()->create(['job_id' => $job->id]);

        $response = $this->deleteJson("/api/applications/{$application->id}");

        $response->assertStatus(401);
    }
}