<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PenjaminBiaya extends Model
{
    protected $fillable = [
        'nama',
    ];

    public function permintaanLayanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
