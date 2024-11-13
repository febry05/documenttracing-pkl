<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\MasterData\ProjectBusinessType;

use function Ramsey\Uuid\v1;

class ProjectController extends Controller
{
    public function index()
    {
        // Mock data, delete when real data is available
        $mockProjects = [
            [
                'id' => 1,
                'code' => 'SRV.JKLT.2020.01',
                'name' => 'Penyedia Jasa Manage Service Jaringan LAN di 13 Bandara Angkasa Pura 1 (Air Asia)',
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
        // Mock data, delete when real data is available
        $mockProject = [
            'code' => 'SRV.JKLT.2020.01',
            'name' => 'Penyedia Jasa Manage Service Jaringan LAN di 13 Bandara Angkasa Pura 1 (Air Asia)',
            'type' => 'Service',
            'customer' => 'PT Fast Food Indonesia, Tbk',
            'person_in_charge' => 'R M Angga N H',
            'contract_number' => 'PJKP-20004 344',
            'contract_start' => '14 Feb \'20',
            'contract_end' => '15 Feb \'25',
            'duration' => '5 Years 0 Months 1 Days',
            'days_left' => 135,
        ];

        $mockDocuments = [
            [
                'id' => 1,
                'name' => 'BAPP dan Lampirannya',
                'project_document_versions' => [
                    [
                        'id' => 1,
                        'date' => 'October 2024',
                    ],
                    [
                        'id' => 2,
                        'date' => 'September 2024',
                    ],
                ],
            ],
            [
                'id' => 2,
                'name' => 'Laporan Bulanan',
                'project_document_versions' => [
                    [
                        'id' => 1,
                        'date' => 'October 2024',
                    ],
                    [
                        'id' => 2,
                        'date' => 'September 2024',
                    ],
                ],
            ]
        ];

        return Inertia::render('Projects/Show', [
            // 'project' => Project::select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_start', 'contract_end', 'user_id', 'project_business_type')->findOrFail($id),
            'project' => $mockProject,
            'documents' => $mockDocuments
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

    public function edit($id)
    {
        return Inertia::render('Projects/Edit', [
            'project' => Project::select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_start', 'contract_end', 'user_id', 'project_business_type')->where('id', $id)->first(),
        ]);
    }

    // Mock data, delete when real data is available
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
}
