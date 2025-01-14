<?php

namespace App\Services;

use Carbon\Carbon;
use Grei\TanggalMerah;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Auth;
use App\Models\Projects\ProjectDocument;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Projects\ProjectDocumentVersion;
use App\Models\Projects\ProjectDocumentVersionUpdate;

class ProjectService {

    public function __construct(Request $request) {
        $projectId = $request->route('project');
    }

    public function getDashboard()
    {
        $user = User::find(Auth::user()->id);

        return Project::with(['documents.versions', 'profile'])
            ->whereHas('profile', function ($query) use ($user) {
                $query->where('user_id', $user->id); // Ensure the project is assigned to the user
            })
            ->select('id', 'name')
            ->get()
            ->map(function ($project) {
                return $project->documents->flatMap(function ($document) use ($project) {
                    return $document->versions
                        ->filter(function ($version) {
                            return $version->deadline && $version->deadline >= now()->subDays(30);
                        })
                        ->map(function ($version) use ($document, $project) {
                            return [
                                'project_id' => $project->id,
                                'project_document_id' => $document->id,
                                'project_document_version_id' => $version->id,
                                'name' => $version->version,
                                'document' => $document->name,
                                'project' => $project->name,
                                'status' => !$version->updates->isEmpty() ? $version->updates->last()->status_type_name : 'N/A',
                                'due_date' => $version->deadline ? Carbon::parse($version->deadline)->toDateString() : 'N/A',
                                'days_left' => $version->deadline ? Carbon::parse($version->deadline)->toDateString() : 'N/A',
                                'priority' => $document->priority_type_name,
                            ];
                        });
                });
            })
        ->flatten(1);
    }

    public function getProjects() {
        return Project::with('profile', 'businessType')
            ->select('id', 'name', 'code', 'customer', 'contract_number', 'contract_start', 'contract_end', 'user_profile_id', 'project_business_type_id')->get()->map(function ($project) {
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
                    'person_in_charge' => $project->profile->name ?? 'N/A',
                    'user_profile_id' => $project->user_profile_id ?? 'N/A',
                    'project_business_type_id' => $project->project_business_type_id ?? 'N/A',
                    'documents' => $project->documents->map(function ($documents) {
                        return [
                            'id' => $documents->id,
                            'name' => $documents->name,
                            'priority' => $documents->priority,
                            'priority_name' => $documents->priority_type_name,
                            'due_at' => $documents->deadline,
                        ];
                    }),
            ];
        });
    }

    public function getProjectDocuments($projectId) {
        // $projectId = $request->route('project');
        // dd($projectId);
        return ProjectDocument::with(['versions:id,version,document_number,project_document_id', 'project:id,name'])->where('project_id', $projectId)->get()->map(function ($document) {
            return [
                'id' => $document->id,
                'name' => $document->name,
                'weekly_deadline' => $document->weekly_deadline,
                'weekly_deadline_name' => $document->weekly_deadline_type_name,

                'monthly_deadline' => $document->monthly_deadline,
                // 'deadline' => $document->deadline,
                'is_auto' => $document->is_auto,
                'is_auto_name' => $document->is_auto_type_name,
                'priority' => $document->priority,
                'priority_name' => $document->priority_type_name,

                'deadline_interval' => $document->deadline_interval,
                'deadline_interval_name' => $document->deadline_interval_type_name,

                'project_document_versions' => $document->versions->map(function ($version){
                    return [
                        'id' => $version->id,
                        'version' => $version->version,
                        'document_number' => $version->document_number,
                    ];
                }),
            ];
        });
    }

    public function getProjectDocumentVersions() {
        return ProjectDocumentVersion::with('updates')->get()->map(function ($projectDocumentVersion) {
            return [
                'id' => $projectDocumentVersion->id,
                'version' => $projectDocumentVersion->version ?? 'N/A',
                'release_date' => $projectDocumentVersion->release_date ?? 'N/A',
                'document_number' => $projectDocumentVersion->document_number ?? 'N/A',
                'deadline' => $projectDocumentVersion->deadline ?? 'N/A',
                'project_document_id' => $projectDocumentVersion->project_document_id ?? 'N/A',
                // 'latest_document' => !$projectDocumentVersion->updates->isEmpty() ? $projectDocumentVersion->updates->last()->document_link?->first(fn($update) => $update->document_link !== null)?->document_link : 'N/A',
                'latest_document' => !$projectDocumentVersion->updates->isEmpty() && $projectDocumentVersion->updates->whereNotNull('document_link')->last()?->document_link ? $projectDocumentVersion->updates->whereNotNull('document_link')->last()?->document_link : 'N/A',
                'latest_status' => !$projectDocumentVersion->updates->isEmpty() ? $projectDocumentVersion->updates->last()->status : 'N/A',
                'latest_status_name' => !$projectDocumentVersion->updates->isEmpty() ? $projectDocumentVersion->updates->last()->status_type_name : 'N/A',
                'latest_update' => !$projectDocumentVersion->updates->isEmpty() ? $projectDocumentVersion->updates->last()->updated_at : 'N/A',
                'document_updates' => $projectDocumentVersion->updates->map(function ($documentUpdate) {
                    return [
                        'id' => $documentUpdate->id ?? 'N/A',
                        'description' => $documentUpdate->description ?? 'N/A',
                        'updated_at' => $documentUpdate->updated_at ?? 'N/A',
                    ];
                }),
            ];
        });
    }

    public function getProjectDocumentVersionUpdates($projectDocumentVersionId){
        return ProjectDocumentVersionUpdate::select(
            'id',
            'title',
            'status',
            'description',
            'document_link',
            'project_document_version_id',
            'release_date',
            'created_at',
            'updated_at'
        )
            ->where('project_document_version_id', $projectDocumentVersionId)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($projectDocumentVersionUpdate) {
            return [
                'id' => $projectDocumentVersionUpdate->id,
                'title' => $projectDocumentVersionUpdate->title,
                'status' => $projectDocumentVersionUpdate->status,
                'status_name' => $projectDocumentVersionUpdate->status_type_name,
                'description' => $projectDocumentVersionUpdate->description,
                'document_link' => $projectDocumentVersionUpdate->document_link,
                'project_document_version_id' => $projectDocumentVersionUpdate->project_document_version_id,
                'release_date' => $projectDocumentVersionUpdate->release_date,
                'updated_at' => $projectDocumentVersionUpdate->updated_at,
                'created_at' => $projectDocumentVersionUpdate->created_at,
            ];
        });
    }

    public function getProjectBusinessTypes(){
        return ProjectBusinessType::select('id', 'name')->get()->map(function($projectBusinessType){
            return [
                'id' => $projectBusinessType->id,
                'name' => $projectBusinessType->name,
                'value' => $projectBusinessType->name,
                'label' => $projectBusinessType->name,
            ];
        });
    }

    public function getProjectManagers(){
        return User::with('profile')->permission('Handle Owned Project')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->profile->name,
            ];
        });
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

    public function calculateDays($contractEnd)
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

    public function calculateDeadline(ProjectDocument $document, $releaseDate): Carbon
    {
        $now = now();
        $holidayChecker = new TanggalMerah();

        return match ($document->deadline_interval) {
            1 => $this->adjustForHolidays($releaseDate->addDay(), $holidayChecker), // Daily
            2 => $this->calculateWeeklyDeadline($document->weekly_deadline, $releaseDate, $holidayChecker), // Weekly
            3 => $this->calculateMonthlyDeadline($document->monthly_deadline, $releaseDate, $holidayChecker), // Monthly
            4 => $this->adjustForHolidays($now->addSecond(15), $holidayChecker), // Tetsting
            default => throw new \InvalidArgumentException('Invalid deadline interval.'),
        };
    }

    protected function calculateWeeklyDeadline(int $weeklyDeadline, Carbon $releaseDate, TanggalMerah $holidayChecker): Carbon
    {
        $dayOfWeek = $this->mapDayToWeekday($weeklyDeadline);
        $deadline = $releaseDate->next($dayOfWeek);

        return $this->adjustForHolidays($deadline, $holidayChecker);
    }

    protected function calculateMonthlyDeadline(int $monthlyDeadline, Carbon $releaseDate, TanggalMerah $holidayChecker): Carbon
    {
        $deadline = Carbon::create($releaseDate->year, $releaseDate->month, $monthlyDeadline);

        // Move to the next month if the date is in the past
        if ($deadline->lessThan($releaseDate)) {
            $deadline->addMonth();
        }

        return $this->adjustForHolidays($deadline, $holidayChecker);
    }

    protected function adjustForHolidays(Carbon $date, TanggalMerah $holidayChecker): Carbon
    {
        while ($holidayChecker->is_holiday($date->toDateString()) || $date->isSaturday() || $date->isSunday()) {
            $date->addDay();
        }

        return $date;
    }

    public function mapDayToWeekday(int $day): string
    {
        return match ($day) {
            1 => 'Monday',
            2 => 'Tuesday',
            3 => 'Wednesday',
            4 => 'Thursday',
            5 => 'Friday',
            default => 'Monday',
        };
    }

    public function getNotifications()
    {
        $user = Auth::user(); // Get the authenticated user

        // Fetch projects and related data for the user
        $projects = Project::with(['documents.versions'])
            ->whereHas('profile', function ($query) use ($user) {
                $query->where('user_id', $user->id); // Only fetch projects assigned to the user
            })
            ->get();

        // Build notifications array
        $notifications = $projects->flatMap(function ($project) {
            return $project->documents->flatMap(function ($document) use ($project) {
                return $document->versions->map(function ($version) use ($document, $project) {

                    return [
                        'project' => [
                            'id' => $project->id,
                            'name' => $project->name,
                            'projectDocument' => [
                                'id' => $document->id,
                                'name' => $document->name,
                                // 'daysLeft' => $document->version->deadline,
                                'priority' => $document->priority_type_name,
                                'projectDocumentVersion' => [
                                    'id' => $version->id,
                                    // 'daysLeft' => $version->deadline
                                    'deadline' => $version->deadline
                                    // tambah status
                                ],
                            ],
                        ],
                    ];
                });
            });
        });
        return $notifications->values()->toArray(); // Return as array
    }




}
