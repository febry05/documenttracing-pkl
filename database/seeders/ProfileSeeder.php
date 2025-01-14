<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Users\UserProfile;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //1
        UserProfile::create([
            'user_id' => 1,
            'name' => ucwords(strtolower('R. M. ANGGA NOVA HERLAMBANG')),
            'employee_no' => '2203453',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Equipment & ICT Support')->first()->id,

        ]);

        //2
        UserProfile::create([
            'user_id' => 2,
            'name' => ucwords(strtolower('PEBRI PRASETYO')),
            'employee_no' => '2001803',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Head of Operational')->first()->id,
        ]);

        //3
        UserProfile::create([
            'user_id' => 3,
            'name' => ucwords(strtolower('ANGGRAINI IKA PUTERI')),
            'employee_no' => '2203314',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Commercial')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Deputy Head of Commercial')->first()->id,
        ]);

        //4
        UserProfile::create([
            'user_id' => 4,
            'name' => ucwords(strtolower('ANITA YOLANDA SUTA')),
            'employee_no' => '2402386',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Facility Management & HSE')->first()->id,
        ]);

        //5
        UserProfile::create([
            'user_id' => 5,
            'name' => ucwords(strtolower('AULIA MAYA MEGA SARI')),
            'employee_no' => '2402387',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Facility Management & HSE')->first()->id,
        ]);

        //6
        UserProfile::create([
            'user_id' => 6,
            'name' => ucwords(strtolower('DINI ALMIRA ROSA')),
            'employee_no' => '2200008',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Facility Management & HSE')->first()->id,
        ]);

        //7
        UserProfile::create([
            'user_id' => 7,
            'name' => ucwords(strtolower('DWI HENDRA BUDI SANTIKA')),
            'employee_no' => '1804357',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'HC & GA Procurement')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Head of HC & GA Procurement')->first()->id,
        ]);

        //8
        UserProfile::create([
            'user_id' => 8,
            'name' => ucwords(strtolower('GHASSANI AELSA RACHMA')),
            'employee_no' => '2210629',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'HC & GA Procurement')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'HR Service, Compensation & Benefit')->first()->id,
        ]);

        //9
        UserProfile::create([
            'user_id' => 9,
            'name' => ucwords(strtolower('HUSNI MUBAROK')),
            'employee_no' => '2203265',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Facility Management & HSE')->first()->id,
        ]);

        //10
        UserProfile::create([
            'user_id' => 10,
            'name' => ucwords(strtolower('ISMAIL')),
            'employee_no' => '1902297',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Equipment & ICT Support')->first()->id,
        ]);

        //11
        UserProfile::create([
            'user_id' => 11,
            'name' => ucwords(strtolower('MUHAMAD DZIKRI DHONNY KEVAN')),
            'employee_no' => '2208609',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Accounting & Asset Management')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Asset Management')->first()->id,
        ]);

        //12
        UserProfile::create([
            'user_id' => 12,
            'name' => ucwords(strtolower('MUHAMMAD RIZA TRIANTO')),
            'employee_no' => '1741398',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Accounting & Asset Management')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Head of Accounting & Asset Management')->first()->id,
        ]);

        //13
        UserProfile::create([
            'user_id' => 13,
            'name' => ucwords(strtolower('RANGGA DESPITA RENDANA')),
            'employee_no' => '2210626',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'HC & GA Procurement')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Genereal Affair, IT Supports & Procurement')->first()->id,
        ]);

        //14
        UserProfile::create([
            'user_id' => 14,
            'name' => ucwords(strtolower('RATIH WIJAYANTI')),
            'employee_no' => '2210628',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Accounting & Asset Management')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Treasury & Collections')->first()->id,
        ]);

        //15
        UserProfile::create([
            'user_id' => 15,
            'name' => ucwords(strtolower('RESKY PANGESTU MAHANANI')),
            'employee_no' => '2210627',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'HC & GA Procurement')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Industrial Relation & People Dev.')->first()->id,
        ]);

        //16
        UserProfile::create([
            'user_id' => 16,
            'name' => ucwords(strtolower('RODY YUDHA YUDISTHIRA')),
            'employee_no' => '1804356',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Deputy Head of Operational')->first()->id,
        ]);

        //17
        UserProfile::create([
            'user_id' => 17,
            'name' => ucwords(strtolower('TRY BUDI NUGRAHA')),
            'employee_no' => '1902870',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Commercial')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Head of Commercial')->first()->id,
        ]);

        //18
        UserProfile::create([
            'user_id' => 18,
            'name' => ucwords(strtolower('Astrid Prameswara')),
            'employee_no' => '1111111',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Branch Manager')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'PLT. Branch Manager')->first()->id,
        ]);

        //19
        UserProfile::create([
            'user_id' => 19,
            'name' => ucwords(strtolower('Trya Suma Anggarini')),
            'employee_no' => '2222222',
            'NIK' => null,
            'phone' => null,
            'user_division_id' => UserDivision::select('id')->where('name', 'Operational')->first()->id,
            'user_position_id' => UserPosition::select('id')->where('name', 'Equipment & ICT Support')->first()->id,
        ]);
    }
}
