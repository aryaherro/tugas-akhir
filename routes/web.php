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
use Carbon\Carbon;
use Illuminate\Support\Facades\Date;
use phpDocumentor\Reflection\DocBlock\Tags\Factory\ParamFactory;

use function PHPSTORM_META\map;

Route::get('/tes', function () {
    return Inertia::render('tes');
})->name('tes');

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('permintaan-layanan', PermintaanLayananController::class)->except(['show', 'edit']);
    Route::get('/antrian', function () {
        $criteria = [
            [
                'nama' => 'Tipe Permintaan',
                'weight' => 0.3,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Triase',
                'weight' => 0.25,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Jarak',
                'weight' => 0.2,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Biaya',
                'weight' => 0.15,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Penjamin',
                'weight' => 0.1,
                'tipe' => 'benefit'
            ],
        ];
        $alternatives = array();
        $i = 0;
        if (request()->has('tanggal') && request()->tanggal != null) {
            $tanggal = Carbon::create(request()->tanggal)->format('Y-m-d');
            $permintaan = PermintaanLayanan::with([
                'tipe_permintaan',
                'pasien',
                'triase',
                'penjamin_biaya',
                'mobil',
                'unit',
                'creator',
                'status_permintaan',
                'driver',
            ])->whereDate('tanggal', $tanggal)->get();
        } else {
            request()->merge(['tanggal' => Carbon::now()->format('Y-m-d')]);
            $tanggal = Carbon::create(request()->tanggal)->format('Y-m-d');
            $permintaan = PermintaanLayanan::with([
                'tipe_permintaan',
                'pasien',
                'triase',
                'penjamin_biaya',
                'mobil',
                'unit',
                'creator',
                'status_permintaan',
                'driver',
            ])->whereDate('tanggal', $tanggal)->get();
        }
        foreach ($permintaan as $key) {
            array_push($alternatives, [
                'tanggal' => $key->tanggal,
                'nama' => $key->tipe_permintaan->nama . ' - ' . $key->triase->warna . ' - ' . $key->kilometer . 'KM - Rp.' . $key->biaya . ' - ' . $key->penjamin_biaya->nama . ' - ' . $key->unit->nama . ' - (' . $key->pasien->no_rm . ')' . $key->pasien->nama,
                'values' => [
                    $key->tipe_permintaan->bobot,
                    $key->triase->bobot,
                    $key->kilometer > 300 ? 1 : ($key->kilometer > 150 ? 2 : 3),
                    $key->biaya > 500000 ? 3 : ($key->biaya > 250000 ? 2 : 1),
                    $key->penjamin_biaya->bobot
                ]
            ]);
            $i++;
        }
        return Inertia::render('antrian', [
            'criteria' => $criteria,
            'alternatives' => $alternatives,
        ]);
    })->name('antrian');
    Route::get('dashboard', function () {
        $criteria = [
            [
                'nama' => 'Tipe Permintaan',
                'weight' => 0.3,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Triase',
                'weight' => 0.25,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Jarak',
                'weight' => 0.15,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Biaya',
                'weight' => 0.2,
                'tipe' => 'benefit'
            ],
            [
                'nama' => 'Penjamin',
                'weight' => 0.1,
                'tipe' => 'benefit'
            ],
        ];
        $alternatives = array();
        $i = 0;
        $tanggal = Carbon::now()->format('Y-m-d');
        $permintaan = PermintaanLayanan::with([
            'tipe_permintaan',
            'pasien',
            'triase',
            'penjamin_biaya',
            'mobil',
            'unit',
            'creator',
            'status_permintaan',
            'driver',
        ])->whereDate('tanggal', $tanggal)->get();
        foreach ($permintaan as $key) {
            array_push($alternatives, [
                'tanggal' => $key->tanggal,
                'nama' => $key->pasien->no_rm . ' - ' . $key->pasien->nama,
                'values' => [
                    $key->tipe_permintaan->bobot,
                    $key->triase->bobot,
                    $key->kilometer > 9 ? 3 : ($key->kilometer > 4 ? 2 : 1),
                    $key->biaya > 500000 ? 1 : ($key->biaya > 250000 ? 2 : 3),
                    $key->penjamin_biaya->bobot
                ]
            ]);
            $i++;
        }
        return Inertia::render('dashboard', [
            'criteria' => $criteria,
            'alternatives' => $alternatives,
        ]);
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
