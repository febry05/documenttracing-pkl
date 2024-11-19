<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;

class ProjectDocumentController extends Controller
{
    protected $priorities = [
        1 => 'Low',
        2 => 'Medium',
        3 => 'High',
    ];

    protected $project;
    protected $projectDocument;
    protected $projectDocumentVersion;

    // public function __construct()
    // {
    //     $this->project = Project
    // }

    public function show(Project $project, ProjectDocument $projectDocument) {
        return Inertia::render('Projects/Documents/Show', [
            'project' => $project,
            'projectDocument' => $projectDocument,
            'projectDocumentVersions' => $projectDocument->document_version,
        ]);
    }

    public function create(Project $project) {
        return Inertia::render('Projects/Documents/Create', [
            'project' => $project,
            'priorities' => $this->priorities,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
            'deadline_interval' => 'required|integer|in:7,15,30',
            'monthly_deadline' => 'required|date',
        ]);

        $validated['project_id'] = $project->id;

        ProjectDocument::create($validated);

        return redirect()->route('projects.documents.index', $project)
            ->with('success', 'Document created successfully.');
    }

    public function updateDeadline(Request $request, Project $project, ProjectDocument $projectDocument){

    }
}
