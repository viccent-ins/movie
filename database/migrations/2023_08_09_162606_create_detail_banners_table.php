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
        Schema::create('detail_banners', function (Blueprint $table) {
            $table->id();
            $table->string('ban_title');
            $table->smallInteger('ban_star');
            $table->string('ban_desc');
            $table->smallInteger('ban_minute');
            $table->string('ban_file');
            $table->string('ban_bg_file');
            $table->longText('ban_summery');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_banners');
    }
};
