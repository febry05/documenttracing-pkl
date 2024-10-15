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
        Schema::create('projects_documents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('document_number');
            $table->tinyInteger('priority'); // 1: Low, 2: Medium, 3: High
            $table->date('due_at');
            $table->unsignedBigInteger('project_id')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
