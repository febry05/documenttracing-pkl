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
        $userDivisions = UserDivision::all()->map(function ($divisions){
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
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
             ]);

            $userDivision = new UserDivision();
            $userDivision->name = $request->input('name');
            $userDivision->description = $request->input('description');
            $userDivision->save();

            DB::commit();
         } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while saving the user division.']);
        }

        return Inertia::render('Master/UserDivisions/Index');
        
    }
    public function update($id, Request $request){
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            ]);

            $userDivision = UserDivision::find($id);
            $userDivision->name = $validatedData['name'];
            $userDivision->description = $validatedData['description'];
            $userDivision->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while updating the user division.']);
        }

        return Inertia::render('Master/UserDivisions/Index');
    }

    public function destroy($id){
        $userDivision = UserDivision::find($id);
        $userDivision->delete();

        return Inertia::render('Master/UserDivisions/Index');
    }
}
