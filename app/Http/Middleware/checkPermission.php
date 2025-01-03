<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class checkPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $handleOwnedProject = false, $permission): Response
    {
        $user = User::find(Auth::user()->id);
        // dd($handleOwnedProject === true && !$user->can('Handle Owned Project'));
        // dd('handleOwnedProject: ' . $handleOwnedProject, 'permission: ' . $permission, 'User have Handle Owned Project permission: ' . $user->can('Handle Owned Project'), 'User have permission: ' . $user->can($permission));

        // ini jalan kalo:
        //->middleware('check_permission:true,View Project Document Version');
        // ditulis
        if (!($handleOwnedProject === true && $user->hasAny(['Handle Owned Project', $permission]))) {
            abort(403, 'Unauthorized action. Only users with \'Handle Owned Project \' or ' . $permission . ' permission can access this resource.');

        // ini jalan kalo:
        //->middleware('check_permission:false,View Project Document Version');
        // ditulis
        } else if (!$user->can($permission)) {
            abort(403, 'Unauthorized action. Only users with ' . $permission . ' permission can access this resource.');
        }

        return $next($request);
    }
}
