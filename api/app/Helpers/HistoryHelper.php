<?php

namespace App\Helpers;

use App\Repository\HistoryRepository;

class HistoryHelper
{
    const OBJECT_CREATED = 'Novo Registro';
    const OBJECT_UPDATED = 'Registro Atualizado';

    private $historyRepository = null;
    private $oldValues = [];
    private $newValues = [];

    public function __construct() {
        $this->historyRepository = new HistoryRepository();
    }

    public function setOldValue(Array $arr) {
        $this->oldValues = $arr;
    }

    public function setNewValue(Array $arr) {
        $this->newValues = $arr;
    }

    public function save($userId, $roadmapId, $customMessage = null) {
        $log = [];
        $diffLog = [];
        $isNew = empty($this->oldValues);

        if ($customMessage) {
            $log['message'] = $customMessage;
        } else {
            $log['message'] = $isNew ? self::OBJECT_CREATED : self::OBJECT_UPDATED;
        }

        // $differences = array_diff($this->oldValues, $this->newValues);
        $differences = self::array_diff_multi_recursive($this->oldValues, $this->newValues);

        if (!empty($differences)) {
            foreach ($differences as $key => $value) {
                $diffLog[] = [
                    'key' => $key,
                    'old' => $this->oldValues[$key],
                    'new' => $this->newValues[$key]
                ];
            }
        }
        $log['diff'] = $diffLog;

        if (!empty($diffLog) || $isNew) {
            $this->historyRepository->save($userId, $roadmapId, json_encode($log));
        }
    }

    static function array_diff_multi_recursive($array1, $array2) {
        $difference = [];

        foreach ($array1 as $key => $value) {
            if (is_array($value)) {
                if (!isset($array2[$key]) || !is_array($array2[$key])) {
                    $difference[$key] = $value;
                } else {
                    $new_diff = HistoryHelper::array_diff_multi_recursive($value, $array2[$key]);
                    if (!empty($new_diff)) {
                        $difference[$key] = $new_diff;
                    }
                }
            } else if (!array_key_exists($key, $array2) || $array2[$key] !== $value) {
                $difference[$key] = $value;
            }
        }

        return $difference;
    }
}
