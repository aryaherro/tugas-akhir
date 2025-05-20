<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TipePermintaan;

class TipePermintaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Rujuk',
                'bobot' => 4
            ],
            [
                'nama' => 'J. Pasien',
                'bobot' => 3
            ],
            [
                'nama' => 'P. Pulang',
                'bobot' => 2
            ],
            [
                'nama' => 'Jenazah',
                'bobot' => 1
            ],
        ];
        foreach ($data as $item) {
            TipePermintaan::create($item);
        }
    }
}
