<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentController extends Controller
{
    protected $priorities = [
        1 => 'Low',
        2 => 'Medium',
        3 => 'High',
    ];

    protected $projects;
    protected $projectDocuments;
    protected $projectDocumentVersions;

    public function __construct()
    {
        $this->projects = Project::with('document','profile')->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'person_in_charge' => $project->profile->name,
                'documents' => $project->document->map(function ($documents) {
                    return [
                        'id' => $documents->id,
                        'name' => $documents->name,
                        'priority' => $documents->priority,
                        'due_at' => $documents->deadline,
                    ];
                }),
            ];
        });

        $this->projectDocuments = ProjectDocument::with('document_version')->get()->map(function ($projectDocument) {
            return [
                'id' => $projectDocument->id,
                'name' => $projectDocument->name,
                'priority' => $projectDocument->priority,
                'deadline' => $projectDocument->deadline,
                'deadline_interval' => $projectDocument->deadline_interval,
                'project' => $projectDocument->project->name,
                'project_id' => $projectDocument->project_id,
                'document_versions' => $projectDocument->document_version->map(function ($documentVersion) {
                    return [
                        'id' => $documentVersion->id,
                        'version' => $documentVersion->version,
                        'release_date' => $documentVersion->release_date,
                    ];
                }),
            ];
        });

        $this->projectDocumentVersions = ProjectDocumentVersion::with('document_updates')->get()->map(function ($projectDocumentVersion) {
            return [
                'id' => $projectDocumentVersion->id,
                'version' => $projectDocumentVersion->version,
                'release_date' => $projectDocumentVersion->release_date,
                'document_number' => $projectDocumentVersion->document_number,
                'project_document_id' => $projectDocumentVersion->project_document_id,
                'latest_document' => $projectDocumentVersion->document_updates()->first()->document_link,
                'document_updates' => $projectDocumentVersion->document_updates->map(function ($documentUpdate) {
                    return [
                        'id' => $documentUpdate->id,
                        'description' => $documentUpdate->description,
                        'updated_at' => $documentUpdate->updated_at,
                    ];
                }),
            ];
        });

    }

    public function show($projectId, $projectDocumentId) {
        return Inertia::render('Projects/Documents/Show', [
            'project' => $this->projects->firstWhere('id', $projectId),
            'projectDocument' => $this->projectDocuments->firstWhere('id', $projectDocumentId),
            'projectDocumentVersions' => $this->projectDocumentVersions->where('project_document_id', $projectDocumentId),
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
