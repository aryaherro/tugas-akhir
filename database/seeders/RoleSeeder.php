<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(['show permission', 'add permission', 'edit permission', 'delete permission', 'show role', 'add role', 'edit role', 'delete role', 'show user', 'add user', 'edit user', 'delete user']);

        $role = Role::create(['name' => 'guest']);
        $role = Role::create(['name' => 'driver']);
    }
}
