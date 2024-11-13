<?php

namespace Database\Seeders;

use App\Models\MasterData\ProjectBusinessType;
use App\Models\Users\User;
use Illuminate\Database\Seeder;
use App\Models\Projects\Project;
use App\Models\Users\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'name' => 'Pengembangan Aplikasi Document Tracker',
            'code' => 'RNT.JKT.0816.00050',
            'customer' => 'AP 1',
            'contract_number' => '077/BA/II/2024/APS/BM.BDJ',
            'contract_start' => '2021-01-01',
            'contract_end' => '2021-12-31',
            'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            'project_business_type_id' => ProjectBusinessType::where('name', 'Software Development')->first()->id,
        ]);
    }
}
