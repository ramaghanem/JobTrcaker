<x-layout>
    <div class="max-w-6xl mx-auto px-4 py-10">

        <!-- Back to Dashboard Button -->
        <div class="mb-6">
            <a href="/jobseekers"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition text-sm">
                ← Back to Dashboard
            </a>
        </div>

        <!-- Page Title -->
        <h1 class="text-3xl font-extrabold text-white mb-8 text-center">
            Your Job Applications
        </h1>

        @if($jobApplications->isEmpty())
            <div class="bg-gray-800 text-gray-300 p-6 rounded-xl text-center shadow-md">
                You have not applied for any jobs yet 😴
            </div>
        @else
            <div class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

                <table class="w-full text-left">
                    <thead class="bg-gray-900 text-gray-300 text-sm uppercase">
                        <tr>
                            <th class="px-6 py-4">Job Title</th>
                            <th class="px-6 py-4">Company</th>
                            <th class="px-6 py-4">Status</th>
                            <th class="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-700">
                        @foreach($jobApplications as $jobApplication)
                            <tr class="hover:bg-gray-700 transition">
                                <td class="px-6 py-4 text-white font-medium">
                                    {{ $jobApplication->job->title }}
                                </td>

                                <td class="px-6 py-4 text-gray-300">
                                    {{ $jobApplication->job->company->name }}
                                </td>

                                <td class="px-6 py-4">
                                    @if($jobApplication->status === 'accepted')
                                        <span class="px-3 py-1 rounded-full text-sm bg-green-600 text-white">
                                            Accepted
                                        </span>
                                    @elseif($jobApplication->status === 'rejected')
                                        <span class="px-3 py-1 rounded-full text-sm bg-red-600 text-white">
                                            Rejected
                                        </span>
                                    @else
                                        <span class="px-3 py-1 rounded-full text-sm bg-yellow-500 text-gray-900">
                                            Pending
                                        </span>
                                    @endif
                                </td>

                                <td class="px-6 py-4">
                                    <span class="text-gray-400 text-sm">—</span>
                                </td>

                            </tr>
                        @endforeach
                    </tbody>
                </table>

            </div>
        @endif

    </div>
</x-layout>
