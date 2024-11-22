<?php

namespace App\Jobs;

use App\Services\DocumentVersionService;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use App\Models\Projects\ProjectDocument;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class GenerateDocumentVersionsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    // protected $service;
    /**
     * Create a new job instance.
     */
    public function __construct()
    {
    //      $this->service = $service;
    }

    /**
     * Execute the job.
     */
    public function handle(DocumentVersionService $service)
    {
        $documents = ProjectDocument::all();

        foreach ($documents as $document) {
            $document->generateVersionIfNeeded();
        }

        $service->checkAndGenerateVersions(); // If needed
    }
}
