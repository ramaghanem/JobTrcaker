<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Auth::user()->company->jobs;
        return view('jobs.index', compact('jobs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('jobs.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
         Auth::user()->company->jobs()->create($request->validated());


        return redirect('/company');
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        $this->authorize('view', $job);
  $applications = $job->applications()->with('user')->get();
      //$applications = $job->applications;

      return view('jobs.show', compact('job', 'applications'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        return view('jobs.edit', compact('job'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobRequest $request, Job $job)
    {
        $this->authorize('update', $job);
        $job->update($request->validated());
        return redirect('/jobs');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);
        $job->delete();
        return redirect('/jobs')->with('success', 'Job deleted successfully!');
    }
}
