<?php

namespace App\Repository;

use App\Helpers\GUID;
use App\Models\AccessToken;
use App\Models\User;
use DateTimeImmutable;
use Exception;

class AccessTokenRepository
{

    public function eraseAllValidationCodes(int $userId, string $expirationDate) {
        AccessToken::where('user_id', $userId)
            ->whereNull('used_at')
            ->update(['used_at' => $expirationDate]);

        return true;
    }

    public function insertNewCode(int $userId, string $code, string $expirationDate) {
        $token = new AccessToken();
        $token->user_id = $userId;
        $token->token = $code;
        $token->expires_at = $expirationDate;
        $token->save();

        return true;
    }

    public function getAccessCode(int $userId, string $code) {
        $token = AccessToken::firstOrNew([
            'user_id' => $userId,
            'used_at' => NULL,
            'token'   => $code
        ]);

        return $token;
    }

    public function getLastAccessCodeTime(int $userId) {
        $token = AccessToken::where('user_id', $userId)->latest()->firstOrNew();
        if ($token->exists) {
            return $token->created_at; //->format('Y-m-d H:i:s');
        }
        return false;
    }

}