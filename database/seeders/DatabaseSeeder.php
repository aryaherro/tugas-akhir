<?php

namespace Database\Seeders;

use App\Models\Pasien;
use App\Models\StatusPermintaan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(MobilSeeder::class);
        $this->call(StatusPermintaanSeeder::class);
        $this->call(TipePermintaanSeeder::class);
        $this->call(PasienSeeder::class);
        $this->call(TriaseSeeder::class);
        $this->call(PenjaminBiayaSeeder::class);
        $this->call(UnitSeeder::class);
        $this->call(PermintaanLayananSeeder::class);
    }
}
