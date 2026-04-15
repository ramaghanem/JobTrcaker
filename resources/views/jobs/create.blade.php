<x-layout>
    <div class="max-w-3xl mx-auto px-4 py-10">

        <h1 class="text-3xl font-extrabold text-white mb-8 text-center">
            Create New Job
        </h1>

        <div class="bg-gray-800 rounded-2xl shadow-lg p-8">

            <form action="/jobs" method="POST" class="space-y-6">
                @csrf

                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value="{{ old('title') }}"
                        class="w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500"
                    >
                    @error('title')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        class="w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500"
                    >{{ old('description') }}</textarea>
                    @error('description')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Salary -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">
                        Salary
                    </label>
                    <input
                        type="text"
                        name="salary"
                        value="{{ old('salary') }}"
                        class="w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500"
                    >
                    @error('salary')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Location -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value="{{ old('location') }}"
                        class="w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500"
                    >
                    @error('location')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Employment Type -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">
                        Employment Type
                    </label>
                    <select
                        name="employment_type"
                        class="w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500"
                    >
                        <option value="">Select</option>
                        <option value="full-time" {{ old('employment_type') == 'full-time' ? 'selected' : '' }}>
                            Full-time
                        </option>
                        <option value="part-time" {{ old('employment_type') == 'part-time' ? 'selected' : '' }}>
                            Part-time
                        </option>
                        <option value="internship" {{ old('employment_type') == 'internship' ? 'selected' : '' }}>
                            Internship
                        </option>
                    </select>
                    @error('employment_type')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>


                   <div class="flex justify-end gap-4 pt-4">

                      <a href="/company"
                         class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md transition">
                             Cancel
                      </a>


                <button
                  type="submit"
                  class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition">
                    Create Job
                </button>

                </div>


            </form>

        </div>
    </div>
</x-layout>
