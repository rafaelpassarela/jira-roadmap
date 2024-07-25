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
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('roadmap_id')->nullable(false);
            $table->string('keyJira', 100)->nullable(false);
            $table->string('description', 255)->nullable(false);
            $table->string('status', 100)->nullable(false);
            $table->string('assignee', 100)->nullable();
            $table->date('startDate')->nullable(false);
            $table->date('endDate')->nullable(false);
            $table->string('issueType', 100)->nullable(false);
            $table->string('icoUrl', 255)->nullable(false);
            $table->string('issueUrl', 255)->nullable(false);
            $table->smallInteger('left')->nullable(false);
            $table->smallInteger('top')->nullable(false);
            $table->smallInteger('width')->nullable(false);
            $table->timestamps();

            $table->foreign('roadmap_id')->references('id')->on('roadmaps');
            $table->index('keyJira');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('issues');
    }
};
