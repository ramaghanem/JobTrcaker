<x-layout>
    <div class="max-w-3xl mx-auto px-4 py-10">

        <h1 class="text-3xl font-extrabold text-white mb-8 text-center">
            Edit Job
        </h1>

        <div class="bg-gray-800 rounded-2xl shadow-lg p-8">

            <form method="POST" action="/jobs/{{ $job->id }}">
                @csrf
                @method('PUT')

                <!-- Title -->
                <div class="mb-4">
                    <label for="title" class="block text-gray-200 font-semibold mb-2">Job Title</label>
                    <input type="text" name="title" id="title"
                        value="{{ old('title', $job->title) }}"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Job title">
                    @error('title')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Description -->
                <div class="mb-4">
                    <label for="description" class="block text-gray-200 font-semibold mb-2">Description</label>
                    <textarea name="description" id="description" rows="4"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Job description">{{ old('description', $job->description) }}</textarea>
                    @error('description')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Location -->
                <div class="mb-4">
                    <label for="location" class="block text-gray-200 font-semibold mb-2">Location</label>
                    <input type="text" name="location" id="location"
                        value="{{ old('location', $job->location) }}"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Job location">
                    @error('location')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Salary -->
                <div class="mb-4">
                    <label for="salary" class="block text-gray-200 font-semibold mb-2">Salary</label>
                    <input type="number" name="salary" id="salary"
                        value="{{ old('salary', $job->salary) }}"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Salary">
                    @error('salary')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Employment Type -->
                <div class="mb-4">
                    <label for="employment_type" class="block text-gray-200 font-semibold mb-2">Employment Type</label>
                    <select name="employment_type" id="employment_type"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                        <option value="">Select Type</option>
                        <option value="full-time" {{ old('employment_type', $job->employment_type) == 'full-time' ? 'selected' : '' }}>Full-Time</option>
                        <option value="part-time" {{ old('employment_type', $job->employment_type) == 'part-time' ? 'selected' : '' }}>Part-Time</option>
                        <option value="internship" {{ old('employment_type', $job->employment_type) == 'internship' ? 'selected' : '' }}>Internship</option>
                    </select>
                    @error('employment_type')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Status -->
                <div class="mb-6">
                    <label for="status" class="block text-gray-200 font-semibold mb-2">Status</label>
                    <select name="status" id="status"
                        class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                        <option value="">Select Status</option>
                        <option value="open" {{ old('status', $job->status) == 'open' ? 'selected' : '' }}>Open</option>
                        <option value="closed" {{ old('status', $job->status) == 'closed' ? 'selected' : '' }}>Closed</option>
                        <option value="draft" {{ old('status', $job->status) == 'draft' ? 'selected' : '' }}>Draft</option>
                    </select>
                    @error('status')
                        <p class="text-red-400 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>


                <div class="flex justify-end gap-4 pt-4">
                  <a href="/jobs"
                    class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md transition">
                       Cancel
                   </a>

                <button type="submit"
                      class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition">
                    Edit Job
                </button>

                  </div>

                </div>

            </form>
        </div>
    </div>
</x-layout>
