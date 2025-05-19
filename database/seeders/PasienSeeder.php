<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pasien;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {

            Pasien::create([
                'nama' => fake()->name(),
                'no_rm' => fake()->unique()->numerify('######'),
            ]);
        }
    }
}
