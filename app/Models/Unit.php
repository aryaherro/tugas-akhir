<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Unit extends Model
{
    protected $fillable = [
        'nama',
        'plat_nomor',
    ];

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'unit_user');
    }

    public function permintaans_layanan(): HasMany
    {
        return $this->hasMany(PermintaanLayanan::class);
    }
}
