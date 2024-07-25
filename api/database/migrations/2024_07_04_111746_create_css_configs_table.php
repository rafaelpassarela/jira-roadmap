<?php

use App\Models\CssConfig;
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
        Schema::create('css_configs', function (Blueprint $table) {
            $table->id();
            $table->string('status', 100)->nullable(false);
            $table->string('css', 100)->nullable(false);
            $table->timestamps();

            $table->index('status');
        });

        $configs = [
            ['status' => 'To Do', 'css' => 'todo'],
            ['status' => 'Aberto', 'css' => 'todo'],
            ['status' => 'Backlog', 'css' => 'todo'],
            ['status' => 'Pronto p/ Desenvolvimento', 'css' => 'todo'],
            ['status' => 'Selecionada', 'css' => 'todo'],
            ['status' => 'Selecionadas', 'css' => 'todo'],
            ['status' => 'Tarefas pendentes', 'css' => 'todo'],

            ['status' => 'In Progress', 'css' => 'inprogress'],
            ['status' => 'Aguardando Cliente', 'css' => 'inprogress'],
            ['status' => 'Aguardando Time Dev', 'css' => 'inprogress'],
            ['status' => 'Análise', 'css' => 'inprogress'],
            ['status' => 'Aplicando Mudança', 'css' => 'inprogress'],
            ['status' => 'Em Análise', 'css' => 'inprogress'],
            ['status' => 'Em andamento', 'css' => 'inprogress'],
            ['status' => 'Em Execução', 'css' => 'inprogress'],
            ['status' => 'Aguardando Publicação', 'css' => 'inprogress'],

            ['status' => 'Done', 'css' => 'done'],
            ['status' => 'Descartado', 'css' => 'done'],
            ['status' => 'Cancelado', 'css' => 'done'],
            ['status' => 'Concluído', 'css' => 'done'],
            ['status' => 'Descartado', 'css' => 'done'],
            ['status' => 'Entregue', 'css' => 'done'],
            ['status' => 'Publicação', 'css' => 'done'],
            ['status' => 'Publicado', 'css' => 'done']
        ];

        foreach ($configs as $config) {
            CssConfig::create($config);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('css_configs');
    }
};
