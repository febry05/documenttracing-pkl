<?php

namespace App\Http\Controllers\MasterData;

use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserPositionController extends Controller
{
    public function index()
    {    
        $userPositions = UserPosition::with('division')->get()->map(function ($position) {
            return [
                'id' => $position->id,
                'name' => $position->name,
                'description' => $position->description,
                'division' => $position->division->name ?? 'N/A',
            ];
        });

        return Inertia::render('Master/UserPositions/Index', [
            'userPositions' => $userPositions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Master/UserPositions/Create', [
            'userDivisions' => UserDivision::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request){
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_division_id' => 'required|integer',
            ]);



            $userPosition = new UserPosition();
            $userPosition->name = $request->input('name');
            $userPosition->description = $request->input('description');
            $userPosition->save();

            return redirect()->route('user-positions.index')->with('success', 'User position created successfully.');
        }
    }

    public function update(Request $request ,$id){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_divisions_id' => 'required|integer',
        ]);

        $userPosition = UserPosition::find($id);
        $userPosition->name = $request->input('name');
        $userPosition->description = $request->input('description');
        $userPosition->user_divisions_id = $request->input('user_divisions_id');
        $userPosition->save();

        return redirect()->route('userpositions.index')->with('success', 'User position updated successfully.');
    }

    public function destroy($id){
        $userPosition = UserPosition::find($id);
        $userPosition->delete();

        return redirect()->route('userpositions.index')->with('success', 'User position deleted successfully.');
    }
}
