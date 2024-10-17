<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfiles extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nik',
        'phone',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function roles()
    {
        return $this->belongsTo(UserRoles::class);
    }

    public function position()
    {
        return $this->belongsTo(UserPosition::class);
    }

    public function division()
    {
        return $this->belongsTo(UserDivisions::class);
    }

}
