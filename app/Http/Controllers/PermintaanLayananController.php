<?php

namespace App\Http\Controllers;

use App\Models\PermintaanLayanan;
use App\Models\TipePermintaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermintaanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('kegiatan', [
            'permintaans' => fn() => PermintaanLayanan::with(['kegiatan', 'user'])->paginate(10)->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $permintaanLayanan = PermintaanLayanan::create([
            'tanggal' => $request->tanggal,
            'tipe_permintaan_id' => TipePermintaan::find($request->tipe_permintaan_id),
        ]);
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