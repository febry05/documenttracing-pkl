<?php

namespace Database\Seeders;

use App\Models\MasterData\ProjectBusinessType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectBusinessType::create([
            'name' => 'Software Development',
            'description' => 'Software Development Project',
        ]);

        ProjectBusinessType::create([
            'name' => 'Service',
            'description' => 'Service Project',
        ]);

        ProjectBusinessType::create([
            'name' => 'Rental',
            'description' => 'Rental Project',
        ]);
    }
}
