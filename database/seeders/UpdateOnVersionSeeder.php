<?php

namespace Database\Seeders;

use App\Models\Projects\ProjectDocumentVersionUpdate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UpdateOnVersionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectDocumentVersionUpdate::create([
                'title' => 'Initial Update',
                'status' => 1, 
                'description' => 'The document has been created and is awaiting approval.',
                'document_link' => 'http://example.com/documents/1',
                'project_document_version_id' => 1,
        ]);
        ProjectDocumentVersionUpdate::create([
                'title' => 'Dokumen ditanda tangani, menuju ke Senior Manager',
                'status' => 1, 
                'description' => 'Dokumen telah ditanda tangani.',
                'document_link' => 'http://example.com/documents/1',
                'project_document_version_id' => 1,
        ]);
        ProjectDocumentVersionUpdate::create([
                'title' => 'Dokumen menuju Angkasa Pura I',
                'status' => 1, 
                'description' => 'Dokumen telah ditanda tangani dan sedang tahap menunggu disetujui oleh Direktur Angkasa Pura 1.',
                'document_link' => 'http://example.com/documents/1',
                'project_document_version_id' => 1,
        ]);
        ProjectDocumentVersionUpdate::create([
                'title' => 'Dokumen telah selesai',
                'status' => 3, 
                'description' => 'Dokumen telah diselesaikan ',
                'document_link' => 'http://example.com/documents/1',
                'project_document_version_id' => 1,
        ]);
    }
}
