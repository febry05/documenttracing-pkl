<?php

namespace App\Http\Controllers\Projects;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
