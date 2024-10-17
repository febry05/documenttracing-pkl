<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectBusinessType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];
}
