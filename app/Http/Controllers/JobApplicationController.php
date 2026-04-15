<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use App\Models\Job;
use App\Notifications\JobApplicationAccepted;
use App\Notifications\JobApplicationRejected;
use App\Notifications\JobApplicationStatusNotification;
use App\Notifications\NewJobApplicationNotification;
use Illuminate\Support\Facades\Auth;


class JobApplicationController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobApplications = Auth::user()->jobApplications;
        return view('jobApplications.index', compact('jobApplications'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Job $job)
    {
        return view('jobApplications.create', compact('job'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobApplicationRequest $request , Job $job)
    {


    $cvPath = $request->file('cv')->store('cvs','public');


    $job->applications()->create([
         'user_id' => Auth::id(),
        'cv' => $cvPath,
        'job_id' => $job->id,
        'location' => $request->location,

    ]);

    $job->company->user->notify(new NewJobApplicationNotification(
      Auth::user()->name,
      $job->title,


    ));

    return redirect('jobs/listings')->with('success', 'Application submitted successfully!');
//         // Check if the user has already applied to this job
//         if ($job->applications()->where('user_id', Auth::id())->exists()) {
//             return redirect()->back()->with('error', 'You have already applied for this job!');
//         }

//         // Store the job application
//         $data = $request->validated();
//         // Store the CV in public storage
//         $data['cv_path'] = $request->file('CV')->store('cvs', 'public');
//         $data['user_id'] = Auth::id();
//         $data['job_id'] = $job->id;

//         // Create the job application
//         JobApplication::create($data);
//       // عند نجاح التقديم:
// return redirect('jobs/listings')->with('success', 'Application submitted successfully!');

// في حالة الخطأ:


    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();
        return redirect('/jobApplication');
    }
    public function updateStatus( JobApplication $jobApplication , $status)
    {
       $this->authorize('updateStatus', $jobApplication);
    //      if (!in_array($status, ['pending', 'accepted', 'rejected'])) {
    //     abort(400, 'Invalid status value.');
    // }
       $jobApplication->status = $status;
        $jobApplication->save();
    //      if ($status === 'accepted') {
    //     $jobApplication->user->notify(
    //         new JobApplicationAccepted($jobApplication->job->title)
    //     );
    // }
    //   if ($status === 'rejected') {
    //     $jobApplication->user->notify(
    //         new JobApplicationRejected($jobApplication->job->title)
    //     );
    // }

    $jobApplication->user->notify(
    new JobApplicationStatusNotification(
         $jobApplication->job->title,
         $jobApplication->job->company->name,
         $status
    )
);
        return redirect('/jobs');
    }
}
