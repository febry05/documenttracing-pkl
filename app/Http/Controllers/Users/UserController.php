<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Users\UserProfile;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller
{


    public function index()
    {
        $userRoles = Role::select('name')->get()->map(function ($role) {
            return [
                'value' => $role->name,
                'label' => $role->name,
            ];
        });

        $userPositions = UserPosition::select('name')->get()->map(function ($position) {
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
                'role' => $user->user->getRoleNames()[0] ?? 'N/A',
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

            DB::commit();

        return to_route('users.index')->with('success', 'User "' . $request->name . '" created successfully.');
        } catch (\Exception $e) {
            //dd($e);
            DB::rollBack();
            return to_route('users.index')->with('error', 'Problem occurred when creating user: "' . $e->getMessage() . '".');
        }
    }

    public function edit($id)
    {
        $user = UserProfile::with('user.roles', 'position', 'division')->findOrFail($id);
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name ,
                'email' => $user->user->email,
                'nik' => $user->nik ,
                'phone' => $user->phone ,
                'employee_no' => $user->employee_no,
                'roles_id' => $user->user->roles->first()->id ?? "N/A",
                'user_division_id' => $user->division->id,
                'user_position_id' => $user->position->id,
            ],
            'userRoles' => Role::select('id', 'name')->get(),
            'userDivisions' => UserDivision::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name', 'user_division_id')->get(),
        ]);
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'nullable|min:6',
                'name' => 'required|string|max:255',
                'nik' => 'nullable|string|unique:user_profiles,nik,' . $id,
                'phone' => 'nullable|string|unique:user_profiles,phone,' . $id,
                'employee_no' => 'string|unique:user_profiles,employee_no,' . $id,
                'roles_id' => 'required|integer',
                'user_division_id' => 'required|integer',
                'user_position_id' => 'required|integer',
            ]);

            // dd($validatedData);


            $user = User::findOrFail($id);
            $user->email = $validatedData['email'];
            if (!empty($validatedData['password'])) {
                $user->password = bcrypt($validatedData['password']);
            }
            $user->save();

            $userProfile = UserProfile::where('user_id', $user->id)->first();
            $userProfile->name = $validatedData['name'];
            $userProfile->nik = $validatedData['nik'] ?? null;
            $userProfile->phone = $validatedData['phone'] ?? null;
            $userProfile->employee_no = $validatedData['employee_no'];
            $userProfile->user_division_id = $validatedData['user_division_id'];
            $userProfile->user_position_id = $validatedData['user_position_id'];
            $userProfile->save();

            // dd($validatedData);

            $role = Role::findOrFail($validatedData['roles_id']);
            $user->syncRoles($role->name);

            DB::commit();
            return to_route('users.index')->with('success', 'User "' . $request->name . '" updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('users.index')->with('error', 'Problem occurred when creating user: "' . $e->getMessage() . '".');
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $user = User::findOrFail($id);
            $user->delete();
            DB::commit();
            return to_route('users.index')->with('success', 'User "' . $user->name . '" deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('users.index')->with('error', 'Problem occurred when deleting user: "' . $e->getMessage() . '".');
        }
    }
}
