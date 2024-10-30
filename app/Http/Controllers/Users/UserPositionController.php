<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\UserDivisions;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Users\UserPosition;
use App\Http\Controllers\Controller;

class UserPositionController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/UserPosition/Index',[
            'userdivisions' => UserDivisions::select('id', 'name')->get(),
            'userpositions' => UserPosition::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request){
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_divisions_id' => 'required|integer',
            ]);



            $userPosition = new UserPosition();
            $userPosition->name = $request->input('name');
            $userPosition->description = $request->input('description');
            $userPosition->save();

            return redirect()->route('userpositions.index')->with('success', 'User position created successfully.');
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
