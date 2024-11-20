<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;

class ProjectDocumentService
{
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

        switch($document->deadline_interval){
            case 1:
                return $currentDeadline->addDay();
            case 7:
                return $currentDeadline->addWeek();
            default: //Monthy
                return $currentDeadline->addMonth();
        }
    }

    public function updateDocumentDeadline(ProjectDocument $document, int $newInterval, bool $applyImmediately = false)
    {
        $now = Carbon::now();

         if ($applyImmediately) {
            $document->deadline = $this->calculateDeadline($document);
        } else {
            $document->deadline = $document->deadline; // No change
        }

        $document->deadline_interval = $newInterval;
        $document->save();

        return $document;
    }
}
