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
                'nama' => 'IGD',
            ],
            [
                'nama' => 'Rawat Inap',
            ],
            [
                'nama' => 'Makkah',
            ],
            [
                'nama' => 'Madinah',
            ],
            [
                'nama' => 'Kamar Operasi',
            ],
            [
                'nama' => 'Layanan Transportasi',
            ],
        ];
        Unit::insert($data);
    }
}
