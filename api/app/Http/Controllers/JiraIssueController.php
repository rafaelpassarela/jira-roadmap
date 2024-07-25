<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\ProjectConfig;
use App\Repository\PersonaRepository;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class JiraIssueController extends BaseJiraController
{
    private $projConfig = NULL;

    public function __construct()
    {
        parent::__construct();
        $this->token = NULL;
    }

    public function findIssues(int $roadmapId, String $filter, bool $subTasks, bool $save = false) {
        $this->setMessage('', false);

        if (!$subTasks) {
            $filter = "($filter) and issueType in standardIssueTypes()";
        }

        $json = $this->requestIssue($filter);
        if (isset($json)) {
            return [
                "message" => "",
                "list" => $this->processIssueList($json, $roadmapId, $save)
            ];
        }

        return [
            "message" => $this->getMessage(),
            "list" => []
        ];
    }

    function processIssueList($jsonList, int $roadmapId, bool $save = false) {
        $arr = [];
        $issues = $jsonList["issues"];
        foreach ($issues as $key => $value) {
            // check issue
            $json = json_decode(json_encode($value), false);

            $issue = Issue::where('roadmap_id', $roadmapId)->where('keyJira', $value["key"])->firstOrNew();
            $issue->persona_id = PersonaRepository::getPersonaByAssignee(($json->fields->assignee ? $json->fields->assignee->displayName : '-'))->id;
            $issue->roadmap_id = $roadmapId;
            $issue->keyJira = $json->key;
            $issue->summary = $json->fields->summary;
            $issue->status = $json->fields->status->name;
            $issue->issueType = $json->fields->issuetype->name;
            $issue->icoUrl = $json->fields->issuetype->iconUrl;
            $issue->issueUrl = $this->getIssueURL($json->key);
            $issue->width = (!$issue->width ? 145 : $issue->width);
            $issue->top = (!$issue->top ? 250 : $issue->top);
            $issue->left = (!$issue->left ? 385 : $issue->left);

            if ($save) {
                $issue->save();

                // when saving, check the date in the task and if it is different, update it with the one from the database
                $dates = [];
                $this->getIssueDates($issue->keyJira, $dates, $value["fields"]);
                if ($issue->startDate != $dates['startDate'] || $issue->endDate != $dates['endDate']) {
                    $this->updateIssue($issue->keyJira, [
                        "fields" => [
                            $dates['config']['startDate'] => $issue->startDate,
                            $dates['config']['endDate'] => $issue->endDate
                        ]
                    ]);
                }
            }

            $arr[] = $issue;
        }

        return $arr;
    }

    function getIssueURL(string $key) {
        return $this->baseURL . "/browse/$key";
    }

    function getIssueDates($keyJira, &$dates, $arr) {
        if (!$this->projConfig) {
            $this->projConfig = ProjectConfig::get();
        }
        $key = explode("-", $keyJira);
        $key = $key[0];

        $config = $this->projConfig->firstWhere('project_key', $key);
        if (!$config) {
            $config = $this->projConfig->firstWhere('project_key', 'DEFAULT');
        }

        $dates['startDate'] = $arr[$config->start_date];
        $dates['endDate']   = $arr[$config->due_date];
        $dates['config']['startDate'] = $config->start_date;
        $dates['config']['endDate'] = $config->due_date;
    }

}
