<?php

namespace App\Repository;

use App\Models\History;

class HistoryRepository
{
    public function save($userId, $roadmapId, $text) {

        $history = new History();
        $history->user_id = $userId;
        $history->roadmap_id = $roadmapId;
        $history->history = $text;
        $history->save();
    }

}

