<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Auth as AttributesAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return view('auth.login');

    }

    public function store(Request $request)
    {
        $user= $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (! Auth::attempt($user)) {
            throw ValidationException::withMessages([
                'email' => 'Incorrect email or password'
            ]);
        }
        request()->session()->regenerate();

        if (Auth::user()->role === 'jobseeker') {
            return redirect('/jobseekers');
        }
        if (Auth::user()->role === 'company') {
            return redirect('/company');
        }
        return redirect('/login');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        Auth::logout();

   return redirect('/');
    }
}
