<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function index(){
        $permissions = Permission::all();
        return view('permissions.index', compact('permissions'));
    }

    public function create(){
        $roles = Role::all();
        return view('permissions.create', compact('roles'));
    }

    public function store(Request $request){
        $permission = Permission::create(['name' => $request->name]);
        $permission->syncRoles($request->roles);

        return redirect()->route('permissions.index');
    }
}
