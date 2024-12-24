<?php

namespace App\Http\Controllers\MasterData;

use Exception;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;

class UserPositionController extends Controller
{
    public function index()
    {
        $userDivisions = UserDivision::all()->map(function ($divisions){
            return [
                'id' => $divisions->id,
                'name' => $divisions->name,
                'description' => $divisions->description,
                // 'division' => $userDivisions[$divisions->user_division_id]->name ?? 'N/A',
            ];
        });

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
            'userDivisions' => $userDivisions,
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
            DB::beginTransaction();
            try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_division_id' => 'required|integer',
            ]);

            $userPosition = new UserPosition();
            $userPosition->name = $request->input('name');
            $userPosition->description = $request->input('description');
            $userPosition->user_division_id = $request->input('user_division_id');
            $userPosition->save();

            DB::commit();
            return redirect()->route('user-positions.index')->with('success', 'Position '. $userPosition->name .' created successfully.');
            
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to create user position.']);
            }
        }
    }

    public function update($id,Request $request){
        DB::beginTransaction();
        try {
            $userPosition = UserPosition::find($id);
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_division_id' => 'required|integer',
            ]);

            $userPosition->name = $request->input('name');
            $userPosition->description = $request->input('description');
            $userPosition->user_division_id = $request->input('user_division_id');
            $userPosition->save();

            DB::commit();
            return redirect()->route('user-positions.index')->with('success', 'Position '. $userPosition->name .' updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to update user position.']);
        }
    }

    public function destroy($id){
        DB::beginTransaction();
        try {
            $userPosition = UserPosition::find($id);
            $userPosition->delete();

            DB::commit();
            return redirect()->route('user-positions.index')->with('success', 'Position '. $userPosition->name .' deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to delete user position.']);
        }
    }
}
