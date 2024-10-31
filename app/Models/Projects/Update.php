<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Update extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        
        'description',
        'priority',
        'due_at',

    ];

    public function document_version()
    {
        return $this->belongsTo(ProjectDocumentVersion::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
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
