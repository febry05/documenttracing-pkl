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
        'base_deadline',
        'deadline_interval',
        'deadline',
        'project_id',
    ];

    const Low = 0; // Low priority
    const Medium = 1; // Medium priority
    const High = 2; // High priority

    public function getPriorityTypeNameAttribute()
    {
        switch ($this->priority) {
            case 0:
                return 'Low';
            case 1:
                return 'Medium';
            case 2:
                return 'High';
            default:
                return 'Unknown Priority';
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
        return $this->hasMany(ProjectDocumentVersion::class);
    }



}
