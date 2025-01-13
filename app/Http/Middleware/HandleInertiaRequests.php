<?php

namespace App\Http\Middleware;

use Inertia\Inertia;
use Inertia\Middleware;
use Illuminate\Http\Request;
use App\Services\ProjectService;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Contracts\Role;
use League\CommonMark\Util\PrioritizedList;
use Spatie\Permission\Models\Role as ModelsRole;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';
    protected $projectService;


    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function __construct(ProjectService $projectService){
        $this->projectService = $projectService;
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // dd(Auth::user()->roles ?? 'true');
        // dd($this->projectService->getNotifications());
        return array_merge(parent::share($request), [
            'auth' => Auth::check() ? [
                'id' => Auth::id(),
                'name' => Auth::user()->profile->name,
                'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
                'role' => count(Auth::user()->roles) > 0 ? ModelsRole::findByName(Auth::user()->getRoleNames()[0])->name : "N/A",
                'notifications' => $this->projectService->getNotifications(),
            ] : [
                'user' => $request->user()
            ],
            'flash' => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
            ],
        ]);
    }
}
