<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

use App\Services\ProjectDocumentService;

class ProjectDocumentController extends Controller
{
    protected $priorities = [
        [
            'key' => '1',
            'value' => 'Low',
        ],
        [
            'key' => '2',
            'value' => 'Medium',
        ],
        [
            'key' => '3',
            'value' => 'High',
        ],
    ];

    protected $projects;
    protected $projectDocuments;
    protected $projectDocumentVersions;

    public function __construct()
    {
        $this->projects = Project::with('documents','profile')->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'person_in_charge' => $project->profile->name,
                'documents' => $project->documents->map(function ($documents) {
                    return [
                        'id' => $documents->id,
                        'name' => $documents->name,
                        'priority' => $documents->priority,
                        'due_at' => $documents->deadline,
                    ];
                }),
            ];
        });

        $this->projectDocuments = ProjectDocument::with('versions')->get()->map(function ($projectDocument) {
            return [
                'id' => $projectDocument->id,
                'name' => $projectDocument->name,
                'priority' => $projectDocument->priority,
                'deadline' => $projectDocument->deadline,
                'deadline_interval' => $projectDocument->deadline_interval,
                'project' => $projectDocument->project->name,
                'project_id' => $projectDocument->project_id,
                'document_versions' => $projectDocument->versions->map(function ($documentVersion) {
                    return [
                        'id' => $documentVersion->id,
                        'version' => $documentVersion->version,
                        'release_date' => $documentVersion->release_date,
                    ];
                }),
            ];
        });

        $this->projectDocumentVersions = ProjectDocumentVersion::with('updates')->get()->map(function ($projectDocumentVersion) {
            return [
                'id' => $projectDocumentVersion->id,
                'version' => $projectDocumentVersion->version,
                'release_date' => $projectDocumentVersion->release_date,
                'document_number' => $projectDocumentVersion->document_number,
                'project_document_id' => $projectDocumentVersion->project_document_id,
                // 'latest_document' => $projectDocumentVersion->document_updates()->first()->document_link,
                'document_updates' => $projectDocumentVersion->updates->map(function ($documentUpdate) {
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
            'priorities' => $this->priorities,
            'project' => $this->projects->firstWhere('id', $projectId),
            'projectDocument' => $this->projectDocuments->firstWhere('id', $projectDocumentId),
            'projectDocumentVersions' => $this->projectDocumentVersions->where('project_document_id', $projectDocumentId)->values()->all(),
        ]);
    }

    public function create(Project $project) {
        return Inertia::render('Projects/Documents/Create', [
            'project' => $project,
            'priorities' => $this->priorities,
        ]);
    }

    public function store(Request $request, Project $project , ProjectDocumentService $projectDocumentService)
    {
        try 
        {
         // dd($request);
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
                'deadline_interval' => 'required|integer|in:1,7,30',
                // 'deadline' => 'date',
                'base_deadline' => 'required|integer|min:1|max:31',
            ]);

        $validated['project_id'] = $project->id;

        // $validated['deadline'] = $projectDocumentService->calculateDeadline(
        //     $validated['deadline_interval'],
        //     $validated['base_deadline'] === 30
        // );

        // dd($validated);

        ProjectDocument::create($validated);

        return redirect()->route('projects.show', $project)
            ->with('success', 'Document created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the document: ' . $e->getMessage()]);
        }
    }
}
