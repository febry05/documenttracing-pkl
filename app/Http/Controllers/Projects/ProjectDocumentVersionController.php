<?php

namespace App\Http\Controllers\Projects;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentVersionController extends Controller
{
    protected $projectService;
    // protected $projectDocuments;
    // protected $projectDocumentVersions;


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

    public function __construct(Request $request, ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function show($projectId, $projectDocumentId, $projectDocumentVersionId) {
        // dd($this->projectService->getProjectDocuments($projectId)->firstWhere('id', $projectDocumentId));
        return Inertia::render('Projects/Documents/Versions/Show', [
            'project' => $this->projectService->getProjects($projectId)->firstWhere('id', $projectId),
            'projectDocument' => $this->projectService->getProjectDocuments($projectId)->firstWhere('id', $projectDocumentId),
            'projectDocumentVersion' => $this->projectService->getProjectDocumentVersions($projectDocumentVersionId)->firstWhere('id', $projectDocumentVersionId),
            'projectDocumentVersionUpdates' => $this->projectService->getProjectDocumentVersionUpdates($projectDocumentVersionId),
            'statuses' => $this->statuses,
        ]);
    }

    public function store(Request $request, Project $project, ProjectDocument $document, ProjectDocumentVersion $version)
    {
        DB::beginTransaction();
        try { 

            $validated = $request->validate([
                'release_date' => 'nullable|date', // Optional release date
                'document_number' => 'required|string',
            ]);
            
            $documentNumber = $validated['document_number'];
            
            $releaseDate = $validated['release_date']
            ? now()->create($validated['release_date'])
            : null;
                        
            $now = now();

            $versionName = match ($document->deadline_interval) {
            1 => $now->format('Ymd'),
            2 => 'Week ' . $now->weekOfMonth . ' ' . $now->format('F Y'),
            3 => $now->format('F Y'),
            4 => $now->format('Y'),
        };
        
        $deadline = $this->projectService->calculateDeadline($document);
        
        $version = ProjectDocumentVersion::create([
            'version' => $versionName,
            'document_number' => $documentNumber,
            'release_date' => $releaseDate->toDateTimeString(),
            'deadline' => $deadline->toDateTimeString(),
            'project_document_id' => $document->id,
        ]);

        // dd($now->toDateTimeString());
        // If no release date is provided, schedule automation
        // if (!$releaseDate) {
        //     // Logic for scheduling automation
        //     $this->scheduleAutomation($document);
        // }
        
        DB::commit();

        return redirect()->route('projects.documents.show', [
            'project' => $project->id,
            'document' => $document->id,
            ])
            ->with('success', $releaseDate
                ? "Version {$version->version} created successfully with release date {$releaseDate->format('Y-m-d')}."
                : "Version {$version->version} created successfully and will be automated.");
            } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->back()->with('error', 'Failed to create version');
        }
    }
}
