<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(Request $request, User $user) {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'password' => 'required',
                'password_new' => 'required|min:6|max:255',
                'password_confirmation' => 'required|min:6|max:255',
            ]);

            $user = User::findOrFail(auth()->user()->id);

            if (!Hash::check($validatedData['password'], $user->password)) {
                DB::rollBack();
                session()->flash('error', 'Your current password is incorrect.');
                return to_route('profile.index');
            }

            if($validatedData['password_new'] == $validatedData['password']) {
                DB::rollBack();
                session()->flash('error', 'Your new password cannot be the same as your current password.');
                return to_route('profile.index');
            }

            $user->password = bcrypt($validatedData['password_new']);
            $user->save();

            DB::commit();
            session()->flash('success', 'Your password has been updated.');
            return to_route('profile.edit');
        } catch (\Exception $e) {
            DB::rollBack();
            session()->flash('fail', 'Failed to update your password: ' . $e->getMessage());
            return to_route('profile.edit');
        }
    }
}
