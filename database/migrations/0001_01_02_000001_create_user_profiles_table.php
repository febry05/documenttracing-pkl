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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nik')->unique();
            $table->string('phone');
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->default(0);
            $table->foreignId('user_role_id')->constrained()->default(0);
            $table->foreignId('user_division_id')->constrained()->default(0);
            $table->foreignId('user_position_id')->constrained()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
