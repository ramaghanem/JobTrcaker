@if ($paginator->hasPages())
    <nav role="navigation" aria-label="Pagination Navigation" class="flex items-center justify-center space-x-2">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <span class="px-3 py-1 rounded-md bg-gray-600 text-gray-300 cursor-not-allowed">«</span>
        @else
            <a href="{{ $paginator->previousPageUrl() }}"
               class="px-3 py-1 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition">«</a>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
            @if (is_string($element))
                <span class="px-3 py-1 rounded-md bg-gray-600 text-gray-300">{{ $element }}</span>
            @endif

            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <span class="px-3 py-1 rounded-md bg-teal-700 text-white font-bold">{{ $page }}</span>
                    @else
                        <a href="{{ $url }}" class="px-3 py-1 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition">
                            {{ $page }}
                        </a>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}"
               class="px-3 py-1 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition">»</a>
        @else
            <span class="px-3 py-1 rounded-md bg-gray-600 text-gray-300 cursor-not-allowed">»</span>
        @endif
    </nav>
@endif
