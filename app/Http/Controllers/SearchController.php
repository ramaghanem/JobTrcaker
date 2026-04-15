<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
         $search = $request->input('q');

    $jobs = Job::with('company')
        ->where(function ($query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
        })
        ->get();

    return view('results', compact('jobs', 'search'));
    }
}
