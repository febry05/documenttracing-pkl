<?php

namespace App\Http\Controllers;

use App\Models\Projects\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function index($year = null, $month = null)
    {
        $year = $year ?? date('Y');
        $month = $month ?? date('m');
        $mockStats = [
            'total_documents' => 666,
            'ongoing_documents' => 69,
            'pending_documents' => 34,
            'completed_documents' => 420,
        ];

        return Inertia::render('Monitoring/Index', [
            'projects' => Project::whereYear('contract_start', '<=', $year)
                ->whereYear('contract_end', '>=', $year)
                ->whereMonth('contract_start', '<=', $month)
                ->whereMonth('contract_end', '>=', $month)
                ->get(),
        ]);
    }
}
