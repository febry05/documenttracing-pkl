<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\Users\PasswordController;
use App\Http\Controllers\MasterData\RoleController;
use App\Http\Controllers\Projects\UpdateController;
use App\Http\Controllers\Projects\ProjectController;
use App\Http\Controllers\MasterData\UserDivisionController;
use App\Http\Controllers\MasterData\UserPositionController;
use App\Http\Controllers\Projects\ProjectDocumentController;
use App\Http\Controllers\MasterData\ProjectBusinessTypeController;
use App\Http\Controllers\Projects\ProjectDocumentVersionController;

Route::middleware('block.root')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/monitoring/{year?}/{month?}', [MonitoringController::class, 'index'])->name('monitoring.index');
});


Route::middleware('auth')->group(function () {
    //Users
    Route::resource('/update-password', PasswordController::class)->only(['update']);

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');

    Route::post('/projects/{project}/documents/create', [ProjectDocumentController::class, 'store'])->name('projects.documents.store');
    Route::post('/projects/{project}/documents/{document}/version/create', [ProjectDocumentVersionController::class, 'store'])->name('projects.documents.versions.store');

    Route::get('/projects/{project}/documents', [ProjectDocumentController::class, 'index'])->name('projects.documents.index');
    Route::get('/projects/{project}/documents/{document}', [ProjectDocumentController::class, 'show'])->name('projects.documents.show');
    Route::get('/projects/{project}/documents/{document}/versions', [ProjectDocumentVersionController::class, 'index'])->name('projects.documents.versions.index');
    Route::get('/projects/{project}/documents/{document}/versions/{version}', [ProjectDocumentVersionController::class, 'show'])->name('projects.documents.versions.show');

    // Route::middleware('can_handle_project')->group(function () {
       // Project resource routes (except index and show)
        Route::resource('/projects', ProjectController::class)
            ->except(['index', 'show']);

        // Document-related routes
        Route::prefix('/projects')->name('projects.')->group(function () {
            Route::resource('/{project}/documents', ProjectDocumentController::class)
                ->except(['index', 'show'])
                ->middleware('can_handle_project');

            // Version-related routes
            Route::prefix('/{project}/documents/{document}')->name('documents.')->group(function () {
                Route::resource('/versions', ProjectDocumentVersionController::class)
                    ->except(['index', 'show'])
                    ->middleware('can_handle_project');

                // Update-related routes
                Route::prefix('/versions/{version}')->name('versions.')->group(function () {
                    Route::resource('/updates', UpdateController::class)
                        ->middleware('can_handle_project');
                });
            });
        });
    // // });

    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

    //Master Data
    Route::middleware('check_admin')->group(function () {
        Route::resource('/users', UserController::class);
        Route::prefix('/master')->group(function () {
            Route::resource('/user-roles', RoleController::class);
            Route::resource('/user-permissions', PermissionController::class);
            Route::resource('/user-positions', UserPositionController::class);
            Route::resource('/user-divisions', UserDivisionController::class);
            Route::resource('/project-business-types', ProjectBusinessTypeController::class);
        });
    });
});

//    ===============================================================
//    Please run `php artisan route:list` to see all available routes
//    ===============================================================

require __DIR__.'/auth.php';
