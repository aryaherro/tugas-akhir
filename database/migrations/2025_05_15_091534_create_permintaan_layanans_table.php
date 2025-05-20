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
            $table->date('tanggal')->nullable();
            $table->foreignId('tipe_permintaan_id')->constrained('tipe_permintaans')->onDelete('cascade');
            $table->foreignId('pasien_id')->constrained('pasiens')->onDelete('cascade');
            $table->foreignId('triase_id')->constrained('triases')->onDelete('cascade');
            $table->foreignId('penjamin_biaya_id')->constrained('penjamin_biayas')->onDelete('cascade');
            $table->foreignId('unit_id')->nullable()->constrained('units')->onDelete('cascade');
            $table->foreignId('creator_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('tujuan');
            $table->integer('kilometer');
            $table->foreignId('status_permintaan_id')->constrained('status_permintaans')->onDelete('cascade');
            $table->foreignId('mobil_id')->nullable()->constrained('mobils')->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->time('jam_berangkat')->nullable();
            $table->time('jam_kembali')->nullable();
            $table->integer('kilometer_terakhir')->nullable();
            $table->integer('biaya')->nullable();
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
