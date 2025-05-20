<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mobil;

class MobilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'ELF',
                'plat_nomor' => 'B 1234 CD',
            ],
            [
                'nama' => 'HIACE',
                'plat_nomor' => 'B 5678 EF',
            ],
            [
                'nama' => 'APV1',
                'plat_nomor' => 'B 9101 GH',
            ],
            [
                'nama' => 'APV2',
                'plat_nomor' => 'B 1213 IJ',
            ],
            [
                'nama' => 'TRAGA',
                'plat_nomor' => 'B 1415 KL',
            ]
        ];
        foreach ($data as $item) {
            Mobil::create([
                'nama' => $item['nama'],
                'plat_nomor' => $item['plat_nomor'],
            ]);
        }
    }
}
