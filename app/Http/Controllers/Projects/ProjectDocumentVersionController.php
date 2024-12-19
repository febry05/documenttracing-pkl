<?php

namespace App\Http\Controllers\Projects;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use League\CommonMark\Node\Block\Document;
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

            $now = now()->toDateString();

            if (!$project) {
                return to_route('projects')
                ->with (['error' => 'Project not found']);
            }
            
            if ($now > $project->contract_end) {
                DB::rollBack();
                return to_route('projects.documents.show', [
                    'project' => $project->id,
                    'document' => $document->id,
                ])->with ('error', 'When making Document Version for "' . $document->name . '" because Project "' . $project->name . '" ended on ' . $project->contract_end);
                ;
            }
            
            

            $validated = $request->validate([
                'release_date' => 'nullable|date', // Optional release date
                'document_number' => 'required|string',
            ]);
            
            $documentNumber = $validated['document_number'];
            
            $releaseDate = $validated['release_date']
            ? now()->create($validated['release_date'])
            : null;
                        
            $now = now();

            switch ($document->deadline_interval) {
            case 1:
                $versionName = $now->format('d M Y'); // Daily
            break;
            case 2:
                $versionName = 'Week ' . $now->weekOfMonth . ' ' . $now->format('F Y'); // Weekly
                break;
            case 3:
                $versionName = $now->format('F Y'); // Monthly
                break;
            case 4:
                $versionName = $now->format('l, jS F Y H:i'); // Detailed timestamp
                break;
            default:
                throw new InvalidArgumentException('Invalid deadline interval.');
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
