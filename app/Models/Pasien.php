<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pasien extends Model
{
    protected $fillable = [
        'nama',
        'no_rm',
    ];

    public function permintaanLayanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
