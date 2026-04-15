<x-layout>
    <div class="max-w-4xl mx-auto px-4 py-8">

        <!-- Back to Jobs Button -->
        <div class="mb-4">
            <a href="/jobs/listings"
               class="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition text-sm">
                ← Back to Jobs
            </a>
        </div>

        <!-- Page Title -->
        <h1 class="text-xl font-bold mb-4">
            Search Results for "{{ $search }}"
        </h1>

        @if($jobs->isEmpty())
            <p>No results found 😢</p>
        @else
            <ul class="space-y-2">
                @foreach($jobs as $job)
                    <li class="border p-3 rounded">
                        <strong>{{ $job->title }}</strong><br>
                        Company: {{ $job->company->name }}<br>
                        <a href="/companies/{{$job->company->id}}" class="text-blue-500 hover:underline">
                            {{ $job->company->name }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
</x-layout>
