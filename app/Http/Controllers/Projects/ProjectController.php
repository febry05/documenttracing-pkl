<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Users\UserProfile;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('userProfiles', 'businessType')
            ->select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_end', 'user_profile_id', 'project_business_type_id')
            ->get()
            ->map(function ($project) {
                $contractStart = Carbon::parse($project->contract_start);
                $contractEnd = Carbon::parse($project->contract_end);

                if ($contractEnd->isPast()) {
                    $daysLeft = 'Contract Ended';
                } else {
                    $now = Carbon::now();
                    $diffInYears = $now->diffInYears($contractEnd);
                    $diffInMonths = $now->copy()->addYears($diffInYears)->diffInMonths($contractEnd);
                    $diffInDays = $now->copy()->addYears($diffInYears)->addMonths($diffInMonths)->diffInDays($contractEnd);

                    $roundedYears = intval($diffInYears);
                    $roundedMonths = intval($diffInMonths);
                    $roundedDays = intval($diffInDays);

                    $daysLeft = collect([
                        $roundedYears > 0 ? "{$roundedYears} Year" . ($roundedYears > 1 ? 's' : '') : null,
                        $roundedMonths > 0 ? "{$roundedMonths} Month" . ($roundedMonths > 1 ? 's' : '') : null,
                        $roundedDays > 0 ? "{$roundedDays} Day" . ($roundedDays > 1 ? 's' : '') : null,
                    ])
                    ->filter()
                    ->implode(' ');

                    if (empty($daysLeft)) {
                        $daysLeft = 'Today';
                    }
                }

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
                ];
            });

        $projectBusinessTypes = ProjectBusinessType::select('id', 'name')->get()->map(function ($type) {
            return [
                'value' => $type->name,
                'label' => $type->name,
            ];
        });

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'projectBusinessTypes' => $projectBusinessTypes,
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Projects/Show', [
            'project' => Project::select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_start', 'contract_end', 'user_profile_id', 'project_business_type')->where('id', $id)->first(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', [
            'projectBusinessTypes' => ProjectBusinessType::select('id', 'name')->get(),
            'projectManagers' => User::with('profile')->whereHas('roles', function ($query) {
                $query->where('name', 'Project Manager');
            })->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->profile->name,
                ];
            }),
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

            // dd($validatedData);

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
            'project' => Project::select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_start', 'contract_end', 'user_id', 'project_business_type')->where('id', $id)->first(),
        ]);
    }

    protected $mockProjects = [
        [
            'id' => 1,
            'code' => 'SRV.JKLT.2020.01',
            'name' => 'Pengadaan Jasa Pengelolaan Passengger Service Charges On Ticket System (POTS) di Bandar Udara yang dikelola AP1',
            'type' => 'Service',
            'customer' => 'PT Fast Food Indonesia, Tbk',
            'contract_number' => 'PJKP-20004 344',
            'contract_start' => '2020-02-15',
            'contract_end' => '2025-02-15',
            'duration' => '5 Years 0 Months 1 Days',
            'days_left' => '135',
        ]
    ];
}
