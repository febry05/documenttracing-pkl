<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use App\Models\Projects\ProjectDocument;
use App\Services\ProjectDocumentService;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentController extends Controller
{
    protected $priorities = [
        [
            'key' => 1,
            'value' => 'Low',
        ],
        [
            'key' => 2,
            'value' => 'Medium',
        ],
        [
            'key' => 3,
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
        DB::beginTransaction();
        try 
        {
         // dd($request);
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
                'deadline_interval' => 'required|integer|in:1,7,30',
                'weekly' => 'required|integer|min:1|max:5', // 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday
                'monthly_deadline' => 'required|integer|min:1|max:31',
            ]);

        $validated['project_id'] = $project->id;
        
        ProjectDocument::create($validated);

        DB::commit();

        return redirect()->route('projects.show', $project)
            ->with('success', 'Document created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the document: ' . $e->getMessage()]);
        }
    }

    public function update($id, Request $request, Project $project , ProjectDocumentService $projectDocumentService)
    {
        DB::beginTransaction();
        try 
        {
         dd($request);
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
                'deadline_interval' => 'required|integer|in:1,7,30',
                'base_deadline' => 'required|integer|min:1|max:31',
            ]);

        $validated['project_id'] = $project->id;
        
        
        $projectDocument = ProjectDocument::findOrFail($id);
        $projectDocument->update($validated);

        DB::commit();

        return redirect()->route('projects.show', $project)
            ->with('success', 'Document created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the document: ' . $e->getMessage()]);
        }
    }

    
}
