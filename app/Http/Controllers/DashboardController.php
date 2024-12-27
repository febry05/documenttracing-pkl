<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ProjectService;

class DashboardController extends Controller
{
    protected $projectService;

    public function __construct(Request $request, ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        $mockStats = [
            'total_documents' => 666,
            'onProcess_documents' => 69,
            'pending_documents' => 34,
            'completed_documents' => 420,
        ];

        $mockDocuments = [
            [
                'id' => 1,
                'document' => 'BAPP & Lampirannya',
                'project' => 'Seat Management Peralatan IT',
                'pic' => 'R.M Angga N H',
                'due_date' => '31 October 2024',
                'days_left' => '4',
                'priority' => 'High',
            ],
            [
                'id' => 2,
                'document' => 'SLA',
                'project' => 'Wifi Managed Service Concordia Longue',
                'pic' => 'Trya Suma A',
                'due_date' => '27 October 2024',
                'days_left' => '1',
                'priority' => 'Medium',
            ],
            [
                'id' => 3,
                'document' => 'Project Bref',
                'project' => 'APS Document Tracer',
                'pic' => 'Muhammad Azhim Nugroho',
                'due_date' => '20 November 2024',
                'days_left' => '23',
                'priority' => 'Low',
            ],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $mockStats,
            'documents' => $this->projectService->getDashboard(),
        ]);
    }
}
