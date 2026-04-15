<x-layout>
    <div class="max-w-6xl mx-auto px-4 py-10">

        <h1 class="text-4xl font-bold text-white mb-6 text-center">
            Welcome, {{ auth()->user()->company->name }}
        </h1>

        <div class="bg-gray-800 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div class="bg-gray-700 rounded-xl p-4 text-center shadow hover:scale-105 transform transition">
                <p class="text-gray-400 mb-2">Total Jobs</p>
                <p class="text-teal-400 text-2xl font-bold">{{ $jobsCount }}</p>
            </div>

            <div class="bg-gray-700 rounded-xl p-4 text-center shadow hover:scale-105 transform transition">
                <p class="text-gray-400 mb-2">Open Jobs</p>
                <p class="text-teal-400 text-2xl font-bold">{{ $openJobsCount }}</p>
            </div>

            <div class="bg-gray-700 rounded-xl p-4 text-center shadow hover:scale-105 transform transition">
                <p class="text-gray-400 mb-2">Applications Received</p>
                <p class="text-teal-400 text-2xl font-bold">{{ $applicationsCount }}</p>
            </div>

            <div class="bg-gray-700 rounded-xl p-4 text-center shadow hover:scale-105 transform transition">
                <p class="text-gray-400 mb-2">Company Website</p>
                <a href="{{ auth()->user()->company->website }}" target="_blank" class="text-blue-400 hover:underline">
                    Visit
                </a>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="/jobs/create"
               class="bg-teal-500 text-white px-6 py-3 rounded-xl shadow hover:bg-teal-600 transition transform hover:scale-105">
                + Create Job
            </a>

            <a href="/jobs"
               class="bg-teal-500 text-white px-6 py-3 rounded-xl shadow hover:bg-teal-600 transition transform hover:scale-105">
                Manage Jobs
            </a>

            <a href="/company/notifications"
               class="bg-teal-500 text-white px-6 py-3 rounded-xl shadow hover:bg-teal-600 transition transform hover:scale-105">
                Notifications
            </a>
        </div>


        <div class="bg-gray-800 rounded-2xl shadow-md p-6 text-white">
            <h2 class="text-2xl font-semibold mb-4">Company Details</h2>
            <p><span class="font-bold">Name:</span> {{ auth()->user()->company->name }}</p>
            <p><span class="font-bold">Description:</span> {{ auth()->user()->company->description }}</p>
            <p><span class="font-bold">Address:</span> {{ auth()->user()->company->address }}</p>
            <p><span class="font-bold">Phone:</span> {{ auth()->user()->company->phone }}</p>
            <p><span class="font-bold">Website:</span>
                <a href="{{ auth()->user()->company->website }}" target="_blank" class="text-blue-400 hover:underline">
                    {{ auth()->user()->company->website }}
                </a>
            </p>
        </div>

    </div>
</x-layout>
