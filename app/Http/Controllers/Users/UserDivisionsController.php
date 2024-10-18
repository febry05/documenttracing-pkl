<?php

namespace App\Http\Controllers;

use App\Models\Users\UserDivisions;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserDivisionsController extends Controller
{
    public function index()
    {
        return Inertia::render('UserDivision/Index');
    }

    public function store(Request $request){
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $userDivision = new UserDivisions();
            $userDivision->name = $request->input('name');
            $userDivision->description = $request->input('description');
            $userDivision->save();

            return redirect()->route('userdivisions.index')->with('success', 'User division created successfully.');
    }
}
