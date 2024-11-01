<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Users\UserProfile;
use App\Models\MasterData\UserPosition;
use App\Models\MasterData\UserDivision;
use Spatie\Permission\Models\Role;
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

        $userProfile = UserProfile::with('user.roles','position')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->user->email,
                'position' => $user->position->name ?? 'N/A',
                'role' => $user->user->getRoleNames() ?? 'N/A',
            ];
        });
        // dd($userProfile);

        return Inertia::render('Users/Index', [
            'users' => $userProfile,
            'positions' => $mockPositions,
            'roles' => $mockRoles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'userRoles' => Role::select('id', 'name')->get(),
            'userDivisions' => UserDivision::select('id', 'name')->get(),
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
                'employee_no' => 'string|unique:user_profiles,employee_no',
                'roles_id' => 'required|integer',
                'user_division_id' => 'required|integer',
                'user_position_id' => 'required|integer',
            ]);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'roles_id' => $validatedData['roles_id'],
            ]);

            UserProfile::create([
                'user_id' => $user->id,
                'name' => $validatedData['name'],
                'nik' => $validatedData['nik'] ?? null,
                'phone' => $validatedData['phone'] ?? null,
                'employee_no' => $validatedData['employee_no'],
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

    public function edit(UserProfile $userProfile)
    {
        return Inertia::render('Users/Edit', [
            'user' => $userProfile,
            'userRoles' => Role::select('id', 'name')->get(),
            'userDivisions' => UserDivision::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name', 'user_division_id')->get(),
        ]);
    }



    // Delete this if all the functions are finishe
}
