<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Users\UserRoles;

class UserRolesController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/UserRoles/Index');
    }

    public function store(Request $request){
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $userRole = new UserRoles();
            $userRole->name = $request->input('name');
            $userRole->description = $request->input('description');
            $userRole->save();

            return redirect()->route('userroles.index')->with('success', 'User role created successfully.');
        }
    }

    public function update($id, Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $userRole = UserRoles::find($id);
        $userRole->name = $request->input('name');
        $userRole->description = $request->input('description');
        $userRole->save();

        return redirect()->route('userroles.index')->with('success', 'User role updated successfully.');
    }

    public function destroy($id){
        $userRole = UserRoles::find($id);
        $userRole->delete();

        return redirect()->route('userroles.index')->with('success', 'User role deleted successfully.');
    }
}
