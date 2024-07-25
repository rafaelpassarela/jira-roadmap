<?php

namespace App\Http\Controllers;

use App\Models\Contracts\Error;
use App\Repository\ConfigRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
* @OA\Schema(
*    schema="GetConfigParam",
*    required={"idList"},
*    @OA\Property(
*       property="idList",
*       type="array",
*       example={1,2,3},
*       @OA\Items(
*           type="integer"
*       )
*    )
* )
* @OA\Schema(
*    schema="ConfigList",
*    @OA\Property(
*       property="list",
*       type="array",
*       example={{
*         "id": "1",
*         "key": "CONFIG_ENUM_NAME",
*         "value": "xyz"
*       }, {
*         "id": "5",
*         "key": "OTHER_ENUM_NAME",
*         "value": "1056"
*       }},
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ConfigItem")
*           }
*       )
*    )
* )
* @OA\Schema(
*    schema="ConfigItem",
*    required={"id", "key", "value"},
*    @OA\Property(
*        property="id",
*        type="integer",
*        example="1"
*    ),
*    @OA\Property(
*        property="key",
*        type="string",
*        example="CONFIG_ENUM_NAME"
*    ),
*    @OA\Property(
*        property="value",
*        type="string",
*        example="abc xyz"
*    )
* )
*/

class ConfigController extends Controller
{
    private $configRepository;

    public function __construct(ConfigRepository $configRepository) {
        $this->configRepository = $configRepository;
    }

/**
* @OA\Post(
*    tags={"Config"},
*    path="/api/v1/config/get",
*    operationId="GetConfigList",
*    description="Returns a list with the requested configuration values.",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/GetConfigParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with the list of configurations",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ConfigList")
*       })
*    ),
*    @OA\Response(
*       response=400,
*       description="Bad Request",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    ),
*    @OA\Response(response="404", description="Not Found")
* )
*/
    function getConfigList(Request $request) {
        $json = $request->json()->all();

        try {
            $result = $this->configRepository->loadConfig($json['idList']);

            return new Response([
                'list' => $result
            ], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Post(
*    tags={"Config"},
*    path="/api/v1/config/get/{id}",
*    operationId="GetConfig",
*    description="Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.",
*       @OA\Parameter(
*       description="Parameter referring to the configuration ID",
*       in="path",
*       name="id",
*       required=true,
*       @OA\Schema(type="integer")),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with the configuration item",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ConfigItem")
*       })
*    ),
*    @OA\Response(
*       response=400,
*       description="Bad Request",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    ),
*    @OA\Response(response="404", description="Not Found")
* )
*/
    function getConfig(int $id) {
        try {
            $config = ConfigRepository::loadByID($id);

            return new Response(
                $config
            , 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }
}


