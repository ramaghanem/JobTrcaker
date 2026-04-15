<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Job;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobListingController extends Controller
{
    public function index()
    {
        // جلب كل الوظائف
        $jobs = Job::where('status', 'open') // فلتر حسب الحالة
           ->latest()->paginate(10) ;               // ترتيب آخر الوظائف أولاً;
        // إرجاع الـ view مع الوظائف
        return view('jobs.jobListings', compact('jobs'));
    }

    public function show(Company $company)
    {
        $jobs=$company->jobs;
        return view('company.show', compact('jobs','company'));
    }

    public function dashboard()
{
    $user = Auth::user();

    // عدد الطلبات اللي قدمها المستخدم
    $applicationsCount = $user->jobApplications()->count();

    // عدد الوظائف المقبولة
    $acceptedCount = $user->jobApplications()->where('status', 'accepted')->count();

    // عدد الطلبات المرفوضة
    $rejectedCount = $user->jobApplications()->where('status', 'rejected')->count();

    return view('jobseeker', compact('user', 'applicationsCount', 'acceptedCount', 'rejectedCount'));
}

}
