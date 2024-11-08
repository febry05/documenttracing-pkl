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
        return array_merge(parent::share($request), [
            'auth' => Auth::check() ? [
                'name' => Auth::user()->profile->name,
                'role' => ModelsRole::findByName(Auth::user()->getRoleNames()[0])->name,
            ] : [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
            ],
        ]);
    }
}
