<x-layout>
    <div class="max-w-4xl mx-auto px-4 py-8">

        <!-- Back Button -->
        <div class="mb-4">
            <a href="/jobseekers"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition text-sm">
                ← Back
            </a>
        </div>

        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-6">Notifications 🔔</h1>

        @forelse(auth()->user()->notifications as $notification)
            @php
                $type = $notification->data['type'] ?? 'info';
                $bgColor = match($type) {
                    'accepted' => 'bg-green-100',
                    'rejected' => 'bg-red-100',
                    'new_application' => 'bg-blue-100',
                    default => 'bg-gray-100',
                };
            @endphp

            <div class="p-4 mb-3 rounded-xl shadow-md {{ $bgColor }}">
                <p class="font-medium text-gray-900">{{ $notification->data['message'] }}</p>
                <div class="text-sm text-gray-500 mt-1">
                    {{ $notification->created_at->diffForHumans() }}
                </div>

                @if(!$notification->read_at)
                    <form method="POST" action="{{ route('notifications.read', $notification->id) }}" class="mt-2">
                        @csrf
                        <button type="submit" class="text-blue-600 text-sm hover:underline">
                            Mark as Read
                        </button>
                    </form>
                @endif
            </div>
        @empty
            <p>No notifications yet 😴</p>
        @endforelse

    </div>
</x-layout>
