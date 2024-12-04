<?php

namespace App\Services;

use Carbon\Carbon;
use Grei\TanggalMerah;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectDocument;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Projects\ProjectDocumentVersion;
use App\Models\Projects\ProjectDocumentVersionUpdate;

class ProjectService {
    // protected $projectId;
    
    public function __construct(Request $request) {
        $projectId = $request->route('project');
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
                    'person_in_charge' => $project->profile->name,
                    'user_profile_id' => $project->user_profile_id,
                    'project_business_type_id' => $project->project_business_type_id,
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
        return ProjectDocument::with('versions')->where('project_id', $projectId)->get()->map(function ($document) {
            return [
                'id' => $document->id,
                'name' => $document->name,
                'weekly_deadline' => $document->weekly_deadline,
                'monthly_deadline' => $document->monthly_deadline,
                // 'deadline' => $document->deadline,
                'project_document_versions' => $document->versions->map(function ($version){
                    return [
                        'id' => $version->id,
                        'version' => $version->version,
                        'document_number' => $version->document_number,
                    ];
                }),
                'priority' => $document->priority,
                'priority_name' => $document->priority_type_name,
            ];
        });
    }

    public function getProjectDocumentVersions() {
        // $projectDocumentVersionA = ProjectDocumentVersion::with('updates')->first();
        // dd($projectDocumentVersionA);
        return ProjectDocumentVersion::with('updates')->get()->map(function ($projectDocumentVersion) {
            return [
                'id' => $projectDocumentVersion->id,
                'version' => $projectDocumentVersion->version,
                'release_date' => $projectDocumentVersion->release_date,
                'document_number' => $projectDocumentVersion->document_number,
                'deadline' => $projectDocumentVersion->deadline,
                'project_document_id' => $projectDocumentVersion->project_document_id,
                'latest_document' => !$projectDocumentVersion->updates->isEmpty() ? $projectDocumentVersion->updates[0]->document_link : 'N/A',
                'document_updates' => $projectDocumentVersion->updates->map(function ($documentUpdate) {
                    return [
                        'id' => $documentUpdate->id,
                        'description' => $documentUpdate->description,
                        'updated_at' => $documentUpdate->updated_at,
                    ];
                }),
            ];
        });
    }

    public function getProjectDocumentVersionUpdates($projectDocumentVersionId){
        return ProjectDocumentVersionUpdate::select('id', 'title', 'status', 'description', 'document_link', 'project_document_version_id', 'created_at', 'updated_at')->where('project_document_version_id', $projectDocumentVersionId)->get()->map(function ($projectDocumentVersionUpdate) {
            return [
                'id' => $projectDocumentVersionUpdate->id,
                'title' => $projectDocumentVersionUpdate->title,
                'status' => $projectDocumentVersionUpdate->status,
                'status_name' => $projectDocumentVersionUpdate->status_type_name,
                'description' => $projectDocumentVersionUpdate->description,
                'document_link' => $projectDocumentVersionUpdate->document_link,
                'project_document_version_id' => $projectDocumentVersionUpdate->project_document_version_id,
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
        return User::with('profile')->whereHas('roles', function ($query) {
            $query->where('name', 'Project Manager');
        })->get()->map(function ($user) {
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

    public function calculateDeadline(ProjectDocument $document): Carbon
    {
        $now = now();
        $holidayChecker = new TanggalMerah();

        return match ($document->deadline_interval) {
            1 => $now->addDay(), // Daily
            7 => $this->calculateWeeklyDeadline($document->weekly_deadline, $now, $holidayChecker),
            30 => $this->calculateMonthlyDeadline($document->monthly_deadline, $now, $holidayChecker),
            default => $now, // Fallback for unsupported intervals
        };
    }

    public function calculateWeeklyDeadline(int $weeklyDeadline, Carbon $now, TanggalMerah $holidayChecker): Carbon
    {
        $dayOfWeek = $weeklyDeadline;
        $deadline = $now->next($this->mapDayToWeekday($dayOfWeek));

        // Adjust for holidays
        while ($holidayChecker->is_holiday($deadline->toDateString()) || $deadline->isSaturday() || $deadline->isSunday()) {
            $deadline->addDay();
        }

        return $deadline;
    }

    public function calculateMonthlyDeadline(int $monthlyDeadline, Carbon $now, TanggalMerah $holidayChecker): Carbon
    {
        $dayOfMonth = $monthlyDeadline; 
        $deadline = Carbon::create($now->year, $now->month, $dayOfMonth);

        // If the date is in the past, move to the next month
        if ($deadline->lessThan($now)) {
            $deadline->addMonth();
        }

        // Adjust for holidays
        while ($holidayChecker->is_holiday($deadline->toDateString()) || $deadline->isSaturday() || $deadline->isSunday()) {
            $deadline->addDay();
        }

        return $deadline;
    }

    public function mapDayToWeekday(int $day): string
    {
        return match ($day) {
            1 => 'Monday',
            2 => 'Tuesday',
            3 => 'Wednesday',
            4 => 'Thursday',
            5 => 'Friday',
            default => 'Monday', // Default to Monday for unsupported values
        };
    } 
}