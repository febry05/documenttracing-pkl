<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Division;

class UserDivisions extends Model
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
