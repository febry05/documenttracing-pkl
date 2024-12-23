<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Projects\ProjectController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\Authorizable;

class EnsureUserCanHandleProject
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Fetch the authenticated user
        $user = auth()->user();

        // Get the project from the route
        $projectId = $request->route('project'); 
        $project = Project::find($projectId);

        // Abort if user or project is not found
        // if ( !$project) {
        //     abort(403, 'Unauthorized action. Abort if user or project is not found');
        // }

        // Check if the user has the 'Handle Owned Project' permission
        if (!$user->can('Handle Owned Project')) {
            abort(403, 'Unauthorized action. Check if the user has the "Handle Owned Project" permission');
            Log::error('User '. $user->name . 'does not have the "Handle Owned Project" permission');
        }

        // if ($project->user_id !== $user->id) {
        //     Log::error('User ID does not match project user ID', ['user_id' => $user->id, 'project_user_id' => $project->user_id]);
        //     abort(403, 'Unauthorized action. Ensure the user is assigned to the project');
        // }


        // Allow the request to proceed
        return $next($request);
    }
}
