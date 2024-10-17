<?php

namespace App\Http\Controllers;

use App\Models\Users\UserProfiles;
use Inertia\Inertia;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function index (){
        $users = UserProfiles::with('user:email')
        ->select('name', 'nik', 'phone')->get();
        
            return Inertia::render('User/Index');
    }
}
