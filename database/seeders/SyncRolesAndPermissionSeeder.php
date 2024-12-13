<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SyncRolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'Create Project',
            'View Project',
            'Update Project',
            'Delete Project',

            'Create Project Document',
            'View Project Document',
            'Update Project Document',
            'Delete Project Document',

            'Create Project Version',
            'View Project Version',
            'Update Project Document Version',
            'Delete Project Document Version',

            'View Update Project Document Version',
            'Add Update Project Document Version',
            'Delete Update Project Document Version',

            'Manage User',
            'Manage Master Data',
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
            'View Project',
            'Update Project',

            'Create Project Version',
            'View Project Version',
            'Update Project Document Version',
            // 'Delete Project Document Version',

            'Create Project Document',
            'View Project Document',
            'Update Project Document',
            // 'Delete Project Document',

            'Add Update Project Document Version',
        ]);
        $projectManager = User::where('email', 'projectmanager@example.com')->first();
        // $projectManager->assignRole($projectManagerRole);
        if ($projectManager && $projectManagerRole) {
            $projectManager->assignRole($projectManagerRole);
        }

        $guestRole = Role::where('name', 'Guest')->first();
        $guestRole->givePermissionTo([
            'View Project',
            'View Project Version',
            'View Project Document',
        ]);
        $guest = User::where('email', 'guest@example.com')->first();
        $guest->assignRole($guestRole);
        if ($guest && $guestRole) {
            $guest->assignRole($guestRole);
        }


    }
}
