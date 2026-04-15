<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfirmCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyData = session('company_data');

        if (! $companyData) {
            return redirect()->route('company.create');
        }

        return view('company.confirm', compact('companyData'));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $companyData = session('company_data');

        if (! $companyData) {
            return redirect()->route('company.create');
        }

        $user = Auth::user();
        $user->company()->create([
            'name' => $companyData['company_name'],
            'description' => $companyData['company_description'],
            'address'=>$companyData['address'],
            'phone'=>$companyData['phone'],
            'website'=>$companyData['website'],
            'logo' => $companyData['logo'] ?? null,
        ]);
        $user->update([
            'role' => 'company',
        ]);
        session()->forget('company_data');
        return redirect('/company');
    }

}
