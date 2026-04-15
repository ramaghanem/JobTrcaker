<x-layout>
    <div class="max-w-4xl mx-auto px-4 py-10">

        <!-- Company Card -->
        <div class="bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 text-gray-200">

            <!-- Header -->
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                @if($company->logo)
                    <img
                        src="{{ asset('storage/' . $company->logo) }}"
                        alt="Company Logo"
                        class="w-28 h-28 object-cover rounded-xl border border-gray-700"
                    >
                @endif

                <div class="text-center sm:text-left">
                    <h1 class="text-3xl font-extrabold text-white">
                        {{ $company->name }}
                    </h1>

                    <p class="text-gray-400 mt-1">
                        {{ $company->address }}
                    </p>

                    <p class="mt-2">
                        <a href="{{ $company->website }}"
                           target="_blank"
                           class="text-teal-400 hover:text-teal-300 underline">
                            {{ $company->website }}
                        </a>
                    </p>

                    <p class="text-gray-400 mt-1">
                        📞 {{ $company->phone }}
                    </p>
                </div>
            </div>

            <!-- Description -->
            <div class="mt-8 border-t border-gray-700 pt-6">
                <h2 class="text-xl font-semibold text-white mb-3">
                    About the Company
                </h2>
                <p class="leading-relaxed text-gray-300">
                    {{ $company->description }}
                </p>
            </div>

            <!-- Jobs -->
            @if($jobs->count())
                <div class="mt-10 border-t border-gray-700 pt-6">
                    <h2 class="text-xl font-semibold text-white mb-4">
                        Open Positions
                    </h2>

                    <ul class="space-y-3">
                        @foreach($jobs as $job)
                            <li class="bg-gray-900 rounded-lg p-4 hover:bg-gray-700 transition">
                                <a
                                    href="/jobs/{{ $job->id }}/apply"
                                    class="text-teal-400 hover:text-teal-300 font-medium"
                                >
                                    {{ $job->title }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endif

        </div>
    </div>
</x-layout>
