<?php

namespace App\Repository;

use App\Helpers\GUID;
use App\Models\AccessToken;
use App\Models\User;
use DateTimeImmutable;
use Exception;

class UserRepository
{
    public function getUserByEmail(string $email) {
        $user = User::firstOrNew(['email' => $email]);
        return $user;
    }

    public function ConvertJiraUserToNormalUser(Array $jiraData) {
        $user = $this->getUserByEmail($jiraData['email']);

        if (!$user->id) {
            $user->guid = GUID::Generate();
            $user->email = $jiraData['email'];
            $user->password = '';
            $user->jira_token = '';
        }

        $user->name = $jiraData['displayName'];
        $user->jira_accountId = $jiraData['accountId'];
        $user->jira_accountType = $jiraData['accountType'];
        $user->avatarUrl = $jiraData['avatarUrl'];
        $user->save();

        return $user;
    }

    public function generateValidationCode(string $email, AccessTokenRepository $accessTokenRepository) {
        $user = $this->getUserByEmail($email);
        if ($user->exists) {
            // valida o tempo desde o ultimo envio, deve ser maior que 1min, se ainda não expirou
            $lastRequest = $accessTokenRepository->getLastAccessCodeTime($user->id);
            if ($lastRequest) {
                $lastRequest = $lastRequest->modify('+1 minutes')->format('Y-m-d H:i:s');
                $now = (new DateTimeImmutable())->format('Y-m-d H:i:s');

                if ($lastRequest > $now) {
                    throw new Exception("Já existe um código aguardando confirmação. Aguarde 1min e tente novamente.", 404);
                }
            }

            $arr['code']    = random_int(100000, 999999);
            $arr['name']    = $user->name;
            $arr['email']   = $email;
            $arr['expires'] = (new DateTimeImmutable())->modify('+2 minutes')->format('Y-m-d H:i:s');

            // invalida codigos anteriores
            $accessTokenRepository->eraseAllValidationCodes($user->id, $arr['expires']);

            // insere novo codigo
            $accessTokenRepository->insertNewCode($user->id, $arr['code'], $arr['expires']);

            return $arr;
        }

        return false;
    }

    public function removeTokenJira(User $user) {
        $user->jira_token = '';
        $user->save();
    }

    public function configTokenJira(User $user, string $token) {
        // token não pode ser vazio e nem menor que 50 caracteres
        if (strlen($token) < 50) {
            throw new Exception("Token Jira inválido.", 405);
        }

        $user->jira_token = $token;
        $user->save();
    }
}

