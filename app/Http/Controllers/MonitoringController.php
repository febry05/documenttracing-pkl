<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Date;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

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
            ->where(function ($query) use ($year, $month) {
                $query->where(function ($subQuery) use ($year, $month) {
                    $subQuery->where(function ($startQuery) use ($year, $month) {
                        $startQuery->whereYear('contract_start', '<', $year)
                                ->orWhere(function ($startSubQuery) use ($year, $month) {
                                    $startSubQuery->whereYear('contract_start', '=', $year)
                                                    ->whereMonth('contract_start', '<=', $month);
                                });
                    })
                    ->where(function ($endQuery) use ($year, $month) {
                        $endQuery->whereYear('contract_end', '>', $year)
                                ->orWhere(function ($endSubQuery) use ($year, $month) {
                                    $endSubQuery->whereYear('contract_end', '=', $year)
                                                ->whereMonth('contract_end', '>=', $month);
                                });
                    });
                });
            })
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'documentVersions' => $project->documentVersions->map(function ($documentVersion) use ($project) {
                        return [
                            'id' => $documentVersion->id,
                            'project_document_id' => $documentVersion->document->id,
                            'project_id' => $project->id,
                            'name' => $documentVersion->document->name,
                            'person_in_charge' => $project->profile->name,
                            'priority' => $documentVersion->document->priority_type_name,
                            'due_date' => $documentVersion->deadline,
                            'days_left' => $this->calculateDays($documentVersion->deadline),
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
        $dateEnd = Carbon::parse($dateEnd);

        if ($now->equalTo($dateEnd)) {
            return 'Today';
        }

        $isFuture = $now->lessThan($dateEnd); // Check if the date is in the future
        $diff = $isFuture ? $now->diff($dateEnd) : $dateEnd->diff($now); // Use appropriate diff calculation

        $timeComponents = [
            'Year' => $diff->y,
            'Month' => $diff->m,
            'Day' => $diff->d,
            'Hour' => $diff->h,
            'Minute' => $diff->i,
            'Second' => $diff->s,
        ];

        $timeString = collect($timeComponents)
            ->filter(fn($value) => $value > 0) // Remove components with zero value
            ->map(function ($value, $key) {
                return "{$value} {$key}" . ($value > 1 ? 's' : '');
            })
            ->take(2) // Take the first two non-zero components
            ->implode(' ');

        // Ensure "Overdue by" doesn't show null
        return $isFuture
            ? "{$timeString} Left"
            : ($timeString ? "Overdue by {$timeString}" : "Overdue");
    }




    public function calculateDocumentStats()
    {
        $total_documents = ProjectDocumentVersion::count();

        $documentVersions = ProjectDocumentVersion::with('updates')->get();

        $completedDocuments = 0;
        $onProcessDocuments = 0;
        $pendingDocuments = 0;
        $notStartedDocuments = 0;

        foreach ($documentVersions as $version) {
            $latestUpdate = $version->updates->sortByDesc('created_at')->first();

            if (!$latestUpdate) {
                $notStartedDocuments++;
            } else {
                switch ($latestUpdate->status) {
                    case '1': // Completed
                        $completedDocuments++;
                        break;
                    case '2': // On Process
                        $onProcessDocuments++;
                        break;
                    case '3': // Pending
                        $pendingDocuments++;
                        break;
                    default:
                        $notStartedDocuments++; // Not Started
                        break;
                }
            }
        }

        return [
            'total_documents' => $total_documents,
            'onProcess_documents' => $onProcessDocuments,
            'pending_documents' => $pendingDocuments,
            'completed_documents' => $completedDocuments,
            'not_started_documents' => $notStartedDocuments,
        ];
    }
}
