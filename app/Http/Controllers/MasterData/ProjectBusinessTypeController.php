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
        $BusinessType = ProjectBusinessType::select('name','description')->get()->map(function ($business) {
            return [
                'id' => $business->id,
                'name' => $business->name,
                'description' => $business->description,
            ];
        });


        return Inertia::render('Master/ProjectBusinessTypes/Index', [
            'projectBusinessTypes' => $BusinessType,
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
            return Inertia::render('Master/ProjectBusinessTypes/Index')->with([
                'flash' => [
                    'status' => 'success',
                    'message' => 'Project Business Type created successfully'
                ],
            ]);
            // return redirect()->route('project-business-types.index')
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('status', 'error')
                ->with('message', 'Error creating Project Business Type: ' . $e->getMessage());
        }
    }

    public function update($id, Request $request){
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);
            
            $businessType = ProjectBusinessType::find($id);
            $businessType->name = $validatedData['name'];
            $businessType->description = $validatedData['description'];

            DB::commit();        
            return Inertia::render('Master/ProjectBusinessTypes/Index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
        

        // dd($validatedData);
        // $businessType->save();

    }
}
