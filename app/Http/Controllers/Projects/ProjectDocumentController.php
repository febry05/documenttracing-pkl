<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;

class ProjectDocumentController extends Controller
{
    public function show(Project $project, ProjectDocument $projectDocument) {
        return Inertia::render('Projects/Documents/Show', [
            'project' => $project,
            'projectDocument' => $projectDocument,
        ]);
    }
}
