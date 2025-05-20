<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        if (!$adminRole) {
            throw new \Exception('Admin role not found.');
        }
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($adminRole->name);

        $driverRole = Role::where('name', 'driver')->first();
        if (!$driverRole) {
            throw new \Exception('Driver role not found.');
        }
        User::create([
            'name' => 'Driver 1',
            'email' => 'driver1@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Resa Sholeman',
            'email' => 'resa@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Yohanes Murdianto',
            'email' => 'yohanes@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Ardiansyah',
            'email' => 'ardiansyah@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);
        User::create([
            'name' => 'Muchammad Tezar Pebrian',
            'email' => 'tezar@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'R. Arya Herro Kusumo Buditama',
            'email' => 'arya@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Ardian Dwi Tristanto',
            'email' => 'ardian@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Moh. Ibadis Sholikhin',
            'email' => 'ibadis@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Furqon Hadi Wibowo',
            'email' => 'furqon@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);

        User::create([
            'name' => 'Mas Shofiy Ahmad Alfirosy',
            'email' => 'shofiy@driver.com',
            'password' => Hash::make('12345678'),
        ])->assignRole($driverRole->name);
    }
}
