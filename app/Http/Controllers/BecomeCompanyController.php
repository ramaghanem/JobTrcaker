<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BecomeCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('company.create');
    }


    public function store(Request $request)
    {

        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_description' => 'required|string|max:500',
            'address'=>'required|string|max:255',
            'website'=>'nullable|url',
            'phone'=>'nullable|numeric',
            'logo'=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);
         if ($request->hasFile('logo')) {
        $path = $request->file('logo')->store('companies', 'public'); // حفظ الصورة في storage/app/public/companies
        $data['logo'] = $path; // حفظ المسار بالـ session
    }


        session(['company_data' => $data]);
        return redirect('/become-company/confirm');
    }

    public function dashboard()
    {
    $company = Auth::user()->company;
    $jobsCount = $company->jobs()->count();
    $openJobsCount = $company->jobs()->where('status', 'open')->count();
    $applicationsCount = JobApplication::whereIn('job_id', $company->jobs()->pluck('id'))->count();

    return view('company', compact('company', 'jobsCount', 'openJobsCount', 'applicationsCount'));
}
}
