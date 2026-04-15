<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class RegisterdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('auth.register');
    }

    public function store(Request $request)
    {
        $User = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $User['name'],
            'email' => $User['email'],
            'password' => bcrypt($User['password']),
            'role' => 'jobseeker',
        ]);
        Auth::login($user);

        return redirect('/jobseekers');
    }
}
