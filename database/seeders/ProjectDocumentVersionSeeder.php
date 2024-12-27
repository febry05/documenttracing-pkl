<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Projects\ProjectDocumentVersion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectDocumentVersionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ProjectDocumentVersion::create([
        //     'version' => 'January 2024',
        //     'document_number' => '3234238798324',
        //     'release_date' => '2024-01-15',
        //     'deadline' => '2024-12-09 00:00:00',
        //     'project_document_id' => 1,
        // ]);

        // ProjectDocumentVersion::create([
        //     'version' => 'January 2024',
        //     'document_number' => '3234238798324',
        //     'release_date' => '2024-01-15',
        //     'deadline' => '2024-12-09 00:00:00',
        //     'project_document_id' => 1,
        // ]);

        ProjectDocumentVersion::create([
            'version' => 'January 2024',
            'document_number' => '3234238798324',
            'release_date' => '2024-01-15',
            'deadline' => '2024-12-31 00:00:00',
            'project_document_id' => 4,
        ]);

        ProjectDocumentVersion::create([
            'version' => 'January 2024',
            'document_number' => '3234238798324',
            'release_date' => '2025-01-15',
            'deadline' => '2025-01-31 00:00:00',
            'project_document_id' => 4,
        ]);

        ProjectDocumentVersion::create([
            'version' => 'January 2024',
            'document_number' => '3234238798324',
            'release_date' => '2024-01-15',
            'deadline' => '2024-01-31 00:00:00',
            'project_document_id' => 4,
        ]);
    }
}
