<?php

namespace App\Http\Controllers\MasterData;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\MasterData\ProjectBusinessType;

class ProjectBusinessTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/ProjectBusinessTypes');
    }

    public function create()
    {
        return Inertia::render('Master/ProjectBusinessTypes/Create');
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required',
                'description' => 'required',
            ]);

            ProjectBusinessType::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
            ]);

            DB::commit();
            return Inertia::render('Master/ProjectBusinessTypes');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }
}
