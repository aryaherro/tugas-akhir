<?php

namespace App\Http\Controllers;

use App\Models\PenjaminBiaya;
use App\Models\PermintaanLayanan;
use App\Models\TipePermintaan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pasien;
use App\Models\Triase;
use App\Models\User;
use App\Models\StatusPermintaan;
use App\Models\Unit;
use App\Models\Mobil;
use Illuminate\Support\Facades\Date;
use Mockery\Generator\StringManipulation\Pass\Pass;
use Carbon\Carbon;

class PermintaanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->has('tanggal')) {
            $tanggal = Carbon::create(request()->tanggal)->format('Y-m-d');
        }
        if (request()->has('tanggal') && request()->tanggal != null) {
            $permintaans = PermintaanLayanan::with([
                'tipe_permintaan',
                'pasien',
                'triase',
                'penjamin_biaya',
                'mobil',
                'unit',
                'creator',
                'status_permintaan',
                'driver',
            ])->whereDate('tanggal', $tanggal)->paginate(10)->withQueryString();
        } else {
            $permintaans = PermintaanLayanan::with([
                'tipe_permintaan',
                'pasien',
                'triase',
                'penjamin_biaya',
                'mobil',
                'unit',
                'creator',
                'status_permintaan',
                'driver',
            ])->paginate(10)->withQueryString();
        }
        return Inertia::render('kegiatan', [
            'permintaans' => fn() => $permintaans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tipe_permintaan = TipePermintaan::all();
        $pasien = Pasien::all();
        $triase = Triase::all();
        $penjamin_biaya = PenjaminBiaya::all();
        $mobil = Mobil::all();
        $unit = Unit::all();
        $creator = User::withoutRole('driver')->get();
        $status_permintaan = StatusPermintaan::all();
        $driver = User::role('driver')->get();
        return Inertia::render('inputKegiatan', [
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        PermintaanLayanan::create([
            'tanggal' => ($request->has('tanggal') && $request->tanggal != null) ? Carbon::create($request->tanggal)->addDay()->format('Y-m-d') : Carbon::now()->format('Y-m-d'),
            'tipe_permintaan_id' => TipePermintaan::find($request->tipe_permintaan['id'])->id,
            'pasien_id' => Pasien::find($request->pasien['id'])->id,
            'triase_id' => Triase::find($request->triase['id'])->id,
            'penjamin_biaya_id' => PenjaminBiaya::find($request->penjamin_biaya['id'])->id,
            'creator_id' => User::find($request->creator['id'])->id,
            'unit_id' => Unit::find($request->unit['id'])->id,
            'tujuan' => $request->tujuan,
            'kilometer' => $request->kilometer,
            'status_permintaan_id' => StatusPermintaan::find(($request->status_permintaan['id'] != 0) ? $request->status_permintaan['id'] : 1)->id,
        ]);

        return redirect()->route('permintaan-layanan.index')->with('success', 'Permintaan Layanan Berhasil Dibuat');
    }
    /**
     * Display the specified resource.
     */
    public function show(PermintaanLayanan $permintaanLayanan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermintaanLayanan $permintaanLayanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermintaanLayanan $permintaanLayanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermintaanLayanan $permintaanLayanan)
    {
        //
    }
}
