<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleTableSeeder extends Seeder
{
    static $roles = [
        'admin',
        'user'
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::$roles as $role) {
            DB::table('roles')->insert([
                'name' => $role
            ]);
        }
    }
}
