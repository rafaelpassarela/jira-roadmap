<?php

namespace App\Http\Controllers;

use App\Helpers\UserEmail;
use App\Models\Contracts\Error;
use App\Repository\RoadmapRepository;
use App\Repository\RoadmapUsersRepository;
use App\Repository\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
* @OA\Schema(
*    schema="AddShareParam",
*    required={"guid", "email", "readOnly"},
*    @OA\Property(
*       property="guid",
*       type="string",
*       example="455bbfd4-abcd-1234-8345-2d29d164699b"
*    ),
*    @OA\Property(
*       property="email",
*       type="string",
*       example="john@test.com"
*    ),
*    @OA\Property(
*       property="readOnly",
*       type="boolean",
*       example="true"
*    )
* )
*
* @OA\Schema(
*    schema="RemoveShareParam",
*    required={"guid", "email"},
*    @OA\Property(
*       property="guid",
*       type="string",
*       example="455bbfd4-abcd-1234-8345-2d29d164699b"
*    ),
*    @OA\Property(
*       property="email",
*       type="string",
*       example="john@test.com"
*    )
* )
*
* @OA\Schema(
*    schema="ShareModel",
*    required={"id", "read_only", "user_email"},
*    @OA\Property(
*       property="id",
*       type="integer",
*       example="3"
*    ),
*    @OA\Property(
*       property="read_only",
*       type="integer",
*       example="0"
*    ),
*    @OA\Property(
*       property="user_email",
*       type="string",
*       example="john@test.com"
*    )
* )
*
* @OA\Schema(
*    schema="ShareModelList",
*    required={"list"},
*    @OA\Property(
*       property="list",
*       type="array",
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ShareModel")
*           }
*       )
*    )
* )
*/

class RoadmapUserController extends Controller
{
/**
* @OA\Put(
*    tags={"Roadmap"},
*    path="/api/v1/roadmap/share",
*    operationId="Share",
*    description="Share the current roadmap with a new user by email.",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/AddShareParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with all shared users",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ShareModelList")
*       })
*    ),
*    @OA\Response(
*       response=404,
*       description="Not found",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    )
* )
*/
    public function addShare(Request $request, RoadmapRepository $repository,
        UserRepository $userRepository, JiraUserController $jiraUserController,
        RoadmapUsersRepository $shareRepository)
    {

        try {
            $json = $request->json()->all();
            if (!isset($json['guid']) || !isset($json['email']) || !isset($json['readOnly'])) {
                return Error::getResponseByMessage('Parâmetros inválidos.', 400);
            }

            $user = $request->user();
            $roadmap = $repository->loadFromGuid($json['guid'], $user->id);

            $email = UserEmail::validateEmail($json['email']);

            $newUser = $userRepository->getUserByEmail($email);
            if (!$newUser->id) {
                $jiraData = $jiraUserController->requestUserByEmail($email);
                if (sizeof($jiraData['users']) <= 0) {
                    return Error::getResponseByMessage('Nenhum usuário localizado no Jira com o e-mail informado.', 404);
                }
                $newUser = $userRepository->ConvertJiraUserToNormalUser($jiraData['users'][0]);
            }

            $shareRepository->addShare($roadmap, $newUser->id, $json['readOnly']);

            $arr = $shareRepository->getSharedUsers($roadmap->id);
            return new Response(["list" => $arr], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Delete(
*    tags={"Roadmap"},
*    path="/api/v1/roadmap/share",
*    operationId="RemoveShare",
*    description="Remove the shared user from current roadmap by user email.",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/RemoveShareParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with all shared users",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ShareModelList")
*       })
*    ),
*    @OA\Response(
*       response=404,
*       description="Not found",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    )
* )
*/
    public function removeShare(Request $request, RoadmapRepository $repository, RoadmapUsersRepository $shareRepository, UserRepository $userRepository)
    {
        try {
            $json = $request->json()->all();
            if (!isset($json['guid']) || !isset($json['email'])) {
                return Error::getResponseByMessage('Parâmetros inválidos.', 400);
            }

            $user = $request->user();
            $roadmap = $repository->loadFromGuid($json['guid'], $user->id);

            $email = UserEmail::validateEmail($json['email']);

            $shareUser = $userRepository->getUserByEmail($email);
            if ($shareUser->id > 0) {
                $shareRepository->removeShare($roadmap, $shareUser->id);
            }

            $arr = $shareRepository->getSharedUsers($roadmap->id);
            return new Response(["list" => $arr], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }
}
