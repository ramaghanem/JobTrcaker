<x-layout>

    <div class="max-w-5xl mx-auto px-4 py-10">

        <div class="mb-6">
            <a href="/company"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
                ← Back to Company
            </a>
        </div>

        <h1 class="text-3xl font-bold text-white mb-6">
            Applicants for "{{ $job->title }}"
        </h1>

        @if($applications->count())
            <div class="bg-gray-800 rounded-2xl shadow-md overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr class="bg-gray-900 text-gray-300">
                            <th class="px-6 py-3 text-left">Applicant</th>
                            <th class="px-6 py-3 text-left">CV</th>
                            <th class="px-6 py-3 text-left">Status</th>
                            <th class="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-700">
                        @foreach ($applications as $application)
                        <tr class="bg-gray-800 hover:bg-gray-700 transition">
                            <td class="px-6 py-4 text-white">{{ $application->user->name }}</td>
                            <td class="px-6 py-4">
                               <a href="{{ asset('storage/' . $application->cv) }}"
                                  class="text-teal-400 hover:underline" target="_blank">
                                   Download CV
                                </a>
                            </td>
                            <td class="px-6 py-4 text-white capitalize">{{ $application->status }}</td>
                            <td class="px-6 py-4 flex gap-2">

                                @if($application->status != 'accepted')
                                    <form method="POST" action="/jobApplication/{{ $application->id }}/accepted">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit"
                                            class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm">
                                            Accept
                                        </button>
                                    </form>
                                @endif

                                @if($application->status != 'rejected')
                                    <form method="POST" action="/jobApplication/{{ $application->id }}/rejected">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit"
                                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">
                                            Reject
                                        </button>
                                    </form>
                                @endif

                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <p class="text-gray-300">No applicants yet for this job.</p>
        @endif
    </div>
</x-layout>
