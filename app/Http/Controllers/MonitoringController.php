<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;
use Illuminate\Support\Facades\Date;

class MonitoringController extends Controller
{
    public function index($year = null, $month = null)
    {
        $year = $year ?? date('Y');
        $month = $month ?? date('m');

        $stats = $this->calculateDocumentStats();
        
        $projects = Project::with([
            'documentVersions'=> function ($query) use ($year, $month) {
                $query->whereYear('release_date', $year)
                    ->whereMonth('release_date', $month);
            },
            'documentVersions.document',
            'documentVersions.updates',
        ])
            ->whereYear('contract_start', '<=', $year)
            ->whereYear('contract_end', '>=', $year)
            ->where(function ($query) use ($month) {
                $query->whereMonth('contract_start', '<=', $month)
                      ->orWhereMonth('contract_end', '>=', $month);
            })
            ->whereHas('documentVersions', function ($query) use ($year, $month) {
            $query->whereYear('release_date', $year)
                ->whereMonth('release_date', $month);
            })
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
                            'project_id' => $documentVersion->document->project_id,
                            'name' => $documentVersion->document->name,
                            'person_in_charge' => $project->profile->name,
                            'priority' => $documentVersion->document->priority_type_name,
                            'due_date' => $documentVersion->document->deadline,
                            // 'days_left' => $this->calculateDays($documentVersion->document->deadline),
                            'days_left' => "8",
                            'status' => $documentVersion->updates[0]->status ?? "N/A",
                            'document_link' => $documentVersion->updates[0]->document_link ?? "N/A",
                        ];
                    })
                ];
            });

        $availableYears = Project::selectRaw('YEAR(contract_start) as start_year, YEAR(contract_end) as end_year')
            ->get()
            ->flatMap(function ($project) {
                $endYear = min($project->end_year, now()->year); // to prevent future years
            return range($project->start_year, $endYear);
            })
            ->unique()
            ->values()
            ->all();

        return Inertia::render('Monitoring/Index', [
            'projects' => $projects,
            'availableYears' => $availableYears,
            'stats' => $stats,
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

    public function calculateDocumentStats()
    {
        // Total documents: count of all records in ProjectDocumentVersion table
        $total_documents = ProjectDocumentVersion::count();

        $documentVersions = ProjectDocumentVersion::with('updates')->get();

        // Initialize counters
        $ongoingDocuments = 0;
        $pendingDocuments = 0;
        $completedDocuments = 0;
        $notStartedDocuments = 0;

        foreach ($documentVersions as $version) {
            $latestUpdate = $version->updates->sortByDesc('created_at')->first();

            if (!$latestUpdate) {
                // No updates exist: count as Not Started
                $notStartedDocuments++;
            } else {
                // Evaluate based on the status in the latest update
                switch ($latestUpdate->status) {
                    case 'Ongoing':
                        $ongoingDocuments++;
                        break;
                    case 'Pending':
                        $pendingDocuments++;
                        break;
                    case 'Completed':
                        $completedDocuments++;
                        break;
                    default:
                        $notStartedDocuments++;
                        break;
                }
            }
        }

        return [
            'total_documents' => $total_documents,
            'ongoing_documents' => $ongoingDocuments,
            'pending_documents' => $pendingDocuments,
            'completed_documents' => $completedDocuments,
            'not_started_documents' => $notStartedDocuments,
        ];
    }
}