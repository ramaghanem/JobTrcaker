<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyNotificationController extends Controller
{

    public function index()
    {
        $notifications = Auth::user()->notifications()->latest()->take(50)->get();

        return view('company.notifications', compact('notifications'));
    }
   public function markAsRead($id)
    {
        $notification = Auth::user()->notifications()->where('id', $id)->firstOrFail();
        $notification->markAsRead();

        return redirect()->back()->with('success', 'Notification marked as read.');
    }
}
