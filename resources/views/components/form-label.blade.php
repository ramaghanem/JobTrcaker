<!-- resources/views/components/form-label.blade.php -->
<label {{ $attributes->merge(['class' => 'block text-sm font-medium text-gray-200 mb-2']) }}>
    {{ $slot }}
</label>
