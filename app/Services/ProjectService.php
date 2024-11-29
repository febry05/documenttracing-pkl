<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Users\User;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectDocument;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Projects\ProjectDocumentVersion;
use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Http\Request;

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
                'project_document_versions' => $document->versions->map(function ($version){
                    return [
                        'id' => $version->id,
                        'version' => $version->version,
                        'document_number' => $version->document_number,
                    ];
                }),
                'priority' => $document->priority,
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
        return ProjectDocumentVersionUpdate::select('id', 'title', 'status', 'description', 'document_link', 'project_document_version_id', 'created_at')->where('project_document_version_id', $projectDocumentVersionId)->get()->map(function ($projectDocumentVersionUpdate) {
            return [
                'id' => $projectDocumentVersionUpdate->id,
                'title' => $projectDocumentVersionUpdate->title,
                'status' => $projectDocumentVersionUpdate->status,
                'description' => $projectDocumentVersionUpdate->description,
                'document_link' => $projectDocumentVersionUpdate->document_link,
                'project_document_version_id' => $projectDocumentVersionUpdate->project_document_version_id,
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
}