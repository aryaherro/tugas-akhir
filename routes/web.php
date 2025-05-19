<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\PermintaanLayananController;
use App\Models\PermintaanLayanan;
use App\Models\TipePermintaan;
use App\Models\StatusPermintaan;
use App\Models\Pasien;
use App\Models\Triase;
use App\Models\PenjaminBiaya;
use App\Models\Mobil;
use App\Models\Unit;
use App\Models\User;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/tes', function () {

            return Inertia::render('tes', [
                'criteria' => [
                    [
                        'nama' => 'Harga',
                        'weight' => 0.4,
                        'tipe' => 'cost'
                    ],
                    [
                        'nama' => 'Kualitas',
                        'weight' => 0.3,
                        'tipe' => 'benefit'
                    ],
                    [
                        'nama' => 'Layanan',
                        'weight' => 0.3,
                        'tipe' => 'benefit'
                    ],
                ],
                'alternatives' => [
                    [
                        'nama' => 'Produk A',
                        'values' => [50, 7, 9]
                    ],
                    [
                        'nama' => 'Produk B',
                        'values' => [30, 9, 8]
                    ],
                    [
                        'nama' => 'Produk C',
                        'values' => [40, 8, 7]
                    ],
                ]
            ]);
        })->name('tes');
    }
);
Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/tes2', function () {
            $tipe_permintaan = TipePermintaan::all();
            $pasien = Pasien::all();
            $triase = Triase::all();
            $penjamin_biaya = PenjaminBiaya::all();
            $mobil = Mobil::all();
            $unit = Unit::all();
            $creator = User::withoutRole('driver')->get();
            $status_permintaan = StatusPermintaan::all();
            $driver = User::role('driver')->get();
            return Inertia::render('tes2', [
                'tipe_permintaan' => $tipe_permintaan,
                'pasien' => $pasien,
                'triase' => $triase,
                'penjamin_biaya' => $penjamin_biaya,
                'mobil' => $mobil,
                'unit' => $unit,
                'creator' => $creator,
                'status_permintaan' => $status_permintaan,
                'driver' => $driver,
            ]);
        })->name('tes2');
    }
);

Route::resource('kegiatan', PermintaanLayananController::class)->except(['show', 'create', 'edit']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['role:admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::resource('users', AdminUserController::class)->except(['show', 'create', 'edit']);
        Route::resource('permissions', AdminPermissionController::class)->except(['show', 'create', 'edit']);
        Route::resource('roles', AdminRoleController::class)->except(['show', 'create', 'edit']);
    });
});




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
