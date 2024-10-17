<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Users\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'email' => 'notverif@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}
