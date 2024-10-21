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
    public function index (){
        $users = UserProfiles::with('user:email')
        ->select('name', 'nik', 'phone')->get();

        // dd($users);
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function create(){
        return Inertia::render('User/Create', [
            'roles' => UserRoles::select('id', 'name')->get(),
            'divisions' => UserDivisions::select('id', 'name')->get(),
            'positions' => UserPosition::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request){
        DB::beginTransaction();
        try {
            // dd($request);
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

            // dd($validatedData);

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
        // return Inertia::location('User/Index');
    }


}
