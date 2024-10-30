<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        //Feature
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

        // $permissions = Permission::create(['name' => 'create_project']);


        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Create the admin role
        $adminRole = Role::firstOrCreate(['name' => 'administrator']);
        $adminRole->syncPermissions($permissions);
        

        $projectManagerRole = Role::create(['name' => 'project_manager',]);
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


        $guestRole = Role::create(['name' => 'guest',]);
        $guestRole->givePermissionTo([
            'view_project',
            'view_document_project',
            'view_project_version',
        ]);
    }
}
