<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'customer',
        'contract_number',
        'contract_start',
        'contract_end',

    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function documents()
    {
        return $this->hasMany(Documents::class);
    }

    public function businessType()
    {
        return $this->belongsToMany(ProjectBusinessType::class);
    }


}
