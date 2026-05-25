<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\DatabaseNotification;
use Tests\TestCase;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsUser(): array
    {
        $user  = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        return [$user, $token];
    }

    private function createNotificationFor(User $user, array $data = []): DatabaseNotification
    {
        return DatabaseNotification::create([
            'id'              => \Illuminate\Support\Str::uuid(),
            'type'            => 'App\Notifications\NewJobApplicationNotification',
            'notifiable_type' => User::class,
            'notifiable_id'   => $user->id,
            'data'            => array_merge(['message' => 'Someone applied to your job'], $data),
            'read_at'         => null,
        ]);
    }

    // ─────────────────────────────────────────
    //  INDEX
    // ─────────────────────────────────────────

    public function test_user_can_list_own_notifications(): void
    {
        [$user, $token] = $this->actingAsUser();

        $this->createNotificationFor($user);
        $this->createNotificationFor($user);

        $response = $this->withToken($token)->getJson('/api/notifications');

        $response->assertStatus(200)
                 ->assertJsonCount(2);
    }

    public function test_notifications_index_fails_without_auth(): void
    {
        $response = $this->getJson('/api/notifications');

        $response->assertStatus(401);
    }

    public function test_notifications_are_limited_to_50(): void
    {
        [$user, $token] = $this->actingAsUser();

        for ($i = 0; $i < 55; $i++) {
            $this->createNotificationFor($user);
        }

        $response = $this->withToken($token)->getJson('/api/notifications');

        $response->assertStatus(200);
        $this->assertLessThanOrEqual(50, count($response->json()));
    }

    public function test_user_only_sees_own_notifications(): void
    {
        [$user,      $token] = $this->actingAsUser();
        [$otherUser,]        = $this->actingAsUser();

        $this->createNotificationFor($user);
        $this->createNotificationFor($user);
        $this->createNotificationFor($otherUser);

        $response = $this->withToken($token)->getJson('/api/notifications');

        $response->assertStatus(200)
                 ->assertJsonCount(2);
    }

    // ─────────────────────────────────────────
    //  MARK AS READ
    // ─────────────────────────────────────────

    public function test_user_can_mark_notification_as_read(): void
    {
        [$user, $token] = $this->actingAsUser();
        $notification   = $this->createNotificationFor($user);

        $response = $this->withToken($token)
                         ->postJson("/api/notifications/{$notification->id}/read");

        $response->assertStatus(200)
                 ->assertJsonPath('message', 'Marked as read');

        $this->assertNotNull(
            DatabaseNotification::find($notification->id)->read_at
        );
    }

    public function test_user_cannot_mark_other_users_notification_as_read(): void
    {
        [$user,      $token] = $this->actingAsUser();
        [$otherUser,]        = $this->actingAsUser();

        $notification = $this->createNotificationFor($otherUser);

        $response = $this->withToken($token)
                         ->postJson("/api/notifications/{$notification->id}/read");

        $response->assertStatus(404);
    }

    public function test_mark_as_read_fails_without_auth(): void
    {
        [$user,] = $this->actingAsUser();
        $notification = $this->createNotificationFor($user);

        $response = $this->postJson("/api/notifications/{$notification->id}/read");

        $response->assertStatus(401);
    }

    public function test_mark_as_read_fails_with_invalid_id(): void
    {
        [, $token] = $this->actingAsUser();

        $response = $this->withToken($token)
                         ->postJson('/api/notifications/nonexistent-id/read');

        $response->assertStatus(404);
    }
}