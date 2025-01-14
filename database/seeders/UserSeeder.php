<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Seeder;
use App\Models\Users\UserProfile;
use Spatie\Permission\Models\Role;
use App\Models\MasterData\UserDivision;
use App\Models\MasterData\UserPosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //1
        User::factory()->create([
            'email' => 'angga.nova@apsupports.com',
            'password' => bcrypt('angganova'),
            'roles_id' => Role::select('id')->where('name', 'Administrator')->first()->id
        ]);

        //2
        User::create([
            'email' => 'pebri.prasetyo@apsupports.com',
            'password' => bcrypt('pebriprasetyo'),
            'roles_id' => Role::select('id')->where('name', 'Administrator')->first()->id,
        ]);

        //3
        User::create([
            'email' => 'anggraini.putri@apsupports.com',
            'password' => bcrypt('anggrainiputri'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //4
        User::create([
            'email' => 'anita.yolanda@apsupports.com',
            'password' => bcrypt('anitayolanda'),
            'roles_id' => Role::select('id')->where('name', 'Project Manager')->first()->id
        ]);

        //5
        User::create([
            'email' => 'aulia.sari2488@gmail.com',
            'password' => bcrypt('auliasari2488'),
            'roles_id' => Role::select('id')->where('name', 'Project Manager')->first()->id
        ]);

        //6
        User::create([
            'email' => 'dini.almira@apsupports.com',
            'password' => bcrypt('dinialmira'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //7
        User::create([
            'email' => 'dwi.hendra@apsupports.com',
            'password' => bcrypt('dwihendra'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //8
        User::create([
            'email' => 'ghassani.aelsa@apsupports.com',
            'password' => bcrypt('ghassaniaelsa'),
            'roles_id' => Role::select('id')->where('name', 'Project Manager')->first()->id
        ]);

        //9
        User::create([
            'email' => 'husni.mubarok@apsupports.com',
            'password' => bcrypt('husnimubarok'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //10
        User::create([
            'email' => 'ismail@apsupports.com',
            'password' => bcrypt('ismail'),
            'roles_id' => Role::select('id')->where('name', 'Project Manager')->first()->id
        ]);

        //11
        User::create([
            'email' => 'muhammad.dzikri@apsupports.com',
            'password' => bcrypt('muhammaddzikri'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //12
        User::create([
            'email' => 'riza.trianto@apsupports.com',
            'password' => bcrypt('rizatrianto'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //13
        User::create([
            'email' => 'rangga.despita@apsupports.com',
            'password' => bcrypt('ranggadespita'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //14
        User::create([
            'email' => 'ratih.wijayanti@apsupports.com',
            'password' => bcrypt('ratihwijayanti'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //15
        User::create([
            'email' => 'resky.pangestu@apsupports.com',
            'password' => bcrypt('reskypangestu'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //16
        User::create([
            'email' => 'rodhy.yudha@apsupports.com',
            'password' => bcrypt('rodhyyudha'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //17
        User::create([
            'email' => 'try.budi@apsupports.com',
            'password' => bcrypt('trybudi'),
            'roles_id' => Role::select('id')->where('name', 'Guest')->first()->id
        ]);

        //18
        User::create([
            'email' => 'astrid.prameswara@apsupports.com',
            'password' => bcrypt('astridprameswara'),
            'roles_id' => Role::select('id')->where('name', 'Branch Manager')->first()->id
        ]);

        //19
        User::create([
            'email' => 'trya.suma@apsupports.com',
            'password' => bcrypt('tryasuma'),
            'roles_id' => Role::select('id')->where('name', 'Project Manager')->first()->id
        ]);
    }
}
