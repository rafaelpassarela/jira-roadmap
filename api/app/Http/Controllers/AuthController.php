<?php

namespace App\Http\Controllers;

use App\Helpers\GUID;
use App\Models\Contracts\Error;
use App\Models\User;
use App\Repository\AccessTokenRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

/**
* @OA\Schema(
*    schema="UserModel",
*    required={"guid", "name", "avatarUrl", "email", "jira_accountType", "token_jira"},
*    @OA\Property(
*       property="guid",
*       type="string",
*       example="6c71d92e-1af3-4597-a51c-e7689334b7ab"
*    ),
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
*    ),
*    @OA\Property(
*       property="jira_accountType",
*       type="string",
*       example="local"
*    ),
*    @OA\Property(
*       property="has_jira_token",
*       type="boolean",
*       example="true"
*    ),
*    @OA\Property(
*       property="token_jira",
*       type="string",
*       example="ATATT****************************************A764C"
*    ),
* )
* @OA\Schema(
*    schema="CodeLoginParam",
*    required={"email", "code"},
*    @OA\Property(
*       property="email",
*       type="string",
*       example="john.smith@mybigcompany.com"
*    ),
*    @OA\Property(
*       property="code",
*       type="string",
*       example="123456"
*    )
* )
* @OA\Schema(
*    schema="TokenResult",
*    required={"access_token", "token_type", "user"},
*    @OA\Property(
*       property="access_token",
*       type="string",
*       example="12|RSqHCNuHuWpzYTCWdwX9xsWYtufGsr8UlBQq8hMs1e3f7e34"
*    ),
*    @OA\Property(
*       property="token_type",
*       type="string",
*       example="Bearer"
*    ),
*    @OA\Property(
*       property="expiration",
*       type="string",
*       example="2024-02-23T10:03:26Z"
*    ),
*    @OA\Property(
*       property="user",
*       type="object",
*       oneOf={
*           @OA\Schema(ref="#/components/schemas/UserModel")
*       }
*    )
* )
*/

class AuthController extends Controller
{
    private function getTokenResponse(string $token, User $user, DateTimeImmutable | NULL $expiration) {
        return new Response([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expiration' => ($expiration ? $expiration->format('Y-m-d\TH:i:s\Z') : NULL),
            'user' => $user
        ], 200);
    }

    public function register(Request $request) {
        // $validatedData = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:8',
        // ]);

        // $user = User::Create([
        //     'name' => $validatedData['name'],
        //     'email' => $validatedData['email'],
        //     'password' => Hash::make($validatedData['password']),
        //     'guid' => GUID::Generate()
        // ]);

        $json = $request->json()->all();

        $user = User::firstOrNew(['email' => $json['email']]);
        if ($user->id > 0) {
            return $this->getTokenResponse('ALREADY SENT', $user, null);
        }
        $user->name = $json['name'];
        $user->email = $json['email'];
        $user->password = '';
        $user->guid = GUID::Generate();
        $user->jira_token = '';
        $user->jira_accountId = null;
        $user->jira_accountType = 'sanctum';
        $user->avatarUrl = null;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return new Response([
            "access_token" => $token,
            "token_type" => 'Bearer'
        ], 200);
    }

    function getExpirationDate() {
        // return (new DateTimeImmutable())->modify('+2 minutes');
        return (new DateTimeImmutable())->modify('+7 days');
    }

    public function login(Request $request) {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->getTokenResponse($token, $user, $this->getExpirationDate());
    }

/**
* @OA\Post(
*    tags={"Auth"},
*    path="/api/v1/auth/codelogin",
*    operationId="CodeLogin",
*    description="Performs user login based on the code sent by email. Returns authentication data in case of success",
*    @OA\RequestBody(
*       required=true,
*       @OA\MediaType(
*           mediaType="application/json",
*           @OA\Schema(ref="#/components/schemas/CodeLoginParam")
*       )
*    ),
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with access token data",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/TokenResult")
*       })
*    ),
*    @OA\Response(
*       response=401,
*       description="Unauthorized. Invalid access code",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    ),
*    @OA\Response(
*       response=404,
*       description="Não encontrado",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorModel")
*       })
*    )
* )
*/
    public function codeLogin(Request $request, UserRepository $userRepository, AccessTokenRepository $accessTokenRepository) {
        try {
            $data = $request->only('email', 'code');
            if (!isset($data['email']) || !isset($data['code']) || empty($data['code'])) {
                return Error::getResponseByMessage('Dados obrigatórios não enviados.', 403);
            }

            $user = $userRepository->getUserByEmail($data['email']);
            if (!$user->exists) {
                return Error::getResponseByMessage('Nenhum usuário localizado com o e-mail informado.', 403);
            }

            $token = $accessTokenRepository->getAccessCode($user->id, $data['code']);
            if (!$token->exists) {
                return Error::getResponseByMessage('Código de acesso inválido.', 403);
            }

            $now = (new DateTimeImmutable())->format('Y-m-d H:i:s');
            if ($now > $token->expires_at) {
                return Error::getResponseByMessage('Código de acesso expirado.', 403);
            }

            $token->used_at = $now;
            $token->save();

            $user->password = Hash::make($data['code']);
            $user->save();

            $expires = $this->getExpirationDate();
            $token = $user->createToken('auth_token', ['*'], $expires)->plainTextToken;
            return $this->getTokenResponse($token, $user, $expires);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }
    }

/**
* @OA\Post(
*    tags={"Auth"},
*    path="/api/v1/auth/whoami",
*    operationId="WhoAmI",
*    description="Returns the data of the user identified by the bearerAuth token.",
*    @OA\Response(
*       response=200,
*       description="OK",
*       @OA\JsonContent(
*           description="JSON object with user data",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/UserModel")
*       })
*    ),
*    @OA\Response(
*       response=401,
*       description="Unauthorized",
*       @OA\JsonContent(
*           description="JSON object containing the error message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/ErrorMessageModel")
*       })
*    )
* )
*/
    public function whoAmI(Request $request) {
        $user = $request->user();
        if ($user == NULL) {
            return Error::getResponseByMessage('Nenhum usuário autenticado.', 401);
        }

        return $request->user();
    }

/**
* @OA\Post(
*    tags={"Auth"},
*    path="/api/v1/auth/validate",
*    operationId="ValidateToken",
*    description="Returns 200 for a valid token, otherwise 401.",
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
*    )
* )
*/
    public function validateToken(Request $request) {
        $user = $request->user();
        if ($user == NULL) {
            return Error::getResponseByMessage('Nenhum usuário autenticado.', 401);
        }

        return new Response([], 200);
    }
}
