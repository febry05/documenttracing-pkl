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
        
        $notifications = [
            [
                'project' => [
                    'id' => 1,
                    'name' => 'Project Alpha',
                    'projectDocument' => [
                        'id' => 101,
                        'name' => 'Document A',
                        'daysLeft' => 5,
                        'priority' => 'Medium',
                        'projectDocumentVersion' => [
                            'id' => 1001,
                        ],
                    ],
                ],
            ],
            [
                'project' => [
                    'id' => 2,
                    'name' => 'Project Beta',
                    'projectDocument' => [
                        'id' => 102,
                        'name' => 'Document B',
                        'daysLeft' => 10,
                        'priority' => 'High',
                        'projectDocumentVersion' => [
                            'id' => 1002,
                        ],
                    ],
                ],
            ],
            [
                'project' => [
                    'id' => 3,
                    'name' => 'Project Gamma',
                    'projectDocument' => [
                        'id' => 103,
                        'name' => 'Document C',
                        'daysLeft' => 3,
                        'priority' => 'High',
                        'projectDocumentVersion' => [
                            'id' => 1003,
                        ],
                    ],
                ],
            ],
            [
                'project' => [
                    'id' => 4,
                    'name' => 'Project Delta',
                    'projectDocument' => [
                        'id' => 104,
                        'name' => 'Document D',
                        'daysLeft' => 15,
                        'priority' => 'Low',
                        'projectDocumentVersion' => [
                            'id' => 1004,
                        ],
                    ],
                ],
            ],
        ];
        // dd(session()->all());

        return array_merge(parent::share($request), [
            'auth' => Auth::check() ? [
                'name' => Auth::user()->profile->name,
                'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
                'role' => ModelsRole::findByName(Auth::user()->getRoleNames()[0])->name,
            ] : [
                'user' => $request->user(),
            ],
            'notifications' => $this->projectService->getNotifications(),
            'flash' => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
            ],
        ]);
    }
}
