<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Model;
use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'document_number',
        'priority',
        'due_at',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function document_version()
    {
        return $this->hasMany(ProjectDocumentVersion::class);
    }

    public function document_updates()
    {
        return $this->hasMany(ProjectDocumentVersionUpdate::class);
    }


}
