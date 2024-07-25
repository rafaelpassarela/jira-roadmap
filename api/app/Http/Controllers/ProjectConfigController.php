<?php

namespace App\Http\Controllers;

use App\Models\ProjectConfig;
use App\Models\Contracts\Error;
use App\Repository\ProjectConfigRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;

/**
* @OA\Schema(
*    schema="ProjectConfigModel",
*    required={"projectKey", "startDate", "dueDate"},
*    @OA\Property(
*       property="projectKey",
*       type="string",
*       example="ABC"
*    ),
*    @OA\Property(
*       property="startDate",
*       type="string",
*       example="customfield_123"
*    ),
*    @OA\Property(
*       property="dueDate",
*       type="string",
*       example="customfield_456"
*    )
* )
*
* @OA\Schema(
*    schema="ProjectConfigModelList",
*    required={"list"},
*    @OA\Property(
*       property="list",
*       type="array",
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ProjectConfigModel")
*           }
*       )
*    )
* )
*/

class ProjectConfigController extends Controller
{
/**
 * @OA\Get(
 *   tags={"Project"},
 *   path="/api/v1/project/config",
 *   operationId="getProjects",
 *   description="Load a List of Projcts config objects.",
 *   @OA\Response(
 *       response="200",
 *       description="Project config list loaded successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing a list of Projects configs",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/ProjectConfigModelList")
 *       })
 *    ),
 *    @OA\Response(
 *       response=404,
 *       description="Not Found",
 *       @OA\JsonContent(
 *           description="JSON object containing the error message",
 *           oneOf={
 *               @OA\Schema(ref="#/components/schemas/ErrorModel")
 *       })
 *    )
 * )
 */
    public function findProjects()
    {
        try {
            $projects = ProjectConfig::orderBy('project_key')->get();

            return new Response(["list" => $projects], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Post(
 *   tags={"Project"},
 *   path="/api/v1/project/config",
 *   operationId="saveProject",
 *   description="Save the project param.",
 *   @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/ProjectConfigModel")
 *       )
 *   ),
 *   @OA\Response(
 *       response="200",
 *       description="Project config saved.",
 *       @OA\JsonContent(
 *          description="JSON object containing the saved project config",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/ProjectConfigModel")
 *       })
 *    ),
 *    @OA\Response(
 *       response=404,
 *       description="Not Found",
 *       @OA\JsonContent(
 *           description="JSON object containing the error message",
 *           oneOf={
 *               @OA\Schema(ref="#/components/schemas/ErrorModel")
 *       })
 *    )
 * )
 */
    public function store(Request $request, ProjectConfigRepository $repository)
    {
        try {
            $json = $request->json()->all();
            $project = $repository->save($json);

            return new Response($project, 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Delete(
 *   tags={"Project"},
 *   path="/api/v1/project/config",
 *   operationId="removeProject",
 *   description="Remove the project param.",
 *   @OA\RequestBody(
 *       required=true,
 *       description="Project Key",
 *       @OA\MediaType(
 *           mediaType="text/plain",
 *           @OA\Schema(
 *               type="string",
 *               example="ABC"
 *           )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="OK"
 *   ),
 *   @OA\Response(
 *       response=404,
 *       description="Not Found",
 *       @OA\JsonContent(
 *           description="JSON object containing the error message",
 *           oneOf={
 *               @OA\Schema(ref="#/components/schemas/ErrorModel")
 *       })
 *    )
 * )
 */
    public function remove(Request $request, ProjectConfigRepository $repository)
    {
        try {
            $key = $request->getContent();
            if ($key == 'DEFAULT') {
                throw new Exception("DEFAULT não pode ser removido.", 404);
            }

            $repository->delete($key);

            return new Response([], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }
}
