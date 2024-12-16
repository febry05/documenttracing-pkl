<?php

namespace App\Models\Projects;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'priority',
        'weekly_deadline',
        'monthly_deadline',
        'is_auto',
        'deadline_interval',
        'project_id',
    ];

    const Low = 1; // Low priority
    const Medium = 2; // Medium priority
    const High = 3; // High priority

    public function getPriorityTypeNameAttribute()
    {
        switch ($this->priority) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
        }
    }

    /**
     * Calculate the next deadline based on the interval and current date.
     *
     * @param int $interval (1: Daily, 2: Weekly, 3: Monthly)
     * @param string|null $currentDate
     * @return \Carbon\Carbon
     */

    public function generateVersionIfNeeded()
    {
        $currentDate = Carbon::now();

        if ($this->next_deadline && $currentDate->greaterThanOrEqualTo($this->next_deadline)) {
            // Create new version
            ProjectDocumentVersion::create([
                'project_document_id' => $this->id,
                'version' => $this->generateNextVersion(),
                'release_date' => $this->next_deadline,
            ]);

            // Update the next deadline
            $this->next_deadline = $this->calculateNextDeadline($this->deadline_interval, $this->next_deadline);
            $this->save();
        }
    }

    // Generate the next version string
    public function generateNextVersion()
    {
        $lastVersion = $this->document_versions()->latest()->first();
        $lastVersionNumber = $lastVersion ? intval($lastVersion->version) : 0;

        return str_pad($lastVersionNumber + 1, 3, '0', STR_PAD_LEFT); // Example: 001, 002, 003...
    }


    public function calculateNextDeadline($interval, $currentDate = null)
    {
        $currentDate = $currentDate ? Carbon::parse($currentDate) : Carbon::now();

        switch ($interval) {
            case 1: // Daily
                return $currentDate->addDay();

            case 2: // Weekly
                return $currentDate->addWeek();

            case 3: // Monthly
                $nextMonth = $currentDate->addMonth()->startOfMonth();
                $nextDeadline = $nextMonth->addDays($this->base_deadline - 1);

                // Handle months with fewer days
                return $nextDeadline->day > $nextMonth->daysInMonth
                    ? $nextMonth->endOfMonth()
                    : $nextDeadline;

            default:
                throw new \InvalidArgumentException('Invalid deadline interval');
        }
    }

    //Relationships
    //version(s) is hasMany

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function versions()
    {
        return $this->hasMany(ProjectDocumentVersion::class, 'project_document_id');
    }



}
