<x-layout>
    <div class="max-w-5xl mx-auto px-4 py-10">

        <!-- Page Title -->
        <div class="flex justify-between items-center mb-8">

            <!-- Left: Back Button -->
            <a href="/company"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
                ← Back to Company
            </a>

            <!-- Center: Title -->
            <h1 class="text-3xl font-extrabold text-white text-center flex-1">
                My Jobs
            </h1>

            <!-- Right: Create Job -->
            <a href="/jobs/create"
               class="bg-teal-500 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:scale-105">
                + Create Job
            </a>
        </div>

        @forelse($jobs as $job)
            <div class="bg-gray-800 rounded-2xl p-6 mb-6 shadow-md">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-xl font-bold text-white">{{ $job->title }}</h2>
                        <p class="text-gray-300 mt-1">{{ $job->description }}</p>

                        <div class="mt-3 flex flex-wrap gap-4 text-gray-200">
                            <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">{{ $job->location }}</span>
                            <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">Salary: {{ $job->salary }}</span>
                            <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">Status: {{ $job->status }}</span>
                            <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">Type: {{ $job->employment_type }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <a href="/jobs/{{ $job->id }}/edit"
                           class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm text-center">
                            Edit
                        </a>
                        <a href="/jobs/{{ $job->id }}"
                           class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm text-center">
                            Show
                        </a>
                        <form method="POST" action="/jobs/{{ $job->id }}">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure?')"
                                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm w-full">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        @empty
            <p class="text-gray-300">No jobs posted yet.</p>
        @endforelse

    </div>
</x-layout>
