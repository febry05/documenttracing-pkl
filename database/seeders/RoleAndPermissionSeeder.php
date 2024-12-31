<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // $permissions = [
        //     'create_project',
        //     'view_project',
        //     'update_project',
        //     'delete_project',
        //     'create_document_project',
        //     'view_document_project',
        //     'update_document_project',
        //     'delete_document_project',
        //     'create_project_version',
        //     'view_project_version',
        //     'update_document_project_version',
        //     'delete_document_project_version',
        //     'add_update_document_project_version',
        //     'manage_user',
        //     'manage_master_data',
        // ];

        // foreach ($permissions as $permissionName) {
        //     Permission::firstOrCreate(['name' => $permissionName]);
        // }

        Role::firstOrCreate([
            'name' => 'Administrator',
            'description' => 'Role that gives its users full access to the website app.',
        ]);
        Role::firstOrCreate([
            'name' => 'Project Manager',
            'description' => 'Role used for its users to be assigned to a project, allowing them to make changes to all aspects of the project, except for deleting it.',
        ]);

        Role::firstOrCreate([
            'name' => 'Guest',
            'description' => 'Role that allows its users to view project details in the website app, but not make any changes to it.',
        ]);

        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
