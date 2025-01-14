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
            'name' => 'Branch Manager',
            'description' => '',
        ]);

        UserDivision::create([
            'name' => 'Commercial',
            'description' => '',
        ]);

        //2
        UserDivision::create([
            'name' => 'Operational',
            'description' => '',
        ]);

        //3
        UserDivision::create([
            'name' => 'Accounting & Asset Management',
            'description' => '',
        ]);

        //4
        UserDivision::create([
            'name' => 'HC & GA Procurement',
            'description' => '',
        ]);
        //User Positions

        //1
        UserPosition::create([
            'name' => 'PLT. Branch Manager',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Branch Manager')->first()->id,
        ]);

        //2
        UserPosition::create([
            'name' => 'Head of Commercial',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Commercial')->first()->id,
        ]);

        //3
        UserPosition::create([
            'name' => 'Deputy Head of Commercial',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Commercial')->first()->id,
        ]);

        //4
        UserPosition::create([
            'name' => 'Head of Operational',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Operational')->first()->id,
        ]);

        //5
        UserPosition::create([
            'name' => 'Deputy Head of Operational',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Operational')->first()->id,
        ]);

        //6
        UserPosition::create([
            'name' => 'Facility Management & HSE',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Operational')->first()->id,
        ]);

        //7
        UserPosition::create([
            'name' => 'Equipment & ICT Support',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Operational')->first()->id,
        ]);

        //8
        UserPosition::create([
            'name' => 'Head of Accounting & Asset Management',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Accounting & Asset Management')->first()->id,
        ]);

        //9
        UserPosition::create([
            'name' => 'Accounting & Budgeting',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Accounting & Asset Management')->first()->id,
        ]);

        //10
        UserPosition::create([
            'name' => 'Treasury & Collections',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Accounting & Asset Management')->first()->id,
        ]);

        //11
        UserPosition::create([
            'name' => 'Asset Management',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'Accounting & Asset Management')->first()->id,
        ]);

        //12
        UserPosition::create([
            'name' => 'Head of HC & GA Procurement',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'HC & GA Procurement')->first()->id,
        ]);

        //13
        UserPosition::create([
            'name' => 'HR Service, Compensation & Benefit',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'HC & GA Procurement')->first()->id,
        ]);

        //14
        UserPosition::create([
            'name' => 'Industrial Relation & People Dev.',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'HC & GA Procurement')->first()->id,
        ]);

        //15
        UserPosition::create([
            'name' => 'Genereal Affair, IT Supports & Procurement',
            'description' => '',
            'user_division_id' => UserDivision::where('name', 'HC & GA Procurement')->first()->id,
        ]);
    }
}
