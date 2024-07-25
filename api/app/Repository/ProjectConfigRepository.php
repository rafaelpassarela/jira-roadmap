<?php

namespace App\Repository;

use App\Models\ProjectConfig;
use Exception;

class ProjectConfigRepository
{
    public function save($json) {
        $project = ProjectConfig::where('project_key', $json['projectKey'])->firstOrNew();

        $project->project_key = $json['projectKey'];
        $project->start_date = $json['startDate'];
        $project->due_date = $json['dueDate'];

        $project->save();
        return $project;
    }

    public function delete($projectKey) {
        $project = ProjectConfig::where('project_key', $projectKey)->first();
        if ($project == null) {
            throw new Exception("Projeto não encontrada.", 404);
        }

        $project->delete();
    }

}

