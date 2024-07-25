<?php

namespace App\Http\Controllers;

use App\Enums\PersonaTypeEnum;
use App\Models\Contracts\Error;
use DateTimeImmutable;
use Illuminate\Http\Request;

/**
* @OA\Get(
*    tags={"Test"},
*    path="/api/v1/test",
*    operationId="TestApi",
*    summary="API Communication Test, should return a JSON",
*    description="Returns a simple Ok message for API Connectivity test.",
*    @OA\Response(
*       response=200,
*       description="Success",
*       @OA\JsonContent(
*           description="JSON object containing the test message",
*           oneOf={
*               @OA\Schema(ref="#/components/schemas/TestModel")
*       })
*    ),
*    @OA\Response(response="404", description="Not Found")
* )
*
* @OA\Schema(
*    schema="TestModel",
*    required={"code", "message", "timestamp"},
*    @OA\Property(
*       property="code",
*       type="integer"
*    ),
*    @OA\Property(
*       property="message",
*       type="string"
*    ),
*    @OA\Property(
*       property="timestamp",
*       type="string"
*    )
* )
*/

class ApiTestController extends Controller
{
    /**
     * Return a JSON object with Ok message
    */
    public function makeTest() {
        return response()->json([
            'code' => 200,
            'message' => 'This is a Test v1 of Roadmap API',
            'timestamp' => date('l jS \of F Y h:i:s A')
        ]);
    }

    public function mailTest(Request $request, SendMailController $emailController) {
        try {
            $data = $request->validate([
                'email' => 'required|string|email'
            ]);

            $arr['code']    = 123456;
            $arr['name']    = 'Test User';
            $arr['email']   = $data['email'];
            $arr['expires'] = (new DateTimeImmutable())->format('Y-m-d H:i:s');

            $emailController->validationCode($arr);
        } catch (\Throwable $th) {
            return Error::getResponseByThrowable($th);
        }

    }

}