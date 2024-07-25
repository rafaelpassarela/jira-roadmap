<?php

namespace App\Http\Controllers;

use App\Models\Contracts\Error;
use App\Repository\IssueRepository;
use App\Repository\RoadmapRepository;
use App\Repository\RoadmapUsersRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
* @OA\Schema(
*    schema="RoadmapModel",
*    required={"guid", "name", "description", "start_date", "end_date", "active", "shares"},
*    @OA\Property(
*       property="guid",
*       type="string",
*       example="6c71d92e-1af3-4597-a51c-e7689334b7ab"
*    ),
*    @OA\Property(
*       property="name",
*       type="string",
*       example="July 2024 - Roadmap"
*    ),
*    @OA\Property(
*       property="description",
*       type="string",
*       example="This is a test description"
*    ),
*    @OA\Property(
*       property="start_date",
*       type="string",
*       example="2024-07-01"
*    ),
*    @OA\Property(
*       property="end_date",
*       type="string",
*       example="2024-07-31"
*    ),
*    @OA\Property(
*       property="active",
*       type="boolean",
*       example="true"
*    ),
*    @OA\Property(
*       property="level",
*       description="0 - Owner, 1 - Editor, 2 - Viewer",
*       type="integer",
*       example="0"
*    ),
*    @OA\Property(
*       property="issues",
*       type="array",
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/IssueModel")
*           }
*       )
*    ),
*    @OA\Property(
*       property="shares",
*       type="array",
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ShareModel")
*           }
*       )
*    )
* )
* @OA\Schema(
*    schema="RoadmapModelList",
*    @OA\Property(
*       property="list",
*       type="array",
*       example={{
*         "guid": "6c71d92e-1af3-4597-a51c-e7689334b7ab",
*         "name": "July 2024 - Roadmap",
*         "description": "This is a test description",
*         "start_date": "2024-07-01",
*         "end_date": "2024-07-31",
*         "active": true
*       }, {
*         "guid": "6c71d92e-1af3-4597-a51c-e7689334b7ab",
*         "name": "July 2024 - Roadmap",
*         "description": "This is a test description",
*         "start_date": "2024-07-01",
*         "end_date": "2024-07-31",
*         "active": true
*       }},
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/RoadmapModel")
*           }
*       )
*    )
* )
*
* @OA\Schema(
*    schema="DashParamsModel",
*    required={"filter"},
*    @OA\Property(
*       property="filter",
*       type="object",
*       required={"active"},
*       @OA\Property(
*           property="active",
*           description="0 - Inactive, 1 - Active, 2 - All",
*           type="integer",
*           example="0"
*       )
*    )
* )
*/

class RoadmapController extends Controller {

/**
 * @OA\Put(
 *   tags={"Roadmap"},
 *   path="/api/v1/dash",
 *   operationId="getDash",
 *   description="Load a List of Roadmaps objects for current user.",
 *    @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/DashParamsModel")
 *       )
 *    ),
 *   @OA\Response(
 *       response="200",
 *       description="Roadmap list loaded successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing a list of Roadmaps",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/RoadmapModelList")
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
    public function loadDash(Request $request, RoadmapRepository $repository)
    {
        try {
            $json = $request->json()->all();
            $userId = $request->user()->id;
            $roadmaps = $repository->loadDash($userId, $json);

            return new Response(["list" => $roadmaps], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Post(
 *    tags={"Roadmap"},
 *    path="/api/v1/roadmap/",
 *    operationId="SaveRoadmap",
 *    description="Create or update a Roadmap object.",
 *    @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/RoadmapModel")
 *       )
 *    ),
 *    @OA\Response(
 *       response="200",
 *       description="Roadmap created successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing the saved Roadmap",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/RoadmapModel")
 *       })
 *    ),
 *    @OA\Response(
 *       response=404,
 *       description="Not Found",
 *       @OA\JsonContent(
 *          description="JSON object containing the error message",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/ErrorModel")
 *       })
 *    )
 * )
 */
    public function store(Request $request, RoadmapRepository $repository)
    {
        $json = $request->json()->all();
        $user = $request->user();

        try {
            $roadmap = $repository->save($json, $user);

            return new Response($roadmap,200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Get(
 *   tags={"Roadmap"},
 *   path="/api/v1/roadmap/{guid}/{itens}",
 *   operationId="LoadRoadmap",
 *   description="Load a Roadmap object by GUID.",
 *   @OA\Parameter(
 *      in="path",
 *      name="guid",
 *      required=true,
 *      description="GUID of the Roadmap",
 *      @OA\Schema(
 *          type="string",
 *          example="6c71d92e-1af3-4597-a51c-e7689334b7ab"
 *      )
 *   ),
 *   @OA\Parameter(
 *      in="path",
 *      name="itens",
 *      required=true,
 *      description="Load the Roadmap with the list of Issues (0-false/1-true).",
 *      @OA\Schema(
 *          type="number",
 *          example="1"
 *      )
 *   ),*
 *   @OA\Response(
 *       response="200",
 *       description="Roadmap created successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing the Roadmap identified by the GUID",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/RoadmapModel")
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
    public function loadFromGuid($guid, int $itens, Request $request, RoadmapRepository $repository, IssueRepository $issueRepository)
    {
        try {
            $userId = $request->user()->id;
            $roadmap = $repository->loadFromGuid($guid, $userId);

            if ($itens && $itens == 1) {
                $roadmap->issues = $issueRepository->getRoadmapIssues($roadmap->id);
            } else {
                $roadmap->issues = [];
            }

            return new Response($roadmap, 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Put(
 *   tags={"Roadmap"},
 *   path="/api/v1/roadmap/{guid}/sync",
 *   operationId="syncRoadmapIssues",
 *   description="Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).",
 *   @OA\Parameter(
 *      in="path",
 *      name="guid",
 *      required=true,
 *      description="GUID of the Roadmap",
 *      @OA\Schema(
 *          type="string",
 *          example="6c71d92e-1af3-4597-a51c-e7689334b7ab"
 *      )
 *   ),
 *   @OA\Response(
 *       response="200",
 *       description="Roadmap created successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing the Roadmap identified by the GUID",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/RoadmapModel")
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
    public function synchronize($guid, Request $request, JiraIssueController $jiraController, RoadmapRepository $roadmapRepository, IssueRepository $issueRepository)
    {
        try {
            $user = $request->user();
            $roadmap = $roadmapRepository->loadFromGuid($guid, $user->id);
            $jiraController->setToken("$user->email:$user->jira_token");

            // get updated issues from jira
            $issues = [];
            $filter = $issueRepository->getIssuesFilter($roadmap->id, $issues);
            if ($filter) {
                $arr = $jiraController->findIssues($roadmap->id, $filter, true, true);
                if ($arr['message'] != '') {
                    throw new Exception($arr['message'], 404);
                }
                $roadmap->issues = $arr['list'];
            }

            $issuesCollection = new Collection($roadmap->issues);
            $issueRepository->removeSyncIssues($roadmap->id, $user->id, $issuesCollection);

            return new Response($roadmap, 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

}
