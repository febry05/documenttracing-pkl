<?php

namespace App\Http\Controllers\Users;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Models\Users\UserProfile;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load(['profile', 'roles', 'profile.position', 'profile.division']);
        $user = [
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->profile->name,
            'employee_no' => $user->profile->employee_no,
            'nik' => $user->profile->nik,
            'phone' => $user->profile->phone,

            'role' => $user->roles[0]->name,
            'user_position' => $user->profile->position->name,
            'user_division' => $user->profile->division->name,
        ];

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'userRoles' => Role::select('id', 'name')->get(),
            'userPositions' => UserPosition::select('id', 'name')->get(),
            'userDivisions' => UserDivision::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        dd($request->all());
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'email' => 'required|email',
                'password' => 'nullable|min:6',
                'name' => 'required|string|max:255',
                'nik' => 'nullable|string',
                'phone' => 'nullable|string',
                'employee_no' => 'string',
            ]);

            $user = User::findOrFail($userId);
            $user->email = $validatedData['email'];
            $user->save();

            $userProfile = UserProfile::where('user_id', $user->id)->first();
            $userProfile->name = $validatedData['name'];
            $userProfile->nik = $validatedData['nik'] ?? null;
            $userProfile->phone = $validatedData['phone'] ?? null;
            $userProfile->employee_no = $validatedData['employee_no'];
            $userProfile->save();

            $request->user()->save();
            DB::commit();

            return to_route('profile.edit');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('profile.edit');
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
