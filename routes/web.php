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
    Route::resource('/users', UserController::class);
    Route::resource('/update-password', PasswordController::class)->only(['update']);

    // // Projects // Define a helper function for standardized resource routes
    // function resourceWithPublicIndex($basePath, $controller, $name, $middleware) {
    //     Route::get($basePath, [$controller, 'index'])->name("{$name}.index"); // Set public for index route
    //     Route::resource($basePath, $controller)->except(['index'])->middleware($middleware); // Middleware-protected resource routes excluding index
    // }
    // //Define routes for projects
    // // resourceWithPublicIndex('/projects', ProjectController::class, 'projects', 'can_handle_project');

    // Route::middleware('can_handle_project')->group(function () {
    //     resourceWithPublicIndex('/projects', ProjectController::class, 'projects', 'can_handle_project');
    //     // resourceWithPublicIndex('/{project}/documents', ProjectDocumentController::class, 'documents', 'can_handle_project');
    //     Route::prefix('/projects')->name('projects.')->group(function () {
    //         resourceWithPublicIndex('/{project}/documents', ProjectDocumentController::class, 'documents', 'can_handle_project');
    //         Route::name('documents.')->group(function () {
    //             resourceWithPublicIndex('/{project}/documents/{document}/versions', ProjectDocumentVersionController::class, 'versions', 'can_handle_project');
    //             Route::name('versions.')->group(function () {
    //                 resourceWithPublicIndex('/{project}/documents/{document}/versions/{version}/updates', UpdateController::class, 'updates', 'can_handle_project');
    //             });
    //         });
    //     });
    // });

    Route::middleware('can_handle_project')->group(function () {
        Route::resource('/projects', ProjectController::class);
        // Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
        // Route::resource('/projects', ProjectController::class)
        //     ->except(['index','show'])
        //     ->middleware('can_handle_project');
        Route::prefix('/projects')->name('projects.')->group(function () {
            Route::resource('/{project}/documents', ProjectDocumentController::class);
            Route::name('documents.')->group(function () {
                Route::resource('/{project}/documents/{document}/versions', ProjectDocumentVersionController::class);
                Route::name('versions.')->group(function () {
                    Route::resource('/{project}/documents/{document}/versions/{version}/updates', UpdateController::class);
                });
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
