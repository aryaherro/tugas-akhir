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
                'nama' => 'Hiace',
                'plat_nomor' => 'B 5678 EF',
            ],
            [
                'nama' => 'APV 1',
                'plat_nomor' => 'B 9101 GH',
            ],
            [
                'nama' => 'APV 2',
                'plat_nomor' => 'B 1213 IJ',
            ],
        ];
        Mobil::insert($data);
    }
}
