<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Services\ProjectService;

class ProjectDocumentVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'document_number',
        'release_date',
        'deadline',
        'is_auto',
        'project_document_id',
    ];

    public function auto_generated()
    {
        if($this->is_auto){
            $this->storeNewVersion();
        } else  {
            //do nothing
        }
    }

    public function storeNewVersion()
    {
     DB::beginTransaction();
        try {
            $now = now();
            // Generate version name based on deadline interval
            $versionName = match ($this->deadline_interval) {
                1 => $now->format('Ymd'), // Daily
                2 => 'Week ' . $now->weekOfMonth . ' ' . $now->format('F Y'), // Weekly
                3 => $now->format('F Y'), // Monthly
                default => throw new \InvalidArgumentException('Invalid deadline interval.'),
            };

            $deadline = $this->calculateDeadline();

            $this->versions()->create([
                'version' => $versionName,
                'document_number' => $this->generateDocumentNumber(),
                'release_date' => $now->toDateTimeString(), 
                'deadline' => $deadline->toDateTimeString(), 
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
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
}
