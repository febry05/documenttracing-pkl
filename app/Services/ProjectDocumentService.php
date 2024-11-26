<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentService
{
    const DAILY = 1;
    const WEEKLY = 7;
    const MONTHLY = 30;
    
    public function generateDocumentVersion(ProjectDocument $document)
    {
        $project = $document->project;

        if (Carbon::now()->greaterThan($project->contract_end)) {
            return false;
        }

        // Get the last version or default to current date
        $lastVersion = $document->versions()->latest('release_date')->first();
        $startDate = $lastVersion ? $lastVersion->release_date : Carbon::now();

        $releaseDate = $this->calculateNextReleaseDate($startDate, $document->deadline_interval, $document->base_deadline);

        if ($releaseDate->greaterThan($project->contract_end)) {
            return false;
        }

        // Create a new version
        $version = new ProjectDocumentVersion();
        $version->version = $this->getNextVersion($document);
        $version->document_number = $this->generateDocumentNumber($document);
        $version->release_date = $releaseDate;
        $version->project_document_id = $document->id;
        $version->save();

        return $version;
    }

    protected function calculateNextReleaseDate($startDate, $interval, $baseDeadline = null)
    {
        $nextDate = clone $startDate;

        if ($interval == 1) {
            $nextDate->addDay();
        } elseif ($interval == 7) {
            $nextDate->addWeek();
        } elseif ($interval == 30) {
            $nextDate->addMonth();
            if ($baseDeadline) {
                $nextDate->day($baseDeadline);
            }
        }

        return $nextDate;
    }

    protected function getNextVersion(ProjectDocument $document)
    {
        $lastVersion = $document->versions()->latest()->first();
        return $lastVersion ? $lastVersion->version + 1 : 1;
    }

    protected function generateDocumentNumber(ProjectDocument $document)
    {
        return strtoupper("DOC-{$document->id}-" . now()->format('Ymd'));
    }

    // public function generateDocumentVersion(ProjectDocument $document)
    // {
    //     if (Carbon::now()->greaterThan($document->project->contract_end)) {
    //         return false; 
    //     }

    //     $version = new ProjectDocumentVersion();
    //     $version->version = $this->getNextVersion($document);
    //     $version->document_number = $this->generateDocumentNumber($document);
    //     $version->release_date = Carbon::now();
    //     $version->project_document_id = $document->id;
    //     $version->save();

    //     return $version;
    // }

    // protected function getNextVersion(ProjectDocument $document)
    // {
    //     $lastVersion = $document->versions()->latest()->first();
    //     return $lastVersion ? $lastVersion->version + 1 : 1;
    // }

    // protected function generateDocumentNumber(ProjectDocument $document)
    // {
    //     return strtoupper($document->name) . '-' . now()->format('YmdHis');
    // }

    // public function updateDocumentDeadline(ProjectDocument $document, int $newInterval, bool $applyImmediately = false)
    // {
    //     if ($applyImmediately) {
    //         $document->deadline = $this->calculateDeadline($document);
    //     }

    //     $document->deadline_interval = $newInterval;
    //     $document->save();

    //     return $document;
    // }
}
