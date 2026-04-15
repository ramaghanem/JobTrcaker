<x-layout>
    {{-- العنوان --}}
    <div class="text-center mt-8">
        <x-form-head>Confirm Your Company Details</x-form-head>
    </div>

    {{-- وصف الصفحة --}}
    <div class="max-w-xl mx-auto text-center mt-2 mb-8">
        <p class="text-gray-300 leading-relaxed text-lg">
            Please review your company information below. <br>
            If everything looks correct, click <strong>Confirm</strong> to complete the process.
        </p>
    </div>

    {{-- بطاقة عرض البيانات --}}
    <div class="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="space-y-6 text-white">
            <div>
                <x-form-label>Company Name</x-form-label>
                <div class="border border-gray-700 rounded-md px-3 py-2 bg-gray-900">
                    {{ $companyData['company_name'] }}
                </div>
            </div>

            <div>
                <x-form-label>Description</x-form-label>
                <div class="border border-gray-700 rounded-md px-3 py-2 bg-gray-900">
                    {{ $companyData['company_description'] }}
                </div>
            </div>

            <div>
                <x-form-label>Company Address</x-form-label>
                <div class="border border-gray-700 rounded-md px-3 py-2 bg-gray-900">
                    {{ $companyData['address'] }}
                </div>
            </div>

            <div>
                <x-form-label>Company Phone</x-form-label>
                <div class="border border-gray-700 rounded-md px-3 py-2 bg-gray-900">
                    {{ $companyData['phone'] }}
                </div>
            </div>

            <div>
                <x-form-label>Company Website</x-form-label>
                <div class="border border-gray-700 rounded-md px-3 py-2 bg-gray-900">
                    {{ $companyData['website'] }}
                </div>
            </div>

            @if(!empty($companyData['logo']))
            <div>
                <x-form-label>Company Logo</x-form-label>
                <img src="{{ asset('storage/' . $companyData['logo']) }}"
                     alt="Logo"
                     class="w-32 h-32 object-cover rounded-md mx-auto border border-gray-700">
            </div>
            @endif
        </div>
    </div>

    {{-- الأزرار --}}
    <div class="flex justify-center gap-x-4 mb-12">
        <a href="/become-company"
           class="px-6 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white transition">
           Cancel & Edit
        </a>

        <form method="POST" action="/become-company/confirm" class="inline">
            @csrf
            <x-form-button class="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 shadow-lg">
                Confirm & Become Company
            </x-form-button>
        </form>
    </div>
</x-layout>
