<?php

namespace App\Http\Controllers\MasterData;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\MasterData\UserDivision;

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
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $userDivision = new UserDivision();
            $userDivision->name = $validatedData['name'];
            $userDivision->description = $validatedData['description'];
            $userDivision->save();

            DB::commit();
            return redirect()->route('user-divisions.index')
            ->with('success', 'Division "'. $userDivision->name .'" has been created');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while creating the user division: ' . $e->getMessage()]);
        }
    }

    public function update($id, Request $request){
        DB::beginTransaction();
        try {
            $userDivision = UserDivision::find($id);
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $userDivision->name = $validatedData['name'];
            $userDivision->description = $validatedData['description'];
            $userDivision->save();

            DB::commit();
            return redirect()->route('user-divisions.index')
            ->with('success', 'Division "'. $userDivision->name .'" has been updated');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while updating the user division.']);
        }
    }

    public function destroy($id){
        DB::beginTransaction();
        try {
            $userDivision = UserDivision::find($id);
            $userDivision->delete();

            DB::commit();
            
            return redirect()->route('user-divisions.index')
            ->with('success', 'Division "'. $userDivision->name .'" has been deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while deleting the user division: ' . $e->getMessage()]);
        }
    }
}
