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
            'weekly_deadline' => '3',
            'monthly_deadline' => null,
            'is_auto' => true,
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'Laporan Bulanan',
            'priority' => '3',
            'deadline_interval' => '30',
            'weekly_deadline' => null,
            'monthly_deadline' => '16',
            'is_auto' => true,
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'Berita Acara Recapitulasi Jumlah Pax',
            'priority' => '3',
            'deadline_interval' => '7',
            'weekly_deadline' => '5',
            'monthly_deadline' => null,
            'is_auto' => true,
            'project_id' => 1,
        ]);

        ProjectDocument::create([
            'name' => 'SLA',
            'priority' => '2',
            'deadline_interval' => '30',
            'weekly_deadline' => null,
            'monthly_deadline' => '20',
            'is_auto' => false,
            'project_id' => 1,
        ]);
    }
}
