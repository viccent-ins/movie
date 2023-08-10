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
        Schema::create('block_busters', function (Blueprint $table) {
            $table->id();
            $table->string('block_title');
            $table->string('block_desc');
            $table->string('block_amount_people')->nullable();
            $table->string('block_end_date')->nullable();
            $table->string('block_file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('block_busters');
    }
};
