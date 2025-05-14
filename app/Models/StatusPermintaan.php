<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusPermintaan extends Model
{
    protected $fillable = [
        'nama',
    ];

    public function permintaans_layanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
