<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projects\ProjectDocument;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectDocumentVersionUpdate extends Model
{
    use HasFactory;

    const Completed = 1; // Document are Completed
    const On_Process = 2; // Medium priority
    const Pending = 3; // High priority
    const Not_Started = 4; // High priority



    public function getStatusTypeNameAttribute()
    {
        switch ($this->status) {
            case 1:
                return 'Completed';
            case 2:
                return 'On Process';
            case 3:
                return 'Pending';
            case 4:
                return 'Not Started';
        }
    }

    protected $fillable = [
        'title',
        'description',
        'status',
        'document_link',
        'project_document_version_id',

    ];

    public function version()
    {
        return $this->belongsTo(ProjectDocumentVersion::class);
    }

    public function document()
    {
        return $this->belongsTo(ProjectDocument::class);
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
