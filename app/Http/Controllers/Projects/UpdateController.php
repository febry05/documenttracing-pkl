<?php

namespace App\Http\Controllers\Projects;

use Illuminate\Http\Request;
use App\Models\Projects\Project;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;
use App\Models\Projects\ProjectDocumentVersionUpdate;

class UpdateController extends Controller
{ 
    public function store(Request $request, Project $project, ProjectDocument $document, ProjectDocumentVersion $version)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'status' => 'required|integer',
            'description' => 'required|string',
            'document_link' => 'nullable|string',
        ]);

        ProjectDocumentVersionUpdate::create([
            'title' => $validated['title'],
            'status' => $validated['status'],
            'description' => $validated['description'],
            'document_link' => $validated['document_link'],
            'project_document_version_id' => $version->id,
        ]);

        return redirect()->route('projects.documents.versions.show', [
            'project' => $project->id,
            'document' => $document->id,
            'version' => $version->id,
        ]);
    }   
}
