<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectBusinessTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/ProjectBusinessTypes');
    }
}
