<?php

namespace App\Http\Controllers\MasterData;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
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
        // $roles = Role::all();
        // return view('roles.index', compact('roles'));
    }

    public function create()
    {
        $permissions = Permission::all();
        return view('roles.create', compact('permissions'));
    }

    public function store(Request $request)
    {
    DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                // 'permissions' => 'required',
            ]);

            Role::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
            ]);
            DB::commit();
            return redirect()->route('roles.index');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all();
        return view('roles.edit', compact('role', 'permissions'));
    }
}
