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

    public function index(Request $request)
    {
        $projects = $this->projectService->getProjects();

        $pics = User::all()->filter(function ($user) {
            return $user->can('Handle Owned Project');
        })->map(function ($user) {
            return [
            'value' => $user->profile->name,
            'label' => $user->profile->name,
            ];
        })->values()->toArray();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'projectBusinessTypes' => $this->projectService->getProjectBusinessTypes(),
            'pics' => $pics,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', [
            'projectBusinessTypes' => $this->projectService->getProjectBusinessTypes(),
            'projectManagers' => $this->projectService->getProjectManagers(),
        ]);
    }

    public function show($id, ProjectService $projectService, Request $request){
        return Inertia::render('Projects/Show', [
            'project' => $this->projectService->getProjects()->firstWhere('id', $id),
            'projectDocuments' => $this->projectService->getProjectDocuments($id),
            'projectDocumentVersions' => $this->projectService->getProjectDocumentVersions(),
            'priorities' => $this->priorities,
            // dd($this->projectService->getProjectDocumentVersions($id)),
        ]);
    }


    public function store(Request $request, Project $project)
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

            return redirect()->route('projects.index')
            ->with('success', 'Project **'. $request->name .'** created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create project: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $this->projectService->getProjects($id)->firstWhere('id', $id),
            'projectBusinessTypes' => $this->projectService->getProjectBusinessTypes(),
            'projectManagers' => $this->projectService->getProjectManagers(),
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

            return redirect()->route('projects.show', $id)
            ->with('success', 'Project **'. $request->name .'** has been updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update project: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $project = Project::findOrFail($id);

            $project->documents()->each(function ($document) {
                $document->delete();
            });

            $project->delete();
            DB::commit();

            return redirect()->route('projects.index')
                ->with('success', 'Project **' . $project->name . '** has been deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to delete project: ' . $e->getMessage());
        }
    }

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

    protected $projectService;

    public function __construct(Request $request, ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }
}
