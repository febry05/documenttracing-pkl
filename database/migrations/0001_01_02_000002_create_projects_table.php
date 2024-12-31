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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 20)->unique();
            $table->string('customer');
            $table->string('contract_number', 30)->unique();
            $table->date('contract_start');
            $table->date('contract_end');
            $table->timestamps();
            $table->foreignId('user_profile_id')->constrained()->default(0);
            $table->foreignId('project_business_type_id')->constrained()->default(0);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
