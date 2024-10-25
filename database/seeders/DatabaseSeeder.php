<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Users\User;
use App\Models\Users\UserDivisions;
use App\Models\Users\UserPosition;
use App\Models\Users\UserProfiles;
use App\Models\Users\UserRoles;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User Roles

        //1
        UserRoles::create([
            'name' => 'superadmin',
            'description' => 'Super Administration',
        ]);

        //2
        UserRoles::create([
            'name' => 'pic',
            'description' => 'Person In Charge',
        ]);

        //3
        UserRoles::create([
            'name' => 'guest',
            'description' => 'Guest',
        ]);

        //User Divisions

        //1
        UserDivisions::create([
            'name' => 'ICT',
            'description' => 'Information and Communication Technology',
        ]);

        //2
        UserDivisions::create([
            'name' => 'HRD',
            'description' => 'Human Research Development',
        ]);

        //3
        UserDivisions::create([
            'name' => 'GA',
            'description' => 'General Affair',
        ]);

        //User Positions

        //1
        UserPosition::create([
            'name' => 'Cyber Security',
            'description' => 'Cyber Security from ICT Division',
            'division_id' => UserDivisions::where('name', 'ICT')->first()->id,
        ]);

        //2
        UserPosition::create([
            'name' => 'Payment Roll',
            'description' => 'Payment Roll from HRD Division',
            'division_id' => UserDivisions::where('name', 'HRD')->first()->id,
        ]);

        //3
        UserPosition::create([
            'name' => 'Head of General Affair',
            'description' => 'General Affair in General',
            'division_id' => UserDivisions::where('name', 'GA')->first()->id,
        ]);

        //User

        //1
        User::factory()->create([
            'email' => 'verif@example.com',
            'password' => bcrypt('password'),
            'user_role_id' => '1',
        ]);

        //2
        User::create([
            'email' => 'notverif@example.com',
            'password' => bcrypt('password'),
            'user_role_id' => '2',
        ]);

        //3
        User::create([
            'email' => 'hrd@example.com',
            'password' => bcrypt('password'),
            'user_role_id' => '2',
        ]);

        User::factory(10)->create();

        //1
        // UserProfiles::create([
        //     'user_id' => 1,
        //     'name' => 'Muhammad Azhim Nugroho',
        //     'NIK' => '1111222233334444',
        //     'phone' => '081234567890',
        //     'user_role_id' => UserRoles::where('name', 'superadmin')->first()->id,
        //     'user_division_id' => UserDivisions::where('name', 'ICT')->first()->id,
        //     'user_position_id' => UserPosition::where('name', 'Cyber Security')->first()->id,

        // ]);

        // //2
        // UserProfiles::create([
        //     'user_id' => 2,
        //     'name' => 'Muhammad Ferdy Maulana',
        //     'NIK' => '1111222233334445',
        //     'phone' => '081234567893',
        //     'user_role_id' => UserRoles::where('name', 'pic')->first()->id,
        //     'user_division_id' => UserDivisions::where('name', 'HRD')->first()->id,
        //     'user_position_id' => UserPosition::where('name', 'Payment Roll')->first()->id,
        // ]);

        // //3
        // UserProfiles::create([
        //     'user_id' => 3,
        //     'name' => 'Teddy',
        //     'NIK' => '1111222233334446',
        //     'phone' => '081234567892',
        //     'user_role_id' => UserRoles::where('name', 'guest')->first()->id,
        //     'user_division_id' => UserDivisions::where('name', 'GA')->first()->id,
        //     'user_position_id' => UserPosition::where('name', 'Head of General Affair')->first()->id,
        // ]);


        // User::factory(10)->create();
    }
}
