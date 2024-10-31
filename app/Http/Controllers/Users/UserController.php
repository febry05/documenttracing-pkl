<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Users\UserRoles;
use App\Models\Users\UserPosition;
use App\Models\Users\UserProfiles;
use Illuminate\Support\Facades\DB;
use App\Models\Users\UserDivisions;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index ()
    {
        $mockPositions = [
            ['value' => 'Intern', 'label' => 'Intern'],
            ['value' => 'ICT Staff', 'label' => 'ICT Staff'],
        ];

        $mockRoles = [
            ['value' => 'Administrator', 'label' => 'Administrator'],
            ['value' => 'Project Manager', 'label' => 'Project Manager'],
            ['value' => 'Guest', 'label' => 'Guest'],
        ];

        return Inertia::render('Users/Index', [
            'users' => $this->mockUsers,
            'positions' => $mockPositions,
            'roles' => $mockRoles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'userRoles' => UserRoles::select('id', 'name')->get(),
            'userDivisions' => UserDivisions::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name', 'user_division_id')->get(),
        ]);
    }

    public function store(Request $request){
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'name' => 'required|string|max:255',
                'nik' => 'nullable|string|unique:user_profiles,nik',
                'phone' => 'nullable|string|unique:user_profiles,phone',
                'employee_no' => 'nullable|string|unique:user_profiles,employee_no',
                'user_role_id' => 'required|integer',
                'user_division_id' => 'required|integer',
                'user_position_id' => 'required|integer',
            ]);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'user_role_id' => $validatedData['user_role_id'],
            ]);

            UserProfiles::create([
                'user_id' => $user->id,
                'name' => $validatedData['name'],
                'nik' => $validatedData['nik'] ?? null,
                'phone' => $validatedData['phone'] ?? null,
                'employee_no' => 'nullable|string|unique:user_profiles,nik',
                'user_division_id' => $validatedData['user_division_id'],
                'user_position_id' => $validatedData['user_position_id'],
            ]);

            DB::commit();
            return redirect()->route('users.index');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function edit($id)
    {
        $searchMockUser = array_search($id, array_column($this->mockUsers, 'id'));
        $mockUser = $this->mockUsers[$searchMockUser];

        return Inertia::render('Users/Edit', [
            'user' => $mockUser,
            'userRoles' => UserRoles::select('id', 'name')->get(),
            'userDivisions' => UserDivisions::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name', 'user_division_id')->get(),
        ]);
    }

    // Delete this if all the functions are finished
    protected $mockUsers = [
        [
            'id' => 1,
            'name' => "Pebri Prasetyo",
            'position' => "Supervisor",
            'role' => "Administrator",
            'email' => "febry05@gmail.com",
        ],
        [
            'id' => 2,
            'name' => "R.M Angga N H",
            'position' => "Equipment & ICT Support",
            'role' => "Administrator",
            'email' => "supanova@gmail.com",
        ],
        [
            'id' => 3,
            'name' => "Trya Suma A",
            'position' => "ICT Staff",
            'role' => "Project Manager",
            'email' => "sumsumm@gmail.com",
        ],
        [
            'id' => 4,
            'name' => "Muhammad Azhim Nugroho",
            'position' => "Intern",
            'role' => "Guest",
            'email' => "mazhn34@gmail.com",
        ],
        [
            'id' => 5,
            'name' => "Muhammad Ferdy Maulana",
            'position' => "Intern",
            'role' => "Guest",
            'email' => "ferdymaulana7404@gmail.com",
        ],
    ];

    protected $mockUserDivisions = [
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

    protected $mockUserPositions = [
        [
            'id' => 1,
            'name' => 'Supervisor',
            'description' => 'Concerns greatest margaret him absolute entrance nay. Door neat week do find past he.',
            'user_division_id' => '1',
        ],
        [
            'id' => 2,
            'name' => 'Equipment & ICT Support',
            'description' => 'Unpacked endeavor six steepest had husbands her. Painted no or affixed it so civilly.',
            'user_division_id' => '2',
        ],
        [
            'id' => 3,
            'name' => 'Intern',
            'description' => 'Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.',
            'user_division_id' => '3',
        ]
    ];

    protected $mockUserRoles = [
        [
            'id' => 1,
            'name' => 'Administrator',
            'description' => 'Web administrator adalah profesional teknis yang mengelola website.',
        ],
        [
            'id' => 2,
            'name' => 'Project Manager',
            'description' => 'Can Handle Project where he’s have. And only can see other Project if here doesn’t added in the project',
        ],
        [
            'id' => 4,
            'name' => 'Guest',
            'description' => 'Only see project and Document Project',
        ]
    ];
}
