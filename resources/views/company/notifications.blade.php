<x-layout>
    <div class="max-w-4xl mx-auto px-4 py-8">

        <!-- Back to Company Button -->
        <div class="mb-6">
            <a href="/company"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
                ← Back to Company
            </a>
        </div>

        <!-- Page Title -->
        <h1 class="text-3xl font-extrabold text-white mb-6 text-center">
            Company Notifications 🔔
        </h1>

        @if($notifications->count())
            <div class="space-y-4">
                @foreach($notifications as $notification)
                    <div class="p-4 rounded-xl shadow-md {{ $notification->read_at ? 'bg-gray-800 text-gray-200' : 'bg-teal-700 text-white' }}">

                        <p class="text-base">
                            {{ $notification->data['message'] ?? 'No message' }}
                        </p>

                        <small class="block text-gray-300 mt-2">
                            {{ $notification->created_at->diffForHumans() }}
                        </small>

                        @if(!$notification->read_at)
                            <form method="POST" action="{{ route('company.notifications.read', $notification->id) }}" class="mt-2">
                                @csrf
                                <button type="submit" class="text-sm text-blue-400 hover:underline">
                                    Mark as Read
                                </button>
                            </form>
                        @endif

                    </div>
                @endforeach
            </div>

        @else
            <p class="text-gray-300 text-center mt-6">No notifications yet 😴</p>
        @endif
    </div>
</x-layout>
