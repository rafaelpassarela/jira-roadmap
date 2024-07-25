<?php

namespace App\Http\Controllers;

use App\Models\Contracts\Error;
use App\Repository\IssueRepository;
use App\Repository\RoadmapRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;

/**
* @OA\Schema(
*    schema="FindIssueModel",
*    required={"guid", "filter", "subTasks"},
*    @OA\Property(
*       property="guid",
*       type="string",
*       example="455bbfd4-abcd-1234-8345-2d29d164699b"
*    ),
*    @OA\Property(
*       property="filter",
*       type="string",
*       example="project in (TES, ABC) or Key = XYZ-123"
*    ),
*    @OA\Property(
*       property="subTasks",
*       type="boolean",
*       example="true"
*    )
* )
*
* @OA\Schema(
*    schema="UpdateIssueModel",
*    required={"key", "top", "left", "width"},
*    @OA\Property(
*       property="key",
*       type="string",
*       example="ABC-1234"
*    ),
*    @OA\Property(
*       property="top",
*       type="number",
*       example="250"
*    ),
*    @OA\Property(
*       property="left",
*       type="number",
*       example="10"
*    ),
*    @OA\Property(
*       property="width",
*       type="number",
*       example="150"
*    )
* )
*
* @OA\Schema(
*    schema="IssueModel",
*    required={"keyJira", "summary", "status", "assignee", "startDate", "endDate", "issueType", "icoUrl", "issueUrl", "left", "top", "width", "css", "exists"},
*    @OA\Property(
*       property="keyJira",
*       type="string",
*       example="ABC-123"
*    ),
*    @OA\Property(
*       property="summary",
*       type="string",
*       example="Check the new feature"
*    ),
*    @OA\Property(
*       property="status",
*       type="string",
*       example="To Do"
*    ),
*    @OA\Property(
*       property="assignee",
*       type="string",
*       example="John Wick"
*    ),
*    @OA\Property(
*       property="startDate",
*       type="string",
*       example="2024-01-15"
*    ),
*    @OA\Property(
*       property="endDate",
*       type="string",
*       example="2024-01-20"
*    ),
*    @OA\Property(
*       property="issueType",
*       type="string",
*       example="Task"
*    ),
*    @OA\Property(
*       property="icoUrl",
*       type="string",
*       example="https://jira.com/ico.png"
*    ),
*    @OA\Property(
*       property="issueUrl",
*       type="string",
*       example="https://jira.com/ABC-123"
*    ),
*    @OA\Property(
*       property="left",
*       type="number",
*       example="175"
*    ),
*    @OA\Property(
*       property="top",
*       type="number",
*       example="250"
*    ),
*    @OA\Property(
*       property="width",
*       type="number",
*       example="145"
*    ),
*    @OA\Property(
*       property="css",
*       type="string",
*       example="done"
*    ),
*    @OA\Property(
*       property="exists",
*       type="boolean",
*       example="true"
*    )
* )
*
* @OA\Schema(
*    schema="IssueModelList",
*    required={"list"},
*    @OA\Property(
*       property="list",
*       type="array",
*       @OA\Items(
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/IssueModel")
*           }
*       )
*    )
* )
*/

class IssueController extends Controller
{

/**
 * @OA\Put(
 *   tags={"Issue"},
 *   path="/api/v1/issue/find",
 *   operationId="findIssues",
 *   description="Load a List of Issues objects for current user.",
 *    @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/FindIssueModel")
 *       )
 *    ),
 *   @OA\Response(
 *       response="200",
 *       description="Issue list loaded successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing a list of Issues",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/IssueModelList")
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
    public function findIssues(Request $request, JiraIssueController $jira, RoadmapRepository $roadmapRepository)
    {
        try {
            $json = $request->json()->all();
            $user = $request->user();
            $roadmap = $roadmapRepository->loadFromGuid($json['guid'], $user->id);

            $jira->setToken("$user->email:$user->jira_token");

            $filter = $json['filter'];
            // Regex para identificar o formato "LETTERS-NUMBERS"
            $projectKeyPattern = '/^[A-Za-z]+-\d+$/';
            if (preg_match($projectKeyPattern, $filter)) {
                $filter = "Key = $filter";
            }

            $arr = $jira->findIssues($roadmap->id, $filter, $json['subTasks']);
            if ($arr['message'] != '') {
                throw new Exception($arr['message'], 404);
            }

            return new Response(["list" => $arr['list']], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Post(
 *   tags={"Issue"},
 *   path="/api/v1/issue/{guid}/add",
 *   operationId="addIssue",
 *   description="Add an Issue to a Roadmap.",
 *   @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/IssueModel")
 *       )
 *   ),
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
 *       description="Issue added successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing the Issue added to the Roadmap",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/IssueModel")
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
    public function store($guid, Request $request, IssueRepository $issueRepository, RoadmapRepository $roadmapRepository)
    {
        try {
            $json = $request->json()->all();
            $user = $request->user();

            $roadmap = $roadmapRepository->loadFromGuid($guid, $user->id);
            $issue = $issueRepository->save($json, $roadmap, $user->id);

            return new Response($issue, 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Delete(
 *   tags={"Issue"},
 *   path="/api/v1/issue/{guid}/remove",
 *   operationId="removeIssue",
 *   description="Remove an Issue from Roadmap.",
 *   @OA\RequestBody(
 *       required=true,
 *       description="Issue Key",
 *       @OA\MediaType(
 *           mediaType="text/plain",
 *           @OA\Schema(
 *               type="string",
 *               example="ABC-1234"
 *           )
 *       )
 *   ),
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
 *   )
 * )
 */
    public function remove($guid, Request $request, IssueRepository $issueRepository, RoadmapRepository $roadmapRepository)
    {
        try {
            $keyJira = $request->getContent();
            $user = $request->user();
            $roadmap = $roadmapRepository->loadFromGuid($guid, $user->id);

            $issueRepository->delete($keyJira, $roadmap->id, $user->id);

            return new Response([], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
 * @OA\Put(
 *   tags={"Issue"},
 *   path="/api/v1/issue/{guid}/update",
 *   operationId="updateIssue",
 *   description="Update the Start and End date of a Roadmap Issue, and vertical pos.",
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
 *   @OA\RequestBody(
 *       required=true,
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(ref="#/components/schemas/UpdateIssueModel")
 *       )
 *   ),
 *   @OA\Response(
 *       response="200",
 *       description="Issue added successfully.",
 *       @OA\JsonContent(
 *          description="JSON object containing the Issue added to the Roadmap",
 *          oneOf={
 *              @OA\Schema(ref="#/components/schemas/IssueModel")
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
    public function update($guid, Request $request, IssueRepository $issueRepository, RoadmapRepository $roadmapRepository)
    {
        try {
            $json = $request->json()->all();
            $user = $request->user();
            $roadmap = $roadmapRepository->loadFromGuid($guid, $user->id);

            $issue = $issueRepository->update($json, $roadmap, $user->id);

            return new Response($issue, 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

}
