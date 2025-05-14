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
            ],
            [
                'nama' => 'P. Pulang',
            ],
            [
                'nama' => 'J. Pasien',
            ],
            [
                'nama' => 'Jenazah',
            ],
        ];
        TipePermintaan::insert($data);
    }
}
