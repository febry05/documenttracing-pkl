<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Services\ProjectService;
use Illuminate\Support\Facades\Auth;
use App\Models\Projects\ProjectDocumentVersion;

class DashboardController extends Controller
{
    protected $projectService;
    // protected $projectService;

    public function __construct(Request $request, ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        $mockStats = [
            'total_documents' => 666,
            'onProcess_documents' => 69,
            'pending_documents' => 34,
            'completed_documents' => 420,
        ];

        return Inertia::render('Dashboard', [
            'stats' => $this->calculateDocumentStats(),
            'documents' => $this->projectService->getDashboard(),
        ]);
    }

    public function calculateDocumentStats()
    {
        $user = User::find(Auth::user()->id);

        $totalDocuments = ProjectDocumentVersion::whereHas('document.project.profile', function ($query) use ($user) {
            $query->where('id', $user->id);
            // dd($query);
        })->count();

        $documentVersions = ProjectDocumentVersion::with(['updates', 'document.project.profile'])
            ->whereHas('document.project.profile', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->get();

        $completedDocuments = 0;
        $onProcessDocuments = 0;
        $pendingDocuments = 0;
        $notStartedDocuments = 0;

        foreach ($documentVersions as $version) {
            $latestUpdate = $version->updates->sortByDesc('created_at')->first();

            if (!$latestUpdate) {
                $notStartedDocuments++;
            } else {
                switch ($latestUpdate->status) {
                    case '1': // Completed
                        $completedDocuments++;
                        break;
                    case '2': // On Process
                        $onProcessDocuments++;
                        break;
                    case '3': // Pending
                        $pendingDocuments++;
                        break;
                    default:
                        $notStartedDocuments++; // Not Started
                        break;
                }
            }
        }

        return [
            'totalDocuments' => $totalDocuments,
            'onProcessDocuments' => $onProcessDocuments,
            'pendingDocuments' => $pendingDocuments,
            'completedDocuments' => $completedDocuments,
            'not_startedDocuments' => $notStartedDocuments,
        ];
    }
}
