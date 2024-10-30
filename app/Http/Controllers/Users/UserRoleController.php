<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserRoleController extends Controller
{
    public function index()
    {
        $mockUserRoles = [
            [
                'id' => 1,
                'name' => 'Administrator',
                'description' => 'Web administrator adalah profesional teknis yang mengelola website.',
            ],
            [
                'id' => 2,
                'name' => 'Project Manager',
                'description' => 'Can Handle Project where he’s have. And only can see other Project if here doesn’t added in the project',
            ],
            [
                'id' => 4,
                'name' => 'Guest',
                'description' => 'Only see project and Document Project',
            ]
        ];

        return Inertia::render('Master/UserRoles/Index', [
            'userRoles' => $mockUserRoles,
        ]);
    }

    // public function edit($id) {
    //     dd('User Role Id:' . $id);
    // }
}
