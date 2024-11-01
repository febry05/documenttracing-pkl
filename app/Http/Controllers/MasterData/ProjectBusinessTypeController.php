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
        $mockProjectBusinessTypes = [
            [
                'id' => 1,
                'name' => 'Service',
                'description' => 'Left till here away at to whom past. Feelings laughing at no wondered repeated provided finished.',
            ],
            [
                'id' => 2,
                'name' => 'Rental',
                'description' => 'It acceptance thoroughly my advantages everything as. Are projecting inquietude affronting preference saw who.',
            ],
        ];

        return Inertia::render('Master/ProjectBusinessTypes/Index', [
            'projectBusinessTypes' => $mockProjectBusinessTypes,
        ]);
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
