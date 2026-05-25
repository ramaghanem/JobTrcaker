<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobApplicationStatusNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    public string $jobTitle;
    public string $companyName;
    public string $status;

    public function __construct(string $jobTitle, string $companyName, string $status)
    {
        $this->jobTitle = $jobTitle;
        $this->companyName = $companyName;
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        if($this->status === 'accepted'){
            return [
                 'message' => "🎉 Congratulations! Your application for the {$this->jobTitle} position at {$this->companyName} has been accepted.",
                  'type' => $this->status,
            ];
        }
        return [
            'message' => "❌ Unfortunately, your application for the {$this->jobTitle} position at {$this->companyName} was not accepted. We wish you better luck next time.",
            'type' => $this->status,

        ];
    }
}
