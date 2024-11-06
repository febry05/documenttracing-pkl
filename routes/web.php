<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\MasterData\RoleController;
use App\Http\Controllers\MasterData\UserDivisionController;
use App\Http\Controllers\MasterData\UserPositionController;
use App\Http\Controllers\MasterData\ProjectBusinessTypeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware(['auth'])->group(function () {
Route::middleware(['auth', 'role:Administrator'])->group(function () {
    Route::resource('/users', UserController::class);
    //Master
    Route::resource('/master/user-roles', RoleController::class);
    Route::resource('/master/permissions', PermissionController::class);
    Route::resource('/master/user-positions', UserPositionController::class);
    Route::resource('/master/user-divisions', UserDivisionController::class);
    Route::resource('/master/project-business-types', ProjectBusinessTypeController::class);
});

require __DIR__.'/auth.php';
