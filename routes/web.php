<?php

use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\Users\UserRoleController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Users\UserDivisionController;
use App\Http\Controllers\Users\UserPositionController;
use App\Http\Controllers\Projects\ProjectBusinessTypeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/users', UserController::class);

    Route::resource('/master/user-positions', UserPositionController::class);
    Route::resource('/master/user-divisions', UserDivisionController::class);
    Route::resource('/master/user-roles', userRoleController::class);
    Route::resource('/master/project-business-types', ProjectBusinessTypeController::class);
});

require __DIR__.'/auth.php';
