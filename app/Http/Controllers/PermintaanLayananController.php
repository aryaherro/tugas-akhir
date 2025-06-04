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
use App\Models\HargaRujuk;
use Illuminate\Support\Facades\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PermintaanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // if (request()->has('tanggal')) {
        //     $tanggal = Carbon::create(request()->tanggal)->format('Y-m-d');
        // }
        // if (request()->has('tanggal') && request()->tanggal != null) {
        //     $permintaans = PermintaanLayanan::with([
        //         'tipe_permintaan',
        //         'pasien',
        //         'triase',
        //         'penjamin_biaya',
        //         'mobil',
        //         'unit',
        //         'creator',
        //         'status_permintaan',
        //         'driver',
        //     ])->whereDate('tanggal', $tanggal)->paginate(10)->withQueryString();
        // } else {
        //     $permintaans = PermintaanLayanan::with([
        //         'tipe_permintaan',
        //         'pasien',
        //         'triase',
        //         'penjamin_biaya',
        //         'mobil',
        //         'unit',
        //         'creator',
        //         'status_permintaan',
        //         'driver',
        //     ])->paginate(10)->withQueryString();
        // }
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
        ])->get();
        return Inertia::render('kegiatan', [
            'permintaans' => fn() => $permintaans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // dd(PermintaanLayanan::pluck('tujuan')->unique());
        $tipe_permintaan = TipePermintaan::all();
        $pasien = Pasien::all();
        $triase = Triase::all();
        $penjamin_biaya = PenjaminBiaya::all();
        $mobil = Mobil::all();
        $unit = Unit::all();
        $creator = User::withoutRole('driver')->get();
        $status_permintaan = StatusPermintaan::all();
        $driver = User::role('driver')->get();
        $harga_rujuk = HargaRujuk::all();
        return Inertia::render('inputKegiatan', [
            'tipe_permintaan' => $tipe_permintaan,
            'pasien' => $pasien,
            'triase' => $triase,
            'penjamin_biaya' => $penjamin_biaya,
            'tujuan' => PermintaanLayanan::pluck('tujuan')->unique()->filter()->values(),
            'mobil' => $mobil,
            'unit' => $unit,
            'creator' => $creator,
            'status_permintaan' => $status_permintaan,
            'driver' => $driver,
            'harga_rujuk' => $harga_rujuk,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'nullable|date',
            'tipe_permintaan' => 'required|array',
            'tipe_permintaan.id' => 'required|exists:tipe_permintaan,id',
            'pasien' => 'required|array',
            'pasien.id' => 'required|exists:pasien,id',
            'triase' => 'required|array',
            'triase.id' => 'required|exists:triase,id',
            'penjamin_biaya' => 'required|array',
            'penjamin_biaya.id' => 'required|exists:penjamin_biaya,id',
            'tujuan' => 'nullable|string|max:255',
            'kilometer' => 'nullable|numeric|min:0',
            'status_permintaan' => 'required|array',
            'status_permintaan.id' => 'required|exists:status_permintaan,id',
            'creator' => 'required|array',
            'creator.id' => 'required|exists:users,id',
            'unit' => 'required|array',
            'unit.id' => 'required|exists:units,id',
        ]);

        $tipe_permintaan = TipePermintaan::find($request->tipe_permintaan['id']);
        $penjamin_biaya = PenjaminBiaya::find($request->penjamin_biaya['id']);
        $tujuan = $request->tujuan;
        $kilometer = $request->kilometer;
        $harga = 0;
        if ($tipe_permintaan->nama == 'Rujuk' && $penjamin_biaya->nama == 'BPJS') {
            $harga = HargaRujuk::where('tujuan', $tujuan)->value('harga');
        } else if ($tipe_permintaan->nama == 'Jenazah' || $tipe_permintaan->nama == 'P. Pulang') {
            if ($kilometer > 0 && $kilometer <= 5) {
                $harga = 150000;
            } else if ($kilometer > 5 && $kilometer <= 10) {
                $harga = 250000;
            } else if ($kilometer > 10) {
                $harga = 250000 + (($kilometer - 10) * 20000);
            }
        } else {
            if ($kilometer > 0 && $kilometer <= 5) {
                $harga = 250000;
            } else if ($kilometer > 5 && $kilometer <= 10) {
                $harga = 400000;
            } else if ($kilometer > 10) {
                $harga = 400000 + (($kilometer - 10) * 25000 * 1.5);
            }
        }

        PermintaanLayanan::create([
            'tanggal' => ($request->has('tanggal') && $request->tanggal != null) ? Carbon::create($request->tanggal)->addDay()->format('Y-m-d') : Carbon::now()->format('Y-m-d'),
            'tipe_permintaan_id' => TipePermintaan::find($request->tipe_permintaan['id'])->id,
            'pasien_id' => Pasien::find($request->pasien['id'])->id,
            'triase_id' => Triase::find($request->triase['id'])->id,
            'creator_id' => Auth::user()->id,
            'unit_id' => Unit::find($request->unit['id'])->id,
            'tujuan' => $request->tujuan,
            'kilometer' => $request->kilometer,
            'status_permintaan_id' => StatusPermintaan::find(($request->status_permintaan['id'] != 0) ? $request->status_permintaan['id'] : 1)->id,
            'mobil_id' => ($request->has('mobil') && $request->mobil != null) ? Mobil::find($request->mobil['id'])->id : null,
            'driver_id' => ($request->has('driver') && $request->driver != null) ? User::find($request->driver['id'])->id : null,
            'biaya' => $harga,
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
        $permintaanLayanan->delete();
        return redirect()->route('permintaan-layanan.index')->with('success', 'Permintaan Layanan Berhasil Dihapus');
    }
}
