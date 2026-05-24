<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobController extends Controller
{
    use AuthorizesRequests;

    public function index()
{
    if (!Auth::user()->company) {
        return response()->json(['message' => 'No company found'], 403);
    }

    $jobs = Auth::user()->company->jobs()->latest()->get();
    return response()->json($jobs);
}

public function store(Request $request)
{
    if (!Auth::user()->company) {
        return response()->json(['message' => 'No company found'], 403);
    }

    $data = $request->validate([
        'title'           => 'required|string|max:255',
        'description'     => 'required|string',
        'location'        => 'required|string',
        'salary'          => 'required|numeric',
        'employment_type' => 'required|in:full-time,part-time,internship',
        'status'          => 'required|in:open,closed,draft',
    ]);

    $job = Auth::user()->company->jobs()->create($data);
    return response()->json($job, 201);
}

    public function show(Job $job)
    {
        $job->load('applications.user');
        return response()->json($job);
    }

    public function update(Request $request, Job $job)
    {
        $this->authorize('update', $job);

        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location'    => 'sometimes|string',
            'salary'      => 'nullable|numeric',
        ]);

        $job->update($data);
        return response()->json($job);
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);
        $job->delete();
        return response()->json(['message' => 'Job deleted successfully']);
    }

    public function listings(Request $request)
    {
        $jobs = Job::with('company')
            ->when($request->search, fn($q) =>
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('location', 'like', "%{$request->search}%")
            )
            ->latest()
            ->get();

        return response()->json($jobs);
    }
}
