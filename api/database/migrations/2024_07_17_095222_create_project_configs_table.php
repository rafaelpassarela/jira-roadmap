<?php

use App\Models\ProjectConfig;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_configs', function (Blueprint $table) {
            $table->id();
            $table->string('project_key', 50)->nullable(false);
            $table->string('start_date', 50)->nullable(false);
            $table->string('due_date', 50)->nullable(false);
            $table->timestamps();
        });

        Schema::table('project_configs', function (Blueprint $table) {
            $table->unique('project_key');
        });

        ProjectConfig::create([
            'project_key' => 'DEFAULT',
            'start_date' => 'customfield_10040',
            'due_date' => 'customfield_10041'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_configs');
    }
};
