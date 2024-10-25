<?php

namespace App\Models\Users;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // protected static function booted()
    // {
    //     static::created(function ($user) {
    //         // Automatically create a UserProfile for the new User
    //         UserProfiles::create([
    //             'user_id' => $user->id,
    //         ]);
    //     });
    // }

    public function profile()
    {
        return $this->hasOne(UserProfiles::class);
    }

    public function role()
    {
        return $this->hasOne(UserRoles::class, 'user_role_id');
    }


}
