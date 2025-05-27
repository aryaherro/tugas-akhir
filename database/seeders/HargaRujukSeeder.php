<?php

namespace Database\Seeders;

use App\Models\HargaRujuk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HargaRujukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'tujuan' => 'RSUD Dr. Soetomo',
                'harga' => 331000,
            ],
            [
                'tujuan' => 'RS William Booth',
                'harga' => 181000,
            ],
            [
                'tujuan' => 'RSAL',
                'harga' => 187000,
            ],
            [
                'tujuan' => 'RS Bhayangkara',
                'harga' => 238000,
            ],
            [
                'tujuan' => 'RSI Jemursari',
                'harga' => 250000,
            ],
            [
                'tujuan' => 'RS Husada Utama',
                'harga' => 337000,
            ],
            [
                'tujuan' => 'RSUD Soewandie',
                'harga' => 349000,
            ],
            [
                'tujuan' => 'RS Unair',
                'harga' => 394000,
            ],
            [
                'tujuan' => 'RS Mitra Keluarga Waru',
                'harga' => 397000,
            ],
            [
                'tujuan' => 'RS Bhakti Dharma Husada',
                'harga' => 577000,
            ],
            [
                'tujuan' => 'RS Haji',
                'harga' => 367000,
            ],
            [
                'tujuan' => 'RS Ubaya',
                'harga' => 250000,
            ],
            [
                'tujuan' => 'RSJ Menur',
                'harga' => 262000,
            ],
        ];
        foreach ($data as $item) {
            HargaRujuk::create($item);
        }
    }
}
