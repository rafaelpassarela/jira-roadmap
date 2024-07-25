<?php

namespace App\Models\Contracts;

use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Throwable;

/**
* @OA\Schema(
*    schema="ErrorModel",
*    required={"code", "error"},
*    @OA\Property(
*       property="code",
*       type="string",
*       example="42S22"
*    ),
*    @OA\Property(
*       property="error",
*       type="string",
*       example="Error message"
*    ),
*    @OA\Property(
*       property="message",
*       type="string",
*       example="Complementary Error message"
*    )
* )
* @OA\Schema(
*    schema="ErrorMessageModel",
*    required={"message"},
*    @OA\Property(
*       property="message",
*       type="string",
*       example="Unauthenticated"
*    )
* )
*/

class Error {

    private int $errorCode;
    private string $code;
    private string $error;

    private function createResponse() {
        return new Response([
            'code' => $this->code,
            'error' => $this->error,
        ], ($this->errorCode === 0) ? 400 : $this->errorCode);
    }

    public function getResponse(Throwable $th, int $errorCode = 400) {
        $this->code = $th->getCode();
        $this->error = $th->getMessage();
        $this->errorCode = $errorCode;

        return $this->createResponse();
    }

    public static function getResponseByThrowable(Throwable $th, int $errorCode = 0) {
        $e = new Error();
        $errorCode = ($errorCode === 0) ? $th->getCode() : $errorCode;
        if (!is_int($errorCode)) {
            $errorCode = 500;
        }

        return $e->getResponse($th, $errorCode);
    }

    public static function getResponseByMessage(string $message, int $errorCode = 400) {
        $e = new Error();
        $e->code = $errorCode;
        $e->error = $message;
        $e->errorCode = $errorCode;
        return $e->createResponse();
    }
}