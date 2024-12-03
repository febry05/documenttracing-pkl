<?php

namespace App\Http\Controllers\Projects;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Users\User;
use function Ramsey\Uuid\v1;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use App\Models\Users\UserProfile;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectController extends Controller
{
    protected $projects;
    protected $projectBusinessTypes;
    protected $projectManager;
    protected $projectDocument;
    protected $projectDocumentVersions;
    protected $projectService;

    public function __construct(Request $request, ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => $this->projectService->getProjects(),
            'projectBusinessTypes' => $this->projectService->getProjectBusinessTypes(),
        ]);
    }

    public function show($id, ProjectService $projectService, Request $request){
        // $projectId = $request->route('project');
        return Inertia::render('Projects/Show', [
            'project' => $this->projectService->getProjects()->firstWhere('id', $id),
            'projectDocuments' => $this->projectService->getProjectDocuments($id),
            'projectDocumentVersions' => $this->projectService->getProjectDocumentVersions(),
            'priorities' => $this->priorities,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', [
            'projectBusinessTypes' => $this->projectService->getProjectBusinessTypes(),
            'projectManagers' => $this->projectService->getProjectManagers(),
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255',
                'customer' => 'required|string|max:255',
                'contract_number' => 'required|string|max:255',
                'contract_start' => 'required|date',
                'contract_end' => 'required|date',
                'user_profile_id' => 'required|integer',
                'project_business_type_id' => 'required|integer',
            ]);

            $validatedData['contract_start'] = Carbon::parse($validatedData['contract_start'])->format('Y-m-d H:i:s');
            $validatedData['contract_end'] = Carbon::parse($validatedData['contract_end'])->format('Y-m-d H:i:s');

            Project::create($validatedData);

            DB::commit();

            return redirect()->route('projects.index')->with('flash', [
                'status' => 'success',
                'message' => 'Project created successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create project');
        }
    }

    public function edit($id)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $this->projects->firstWhere('id', $id),
            'projectBusinessTypes' => $this->projectBusinessTypes,
            'projectManagers' => $this->projectManager,
        ]);
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255',
                'customer' => 'required|string|max:255',
                'contract_number' => 'required|string|max:255',
                'contract_start' => 'required|date',
                'contract_end' => 'required|date',
                'user_profile_id' => 'required|integer',
                'project_business_type_id' => 'required|integer',
            ]);

            $validatedData['contract_start'] = Carbon::parse($validatedData['contract_start'])->format('Y-m-d H:i:s');
            $validatedData['contract_end'] = Carbon::parse($validatedData['contract_end'])->format('Y-m-d H:i:s');

            $project = Project::findOrFail($id);
            
            $project->update($validatedData);

            DB::commit();

            return redirect()->route('projects.show', $id)->with('flash', [
                'status' => 'success',
                'message' => 'Project updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update project');
        }
    }

    protected $mockProjects = [
        [
            'id' => 1,
            'code' => 'SRV.JKLT.2020.01',
            'name' => 'Pengadaan Jasa Pengelolaan Passengger Service Charges On Ticket System (POTS) di Bandar Udara yang dikelola AP1',
            'business_type_id' => 1,
            'user_profile_id' => 2,
            'customer' => 'PT Fast Food Indonesia, Tbk',
            'contract_number' => 'PJKP-20004 344',
            'contract_start' => '2020-02-15',
            'contract_end' => '2025-02-15',
        ]
    ];

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
}
