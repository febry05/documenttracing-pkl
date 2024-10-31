<?php

namespace App\Http\Controllers\MasterData;

use App\Models\MasterData\UserDivision;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserDivisionController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/UserDivisions/Index');
    }

    public function store(Request $request){
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $userDivision = new UserDivision();
            $userDivision->name = $request->input('name');
            $userDivision->description = $request->input('description');
            $userDivision->save();

            return redirect()->route('userdivisions.index')->with('success', 'User division created successfully.');
    }
    public function update($id, Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $userDivision = UserDivision::find($id);
        $userDivision->name = $request->input('name');
        $userDivision->description = $request->input('description');
        $userDivision->save();

        return redirect()->route('userdivisions.index')->with('success', 'User division updated successfully.');
    }

    public function destroy($id){
        $userDivision = UserDivision::find($id);
        $userDivision->delete();

        return redirect()->route('userdivisions.index')->with('success', 'User division deleted successfully.');
    }
}
