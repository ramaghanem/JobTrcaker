<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Tracker</title>
   @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen font-sans">

    <div class="flex flex-col min-h-screen">

       <header class="bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 class="text-3xl font-bold text-white">
            <a href="/" class="hover:text-teal-400 transition">Job Tracker</a>
        </h1>

        @auth
        <div class="flex items-center gap-4">

            @php $user = auth()->user(); @endphp
            <div class="relative">
                @if($user->role === 'company')
                    <a href="{{ route('company.notifications') }}" class="relative text-2xl hover:text-teal-400 transition">
                        🔔
                        @if($user->unreadNotifications()->count())
                            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {{ $user->unreadNotifications()->count() }}
                            </span>
                        @endif
                    </a>
                @else
                    <a href="/notifications" class="relative text-2xl hover:text-teal-400 transition">
                        🔔
                        @if($user->unreadNotifications()->count())
                            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {{ $user->unreadNotifications()->count() }}
                            </span>
                        @endif
                    </a>
                @endif
            </div>

            <form method="POST" action="/logout">
                @csrf
                @method('DELETE')
                <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">
                    Log Out
                </button>
            </form>
        </div>
        @endauth

        @guest
        <div class="flex items-center gap-4">
            <a href="/login" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">
                Log In
            </a>
            <a href="/register" class="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Register
            </a>
        </div>
        @endguest
    </div>
</header>


        <!-- Main Content Area -->
        <main class="flex-1">
            {{ $slot }}
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-gray-300 py-4 mt-auto">
            <div class="max-w-7xl mx-auto text-center">
                <p>&copy; 2026 Job Tracker. All Rights Reserved.</p>
            </div>
        </footer>

    </div>
</body>
</html>
