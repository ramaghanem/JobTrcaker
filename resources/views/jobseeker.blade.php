<x-layout>
    <div class="max-w-5xl mx-auto px-4 py-10">

        {{-- الهيد --}}
        <h1 class="text-3xl font-bold mb-6 text-center text-white">Jobseeker Dashboard</h1>

        {{-- أزرار أعلى الصفحة --}}
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href="/jobs/listings"
               class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition text-center">
                Browse Jobs
            </a>

            <a href="/jobApplications"
               class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition text-center">
                My Applications
            </a>

            <a href="/become-company"
               class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition text-center">
                Switch to Company
            </a>
        </div>

        {{-- إحصائيات --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div class="bg-white p-5 rounded-xl text-center shadow hover:shadow-lg transition transform hover:scale-105">
                <p class="text-gray-500 mb-2 font-semibold">Total Applications</p>
                <p class="text-teal-500 text-2xl font-bold">{{ $applicationsCount }}</p>
            </div>

            <div class="bg-white p-5 rounded-xl text-center shadow hover:shadow-lg transition transform hover:scale-105">
                <p class="text-gray-500 mb-2 font-semibold">Accepted</p>
                <p class="text-green-600 text-2xl font-bold">{{ $acceptedCount }}</p>
            </div>

            <div class="bg-white p-5 rounded-xl text-center shadow hover:shadow-lg transition transform hover:scale-105">
                <p class="text-gray-500 mb-2 font-semibold">Rejected</p>
                <p class="text-red-600 text-2xl font-bold">{{ $rejectedCount }}</p>
            </div>
        </div>
    </div>
</x-layout>
