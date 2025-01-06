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

    //Projects
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create')->middleware('permission:Create Project');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store')->middleware('permission:Create Project');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit')->middleware('check_permission:true,Update Project');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update')->middleware('check_permission:true,Update Project');
    
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy')->middleware('permission:Delete Project'); 
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show')->middleware('check_permission:true,View Project');
    
    
    //Documents
    Route::get('/projects/{project}/documents', [ProjectDocumentController::class, 'index'])->name('projects.documents.index');
    Route::get('/projects/{project}/documents/create', [ProjectDocumentController::class, 'create'])->name('projects.documents.create')->middleware('check_permission:true,Create Project Document');
    Route::post('/projects/{project}/documents', [ProjectDocumentController::class, 'store'])->name('projects.documents.store')->middleware('check_permission:true,Create Project Document');
    Route::get('/projects/{project}/documents/{document}/edit', [ProjectDocumentController::class, 'edit'])->name('projects.documents.edit')->middleware('check_permission:true,Update Project Document');
    Route::put('/projects/{project}/documents/{document}', [ProjectDocumentController::class, 'update'])->name('projects.documents.update')->middleware('check_permission:true,Update Project Document');
    
    Route::delete('/projects/{project}/documents/{document}', [ProjectDocumentController::class, 'destroy'])->name('projects.documents.destroy')->middleware('check_permission:true,Delete Project Document');
    Route::get('/projects/{project}/documents/{document}', [ProjectDocumentController::class, 'show'])->name('projects.documents.show')->middleware('check_permission:true,View Project Document');


    // //Versions
    Route::get('/projects/{project}/documents/{document}/versions', [ProjectDocumentVersionController::class, 'index'])->name('projects.documents.versions.index');
    Route::get('/projects/{project}/documents/{document}/versions/create', [ProjectDocumentVersionController::class, 'create'])->name('projects.documents.versions.create')->middleware('check_permission:true,Create Project Document Version');
    Route::post('/projects/{project}/documents/{document}/versions', [ProjectDocumentVersionController::class, 'store'])->name('projects.documents.versions.store')->middleware('check_permission:true,Create Project Document Version');
    Route::get('/projects/{project}/documents/{document}/versions/{version}/edit', [ProjectDocumentVersionController::class, 'edit'])->name('projects.documents.versions.edit')->middleware('check_permission:true,Update Project Document Version');
    Route::put('/projects/{project}/documents/{document}/versions/{version}', [ProjectDocumentVersionController::class, 'update'])->name('projects.documents.versions.update')->middleware('check_permission:true,Update Project Document Version');
    
    Route::delete('/projects/{project}/documents/{document}/versions/{version}', [ProjectDocumentVersionController::class, 'destroy'])->name('projects.documents.versions.destroy')->middleware('check_permission:true,Delete Project Document Version');
    Route::get('/projects/{project}/documents/{document}/versions/{version}', [ProjectDocumentVersionController::class, 'show'])->name('projects.documents.versions.show')->middleware('check_permission:true,View Project Document Version');

    //Update Document
    Route::get('/projects/{project}/documents/{document}/versions/{version}/updates/create', [UpdateController::class, 'create'])->name('projects.documents.versions.updates.create')->middleware('check_permission:true,View Project Document Version Update');
    Route::post('/projects/{project}/documents/{document}/versions/{version}/updates', [UpdateController::class, 'store'])->name('projects.documents.versions.updates.store')->middleware('check_permission:true,Create Project Document Version Update');
    

    //Master Data
    Route::resource('/user-roles', RoleController::class);
    Route::middleware('check_admin')->group(function () {
        Route::resource('/users', UserController::class);
        Route::prefix('/master')->group(function () {
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
