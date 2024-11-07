<?php

namespace App\Http\Controllers\MasterData;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {$roles = Role::all()->map(function ($role){
            return [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
            ];
        });

        return Inertia::render('Master/UserRoles/Index', [
            'userRoles' => $roles
        ]);
        // $roles = Role::all();
        // return view('roles.index', compact('roles'));
    }

    public function create()
    {
        return Inertia::render('Master/UserRoles/Create', [
            'permissions' => Permission::select('id', 'name')->orderBy('id', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        dd($request);

        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
            ]);

            $role = new Role();
            $role->name = $validatedData['name'];
            $role->guard_name = 'web';
            $role->description = $validatedData['description'];
            $role->save();

            DB::commit();
            // Inertia::share('sonner', [
            //     'status' => 'success',
            //     'message' => 'User role "' . $role->name . '" has been created.',
            // ]);

            $request->session()->flash('success', 'User role "' . $role->name . '" has been created.');
            // dd(session()->all());
            return to_route('user-roles.index');
            // return redirect()->route('user-roles.index')->with('success', 'User role "' . $role->name . '" has been created.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'There was an error creating the role: ' . $e->getMessage()]);
        }
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all();
        return view('roles.edit', compact('role', 'permissions'));
    }

}
