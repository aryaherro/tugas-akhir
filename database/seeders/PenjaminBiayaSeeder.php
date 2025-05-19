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
            ],
            [
                'nama' => 'Asuransi Kesehatan',
            ],
            [
                'nama' => 'BPJS Kesehatan',
            ],
        ];

        foreach ($data as $item) {
            PenjaminBiaya::create($item);
        }
    }
}
