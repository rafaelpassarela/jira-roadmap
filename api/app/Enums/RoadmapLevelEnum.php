<?php

namespace App\Enums;

// 0 - Owner, 1 - Editor, 2 - Viewer

enum RoadmapLevelEnum: int
{
    case OWNER  = 0;
    case EDITOR = 1;
    case VIEWER = 2;
}

