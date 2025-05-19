<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kriteria extends Model
{
    protected $fillable = [
        'nama_kolom',
    ];

    public function bobots(): HasMany
    {
        return $this->hasMany(Bobot::class);
    }
    public function opsiBobots(): HasMany
    {
        return $this->hasMany(OpsiBobot::class);
    }
}
