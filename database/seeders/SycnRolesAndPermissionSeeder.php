<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SycnRolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

         $permissions = [
            'create_project',
            'view_project',
            'update_project',
            'delete_project',
            'create_document_project',
            'view_document_project',
            'update_document_project',
            'delete_document_project',
            'create_project_version',
            'view_project_version',
            'update_document_project_version',
            'delete_document_project_version',
            'add_update_document_project_version',
            'manage_user',
            'manage_master_data',
        ];

        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        $adminRole = Role::where('name', 'Administrator')->first();
        $adminRole->syncPermissions($permissions);
        $admin = User::where('email', 'admin@example.com')->first(); 
        // $admin->assignRole($adminRole);
        if ($admin && $adminRole) {
            $admin->assignRole($adminRole);
        } 

        $projectManagerRole = Role::where('name', 'Project Manager')->first();
        $projectManagerRole->givePermissionTo([
            'view_project',
            'update_project',
            'create_document_project',
            'view_document_project',
            'update_document_project',
            'delete_document_project',
            'create_project_version',
            'view_project_version',
            'update_document_project_version',
            'delete_document_project_version',
            'add_update_document_project_version',
        ]);
        $projectManager = User::where('email', 'projectmanager@example.com')->first();
        // $projectManager->assignRole($projectManagerRole);
        if ($projectManager && $projectManagerRole) {
            $projectManager->assignRole($projectManagerRole);
        } 

        $guestRole = Role::where('name', 'Guest')->first();
        $guestRole->givePermissionTo([
            'view_project',
            'view_document_project',
        ]);
        $guest = User::where('email', 'guest@example.com')->first();
        $guest->assignRole($guestRole);
        if ($guest && $guestRole) {
            $guest->assignRole($guestRole);
        } 
        

    }
}
