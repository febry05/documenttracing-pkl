<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\MasterData\ProjectBusinessType;
use App\Models\Users\UserProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'user_profile_id',
        'project_business_type_id',

    ];

    
    public function userProfiles()
    {
        return $this->belongsTo(UserProfile::class);
    }
    
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function businessType()
    {
        return $this->belongsTo(ProjectBusinessType::class, 'project_business_type_id');
    }


}
