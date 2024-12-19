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
    {
        $roles = Role::all()->map(function ($role){
            return [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
            ];
        });

        return Inertia::render('Master/UserRoles/Index', [
            'userRoles' => $roles
        ]);
    }

    public function create()
    {
        return Inertia::render('Master/UserRoles/Create', [
            'permissions' => Permission::select('id', 'name')->orderBy('id', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'permissions' => 'required|array',
            ]);

            $role = new Role();
            $role->name = $validatedData['name'];
            $role->guard_name = 'web';
            $role->description = $validatedData['description'];
            $role->save();

            $role->syncPermissions($validatedData['permissions']);

            DB::commit();
            // DB::rollBack();

            session()->flash('success', 'User role "' . $role->name . '" has been created.');
            return to_route('user-roles.index');
        } catch (\Exception $e) {
            DB::rollBack();
            session()->flash('error', 'There was an error creating the role: ' . $e->getMessage());
            return redirect()->back();
        }
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        return Inertia::render('Master/UserRoles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
            ],
            'permissions' => Permission::select('id', 'name')->orderBy('id', 'asc')->get(),
            'rolePermissions' => $role->permissions->pluck('name')->toArray(),
        ]);
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'permissions' => 'required|array',
            ]);

            $role = Role::findOrFail($id);
            $role->name = $validatedData['name'];
            $role->guard_name = 'web';
            $role->description = $validatedData['description'];
            $role->save();

            $role->syncPermissions($validatedData['permissions']);

            DB::commit();

            session()->flash('success', 'User role "' . $role->name . '" has been updated.');
            return to_route('user-roles.index');
        } catch (\Exception $e) {
            DB::rollBack();
            session()->flash('error', 'There was an error updating the role: ' . $e->getMessage());
            return redirect()->back();
        }
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('user-roles.index');
    }


}
