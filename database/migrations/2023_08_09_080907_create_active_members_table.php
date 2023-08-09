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
        Schema::create('active_members', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('member_id');
            $table->decimal('member_profit', $precision = 10, $scale = 2);
            $table->string('member_image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_members');
    }
};
