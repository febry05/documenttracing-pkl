<?php

namespace App\Http\Middleware;

use Inertia\Inertia;
use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\Models\Role as ModelsRole;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // $response = $next($request);
        // if ($request->session()->has('success')) {
        //     $response->with('flash', [
        //         'success' => $request->session()->get('success'),
        //     ]);
        // }

        // dd($request->session());
        // dd(Inertia::getShared('message'));
        if (Auth::check()) {
            $user = Auth::user();
            return [
                ...parent::share($request),
                'auth' => [
                    'name' => $user->profile->name,
                    'role' => ModelsRole::findByName($user->getRoleNames()[0])->name,
                ],
                'flash' => [
                    'success' => fn () => $request->session()->get('success')
                ],
            ];
        } else {
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
            ];
        }
    }
}
