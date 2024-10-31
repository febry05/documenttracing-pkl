<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Users\User;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use App\Models\Users\UserProfile;
use App\Models\Users\UserRoles;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleAndPermissionSeeder::class);

        //1
        UserDivision::create([
            'name' => 'ICT',
            'description' => 'Information and Communication Technology',
        ]);

        //2
        UserDivision::create([
            'name' => 'HRD',
            'description' => 'Human Research Development',
        ]);

        //3
        UserDivision::create([
            'name' => 'GA',
            'description' => 'General Affair',
        ]);

        //User Positions

        //1
        UserPosition::create([
            'name' => 'Cyber Security',
            'description' => 'Cyber Security from ICT Division',
            'user_division_id' => UserDivision::where('name', 'ICT')->first()->id,
        ]);

        //2
        UserPosition::create([
            'name' => 'Payment Roll',
            'description' => 'Payment Roll from HRD Division',
            'user_division_id' => UserDivision::where('name', 'HRD')->first()->id,
        ]);

        //3
        UserPosition::create([
            'name' => 'Head of General Affair',
            'description' => 'General Affair in General',
            'user_division_id' => UserDivision::where('name', 'GA')->first()->id,
        ]);

        //User

        //1
        User::factory()->create([
            'email' => 'verif@example.com',
            'password' => bcrypt('password'),
            'roles_id' => '1',
        ]);

        //2
        User::create([
            'email' => 'notverif@example.com',
            'password' => bcrypt('password'),
            'roles_id' => '2',
        ]);

        //3
        User::create([
            'email' => 'hrd@example.com',
            'password' => bcrypt('password'),
            'roles_id' => '2',
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


        // User::factory(10)->create();
    }
}
