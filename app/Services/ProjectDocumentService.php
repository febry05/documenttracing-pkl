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
        if (Carbon::now()->greaterThan($document->project->contract_end)) {
            return false; 
        }

        $version = new ProjectDocumentVersion();
        $version->version = $this->getNextVersion($document);
        $version->document_number = $this->generateDocumentNumber($document);
        $version->release_date = Carbon::now();
        $version->project_document_id = $document->id;
        $version->save();

        return $version;
    }

    protected function getNextVersion(ProjectDocument $document)
    {
        $lastVersion = $document->versions()->latest()->first();
        return $lastVersion ? $lastVersion->version + 1 : 1;
    }

    protected function generateDocumentNumber(ProjectDocument $document)
    {
        return strtoupper($document->name) . '-' . now()->format('YmdHis');
    }



    public function calculateDeadline(ProjectDocument $document)
    {
        $currentDeadline = Carbon::parse($document->deadline);

        switch ($document->deadline_interval) {
            case self::DAILY:
                return $currentDeadline->addDay();
            case self::WEEKLY:
                return $currentDeadline->addWeek();
            case self::MONTHLY:
        default:
            return $currentDeadline->addMonth();
    }
    }

    public function updateDocumentDeadline(ProjectDocument $document, int $newInterval, bool $applyImmediately = false)
    {
        if ($applyImmediately) {
            $document->deadline = $this->calculateDeadline($document);
        }

        $document->deadline_interval = $newInterval;
        $document->save();

        return $document;
    }
}
