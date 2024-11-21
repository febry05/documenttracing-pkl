<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentVersionController extends Controller
{
    protected $statuses = [
        [
            'key' => 1,
            'value' => 'Completed'
        ],
        [
            'key' => 2,
            'value' => 'On Process'
        ],
        [
            'key' => 3,
            'value' => 'Pending'
        ],
        [
            'key' => 4,
            'value' => 'Not Started'
        ],
    ];

    public function show(Project $project, ProjectDocument $projectDocument, ProjectDocumentVersion $projectDocumentVersion) {
        return Inertia::render('Projects/Documents/Versions/Show', [
            'statuses' => $this->statuses,
            'project' => $project,
            'projectDocument' => $projectDocument,
            'projectDocumentVersion' => $projectDocumentVersion,
            'projectDocumentVersionUpdates' => $projectDocumentVersion->document_updates,
        ]);

    }
}
