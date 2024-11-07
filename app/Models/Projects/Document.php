<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
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
        return $this->hasMany(Update::class);
    }

    
}