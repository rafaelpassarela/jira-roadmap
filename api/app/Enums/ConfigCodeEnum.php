<?php

namespace App\Enums;

// final class PersonaTypeEnum
// {
//     const ASSIGNEE = 'assignee';
//     const REPORTER = 'reporter';
//     const REVISOR  = 'revisor';
//     const CORESPONSAVEL = 'coresp';
// }

enum ConfigCodeEnum: int
{
    case JIRA_MAIL_DOMAIN = 1;
    case REPORTER = 2;
    case REVISOR  = 3;
    case CORESPONSAVEL = 4;
}

