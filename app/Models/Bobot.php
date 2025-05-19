<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bobot extends Model
{
    protected $fillable = [
        'kriteria_id',
        'opsi_bobot_id',
    ];

    public function kriteria(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class);
    }

    public function opsiBobot(): HasMany
    {
        return $this->hasMany(OpsiBobot::class);
    }
}
