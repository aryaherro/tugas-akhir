<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PenjaminBiaya;

class PenjaminBiayaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Pribadi',
                'bobot' => 3,
            ],
            [
                'nama' => 'Asuransi Kesehatan',
                'bobot' => 2,
            ],
            [
                'nama' => 'BPJS Kesehatan',
                'bobot' => 1,
            ],
        ];

        foreach ($data as $item) {
            PenjaminBiaya::create($item);
        }
    }
}
