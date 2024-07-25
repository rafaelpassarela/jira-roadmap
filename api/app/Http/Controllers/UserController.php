<?php

namespace App\Http\Controllers;

use App\Helpers\GUID;
use App\Models\Contracts\Error;
use App\Repository\AccessTokenRepository;
use App\Repository\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
* @OA\Schema(
*    schema="UserValidationParam",
*    required={"userName"},
*    @OA\Property(
*       property="userName",
*       type="string",
*       example="john.smith"
*    )
* )
* @OA\Schema(
*    schema="SendCodeParam",
*    required={"email"},
*    @OA\Property(
*       property="email",
*       type="string",
*       example="john.smith@mybigcompany.com"
*    )
* )
* @OA\Schema(
*    schema="UserValidationResult",
*    required={"name", "avatarUrl", "email"},
*    @OA\Property(
*       property="name",
*       type="string",
*       example="John Smith"
*    ),
*    @OA\Property(
*       property="email",
*       type="string",
*       example="john.smith@mybigcompany.com"
*    ),
*    @OA\Property(
*       property="avatarUrl",
*       type="string",
*       example="https://r2.1k-cdn.com/sig/size:256/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fyazarlar%2F513202_c27ea_1586708018.jpg"
*    )
* )
*/

class UserController extends Controller
{

/**
* @OA\Put(
*    tags={"User"},
*    path="/api/v1/user/validate",
*    operationId="Validate",
*    description="If found, returns the username associated with the provided username.",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/UserValidationParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with user's name and avatar",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/UserValidationResult")
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
    public function validateJiraEmail(Request $request, JiraUserController $jiraUser, UserRepository $repository) {
        $json = $request->json()->all();

        try {
            // valida o usuário na base do Jira
            $data = $jiraUser->requestUserByEmail($json['userName']);
            if (sizeof($data['users']) <= 0) {
                return Error::getResponseByMessage('Nenhum usuário localizado no Jira com o e-mail informado.', 404);
            }

            $user = $repository->ConvertJiraUserToNormalUser($data['users'][0]);

            return new Response([
                "name" => $user->name,
                "email" => $user->email,
                "avatarUrl" => $user->avatarUrl
            ], 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Put(
*    tags={"User"},
*    path="/api/v1/user/sendcode",
*    operationId="SendCode",
*    description="Generates an authentication code for the specified user.",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/SendCodeParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK"
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
    public function getValidationCode(
        Request $request,
        UserRepository $repository,
        SendMailController $emailController,
        AccessTokenRepository $accessTokenRepository
    ) {
        $json = $request->json()->all();

        try {
            $email = $json['email'];
            $code = $repository->generateValidationCode($email, $accessTokenRepository);

            if ($code === false) {
                return Error::getResponseByMessage('Nenhum usuário localizado com o e-mail informado.', 404);
            }

            $emailController->validationCode($code);

            return new Response('', 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Delete(
*    tags={"User"},
*    path="/api/v1/user/removeTokenJira",
*    operationId="RemoveTokenJira",
*    description="Remove o token Jira cadastrado para o usuário logado.",
*    @OA\Response(
*       response=200,
*       description="OK"
*    ),
*    @OA\Response(
*       response=401,
*       description="Não autenticado",
*       @OA\JsonContent(
*           description="Objeto JSON contendo a mensagem de erro",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorMessageModel")
*       })
*    ),
*    @OA\Response(
*       response=404,
*       description="Não encontrado",
*       @OA\JsonContent(
*           description="Objeto JSON contendo a mensagem de erro",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    )
* )
*/
    public function removeTokenJira(Request $request, UserRepository $repository) {
        $user = $request->user();

        try {
            $repository->removeTokenJira($user);
            return new Response('', 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Post(
*    tags={"User"},
*    path="/api/v1/user/configTokenJira",
*    operationId="ConfigTokenJira",
*    description="Configures a new Jira token for the logged-in user. v4",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="text/plain",
*           @OA\Schema(
*               type="string",
*               example="6c71d92e-1af3-4597-a51c-e7689334b7ab"
*           )
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK"
*    ),
*    @OA\Response(
*       response=401,
*       description="Unauthorized",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorMessageModel")
*       })
*    ),
*    @OA\Response(
*       response=405,
*       description="Method Not Allowed",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    )
* )
*/
    public function configTokenJira(Request $request, UserRepository $repository) {
        $user = $request->user();
        $newToken = $request->getContent();

        try {
            $repository->configTokenJira($user, $newToken);
            return new Response('', 200);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}