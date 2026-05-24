<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use App\Notifications\JobApplicationStatusNotification;
use App\Notifications\NewJobApplicationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobApplicationController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $applications = Auth::user()
            ->jobApplications()
            ->with('job.company')
            ->latest()
            ->get();

        return response()->json($applications);
    }

    public function store(Request $request, Job $job)
{
    $request->validate([
        'cv'       => 'required|file|mimes:pdf|max:2048',
        'location' => 'required|string',
    ]);

    // تحقق إذا قدّم قبل
    if ($job->applications()->where('user_id', Auth::id())->exists()) {
        return response()->json([
            'message' => 'You have already applied for this job'
        ], 422);
    }

    $cvPath = $request->file('cv')->store('cvs', 'public');

    $application = $job->applications()->create([
        'user_id'  => Auth::id(),
        'cv'       => $cvPath,
        'job_id'   => $job->id,
        'location' => $request->location,
    ]);

    $job->company->user->notify(
        new NewJobApplicationNotification(Auth::user()->name, $job->title)
    );

    return response()->json($application, 201);
}

    public function updateStatus(JobApplication $jobApplication, $status)
    {
        $this->authorize('updateStatus', $jobApplication);

        $jobApplication->update(['status' => $status]);

        $jobApplication->user->notify(
            new JobApplicationStatusNotification(
                $jobApplication->job->title,
                $jobApplication->job->company->name,
                $status
            )
        );

        return response()->json($jobApplication);
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();
        return response()->json(['message' => 'Application deleted']);
    }
}