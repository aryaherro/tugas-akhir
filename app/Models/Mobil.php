<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mobil extends Model
{
    protected $fillable = [
        'nama',
        'plat_nomor',
    ];

    public function permintaans_layanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
