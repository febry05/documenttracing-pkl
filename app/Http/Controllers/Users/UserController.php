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
    public function index()
    {
        $userRoles = UserPosition::select('name', 'description')->get()->map(function ($role) {
            return [
                'value' => $role->name,
                'label' => $role->name,
            ];
        });

        $userPositions = UserPosition::select('name', 'description')->get()->map(function ($position) {
            return [
                'value' => $position->name,
                'label' => $position->name,
            ];
        });

        $userProfile = UserProfile::with('user.roles','position')->select('id', 'name', 'user_id', 'user_position_id')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->user->email,
                'position' => $user->position->name ?? 'N/A',
                'role' => $user->user->getRoleNames() ?? 'N/A',
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $userProfile,
            'positions' => $userPositions,
            'roles' => $userRoles,
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

            $userProfile = UserProfile::create([
                'user_id' => $user->id,
                'name' => $validatedData['name'],
                'nik' => $validatedData['nik'] ?? null,
                'phone' => $validatedData['phone'] ?? null,
                'employee_no' => $validatedData['employee_no'],
                'user_division_id' => $validatedData['user_division_id'],
                'user_position_id' => $validatedData['user_position_id'],
            ]);

            $role = Role::findOrFail($validatedData['roles_id']);
            $user->assignRole($role->name);

            DB::rollBack();

            session()->flash('flash', [
                'status' => 'success',
                'message' => 'User "' . $userProfile->name . '" has been created.',
            ]);
            dd(session());
        return redirect()->route('users.index');
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            session()->flash('flash', [
                'status' => 'error',
                'message' => 'Problem occurred when creating user "' . $request->name . '".',
            ]);
            return redirect()->route('users.index');
        }
    }

    public function edit($id)
    {
        // Retrieve the user with related position, division, and roles
        // $user = User::with('roles', 'profile.position', 'profile.division')->findOrFail($id);
        $user = UserProfile::with('user.roles', 'position', 'division')->findOrFail($id);
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name ,
                'email' => $user->user->email,
                'nik' => $user->nik ,
                'phone' => $user->phone ,
                'employee_no' => $user->employee_no,
                'roles_id' => $user->user->first()->id ,
                'user_division_id' => $user->division->id,
                'user_position_id' => $user->position->id,
            ],
            'userRoles' => Role::select('id', 'name')->get(),
            'userDivisions' => UserDivision::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name', 'user_division_id')->get(),


        ]);
    }
}
