<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'admin')->first();
        DB::table('users')->insert([
            [
                'name' => 'Семен',
                'email' => 'semen@gmail.com',
                'phone' => '+38 098 234 23 21',
                'image' => 'admin.jpg',
                'lastName' => 'Підкаблучник',
                'password' => bcrypt('password'),
                'role_id'=>$admin->id
            ]
            // Add more user records as needed
        ]);
    }
}
