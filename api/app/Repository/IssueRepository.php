<?php

namespace App\Repository;

use App\Helpers\GUID;
use App\Helpers\HistoryHelper;
use App\Models\Issue;
use Exception;

class IssueRepository
{
    const DAY_SIZE   = 75;
    const DAY_OFFSET = 10;
    const DAY_SEPARETOR = 5;

    public function getRoadmapIssues(int $roadmapId) {
        return Issue::where('roadmap_id', $roadmapId)->get();
    }

    public function save($json, $roadmap, $userId) {

        $issue = Issue::where('roadmap_id', $roadmap->id)->where('keyJira', $json['keyJira'])->firstOrNew();
        if ($issue->id > 0) {
            throw new Exception("Tarefa já existe no cronograma.", 404);
        }

        $issue->roadmap_id = $roadmap->id;
        $issue->keyJira = $json['keyJira'];
        $issue->persona_id = PersonaRepository::getPersonaByAssignee($json['assignee'])->id;
        $issue->summary = $json['summary'];
        $issue->status = $json['status'];
        $issue->issueType = $json['issueType'];
        $issue->icoUrl = $json['icoUrl'];
        $issue->issueUrl = $json['issueUrl'];
        $issue->width = $json['width'];
        $issue->top = $json['top'];
        $issue->left = $json['left'];

        $issue->startDate = $this->getStartDate($roadmap->start_date, $json['left']);
        $issue->endDate = $this->getEndDate($issue->startDate, $json['width']);

        $issue->save();

        $history = new HistoryHelper();
        $history->save($userId, $roadmap->id, "Adicionou a tarefa " . $issue->keyJira);

        return $issue;
    }

    public function delete(string $keyJira, int $roadmapId, int $userId) {
        $issue = Issue::where('roadmap_id', $roadmapId)->where('keyJira', $keyJira)->first();
        if ($issue == null) {
            throw new Exception("Tarefa não encontrada no cronograma.", 404);
        }

        $history = new HistoryHelper();
        $history->save($userId, $roadmapId, "Removeu a tarefa " . $issue->keyJira);

        $issue->delete();
    }

    public function update($json, $roadmap, $userId) {
        $issue = Issue::where('roadmap_id', $roadmap->id)->where('keyJira', $json['key'])->first();
        if ($issue == null) {
            throw new Exception("Tarefa não encontrada no cronograma.", 404);
        }
        $history = new HistoryHelper();
        $history->setOldValue($issue->toArray());

        $issue->width = $json['width'];
        $issue->top = $json['top'];
        $issue->left = $json['left'];
        $issue->startDate = $this->getStartDate($roadmap->start_date, $json['left']);
        $issue->endDate = $this->getEndDate($issue->startDate, $json['width']);

        $issue->save();

        $history->setNewValue($issue->toArray());
        $history->save($userId, $roadmap->id, "Atualizou a tarefa " . $issue->keyJira);

        return $issue;
    }

    function getStartDate($roadmapStartDate, $left) {
        $left = $left - self::DAY_OFFSET;

        $startDate = date('Y-m-d', strtotime($roadmapStartDate . ' + ' . ($left / self::DAY_SIZE) . ' days'));

        return $startDate;
    }

    function getEndDate($issueStartDate, $width) {
        $width = $width + self::DAY_SEPARETOR;
        $days = ($width / self::DAY_SIZE) - 1;

        $endDate = date('Y-m-d', strtotime($issueStartDate . ' + ' . $days . ' days'));

        return $endDate;
    }

    public function getIssuesFilter(int $roadmapId, &$arr) {
        $arr = Issue::where('roadmap_id', $roadmapId)->get();

        $keyJiraList = $arr->pluck('keyJira')->toArray();

        if ($keyJiraList) {
            $filter = implode(', ', $keyJiraList);
            return "key in ($filter)";
        }

        return null;
    }

    public function removeSyncIssues(int $roadmapId, int $userId, $newIssueList) {
        $oldIssueList = Issue::where('roadmap_id', $roadmapId)->get();
        $oldList = $oldIssueList->pluck('keyJira')->toArray();

        $newList = $newIssueList->pluck('keyJira')->toArray();
        $diff = array_diff($oldList, $newList);

        if ($diff) {
            Issue::whereIn('keyJira', $diff)->where('roadmap_id', $roadmapId)->delete();

            $str = implode(', ', $diff);
            $history = new HistoryHelper();
            $history->save($userId, $roadmapId, "Removeu as tarefas $str");
        }
    }

}

