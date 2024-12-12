<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\Projects\ProjectDocument;
use Illuminate\Support\Facades\Schedule;
use App\Models\Projects\ProjectDocumentVersion;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


// Artisan::command('schedule:run', function (Schedule $schedule) {
//     $schedule->job(\App\Jobs\GenerateDocumentVersionsJob::class)
//         ->dailyAt('00:00'); 
// });

//Schedule
// Schedule::call(function (){
//     $projectDocumentVersion = ProjectDocumentVersion::where('deadline', '>=', now());
//     $projectDocumentVersion->auto_generated();
// })->everyMinute();

Schedule::call(function () {
    $projectDocuments = ProjectDocument::where('is_auto', 1)->get();

    foreach ($projectDocuments as $projectDocument) {
        if ($projectDocument->versions->count() > 0) {
            foreach ($projectDocument->versions as $documentVersion) {
                try {
                    $documentVersion->check_auto();  
                } catch (\Exception $e) {
                    Log::error('Error processing document version: ' . $e->getMessage());
                }
            }
        } else {
            Log::warning('No document versions found for project document ID: ' . $projectDocument->id);
        }
    }

    Log::info("Documents retrieved for auto-generation: " . now());
})->everyMinute();