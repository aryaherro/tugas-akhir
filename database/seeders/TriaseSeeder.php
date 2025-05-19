<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Triase;

class TriaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'warna' => 'Merah',
                'keterangan' => 'Kondisi kritis yang harus segera ditangani',
            ],
            [
                'warna' => 'Kuning',
                'keterangan' => 'Kondisi serius yang harus segera ditangani',
            ],
            [
                'warna' => 'Hijau',
                'keterangan' => 'Tidak segera ditangani',
            ],
            [
                'warna' => 'Hitam',
                'keterangan' => 'Tidak ada harapan hidup',
            ],
        ];
        foreach ($data as $item) {
            Triase::create($item);
        }
    }
}
