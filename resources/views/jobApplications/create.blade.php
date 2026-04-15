<x-layout>
    <div class="max-w-xl mx-auto px-4 py-10">

        <div class="bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 text-gray-200">

            <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">
                Apply for
                <span class="text-teal-400">{{ $job->title }}</span>
            </h1>

            <form
                action="{{ route('jobApplications.store', ['job' => $job->id]) }}"
                method="POST"
                enctype="multipart/form-data"
                class="space-y-6">
                @csrf
                <div>
                    <label class="block text-sm font-medium mb-2">
                        Upload CV <span class="text-red-400">*</span>
                    </label>
                    <input
                        type="file"
                        name="cv"
                        required
                        class="block w-full text-sm text-gray-300
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-md file:border-0
                               file:text-sm file:font-semibold
                               file:bg-teal-500 file:text-white
                               hover:file:bg-teal-600
                               bg-gray-900 rounded-md border border-gray-700">
                </div>

                <!-- Location -->
                <div>
                    <label class="block text-sm font-medium mb-2">
                        Location <span class="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Amman, Remote"
                        class="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2
                               text-gray-200 placeholder-gray-500
                               focus:outline-none focus:border-teal-500"
                    >
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-4 pt-4">
                    <a
                        href="/jobs/listings"
                        class="text-sm text-gray-400 hover:text-white transition"
                    >
                        Cancel
                    </a>

                    <button
                        type="submit"
                        class="bg-teal-500 text-white px-6 py-2 rounded-md
                               font-semibold shadow-md
                               hover:bg-teal-600 hover:scale-105 transition"
                    >
                        Submit Application
                    </button>
                </div>
            </form>

        </div>
    </div>
</x-layout>
