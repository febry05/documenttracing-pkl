<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Users\UserPosition;
use App\Models\Users\UserProfiles;
use Illuminate\Support\Facades\DB;
use App\Models\Users\UserDivisions;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index (){
        $usersUnfiltered = UserProfiles::with(['user:id,email,roles_id', 'position:id,name'])
                            ->select('name', 'user_id')
                            ->get();

        $users = [];
        $positions = [];
        $roles = [];
        // foreach($usersUnfiltered as $user) {
        //     array_push($users, [
        //         'id' => $user->id,
        //         'name' => $user->name,
        //         'email' => $user->user->email,
        //         // 'position' => $user->position->name,
        //         'role' => $user->user->role->name,
        //     ]);
        // }

        /* FE requirements:
            - Buat variable 'users' strukturnya seperti berikut:
            $users = [
                {
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->user->email,
                    'position' => $user->position->name,
                    'role' => $user->user->role->name,
                },
                ...
            ];

            - Tampilkan juga semua record 'user_positions' & 'user_roles' dengan struktur seperti berikut. (used for filters)
            $positions = [
                {                                    // This item is mandatory, for filter reset
                    'value' => 'all',
                    'label' => 'All Positions',
                },
                {
                    'value' => $user_position->name,
                    'label' => $user_position->name,
                },
                ...
            ];

        */
        return Inertia::render('User/Index', [
            'users' => $users,
            'positions' => $positions,
            'roles' => $roles,
        ]);
    }

    public function create(){
        return Inertia::render('User/Create', [
            // 'roles' => UserRoles::select('id', 'name')->get(),
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
                'roles_id' => 'required|integer',
                'user_division_id' => 'required|integer',
                'user_position_id' => 'required|integer',
            ]);

            // dd($validatedData);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'roles_id' => $validatedData['roles_id'],
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
