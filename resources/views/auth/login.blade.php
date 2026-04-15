<x-layout>
    {{-- هيد الفورم --}}
    <x-form-head>Log In</x-form-head>

    {{-- الفورم --}}
    <div class="min-h-screen flex justify-center items-start bg-gray-900 pt-12">
        <form method="POST" action="/login"
              class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
            @csrf

            <div class="space-y-6">
                <!-- Email -->
                <div>
                    <x-form-label for="email">Email</x-form-label>
                    <div class="mt-1 flex items-center rounded-md border border-gray-700 focus-within:border-teal-400">
                        <input id="email" type="email" name="email" :value="old('email')"
                               placeholder="Enter your email"
                               class="block w-full bg-gray-900 text-white py-2 px-3 placeholder-gray-400 focus:outline-none" required />
                    </div>
                    <x-form-error name="email" />
                </div>

                <!-- Password -->
                <div>
                    <x-form-label for="password">Password</x-form-label>
                    <div class="mt-1 flex items-center rounded-md border border-gray-700 focus-within:border-teal-400">
                        <input id="password" type="password" name="password"
                               placeholder="Enter your password"
                               class="block w-full bg-gray-900 text-white py-2 px-3 placeholder-gray-400 focus:outline-none" required />
                    </div>
                    <x-form-error name="password" />
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex items-center justify-end gap-x-4 mt-6">
                <a href="/" class="text-sm font-semibold text-teal-400 hover:text-teal-500 transition">Cancel</a>
                <x-form-button>Log In</x-form-button>
            </div>
        </form>
    </div>
</x-layout>
