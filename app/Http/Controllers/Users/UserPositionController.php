<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Users\UserPosition;
use App\Http\Controllers\Controller;

class UserPositionController extends Controller
{
    public function index()
    {
        $mockUserPositions = [
            [
                'id' => 1,
                'name' => 'Supervisor',
                'description' => 'Concerns greatest margaret him absolute entrance nay. Door neat week do find past he.',
                'division' => 'Operational',
            ],
            [
                'id' => 2,
                'name' => 'Facility Management & HSE',
                'description' => 'Be no surprise he honoured indulged.',
                'division' => 'Operational',
            ],
            [
                'id' => 3,
                'name' => 'Equipment & ICT Support',
                'description' => 'Unpacked endeavor six steepest had husbands her. Painted no or affixed it so civilly.',
                'division' => 'Operational',
            ],
            [
                'id' => 4,
                'name' => 'Intern',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'Operational',
            ],
            [
                'id' => 5,
                'name' => 'Accounting & Budgeting',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'Accounting & Asset Management',
            ],
            [
                'id' => 6,
                'name' => 'Treasury & Collections',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'Accounting & Asset Management',
            ],
            [
                'id' => 7,
                'name' => 'Asset Management',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'Accounting & Asset Management',
            ],
            [
                'id' => 8,
                'name' => 'HR Service',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'HC & GA Procurement',
            ],
            [
                'id' => 9,
                'name' => 'Relation',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'HC & GA Procurement',
            ],
            [
                'id' => 10,
                'name' => 'General Affair',
                'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
                'division' => 'HC & GA Procurement',
            ],
        ];

        $mockUserDivisions = [
            [
                'id' => 1,
                'name' => 'Commercial',
            ],
            [
                'id' => 2,
                'name' => 'Operational',
            ],
            [
                'id' => 3,
                'name' => 'Accounting & Asset Management',
            ],
            [
                'id' => 4,
                'name' => 'HC & GA Procurement',
            ]
        ];

        return Inertia::render('Master/UserPositions/Index', [
            'userPositions' => $mockUserPositions,
            'userDivisions' => $mockUserDivisions,
        ]);
    }

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
