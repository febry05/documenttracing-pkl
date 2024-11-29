<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

use App\Services\ProjectDocumentService;
use App\Services\ProjectService;

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
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function show($projectId, $projectDocumentId) {


        return Inertia::render('Projects/Documents/Show', [
            'priorities' => $this->priorities,
            'project' => $this->projectService->getProjects()->firstWhere('id', $projectId),
            'projectDocument' => $this->projectService->getProjectDocuments($projectId)->firstWhere('id', $projectDocumentId),
            'projectDocumentVersions' => $this->projectService->getProjectDocumentVersions()->where('project_document_id', $projectDocumentId)->values()->all(),
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
