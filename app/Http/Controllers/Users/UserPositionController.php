<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Users\UserPosition;

class UserPositionController extends Controller
{
    // public function index()
    // {
    //     return Inertia::render('UserPosition/Index');
    // }

    // public function store(Request $request){
    //     {
    //         $request->validate([
    //             'name' => 'required|string|max:255',
    //             'description' => 'nullable|string',
    //         ]);

    //         $userPosition = new UserPosition();
    //         $userPosition->name = $request->input('name');
    //         $userPosition->description = $request->input('description');
    //         $userPosition->save();

    //         return redirect()->route('userpositions.index')->with('success', 'User position created successfully.');
    //     }
    // }

    // public function destroy($id){
    //     $userPosition = UserPosition::find($id);
    //     $userPosition->delete();

    //     return redirect()->route('userpositions.index')->with('success', 'User position deleted successfully.');
    // }
}
