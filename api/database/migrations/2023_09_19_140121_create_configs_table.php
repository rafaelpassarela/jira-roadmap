<?php

use App\Enums\ConfigCodeEnum;
use App\Models\Config;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->unsignedBigInteger('id', false)->nullable(false);
            $table->string('key', 50)->nullable(false);
            $table->string('value', 255)->nullable(false);
            $table->string('description', 50)->nullable(false);
            $table->timestamps();

            $table->primary('id');
        });

        // Insert some stuff
        $config = new Config(array(
            'id' => ConfigCodeEnum::JIRA_MAIL_DOMAIN,
            'key' => 'JIRA_MAIL_DOMAIN',
            'value' => '@mydomain.com.br',
            'description' => 'Jira account domain'
        ));
        $config->save();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configs');
    }
};
