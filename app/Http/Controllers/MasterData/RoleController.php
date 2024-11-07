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
        // dd($request);

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

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
            ]);

            $role = Role::find($id);
            $role->name = $validatedData['name'];
            $role->description = $validatedData['description'];
            $role->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'There was an error updating the role: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('user-roles.index');
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
}
