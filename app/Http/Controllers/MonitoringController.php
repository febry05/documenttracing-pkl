<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectDocumentVersion;

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

        $projects = Project
            ::with(['documentVersions', 'documentVersions.document', 'documentVersions.updates'])->
            // Year Filter
            whereYear('contract_start', '>=', $year)
            ->whereYear('contract_end', '<=', $year)
            ->whereMonth('contract_start', '<=', $month)
            ->whereMonth('contract_end', '>=', $month)
            // Array Mapping
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    // 'person_in_charge' => $project->praofile->name,
                    'documentVersions' => $project->documentVersions->map(function ($documentVersion) use ($project) {
                        return [
                            'id' => $documentVersion->id,
                            'project_document_id' => $documentVersion->document->id,
                            'name' => $documentVersion->document->name,
                            'person_in_charge' => $project->profile->name,
                            'priority' => $documentVersion->document->priority_type_name,
                            'due_date' => $documentVersion->document->deadline,
                            // 'days_left' => $this->calculateDays($documentVersion->document->deadline),
                            'days_left' => "8",
                            'status' => $documentVersion->updates[0]->status ?? "N/A",
                            'document_link' => $documentVersion->updates[0]->document_link ?? "N/A",
                        ];
                    })->toArray()
                ];
            });

        $availableYears = Project::selectRaw('YEAR(contract_start) as start_year, YEAR(contract_end) as end_year')
            ->get()
            ->flatMap(function ($project) {
                return range($project->start_year, $project->end_year);
            })
            ->unique()
            ->values()
            ->all();

        return Inertia::render('Monitoring/Index', [
            'projects' => $projects,
            'availableYears' => $availableYears,
            'stats' => $mockStats,
            'selectedYear' => $year,
            'selectedMonth' => $month,
        ]);
    }

    protected function calculateDays($dateEnd)
    {
        $now = Carbon::now();
        $diffInYears = $now->diffInYears($dateEnd);
        $diffInMonths = $now->copy()->addYears($diffInYears)->diffInMonths($dateEnd);
        $diffInDays = $now->copy()->addYears($diffInYears)->addMonths($diffInMonths)->diffInDays($dateEnd);

        $roundedYears = intval($diffInYears);
        $roundedMonths = intval($diffInMonths);
        $roundedDays = intval($diffInDays);

        return collect([
            $roundedYears > 0 ? "{$roundedYears} Year" . ($roundedYears > 1 ? 's' : '') : null,
            $roundedMonths > 0 ? "{$roundedMonths} Month" . ($roundedMonths > 1 ? 's' : '') : null,
            $roundedDays > 0 ? "{$roundedDays} Day" . ($roundedDays > 1 ? 's' : '') : null,
        ])->filter()->implode(' ') ?: 'Today';
    }
}
