<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyControllerTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsUser(): array
    {
        $user  = User::factory()->create(['role' => 'jobseeker']);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [$user, $token];
    }

    // ─────────────────────────────────────────
    //  BECOME COMPANY
    // ─────────────────────────────────────────

    public function test_jobseeker_can_create_company(): void
    {
        [$user, $token] = $this->actingAsUser();

        $response = $this->withToken($token)->postJson('/api/become-company', [
            'name'        => 'Acme Corp',
            'description' => 'We build things',
            'address'     => 'Nablus, Palestine',
            'website'     => 'https://acme.com',
            'phone'       => '0599000000',
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('message', 'Company created successfully');

        $this->assertDatabaseHas('companies', ['name' => 'Acme Corp', 'user_id' => $user->id]);
        $this->assertDatabaseHas('users',     ['id' => $user->id, 'role' => 'company']);
    }

    public function test_user_cannot_create_company_twice(): void
    {
        [$user, $token] = $this->actingAsUser();

        Company::factory()->create(['user_id' => $user->id]);
        $user->update(['role' => 'company']);

        $response = $this->withToken($token)->postJson('/api/become-company', [
            'name'        => 'Another Corp',
            'description' => 'Another company',
            'address'     => 'Ramallah, Palestine',
        ]);

        $response->assertStatus(400)
                 ->assertJsonPath('message', 'Already a company');
    }

    public function test_create_company_fails_with_missing_required_fields(): void
    {
        [, $token] = $this->actingAsUser();

        $response = $this->withToken($token)->postJson('/api/become-company', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'description', 'address']);
    }

    public function test_create_company_fails_with_invalid_website(): void
    {
        [, $token] = $this->actingAsUser();

        $response = $this->withToken($token)->postJson('/api/become-company', [
            'name'        => 'Acme Corp',
            'description' => 'We build things',
            'address'     => 'Nablus, Palestine',
            'website'     => 'not-a-valid-url',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['website']);
    }

    public function test_create_company_fails_without_authentication(): void
    {
        $response = $this->postJson('/api/become-company', [
            'name'        => 'Acme Corp',
            'description' => 'We build things',
            'address'     => 'Nablus, Palestine',
        ]);

        $response->assertStatus(401);
    }

    public function test_website_and_phone_are_optional(): void
    {
        [, $token] = $this->actingAsUser();

        $response = $this->withToken($token)->postJson('/api/become-company', [
            'name'        => 'Acme Corp',
            'description' => 'We build things',
            'address'     => 'Nablus, Palestine',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('companies', ['name' => 'Acme Corp', 'website' => null, 'phone' => null]);
    }
}