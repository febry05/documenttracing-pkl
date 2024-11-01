<?php

namespace App\Models\Users;

use App\Models\Users\User;

use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProfile extends Model
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

    // public function role()
    // {
    //     return $this->
    // }

    public function position()
    {
        return $this->belongsTo(UserPosition::class, 'user_position_id');
    }

    public function division()
    {
        return $this->belongsTo(UserDivision::class, 'user_division_id');
    }
}
