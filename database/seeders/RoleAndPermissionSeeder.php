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
            'description' => 'Web administrator adalah profesional teknis yang mengelola website.',
        ]);
        Role::firstOrCreate([
            'name' => 'Project Manager',
        'description' => 'Can Handle Project where he’s have. And only can see other Project if here doesn’t added in the project',
        ]);

        Role::firstOrCreate([
            'name' => 'Guest',
            'description' => 'Only see project and Document Project',
        ]);

        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
