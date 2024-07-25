<?php

namespace App\Helpers;

use App\Enums\ConfigCodeEnum;
use App\Repository\ConfigRepository;

class UserEmail
{
    public static function validateEmail(string $userName): string
    {
        $email = $userName;
        if (strpos($email, '@') === false) {
            // Handle the case when $userName does not have '@' char
            $config = ConfigRepository::loadByEnum(ConfigCodeEnum::JIRA_MAIL_DOMAIN);
            $email .= $config['value'];
        }

        return $email;
    }
}
