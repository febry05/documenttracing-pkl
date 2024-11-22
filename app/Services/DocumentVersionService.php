<?php

namespace App\Services;

use App\Models\Projects\ProjectDocument;

class DocumentVersionService
{
    public function checkAndGenerateVersions()
    {
        $documents = ProjectDocument::all();

        foreach ($documents as $document) {
            $document->generateVersionIfNeeded();
        }
    }
}
