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
            'deadline_interval' => '7',
            'base_deadline' => '16',
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'Laporan Bulanan',
            'priority' => '3',
            'deadline_interval' => '7',
            'base_deadline' => '16',
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'Berita Acara Recapitulasi Jumlah Pax',
            'priority' => '3',
            'deadline_interval' => '7',
            'base_deadline' => '16',
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'SLA',
            'priority' => '2',
            'deadline_interval' => '7',
            'base_deadline' => '16',
            'project_id' => 1,
        ]);
    }
}
