<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusPermintaan;

class StatusPermintaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Diterima',
            ],
            [
                'nama' => 'Diproses',
            ],
            [
                'nama' => 'Dalam Perjalanan',
            ],
            [
                'nama' => 'Selesai',
            ],
            [
                'nama' => 'Dibatalkan',
            ],
        ];
        StatusPermintaan::insert($data);
    }
}
