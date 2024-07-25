<?php

namespace App\Repository;

use App\Enums\RoadmapLevelEnum;
use App\Helpers\GUID;
use App\Helpers\HistoryHelper;
use App\Models\Issue;
use App\Models\Roadmap;
use App\Models\RoadmapUser;
use Exception;

class RoadmapRepository
{
    public function save($json, $user) {
        $history = new HistoryHelper();
        // try to locate a Roadmap with the same guid, else, create a new one
        if (isset($json['guid'])) {
            $roadmap = Roadmap::where('guid', $json['guid'])->first();
            if (!$roadmap) {
                throw new Exception("O Cronograma que você quer editar não existe.", 404);
            }
            $history->setOldValue($roadmap->toArray());
        } else {
            $roadmap = new Roadmap();
            $roadmap->guid = GUID::generate();
            $roadmap->user_id = $user->id;
        }

        $roadmap->name = $json['name'];
        $roadmap->description = $json['description'];
        $roadmap->start_date = $json['start_date'];
        $roadmap->end_date = $json['end_date'];
        $roadmap->active = $json['active'];

        $roadmap->save();

        $history->setNewValue($roadmap->toArray());
        $history->save($user->id, $roadmap->id);

        return $roadmap;
    }

    public function loadFromGuid($guid, $userId) {
// SELECT s.*
// FROM schedules s
// LEFT JOIN roadmap_users ru ON s.id = ru.schedule_id
// WHERE s.id = :id
//   AND (s.user_id = :auth_id OR ru.user_id = :auth_id)
// LIMIT 1;

        $roadmap = Roadmap::leftJoin('roadmap_users', 'roadmaps.id', '=', 'roadmap_users.roadmap_id')
            ->where(function ($query) use ($userId) {
                $query->where('roadmaps.user_id', $userId)
                      ->orWhere('roadmap_users.user_id', $userId);
            })
            ->where('guid', $guid)
            ->distinct()
            ->select('roadmaps.*');

        $roadmap = $roadmap->first();

        if (!$roadmap) {
            throw new Exception("O Cronograma que você quer visualizar não existe.", 404);
        }
        $shareRepository = new RoadmapUsersRepository();// $shareRepository
        $roadmap->shares = $shareRepository->getSharedUsers($roadmap->id);
        // 0 - Owner, 1 - Editor, 2 - Viewer
        $roadmap->level = $this->getLevel($roadmap, $userId);

        return $roadmap;
    }

    public function loadDash($userId, $filter) {
        // $active: 0 - Inactive, 1 - Active, 2 - All
        $active = $filter['filter']['active'];

        // $roadmaps = Roadmap::where('user_id', $userId); // original with no share info

        $roadmaps = Roadmap::leftJoin('roadmap_users', 'roadmaps.id', '=', 'roadmap_users.roadmap_id')
            ->where(function ($query) use ($userId) {
                $query->where('roadmaps.user_id', $userId)
                      ->orWhere('roadmap_users.user_id', $userId);
            });

        if ($active !== 2) {
            $roadmaps = $roadmaps->where('active', ($active === 1 ? true : false));
        }
        $roadmaps = $roadmaps->distinct()
            ->select('roadmaps.*');

        $roadmaps = $roadmaps->get();

        $shareRepository = new RoadmapUsersRepository();
        foreach ($roadmaps as $roadmap) {
            $roadmap->shares = $shareRepository->getSharedUsers($roadmap->id);
        }
        return $roadmaps;
    }

    public function getLevel(Roadmap $roadmap, int $userId) {

        if ($roadmap->user_id === $userId) {
            return RoadmapLevelEnum::OWNER;
        }

        $shared = RoadmapUser::where('roadmap_id', $roadmap->id)
            ->where('user_id', $userId)
            ->first();

        if (!$shared) {
            throw new Exception("Sem acesso a este cronograma.", 404);
        }

        if ($shared->read_only === 1) {
            return RoadmapLevelEnum::VIEWER;
        } else {
            return RoadmapLevelEnum::EDITOR;
        }
    }
}

