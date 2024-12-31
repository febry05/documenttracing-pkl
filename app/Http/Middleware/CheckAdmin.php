<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission): Response
    {
        $user = User::find(Auth::user()->id);
        if (!$user) {
            return redirect('/login')->with('error', 'You must be logged in to access this resource.');
        }

        // Check if the user has the 'admin' role or permission
        if (!$user->can($permission)) {
            abort(403, 'Unauthorized action. Only users with ' . $permission . ' can access this resource.');
        }

        return $next($request);
    }
}
