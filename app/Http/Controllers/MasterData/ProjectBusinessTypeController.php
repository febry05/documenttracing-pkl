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
        $BusinessType = ProjectBusinessType::select('id', 'name','description')->get()->map(function ($business) {
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
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:255',
            ]);

            ProjectBusinessType::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
            ]);

            DB::commit();
            return redirect()->route('project-business-types.index')
            ->with('success', 'Project Business Type "'. $request->name .'" has been created');
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
                'description' => 'nullable|string|max:255',
            ]);

            $businessType = ProjectBusinessType::find($id);
            $businessType->name = $validatedData['name'];
            $businessType->description = $validatedData['description'];
            $businessType->save();

            DB::commit();
            return redirect()->route('project-business-types.index')
            ->with('success', 'Project Business Type "'. $request->name .'" has been updated');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    public function destroy($id){
        DB::beginTransaction();
        try {
            $businessType = ProjectBusinessType::find($id);
            $businessType->delete();

            DB::commit();
            return redirect()->route('project-business-types.index')
            ->with('success', 'Project Business Type "'. $businessType->name .'" has been deleted');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }
}
