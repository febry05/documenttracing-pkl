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
        $userDivisions = UserDivision::select('id', 'name', 'description')->get()->map(function ($divisions){
            return [
                'id' => $divisions->id,
                'name' => $divisions->name,
                'description' => $divisions->description,
                // 'division' => $userDivisions[$divisions->user_division_id]->name ?? 'N/A',
            ];
        });

        return Inertia::render('Master/UserDivisions/Index', [
            'userDivisions' => $userDivisions

        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        UserDivision::create($request->only('name', 'description'));

        return redirect()->route('user-divisions.index')->with('message', 'User Division created successfully');
    }

    public function update($id, Request $request){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $userDivision = UserDivision::findOrFail($id);
        $userDivision->update($validatedData);

        return redirect()->route('user-divisions.index')->with('message', 'User Division updated successfully');
    }

    public function destroy($id){
        UserDivision::findOrFail($id)->delete();

        return redirect()->route('user-divisions.index')->with('message', 'User Division deleted successfully');
    }
}
