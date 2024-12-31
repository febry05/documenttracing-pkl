<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Auth\Access\Authorizable;
use App\Http\Controllers\Projects\ProjectController;

class EnsureUserCanHandleProject
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    // function authUser(): User {
    //     /** @var App\Models\User $user */
    //         $user = auth()->user();
    //         //or assert($user instanceof User);
    //     return $user;
    // }

    public function handle(Request $request, Closure $next, $allowPermission): Response
    {
        $user = User::find(Auth::user()->id);

        $projectId = $request->route('project');
        $project = Project::with('documents.versions.updates')->findOrFail($projectId);

        // dd($user, $project);

        if (!$user) {
            Log::error('User not found', ['user_id' => Auth::user()->id]);
            abort(403, 'Unauthorized action. User not found');
        }

        if(!$project){
            Log::error('Project not found', ['project_id' => $projectId]);
            abort(403, 'Unauthorized action. Ensure the project is found');
        }

        if (!$user->can('Handle Owned Project') && ($project->user_profile_id !== $user->id)) {
            Log::error('User ' . $user->name . ' does not have the "Handle Owned Project" permission');
            abort(403, 'Unauthorized action. Check if the user has the "Handle Owned Project" permission');
        } else if (!$user->can([
                    'Create Project', 'View Project', 'Update Project', 'Delete Project', 
                    'Create Project Document', 'View Project Document', 'Update Project Document', 'Delete Project Document', 
                    'Create Project Document Version', 'View Project Document Version', 'Update Project Document Version', 'Delete Project Document Version', 
                    'Create Project Document Version Update', 'View Project Document Version Update',
                ])
            ){
            Log::info('User is an admin');
            return $next($request);

        }



        // if ($project->user_profile_id !== $user->id) {
        //     Log::error('User ID does not match project user ID', ['user_id' => $user->id, 'project_user_id' => $project->user_id]);
        //     abort(403, 'Unauthorized action. Ensure the user is assigned to the project');
        // }

        return $next($request);
    }
}
