<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Triase extends Model
{
    protected $fillable = [
        'warna',
        'keterangan',
    ];

    public function permintaanLayanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
