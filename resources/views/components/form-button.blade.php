
<button {{ $attributes->merge([
    'class' => 'rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-teal-600 hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-teal-400'
]) }}>
    {{ $slot }}
</button>
