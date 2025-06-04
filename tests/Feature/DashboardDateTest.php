<?php

use App\Models\User;
use App\Models\TipePermintaan;
use App\Models\Pasien;
use App\Models\Triase;
use App\Models\PenjaminBiaya;
use App\Models\Mobil;
use App\Models\Unit;
use App\Models\StatusPermintaan;
use App\Models\PermintaanLayanan;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

it('shows today data when no query is given', function () {
    $user = User::factory()->create();

    $tipe = TipePermintaan::create(['nama' => 'Rujuk', 'bobot' => 1]);
    $pasien = Pasien::create(['nama' => 'Test', 'no_rm' => '123456']);
    $triase = Triase::create(['warna' => 'Merah', 'keterangan' => 'test', 'bobot' => 1]);
    $penjamin = PenjaminBiaya::create(['nama' => 'Pribadi', 'bobot' => 1]);
    $mobil = Mobil::create(['nama' => 'TEST', 'plat_nomor' => 'AB123']);
    $unit = Unit::create(['nama' => 'Unit']);
    $status = StatusPermintaan::create(['nama' => 'Selesai']);

    PermintaanLayanan::create([
        'tanggal' => Carbon::now()->format('Y-m-d'),
        'tipe_permintaan_id' => $tipe->id,
        'pasien_id' => $pasien->id,
        'triase_id' => $triase->id,
        'penjamin_biaya_id' => $penjamin->id,
        'mobil_id' => $mobil->id,
        'unit_id' => $unit->id,
        'creator_id' => $user->id,
        'driver_id' => $user->id,
        'status_permintaan_id' => $status->id,
        'tujuan' => 'Test',
        'kilometer' => 10,
        'jam_berangkat' => '00:00:00',
        'jam_kembali' => '00:00:00',
        'kilometer_terakhir' => 20,
        'biaya' => 1000,
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $today = Carbon::now()->format('Y-m-d');

    $response->assertOk()
             ->assertInertia(fn (Assert $page) =>
                 $page->component('dashboard')
                      ->where('alternatives.0.tanggal', $today)
             );
});
