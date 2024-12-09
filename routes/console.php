<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
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
    $versions = ProjectDocumentVersion::where('is_auto', true)->where('deadline', '>=', now())->get();
    Log::info("Documents retrieved for auto-generation: ", $versions->toArray());

    foreach ($versions as $version) {
        try {
            $version->auto_generated();
        } catch (\Exception $e) {
            logger()->error('Auto-generation failed for version', [
                'version_id' => $version->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
})->everyMinute();