<?php

namespace App\Models\MasterData;

use App\Models\Division;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserDivision extends Model
{
    use HasFactory;

    protected $table = 'user_divisions';

    protected $fillable = [
        'name',
        'description',
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }

}
