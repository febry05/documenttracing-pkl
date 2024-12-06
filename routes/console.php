<?php

use App\Models\Projects\ProjectDocumentVersion;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Scheduling\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


// Artisan::command('schedule:run', function (Schedule $schedule) {
//     $schedule->job(\App\Jobs\GenerateDocumentVersionsJob::class)
//         ->dailyAt('00:00'); 
// });

//Schedule
Schedule::call(function()){
    ProjectDocumentVersion::('deadline', '>=', now())->
}