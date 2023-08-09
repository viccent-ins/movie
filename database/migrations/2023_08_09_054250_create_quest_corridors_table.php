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
        Schema::create('quest_corridors', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->float('amount');
            $table->decimal('percentage',  $precision = 5, $scale = 2);
            $table->string('file')->nullable();
            $table->string('return')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quest_corridors');
    }
};
