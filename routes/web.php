<?php

use App\Http\Controllers\BecomeCompanyController;
use App\Http\Controllers\CompanyNotificationController;
use App\Http\Controllers\ConfirmCompanyController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RegisterdController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome');
Route::get('/jobseekers',[JobListingController::class, 'dashboard'])->middleware(['auth', 'role:jobseeker']);
Route::get('/search',SearchController::class)->middleware(['auth', 'role:jobseeker']);
Route::get('/notifications',[NotificationController::class, 'index'])
->name('user.notifications')->middleware(['auth', 'role:jobseeker']);
Route::get('/company/notifications', [CompanyNotificationController::class, 'index'])
 ->name('company.notifications')->middleware(['auth', 'role:company']);
Route::get('/company', [BecomeCompanyController::class, 'dashboard'])
->name('company.dashboard')->middleware(['auth', 'role:company']);
Route::get('/login', [SessionController::class, 'index'])->name('login');
Route::get('/register', [RegisterdController::class, 'index'])->name('registerd');
Route::post('/register', [RegisterdController::class, 'store'])->name('registerd.store');
Route::post('/login', [SessionController::class, 'store'])->name('login.store');
Route::get('/become-company', [BecomeCompanyController::class, 'index'])
->name('company.create')->middleware(['auth', 'role:jobseeker']);
Route::post('/become-company', [BecomeCompanyController::class, 'store'])
->name('company.store')->middleware(['auth', 'role:jobseeker']);
Route::delete('/logout', [SessionController::class, 'destroy'])
->name('logout')->middleware('auth');
Route::get('/become-company/confirm', [ConfirmCompanyController::class, 'index'])
->name('company.confirm')->middleware(['auth', 'role:jobseeker']);
Route::post('/become-company/confirm', [ConfirmCompanyController::class, 'store'])
->name('company.confirm.store')->middleware(['auth', 'role:jobseeker']);
Route::get('/companies/{company}', [JobListingController::class, 'show'])->middleware(['auth', 'role:jobseeker']);
Route::get('/jobs/listings', [JobListingController::class, 'index'])->name('jobs.listings');
Route::resource('/jobs', JobController::class)->middleware(['auth', 'role:company']);
Route::get('/jobs/{job}/apply', [JobApplicationController::class, 'create'])
->name('jobApplications.create')->middleware(['auth','role:jobseeker']);
Route::post('/jobs/{job}/apply', [JobApplicationController::class, 'store'])
->name('jobApplications.store')->middleware(['auth','role:jobseeker']);
Route::get('/jobApplications', [JobApplicationController::class, 'index'])
->name('jobApplications.index')->middleware(['auth','role:jobseeker']);
Route::patch('/jobApplication/{jobApplication}/{status}', [JobApplicationController::class, 'updateStatus'])
->name('job_applications.update_status')->middleware(['auth', 'role:company']);
 Route::get('/notifications',[NotificationController::class, 'index'])
->name('notifications.index')->middleware(['auth', 'role:jobseeker']);
Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])
->name('notifications.read')->middleware(['auth', 'role:jobseeker']);
 Route::post('/company/notifications/{id}/read', [CompanyNotificationController::class, 'markAsRead'])
->name('company.notifications.read')->middleware(['auth', 'role:company']);

