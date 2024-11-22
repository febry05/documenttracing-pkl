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
        Schema::create('project_documents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('priority'); // 1: Low, 2: Medium, 3: High
            $table->unsignedTinyInteger('deadline_interval');
            $table->unsignedTinyInteger('base_deadline');
            $table->date('deadline');
            $table->foreignId('project_id')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects_documents');
    }
};
