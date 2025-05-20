<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipePermintaan extends Model
{
    protected $fillable = [
        'nama',
        'bobot'
    ];

    public function permintaans_layanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
