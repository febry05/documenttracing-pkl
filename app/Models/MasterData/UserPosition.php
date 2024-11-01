<?php

namespace App\Models\MasterData;
use App\Models\Users\UserProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function profiles()
    {
        return $this->hasMany(UserProfile::class);
    }

    public function division()
    {
        return $this->belongsTo(UserDivision::class, 'user_division_id');
    }
}
