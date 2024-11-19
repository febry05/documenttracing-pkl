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
            'project_id' => 1,
            'name' => 'BAPP dan Lampirannya',
            'priority' => '3',
            'due_at' => 'project-documents/project-document-1.pdf',
            
        ]);
    }
}
