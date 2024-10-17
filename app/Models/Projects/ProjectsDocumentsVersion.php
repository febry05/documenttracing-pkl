<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use App\Models\Projects\Project;
use App\Models\Projects\Updates;
use App\Models\Projects\Documents;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectsDocumentsVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'release_date'
    ];

    public function documents()
    {
        return $this->belongsTo(Documents::class);
    }

    public function document_updates()
    {
        return $this->hasMany(Updates::class);
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
