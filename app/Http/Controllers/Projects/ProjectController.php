<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\MasterData\ProjectBusinessType;

class ProjectController extends Controller
{
    public function index()
    {
        $mockProjects = [
            [
                'id' => 1,
                'code' => 'SRV.JKLT.2020.01',
                'name' => 'Pengadaan Jasa Pengelolaan Passengger Service Charges On Ticket System (POTS) di Bandar Udara yang dikelola AP1',
                'type' => 'Service',
                'customer' => 'PT Fast Food Indonesia, Tbk',
                'contract_number' => 'PJKP-20004 344',
                'contract_start' => '14 Feb \'20',
                'contract_end' => '15 Feb \'25',
                'duration' => '5 Years 0 Months 1 Days',
                'days_left' => '135',
            ]
        ];

        $projectBusinessTypes = ProjectBusinessType::select('id', 'name')->get()->map(function ($type) {
            return [
                'value' => $type->name,
                'label' => $type->name,
            ];
        });

        return Inertia::render('Projects/Index', [
            'projects' => $mockProjects,
            'projectBusinessTypes' => $projectBusinessTypes,
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Projects/Show', [
            'project' => Project::select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_start', 'contract_end', 'user_id', 'project_business_type')->where('id', $id)->first(),
        ]);
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
