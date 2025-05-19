<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermintaanLayanan extends Model
{
    protected $fillable = [
        'tanggal',
        'tipe_permintaan_id',
        'pasien_id',
        'triase_id',
        'penjamin_biaya_id',
        'mobil_id',
        'unit_id',
        'creator_id',
        'tujuan',
        'kilometer',
        'status_permintaan_id',
        'driver_id',
        'jam_berangkat',
        'jam_kembali',
        'kilometer_terakhir',
        'biaya',
    ];

    public function tipe_permintaan(): BelongsTo
    {
        return $this->belongsTo(TipePermintaan::class, 'tipe_permintaan_id');
    }
    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }
    public function triase(): BelongsTo
    {
        return $this->belongsTo(Triase::class, 'triase_id');
    }
    public function penjamin_biaya(): BelongsTo
    {
        return $this->belongsTo(PenjaminBiaya::class, 'penjamin_biaya_id');
    }
    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
    public function status_permintaan(): BelongsTo
    {
        return $this->belongsTo(StatusPermintaan::class, 'status_permintaan_id');
    }
    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
