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
        try {

            $now = now()->toDateString();

            if (!$project) {
                return to_route('projects')
                ->with (['error' => 'Project not found']);
            }

            if ($now > $project->contract_end) {
                DB::rollBack();
                return to_route('projects.show' , $project)
                ->with(['error' => 'Contract for ' . $project->name . '" already passed in' . $project->contract_end]);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
                'weekly_deadline' => 'nullable|integer|min:1|max:5', // 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday
                'monthly_deadline' => 'nullable|integer|min:1|max:31',
                'deadline_interval' => 'required|integer|in:1,2,3,4',
                'is_auto' => 'required|boolean',
                // 'project_id' => $project->id,

            ]);
            $validated['project_id'] = $project->id;

            $debug = ProjectDocument::create($validated);

            DB::commit();

            session()->flash('success', 'Document for "' . $project->name . '" created successfully');
            return to_route('projects.show' , $project);
        } catch (\Exception $e) {
            DB::rollBack();
            //dd($e);
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the document: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, Project $project , ProjectDocument $document)
    {
        DB::beginTransaction();
        try
        {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'priority' => 'required|integer|in:1,2,3', // Low, Medium, High
                'weekly_deadline' => 'nullable|integer|min:1|max:5', // 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday
                'monthly_deadline' => 'nullable|integer|min:1|max:31',
                'deadline_interval' => 'required|integer|in:1,2,3,4',
                // 'is_auto' => 'required|boolean',
            ]);

        $validated['project_id'] = $project->id;

        // $document = document::findOrFail($document->id);
        $document->update($validated);

        DB::commit();

        return redirect()->route('projects.documents.show',  [$project, $document])
            ->with('success', 'Document "' . $document->name . '" updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the document: ' . $e->getMessage()]);
        }
    }

    public function destroy($id, Project $project)
    {
        DB::beginTransaction();
        try {
            // Find the document by ID
            $projectDocument = ProjectDocument::findOrFail($id);

            // Delete all associated versions (cascading updates deletion if set in DB)
            $projectDocument->versions()->each(function ($version) {
                $version->delete(); // Will trigger cascading deletion for updates if defined
            });

            // Delete the document itself
            $projectDocument->delete();

            DB::commit();

            return redirect()->route('projects.show', $project)
                ->with('success', 'Document deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'An error occurred while deleting the document: ' . $e->getMessage()]);
        }
    }
}
