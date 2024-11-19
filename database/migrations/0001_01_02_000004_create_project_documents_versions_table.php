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
        Schema::create('projects_documents_versions', function (Blueprint $table) {
            $table->id();
            $table->string('version');
            $table->string('document_number', 30);
            $table->date('release_date'); //Release date of the document for knowing this version for which document
            $table->foreignId('projects_document_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects_documents_versions');
    }
};
