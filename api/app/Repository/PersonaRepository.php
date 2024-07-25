<?php

namespace App\Repository;

use App\Models\Persona;

class PersonaRepository
{

    public static function getPersonaByAssignee($assignee) {
        $persona = Persona::where('name', $assignee)->orWhere('displayName', $assignee)->firstOrNew();

        if ($persona->id == 0) {
            $persona->name = $assignee;
            $arr = explode(" ", $assignee);
            if (count($arr) > 1) {
                $lastIndex = count($arr) - 1;
                $persona->displayName = trim(($arr[0] ? $arr[0] : '') . " " . ($arr[$lastIndex] ? $arr[$lastIndex] : ''));
            } else {
                $persona->displayName = $assignee;
            }
            $persona->save();
        }

        return $persona;
    }

    // public function save($userId, $roadmapId, $text) {

    // }
}

