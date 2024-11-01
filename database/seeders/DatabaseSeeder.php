<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Users\User;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use App\Models\Users\UserProfile;
use App\Models\Users\UserRoles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(DivisionAndPositionSeeder::class);
        
        $this->call(RoleAndPermissionSeeder::class);

        $this->call(UserAndProfileSeeder::class);

        $this->call(SycnRolesAndPermissionSeeder::class);
        
        // $adminRole = Role::where('name', 'Administrator')->first()->id; 

        
        
        
    }
}
