<?php

namespace App\Repository;

use App\Enums\ConfigCodeEnum;
use App\Models\Config;
use Exception;
use Illuminate\Support\Facades\DB;

class ConfigRepository
{
    public function loadConfig(Array $arrList) {
        if (sizeof($arrList) == 0) {
            throw new Exception("Uma lista com IDs de Config. válidos não foi passada.", 405);
        }

        $data = DB::table('configs')
            ->select('id','value', 'key')
            ->whereIn('id', $arrList)
            ->where('api_visible', '=', '1')
            ->orderBy('id')
            ->get();

        $arr = [];
        foreach ($data as $key => $value) {
            $arr[] = array(
                'id' => $value->id,
                'key' => $value->key,
                'value' => $value->value);
        }

        return $arr;
    }

    public static function loadByID(int $id) {
        $config = Config::where('Id', '=', $id)->first();
        if ($config == null) {
            $config = new Config([
                'id' => 0,
                'key' => null,
                'value' => null
            ]);
        }

        return array(
            'id' => $config->id,
            'key' => $config->key,
            'value' => $config->value
        );
    }

    public static function loadByEnum(ConfigCodeEnum $enum) {
        return ConfigRepository::loadByID($enum->value);
    }

}

