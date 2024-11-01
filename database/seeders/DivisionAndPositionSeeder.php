<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MasterData\UserPosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\MasterData\UserDivision;

class DivisionAndPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
