<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use App\Models\Users\UserProfile;
use Spatie\Permission\Models\Role;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserAndProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'roles_id' => Role::where('name', 'Administrator')->first()->id
        ]);
        
        //2
        User::create([
            'email' => 'projectmanager@example.com',
            'password' => bcrypt('password'),
            'roles_id' => Role::where('name', 'Project Manager')->first()->id,
        ]);

        //3
        User::create([
            'email' => 'guest@example.com',
            'password' => bcrypt('password'),
            'roles_id' => Role::where('name', 'Guest')->first()->id
        ]);
        
        // User::factory(10)->create();
        //1
        UserProfile::create([
            'user_id' => 1,
            'name' => 'Muhammad Azhim Nugroho',
            'employee_no' => '1234567',
            'NIK' => '1111222233334444',
            'phone' => '081234567890',
            'user_division_id' => UserDivision::where('name', 'ICT')->first()->id,
            'user_position_id' => UserPosition::where('name', 'Cyber Security')->first()->id,
            
        ]);

        //2
        UserProfile::create([
            'user_id' => 2,
            'name' => 'Muhammad Ferdy Maulana',
            'employee_no' => '1234561',
            'NIK' => '1111222233334445',
            'phone' => '081234567893',
            'user_division_id' => UserDivision::where('name', 'HRD')->first()->id,
            'user_position_id' => UserPosition::where('name', 'Payment Roll')->first()->id,
        ]);
        
        //3
        UserProfile::create([
            'user_id' => 3,
            'name' => 'Teddy',
            'employee_no' => '1234562',
            'NIK' => '1111222233334446',
            'phone' => '081234567892',
            'user_division_id' => UserDivision::where('name', 'GA')->first()->id,
            'user_position_id' => UserPosition::where('name', 'Head of General Affair')->first()->id,
        ]);
    }
}
