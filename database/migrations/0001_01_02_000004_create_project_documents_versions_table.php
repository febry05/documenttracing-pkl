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
        Schema::create('project_document_versions', function (Blueprint $table) {
            $table->id();
            $table->string('version');
            $table->string('document_number', 30)->default('0');
            $table->date('release_date');  //Release date of the document for knowing this version for which document
            $table->dateTime('deadline')->nullable(); // Handle for Document Version Deadline if  is_auto == 0
            $table->boolean('is_generated')->default(false); // Flag to know if this version already generated or not
            $table->foreignId('project_document_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
sc      */
    public function down(): void
    {
        Schema::dropIfExists('projects_documents_versions');
    }
};
