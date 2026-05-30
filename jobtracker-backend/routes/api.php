<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

    Route::get('/auth/google', [AuthController::class, 'googleRedirect']);
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::get('/jobs/listings',                            [JobController::class, 'listings']);
    Route::apiResource('/jobs',                             JobController::class);

    Route::get('/applications',                             [JobApplicationController::class, 'index']);
    Route::post('/jobs/{job}/apply',                        [JobApplicationController::class, 'store']);
    Route::patch('/applications/{jobApplication}/{status}', [JobApplicationController::class, 'updateStatus']);
    Route::delete('/applications/{jobApplication}',         [JobApplicationController::class, 'destroy']);
    Route::post('/become-company', [App\Http\Controllers\Api\CompanyController::class, 'store']);
    Route::get('/notifications',           [App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read',[App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
    Route::get('/applications/{jobApplication}/match', [App\Http\Controllers\Api\CvMatchController::class, 'match']);


});