<?php

namespace App\Http\Controllers\Users;

use App\Models\MasterData\UserDivision;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserDivisionController extends Controller
{
    public function index()
    {
        $mockUserDivisions = [
            [
                'id' => 1,
                'name' => 'Commercial',
                'description' => 'Favourable pianoforte oh motionless excellence of astonished we principles. Warrant present garrets limited cordial in inquiry to.',
            ],
            [
                'id' => 2,
                'name' => 'Operational',
                'description' => 'Supported me sweetness behaviour shameless excellent so arranging.',
            ],
            [
                'id' => 3,
                'name' => 'Accounting & Asset Management',
                'description' => 'Nor hence hoped her after other known defer his. For county now sister engage had season better had waited.',
            ],
            [
                'id' => 4,
                'name' => 'HC & GA Procurement',
                'description' => 'Occasional mrs interested far expression acceptance. Day either mrs talent pulled men rather regret admire but.',
            ]
        ];

        return Inertia::render('Master/UserDivisions/Index', [
            'userDivisions' => $mockUserDivisions
        ]);
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
}
