<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PasswordController extends Controller
{
    public function update(Request $request) {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'password' => 'required',
                'password_new' => 'required|min:6|max:255',
                'password_confirmation' => 'required|min:6|max:255',
            ]);

            DB::commit();
            return back()->with('success', 'Password updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update password');
        }
    }
}
