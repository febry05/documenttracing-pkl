<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Users\UserProfiles;
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
        return Inertia::render('User/Create');
    }

    public function store(Request $request){
        $validatedData = $request->validate([
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'name' => 'required|string|max:255', 
        'nik' => 'nullable|string|unique:user_profiles,nik',
        'phone' => 'nullable|string|unique:user_profiles,phone',
        'employee_no' => 'nullable|stringunique:user_profiles,empeloyee_no',
        'user_roles_id' => 'required|integer',
        'user_divisions_id' => 'required|integer',
        'user_positions_id' => 'required|integer',
    ]);

    $user = User::create([
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),  
    ]);

    $userProfile = UserProfiles::create([
        'user_id' => $user->id,  
        'name' => $validatedData['name'],
        'nik' => $validatedData['nik'] ?? null,  
        'phone' => $validatedData['phone'] ?? null,  
        'employee_no' => 'nullable|stringunique:user_profiles,nik',
        'user_roles_id' => $validatedData['user_roles_id'],  
        'user_divisions_id' => $validatedData['user_divisions_id'],  
        'user_positions_id' => $validatedData['user_positions_id'],  
    ]);

    $userProfile->save();
    return Inertia::render('User/Index');
    }


}
