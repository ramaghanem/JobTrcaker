<!-- resources/views/welcome3.blade.php -->
<x-layout>
    <section class="h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-teal-700 flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-md mb-6">
            Welcome to Job Tracker!
        </h1>
        <p class="text-lg sm:text-xl max-w-3xl text-gray-200 mb-10">
            Discover top job opportunities and get connected with great companies.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="/login" class="bg-teal-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-teal-600 hover:scale-105 transition">
                Login
            </a>
            <a href="/register" class="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full shadow-lg hover:bg-white hover:text-teal-500 hover:scale-105 transition">
                Register
            </a>
        </div>
    </section>

    <section class="bg-gray-900 py-20 text-center">
        <h2 class="text-3xl sm:text-4xl font-semibold text-white mb-6">Start your career journey today!</h2>
        <p class="text-gray-200 mb-8 sm:mb-12 text-lg sm:text-xl">
            Browse the best jobs available and apply in seconds.
        </p>
        <a href="/jobs/listings" class="bg-teal-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-teal-600 transition transform hover:scale-105">
            Browse Jobs
        </a>
    </section>
</x-layout>
