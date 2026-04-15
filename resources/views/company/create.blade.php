<x-layout>

    <div class="text-center mt-8">
        <x-form-head>Become a Company</x-form-head>
    </div>

    <div class="max-w-xl mx-auto text-center mt-2 mb-8">
        <p class="text-gray-300 leading-relaxed text-lg">
            You will be asked to confirm your details before switching your account
            <br>
            to a company account.
        </p>
    </div>

    <div class="min-h-screen flex justify-center items-start bg-gray-900 pt-8">
        <form method="POST" action="/become-company" enctype="multipart/form-data"
              class="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
            @csrf

            <div class="space-y-6 text-white">

                <!-- Company Name -->
                <div>
                    <x-form-label for="company_name">Company Name</x-form-label>
                    <input id="company_name" type="text" name="company_name"
                           value="{{ old('company_name', session('company_data.company_name')) }}"
                           class="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                    <x-form-error name="company_name" />
                </div>

                <!-- Company Description -->
                <div>
                    <x-form-label for="company_description">Company Description</x-form-label>
                    <textarea id="company_description" name="company_description" rows="4"
                              class="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                              required>{{ old('company_description', session('company_data.company_description')) }}</textarea>
                    <x-form-error name="company_description" />
                </div>

                <!-- Address -->
                <div>
                    <x-form-label for="address">Company Address</x-form-label>
                    <input id="address" type="text" name="address"
                           value="{{ old('address', session('company_data.address')) }}"
                           class="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                    <x-form-error name="address" />
                </div>

                <!-- Website -->
                <div>
                    <x-form-label for="website">Company Website</x-form-label>
                    <input id="website" type="text" name="website"
                           value="{{ old('website', session('company_data.website')) }}"
                           class="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                    <x-form-error name="website" />
                </div>

                <!-- Phone -->
                <div>
                    <x-form-label for="phone">Phone</x-form-label>
                    <input id="phone" type="text" name="phone"
                           value="{{ old('phone', session('company_data.phone')) }}"
                           class="block w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <x-form-error name="phone" />
                </div>

                <!-- Logo -->
                <div>
                    <x-form-label for="logo">Logo (optional)</x-form-label>
                    <input id="logo" type="file" name="logo"
                           class="block w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white">
                    <x-form-error name="logo" />
                </div>

            </div>

            <!-- Buttons -->
            <div class="flex items-center justify-end gap-x-4 mt-6">
                <!-- Cancel Button -->
                <a href="/jobseekers"
                   class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full shadow-lg transition">
                    Cancel
                </a>

                <!-- Continue Button -->
                <x-form-button class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full shadow-lg">
                    Continue
                </x-form-button>
            </div>

        </form>
    </div>

</x-layout>
