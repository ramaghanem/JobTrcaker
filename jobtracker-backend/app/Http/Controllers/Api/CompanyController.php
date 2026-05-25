<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'address'     => 'required|string|max:255',
            'website'     => 'nullable|url',
            'phone'       => 'nullable|string',
        ]);

        $user = Auth::user();

        if ($user->company) {
            return response()->json(['message' => 'Already a company'], 400);
        }

        Company::create([
            'user_id'     => $user->id,
            'name'        => $data['name'],
            'description' => $data['description'],
            'address'     => $data['address'],
            'website'     => $data['website'] ?? null,
            'phone'       => $data['phone'] ?? null,
        ]);

        $user->update(['role' => 'company']);

        return response()->json(['message' => 'Company created successfully']);
    }
}
