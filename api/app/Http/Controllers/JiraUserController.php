<?php

namespace App\Http\Controllers;

use App\Enums\ConfigCodeEnum;
use App\Enums\PersonaTypeEnum;
use App\Helpers\Rocket;
use App\Repository\ConfigRepository;
use Illuminate\Support\Facades\Http;

use function PHPUnit\Framework\isEmpty;

class JiraUserController extends BaseJiraController
{
    const URL = '/rest/api/3/user/picker?query={EMAIL}&showAvatar=true';

/*
{
    "users": [
        {
            "accountId": "abcd32232ce4be0071d12345",
            "accountType": "atlassian",
            "html": "Rafael Passarela - <strong>rafael.passarela@domain.com</strong>",
            "displayName": "Rafael Passarela",
            "avatarUrl": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/605932232ce4be0071d5f78f/702dfa5b-396b-48d2-9487-73899d7f6b16/48"
        }
    ],
    "total": 1,
    "header": "Showing 1 of 1 matching users"
}
*/

    function requestUserByEmail(string $userName) {
        $email = $userName;
        if (strpos($userName, '@') === false) {
            // Handle the case when $userName does not have '@' char
            $config = ConfigRepository::loadByEnum(ConfigCodeEnum::JIRA_MAIL_DOMAIN);
            $email .= $config['value'];
        }
        $paramURL = str_replace('{EMAIL}', $email, JiraUserController::URL);

        $url = $this->baseURL . $paramURL;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $this->token
        ])->get($url);

        if ($response->ok()) {
            $arr = $response->json();
            if (sizeof($arr['users']) > 0) {
                $arr['users'][0]["email"] = $email;
            }
            return $arr;
        } else {
            $this->message($response->status() . ' ' . $response->body());
            return null;
        }
    }

}
