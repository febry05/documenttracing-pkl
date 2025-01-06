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

    public function handle(Request $request, Closure $next): Response
    {
        $user = User::find(Auth::user()->id);

        if(!$user->can('Handle Owned Project')) {
            return redirect()->route('monitoring.index');
        }

        
        // $projectId = $request->route('project');
        // $project = Project::with(['documents.versions.updates'])->find($projectId);
        
        // if (!$user) {
        //     Log::error('User not found', ['user_id' => Auth::id()]);
        //     abort(403, 'Unauthorized action. User not found');
        // }

        // if (!$project) {
        //     Log::error('Project not found', ['project_id' => $projectId]);
        //     abort(403, 'Unauthorized action. Ensure the project is found');
        // }

        // if (!$user->can('Handle Owned Project') && $project->user_profile_id !== $user->profile->id) {
        //     Log::error('User does not have the "Handle Owned Project" permission', [
        //         'user_id' => $user->id,
        //         'project_id' => $projectId,
        //     ]);
        //     abort(403, 'Unauthorized action. Check if the user has the "Handle Owned Project" permission');
        // }

        // $a = !$user->can('Handle Owned Project') && $project->user_profile_id !== $user->profile->id; 
        // $b = !$project;
        // $c = !$user;

        // if($a && $b && $c) {
            
        // }

        // if (!$user->can($permission)) {
        //     Log::error('User does not have the required permission', [
        //         'user_id' => $user->id,
        //         'permission' => $permission,
        //     ]);
        //     abort(403, 'Unauthorized action. Check if the user has the required permission');
        // }

        return $next($request);
    }
        // if (!$user->can('Handle Owned Project') && $project->user_profile_id !== $user->profile->id) {
        //     Log::error('User ' . $user->name . ' does not have the "Handle Owned Project" permission');
        //     abort(403, 'Unauthorized action. Check if the user has the "Handle Owned Project" permission');
        //     } elseif (!$user->can($allowPermission)) {
        //         Log::error('User ' . $user->name . ' does not have the ' . $allowPermission . ' permission');
        //         abort(403, 'Unauthorized action. Check if the user has the ' . $allowPermission . ' permission');
        // }

        // If neither Check 1 nor Check 2 passes, deny access
        // Log::error('User does not meet the required conditions', [
        //     'user_id' => $user->id,
        //     'project_id' => $projectId,
        // ]);
}
