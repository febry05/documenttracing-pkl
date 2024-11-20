<?php

namespace Database\Seeders;

use App\Models\Projects\ProjectDocument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectDocument::create([
            'name' => 'BAPP dan Lampirannya Tes',
            'priority' => '3',
            'deadline' => '2026-01-01',
            'deadline_interval' => '7',
            'project_id' => 1,            
        ]);
    }
}
