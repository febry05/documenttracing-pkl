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
            $table->unsignedTinyInteger('deadline_interval'); // 1: Daily, 2: Weekly, 3: Monthly
            $table->unsignedTinyInteger('weekly_deadline')->nullable(); // 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday
            $table->unsignedTinyInteger('monthly_deadline')->nullable(); // 1-31
            $table->boolean('is_auto')->default(false);$table->foreignId('project_id')->onDelete('cascade');
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
