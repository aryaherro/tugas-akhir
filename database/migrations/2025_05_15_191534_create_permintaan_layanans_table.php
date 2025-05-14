<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permintaan_layanans', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->foreignId('tipe_permintaan_id')->constrained('tipe_permintaans')->onDelete('cascade');
            $table->foreignId('mobil_id')->constrained('mobils')->onDelete('cascade')->nullable();
            $table->foreignId('unit_id')->constrained('units')->onDelete('cascade');
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade')->nullable();
            $table->string('tujuan');
            $table->integer('kilometer');
            $table->foreignId('status_permintaan_id')->constrained('status_permintaans')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained('users')->onDelete('cascade')->nullable();
            $table->time('jam_berangkat')->nullable();
            $table->time('jam_kembali')->nullable();
            $table->integer('kilometer_terakhir')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_layanans');
    }
};
