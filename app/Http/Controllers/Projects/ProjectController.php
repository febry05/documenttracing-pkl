<?php

namespace App\Http\Controllers\Projects;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Users\User;
use function Ramsey\Uuid\v1;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Models\Users\UserProfile;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use App\Models\Projects\ProjectDocument;
use App\Models\MasterData\ProjectBusinessType;

class ProjectController extends Controller
{
    protected $projects;
    protected $projectBusinessTypes;
    protected $projectManager;
    protected $projectDocument;

    public function __construct()
    {
        $this->projects = Project::with('profile', 'businessType')
            ->select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_end', 'user_profile_id', 'project_business_type_id')
            ->get()
            ->map(function ($project) {
                $contractStart = Carbon::parse($project->contract_start);
                $contractEnd = Carbon::parse($project->contract_end);

                $daysLeft = $contractEnd->isPast() ? 'Contract Ended' : $this->calculateDays($contractEnd);

                return [
                    'id' => $project->id,
                    'code' => $project->code,
                    'name' => $project->name,
                    'type' => $project->businessType?->name ?? 'N/A',
                    'customer' => $project->customer,
                    'contract_number' => $project->contract_number,
                    'contract_start' => $project->contract_start,
                    'contract_end' => $project->contract_end,
                    'days_left' => $daysLeft,
                    'duration' => $this->calculateDuration($project->contract_start, $project->contractEnd),
                    'person_in_charge' => $project->profile->name,
                    'user_profile_id' => $project->user_profile_id,
                    'project_business_type_id' => $project->project_business_type_id,
                ];
            });

        $this->projectBusinessTypes = ProjectBusinessType::select('id', 'name')->get()->map(function ($type) {
            return [
                'id' => $type->id,
                'name' => $type->name,
                'value' => $type->name,
                'label' => $type->name,
            ];
        });

        $this->projectManager = User::with('profile')->whereHas('roles', function ($query) {
            $query->where('name', 'Project Manager');
        })->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->profile->name,
            ];
        });

        $this->projectDocument = ProjectDocument::with('document_version')->get()->map(function ($document) {
            return [
                'id' => $document->id,
                'name' => $document->name,
                'project_document_versions' => $document->document_version->map(function ($version){
                    return [
                        'id' => $version->id,
                        'version' => $version->version,
                        'document_number' => $version->document_number,
                    ];
                }),
            ];
        });


    }

    protected function calculateDays($contractEnd)
    {
        $now = Carbon::now();
        $diffInYears = $now->diffInYears($contractEnd);
        $diffInMonths = $now->copy()->addYears($diffInYears)->diffInMonths($contractEnd);
        $diffInDays = $now->copy()->addYears($diffInYears)->addMonths($diffInMonths)->diffInDays($contractEnd);

        $roundedYears = intval($diffInYears);
        $roundedMonths = intval($diffInMonths);
        $roundedDays = intval($diffInDays);

        return collect([
            $roundedYears > 0 ? "{$roundedYears} Year" . ($roundedYears > 1 ? 's' : '') : null,
            $roundedMonths > 0 ? "{$roundedMonths} Month" . ($roundedMonths > 1 ? 's' : '') : null,
            $roundedDays > 0 ? "{$roundedDays} Day" . ($roundedDays > 1 ? 's' : '') : null,
        ])->filter()->implode(' ') ?: 'Today';
    }

    protected function calculateDuration($contractStart, $contractEnd)
    {
        $contractStart = Carbon::parse($contractStart);
        $contractEnd = Carbon::parse($contractEnd);

        $diffInYears = $contractStart->diffInYears($contractEnd);
        $diffInMonths = $contractStart->copy()->addYears($diffInYears)->diffInMonths($contractEnd);
        $diffInDays = $contractStart->copy()->addYears($diffInYears)->addMonths($diffInMonths)->diffInDays($contractEnd);

        $roundedYears = intval($diffInYears);
        $roundedMonths = intval($diffInMonths);
        $roundedDays = intval($diffInDays);

        return collect([
            $roundedYears > 0 ? "{$roundedYears} Year" . ($roundedYears > 1 ? 's' : '') : null,
            $roundedMonths > 0 ? "{$roundedMonths} Month" . ($roundedMonths > 1 ? 's' : '') : null,
            $roundedDays > 0 ? "{$roundedDays} Day" . ($roundedDays > 1 ? 's' : '') : null,
        ])->filter()->implode(' ') ?: '0 Days';
    }

    public function index()
    {

        return Inertia::render('Projects/Index', [
            'projects' => $this->projects,
            'projectBusinessTypes' => $this->projectBusinessTypes,
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Projects/Show', [
            'project' => $this->projects->firstWhere('id', $id),
            'projectDocuments' => $this->projectDocument,
            'priorities' => $this->priorities,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', [
            'projectBusinessTypes' => $this->projectBusinessTypes,
            'projectManagers' => $this->projectManager,
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

            $project = Project::create([
                'name' => $validatedData['name'],
                'code' => $validatedData['code'],
                 'customer' => $validatedData['customer'],
                'contract_number' => $validatedData['contract_number'],
                'contract_start' => $validatedData['contract_start'],
                'contract_end' => $validatedData['contract_end'],
                'user_profile_id' => $validatedData['user_profile_id'],
                'project_business_type_id' => $validatedData['project_business_type_id'],
            ]);

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
            $project->name = $validatedData['name'];
            $project->code = $validatedData['code'];
            $project->customer = $validatedData['customer'];
            $project->contract_number = $validatedData['contract_number'];
            $project->contract_start = $validatedData['contract_start'];
            $project->contract_end = $validatedData['contract_end'];
            $project->user_profile_id = $validatedData['user_profile_id'];
            $project->project_business_type_id = $validatedData['project_business_type_id'];
            $project->save();

            DB::commit();

            return redirect()->route('projects.index')->with('flash', [
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
