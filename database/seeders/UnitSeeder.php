<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Unit;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Ar Radhiin',
            ],
            [
                'nama' => 'IGD',
            ],
            [
                'nama' => 'Madinah',
            ],
            [
                'nama' => 'Makkah',
            ],
            [
                'nama' => 'Picu/Nicu/Perina',
            ],
            [
                'nama' => 'Ar Rayyan',
            ],
            [
                'nama' => 'R.R Intensif',
            ],
            [
                'nama' => 'Thaif',
            ],
            [
                'nama' => 'Binroh',
            ],
            [
                'nama' => 'Poli Umum',
            ],
            [
                'nama' => 'Al Kautsar',
            ],
            [
                'nama' => 'Ar Raudhah',
            ],
            [
                'nama' => 'ICU',
            ],
            [
                'nama' => 'Multazam',
            ],
            [
                'nama' => 'Rawat Jalan',
            ],
            [
                'nama' => 'An Nisa',
            ],
            [
                'nama' => 'Poli syaraf',
            ],
            [
                'nama' => 'Ponex IGD',
            ],
            [
                'nama' => 'Homecare',
            ],
        ];
        foreach ($data as $item) {
            Unit::create([
                'nama' => $item['nama'],
            ]);
        }
    }
}
