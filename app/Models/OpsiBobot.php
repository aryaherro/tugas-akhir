<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OpsiBobot extends Model
{
    protected $fillable = [
        'kriteria_id',
        'nama',
        'nilai',
    ];
    public function kriteria(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class);
    }
    public function bobot(): HasMany
    {
        return $this->hasMany(Bobot::class);
    }
}
