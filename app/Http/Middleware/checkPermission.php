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

        // Contoh penggunaan middleware di route:
        // ->middleware('check_permission:true,View Project Document Version');
        // Artinya, si user harus bisi 'HandleOwnedProject' lwn 'View Project Document Version' permission supaya bisa ngakses, t
        //
        // kalo kd handak makai 'Handle Owned Project', ganti `true` jadi `false`

        // dd($handleOwnedProject === true && !$user->can('Handle Owned Project'));
        // dd('handleOwnedProject: ' . $handleOwnedProject, 'permission: ' . $permission, 'User have Handle Owned Project permission: ' . $user->can('Handle Owned Project'), 'User have permission: ' . $user->can($permission));
        if($handleOwnedProject === false && !$user->can('Handle Owned Project')) {
            abort(403, 'Unauthorized action. Only users with \'Handle Owned Project \' permission can access this resource.');
        }

        if(!$user->can($permission)) {
            abort(403, 'Unauthorized action. Only users with ' . $permission . ' permission can access this resource.');
        }
        return $next($request);
    }
}
