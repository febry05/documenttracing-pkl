<?php

namespace App\Models\Projects;

use Carbon\Carbon;
use Grei\TanggalMerah;
use App\Models\Users\User;
use InvalidArgumentException;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectDocumentVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'document_number',
        'release_date',
        'deadline',
        'is_generated',
        'project_document_id',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($version) {
            $version->updates()->each(function ($update) {
                $update->delete();
            });
        });
    }

    // protected $projectService;

    // public function __construct(ProjectService $projectService)
    // {
    //     $this->projectService = $projectService;
    // }

    public function check_auto(Project $project, ProjectDocument $document)
    {
        $deadlineCarbon = Carbon::parse($this->deadline);
        $nowDate = Carbon::now();

        try {
            if ($this->document->is_auto && ($nowDate->gte($deadlineCarbon) && $this->is_generated == false)) {
                Log::info("Condition met: Storing new version for document ID: {$this->id} Name of document: {$this->document->name}");
                $this->storeNewVersion($project, $document);
            } else {
            Log::info("Condition not met. Document is_auto: " . ($this->document->is_auto) . ", Deadline is/later than now: " . ($nowDate->gte($deadlineCarbon)) . ", Deadline (Carbon): " . $deadlineCarbon . ", Sekarang: " . now()) ;
            }
        } catch (\Exception $e) {
            logger()->error('Failed to auto-generate version', [
                'document_id' => $this->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function storeNewVersion(Project $project, ProjectDocument $document)
    {
    DB::beginTransaction();
    try {
        // $now = Carbon::now();
        // $releaseDate = $this->versions->release_date;
        $releaseDate = Carbon::parse($this->release_date);
        // $releaseDate = $this->document->versions->orderBy('release_date', 'desc')->first()->release_date;
        
        //now();
        switch ($this->document->deadline_interval) {
            case 1:
                $versionName = $releaseDate->format('l, d M Y') . '('. $document->name .')'; // Daily with day name
                break;
            case 2:
                $versionName = 'Week ' . $releaseDate->weekOfMonth . ' ' . $releaseDate->format('F Y') .  '(' . $document->name . ')'; // Weekly
                break;
            case 3:
                $versionName = $releaseDate->format('F Y') .  '(' . $document->name . ')'; // Monthly
                break;
            case 4:
                // $versionName = $releaseDate->format('Version Name Test'); // Detailed timestamp
                $versionName = $releaseDate->format('l, jS F Y H:i') . '(' . $document->name .') (For Testing)'; // Detailed timestamp
                break;
            default:
                throw new InvalidArgumentException('Invalid deadline interval.');
        }

        $deadline = $this->calculateDeadline($this->document->deadline_interval);

        Log::debug("Creating new version with name: {$versionName} and deadline: {$deadline}");

        $newVersion = new ProjectDocumentVersion([
            'version' => $versionName,
            'document_number' => $this->document_number,
            'release_date' => $releaseDate->toDateTimeString(),
            'deadline' => $deadline->toDateTimeString(),
            'is_generated' => false,
            'project_document_id' => $this->document->id,
        ]);

        if ($newVersion->save()) {
            $this->document->versions()->where('id', '<', $newVersion->id)->update(['is_generated' => true]);
            Log::info("New version stored successfully for document ID: {$this->id}");
            DB::commit();
        } else {
            Log::info("Failed to store new version for document ID: {$this->id}");
            DB::rollBack();
        }
    } catch (\Exception $e) {
        Log::info("Condition not met: Storing new version for document ID: {$this->id} failed");
        DB::rollBack();
        Log::error('Failed to store new version', [
            'document_id' => $this->id,
            'error' => $e->getMessage(),
        ]);
            throw $e;
        }
    }

    public function document()
    {
        return $this->belongsTo(ProjectDocument::class, 'project_document_id');
    }

    public function updates()
    {
        return $this->hasMany(ProjectDocumentVersionUpdate::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function calculateDeadline(): Carbon
    {
        $releaseDate = Carbon::parse($this->release_date);
        $now = now();
        $holidayChecker = new TanggalMerah();

        return match ($this->document->deadline_interval) {
            1 => $this->adjustForHolidays($releaseDate->addDay(), $holidayChecker), // Daily
            2 => $this->calculateWeeklyDeadline($this->document->weekly_deadline, $releaseDate, $holidayChecker), // Weekly
            3 => $this->calculateMonthlyDeadline($this->document->monthly_deadline, $releaseDate, $holidayChecker), // Monthly
            4 => $now->addMinute(),
            default => throw new \InvalidArgumentException('Invalid deadline interval.'),
        };
    }

    protected function calculateWeeklyDeadline(int $weeklyDeadline, Carbon $releaseDate, TanggalMerah $holidayChecker): Carbon
    {
        $dayOfWeek = $this->mapDayToWeekday($weeklyDeadline);
        $deadline = $releaseDate->next($dayOfWeek);

        return $this->adjustForHolidays($deadline, $holidayChecker);
    }

    protected function calculateMonthlyDeadline(int $monthlyDeadline, Carbon $releaseDate, TanggalMerah $holidayChecker): Carbon
    {
        $deadline = Carbon::create($releaseDate->year, $releaseDate->month, $monthlyDeadline);

        // Move to the next month if the date is in the past
        if ($deadline->lessThan($releaseDate)) {
            $deadline->addMonth();
        }

        return $this->adjustForHolidays($deadline, $holidayChecker);
    }

    protected function adjustForHolidays(Carbon $date, TanggalMerah $holidayChecker): Carbon
    {
        while ($holidayChecker->is_holiday($date->toDateString()) || $date->isSaturday() || $date->isSunday()) {
            $date->addDay();
        }

        return $date;
    }

    public function mapDayToWeekday(int $day): string
    {
        return match ($day) {
            1 => 'Monday',
            2 => 'Tuesday',
            3 => 'Wednesday',
            4 => 'Thursday',
            5 => 'Friday',
            default => 'Monday',
        };
    }
}
