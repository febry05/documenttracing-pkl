<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfiles extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_no',
        'nik',
        'phone',
        'user_id', 
        'user_division_id',
        'user_position_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function position()
    {
        return $this->belongsTo(UserPosition::class, 'user_position_id');
    }

    public function division()
    {
        return $this->belongsTo(UserDivisions::class, 'user_division_id');
    }
}
