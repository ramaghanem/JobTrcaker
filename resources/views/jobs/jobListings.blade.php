<x-layout>
    <div class="max-w-5xl mx-auto px-4 py-10">

        <div class="flex items-center justify-between mb-6">
             @auth
            <a href="/jobseekers"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition text-sm">
               ← Back to Dashboard
            </a>
             @endauth


            <h1 class="text-2xl font-bold text-white text-center flex-1">
                Available Jobs
            </h1>

           @auth
            <a href="/jobApplications"
               class="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition text-sm">
               My Applications
            </a>
             @endauth
        </div>

        <!-- Search Form -->
        <form method="GET" action="/search" class="mb-6 flex gap-2">
            <input type="text" name="q" placeholder="Search jobs or companies..."
                   value="{{ request('q') }}"
                   class="flex-1 border border-gray-400 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-teal-400">
            <button type="submit" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">Search 🔍</button>
        </form>

        <!-- Jobs Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach ($jobs as $job)
                @if($job->status === 'open')
                <div class="bg-gray-700 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition transform">
                    @if($job->company->logo)
                        <img src="{{ asset('storage/' . $job->company->logo ) }}"
                             alt="{{ $job->company->name }} Logo"
                             class="w-24 h-24 object-cover rounded-full mb-3 border-2 border-gray-600">
                    @endif

                    <h3 class="text-lg font-semibold text-white mb-1 text-center">{{ $job->title }}</h3>
                    <p class="text-gray-300 mb-1 text-center line-clamp-3">{{ $job->description }}</p>
                    <p class="text-teal-400 font-medium mb-1 text-sm">Salary: {{ $job->salary }}</p>
                    <p class="text-gray-400 mb-2 text-sm capitalize">{{ $job->status }}</p>

                    <a href="/companies/{{ $job->company->id }}" class="text-blue-400 hover:underline text-sm mb-2">
                        {{ $job->company->name }}
                    </a>

                   @auth
                    @if (Auth::user()->role === 'jobseeker')
                        @if (!Auth::user()->jobApplications()->where('job_id', $job->id)->exists())
                            <a href="/jobs/{{ $job->id }}/apply"
                               class="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600 transition text-sm">
                                Apply
                            </a>
                        @else
                            <p class="text-gray-400 text-sm mt-1">Already Applied</p>
                        @endif
                    @endif
                   @endauth
                </div>
                @endif
            @endforeach
        </div>

        {{-- Pagination --}}
        <div class="mt-6 flex justify-center">
            {{ $jobs->links('vendor.pagination.tailwind-custom') }}
        </div>

    </div>
</x-layout>
