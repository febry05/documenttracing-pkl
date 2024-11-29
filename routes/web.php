<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\MasterData\RoleController;
use App\Http\Controllers\Projects\ProjectController;
use App\Http\Controllers\MasterData\UserDivisionController;
use App\Http\Controllers\MasterData\UserPositionController;
use App\Http\Controllers\Projects\ProjectDocumentController;
use App\Http\Controllers\MasterData\ProjectBusinessTypeController;
use App\Http\Controllers\Projects\ProjectDocumentVersionController;
use App\Http\Controllers\Projects\UpdateController;

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


Route::middleware(['auth', 'role:Administrator'])->group(function () {
    //Users
    Route::resource('/users', UserController::class);

    // Projects
    Route::resource('/projects', ProjectController::class);
    Route::prefix('/projects')->name('projects.')->group(function () {
        Route::resource('/{project}/documents', ProjectDocumentController::class);
        Route::name('documents.')->group(function () {
            Route::resource('/{project}/documents/{document}/versions', ProjectDocumentVersionController::class);
            Route::name('versions.')->group(function () {
                Route::resource('/{project}/documents/{document}/versions/{version}/updates', UpdateController::class);
            });
        });
    });

    //Master Data
    Route::prefix('/master')->group(function () {
        Route::resource('/user-roles', RoleController::class);
        Route::resource('/user-permissions', PermissionController::class);
        Route::resource('/user-positions', UserPositionController::class);
        Route::resource('/user-divisions', UserDivisionController::class);
        Route::resource('/project-business-types', ProjectBusinessTypeController::class);
    });
});

//    ===============================================================
//    Please run `php artisan route:list` to see all available routes
//    ===============================================================

require __DIR__.'/auth.php';
