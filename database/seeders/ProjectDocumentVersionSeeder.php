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
        ProjectDocumentVersion::create([
            'version' => 'October 2024',
            'document_number' => '3234238798324',
            'release_date' => '2024-10-15',
            'project_document_id' => 1,          
        ]);
    }
}
