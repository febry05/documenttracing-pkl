<?php

namespace App\Http\Controllers\Projects;

use Illuminate\Http\Request;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Projects\ProjectDocument;
use App\Models\Projects\ProjectDocumentVersion;
use App\Models\Projects\ProjectDocumentVersionUpdate;

class UpdateController extends Controller
{ 
    public function store(Request $request, Project $project, ProjectDocument $document, ProjectDocumentVersion $version)
    {
        DB::beginTransaction();
        try {
            $now = now();
            if (!$project) {
            return to_route('projects')
                ->with(['error' => 'Project not found']);
            }

            if ($now > $project->contract_end) {
            DB::rollBack();
            return to_route('projects.documents.show', [
                'project' => $project->id,
                'document' => $document->id,
            ])->with('error', 'When add Update to document "' . $document->name ." version ". $version->version .  '" because Project "' . $project->name . '" ended on ' . $project->contract_end);
            }

            $validated = $request->validate([
                'title' => 'required|string',
                'status' => 'required|integer',
                'description' => 'required|string',
                'document_link' => 'nullable|string',
            ]);

            $documentUpdate = ProjectDocumentVersionUpdate::create([
                'title' => $validated['title'],
                'status' => $validated['status'],
                'description' => $validated['description'],
                'document_link' => $validated['document_link'],
                'project_document_version_id' => $version->id,
            ]);

            DB::commit();

            return redirect()->route('projects.documents.versions.show', [
                'project' => $project->id,
                'document' => $document->id,
                'version' => $version->id,
            ])
            ->with('success', 'Document Version Update created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }   
}
