<?php

namespace App\Repository;

use App\Models\History;
use App\Models\Roadmap;
use App\Models\RoadmapUser;
use Exception;

class RoadmapUsersRepository
{
    public function getSharedUsers(int $roadmapId) {
        $users = RoadmapUser::where('roadmap_id', $roadmapId)->get();
        return $users;
    }

    public function addShare(Roadmap $roadmap, int $userId, bool $readOnly) {
        if ($roadmap->user_id == $userId) {
            throw new Exception("O usuário informado é o proprietário do cronograma.", 404);
        }

        $share = RoadmapUser::where('roadmap_id', $roadmap->id)
            ->where('user_id', $userId)
            ->firstOrNew();

        $share->read_only = $readOnly;
        if ($share->id == null) {
            $share->user_id = $userId;
            $share->roadmap_id = $roadmap->id;
        }
        $share->save();
    }

    public function removeShare(Roadmap $roadmap, int $userId) {
        if ($roadmap->user_id == $userId) {
            throw new Exception("O usuário informado é o proprietário do cronograma.", 404);
        }

        $share = RoadmapUser::where('roadmap_id', $roadmap->id)
            ->where('user_id', $userId)
            ->first();

        if ($share) {
            $share->delete();
        }
    }

}

