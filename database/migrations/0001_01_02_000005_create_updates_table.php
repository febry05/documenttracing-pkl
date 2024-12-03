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
        Schema::create('project_document_version_updates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->tinyInteger('status'); // 1 = Completed, 2 = On Process, 3 = Pending, 4 = Not Started
            $table->string('description');
            $table->string('document_link')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('project_document_version_id');
            $table->foreign('project_document_version_id', 'fk_docver_update')
                ->references('id')
                ->on('project_document_versions')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_document_version_updates');
    }
};
