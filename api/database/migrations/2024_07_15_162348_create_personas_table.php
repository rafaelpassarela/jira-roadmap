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
        Schema::create('personas', function (Blueprint $table) {
            $table->id();
            $table->string('name', 250)->nullable(false);
            $table->string('displayName', 50)->nullable(false);
            $table->timestamps();

            $table->index('name');
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->dropColumn('assignee');
            $table->unsignedBigInteger('persona_id')->nullable()->after('roadmap_id');
            $table->foreign('persona_id')->references('id')->on('personas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personas');
    }
};
