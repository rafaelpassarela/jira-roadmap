<?php

use App\Http\Controllers\ApiTestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\ProjectConfigController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\RoadmapUserController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
| Swagger Gen: "php artisan l5-swagger:generate" or run "composer swagger" script.
| PS.: You need to run inside "jiraroadmap_front" container, running bash script "./docker-run-phpfpm.sh"
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/test', function () {
//     return response()->json([
//         'code' => 200,
//         'message' => 'This is a Test',
//     ]);
// });
Route::get('v1/test', [ApiTestController::class, 'makeTest']);
Route::put('v1/test/mail', [ApiTestController::class, 'mailTest']);

// Auth
// Route::post('v1/auth/register', [AuthController::class, 'register']);
// Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/whoami', [AuthController::class, 'whoAmI'])->middleware('auth:sanctum');
Route::post('v1/auth/validate', [AuthController::class, 'validateToken'])->middleware('auth:sanctum');
Route::post('v1/auth/codelogin', [AuthController::class, 'codeLogin']);

// Config
Route::post('v1/config/get', [ConfigController::class, 'getConfigList']);
Route::post('v1/config/get/{id}', [ConfigController::class, 'getConfig']);

// User
Route::put('v1/user/validate', [UserController::class, 'validateJiraEmail']);
Route::put('v1/user/sendcode', [UserController::class, 'getValidationCode']);
Route::delete('v1/user/removeTokenJira', [UserController::class, 'removeTokenJira'])->middleware('auth:sanctum');
Route::post('v1/user/configTokenJira', [UserController::class, 'configTokenJira'])->middleware('auth:sanctum');

// Dash / Roadmap
Route::put('v1/dash/', [RoadmapController::class, 'loadDash'])->middleware('auth:sanctum');
Route::post('v1/roadmap/', [RoadmapController::class, 'store'])->middleware('auth:sanctum');
Route::get('v1/roadmap/{guid}/{itens}', [RoadmapController::class, 'loadFromGuid'])->middleware('auth:sanctum');
Route::put('v1/roadmap/{guid}/sync', [RoadmapController::class, 'synchronize'])->middleware('auth:sanctum');

// Roadmap User (Share Controller)
Route::put('v1/roadmap/share', [RoadmapUserController::class, 'addShare'])->middleware('auth:sanctum');
Route::delete('v1/roadmap/share', [RoadmapUserController::class, 'removeShare'])->middleware('auth:sanctum');

// Issues
Route::put('v1/issue/find', [IssueController::class, 'findIssues'])->middleware('auth:sanctum');
Route::post('v1/issue/{guid}/add', [IssueController::class, 'store'])->middleware('auth:sanctum');
Route::delete('v1/issue/{guid}/remove', [IssueController::class, 'remove'])->middleware('auth:sanctum');
Route::put('v1/issue/{guid}/update', [IssueController::class, 'update'])->middleware('auth:sanctum');

// Projects
Route::get('v1/project/config', [ProjectConfigController::class, 'findProjects'])->middleware('auth:sanctum');
Route::post('v1/project/config', [ProjectConfigController::class, 'store'])->middleware('auth:sanctum');
Route::delete('v1/project/config', [ProjectConfigController::class, 'remove'])->middleware('auth:sanctum');
