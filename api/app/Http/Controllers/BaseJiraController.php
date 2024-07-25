<?php

namespace App\Http\Controllers;

use App\Enums\PersonaTypeEnum;
use App\Helpers\Rocket;
use App\Models\Config;
use App\Models\Filters;
use App\Models\Issues;
use App\Models\IssuesPersonas;
use Illuminate\Support\Facades\Http;

use function PHPUnit\Framework\isEmpty;

class BaseJiraController extends Controller
{
    protected $baseURL;
    protected $token;
    protected $message = '';

    public function __construct() {
        $this->baseURL = env('JIRA_URL');
        $this->token   = env('JIRA_TOKEN');
    }

    protected function getBaseURL() {
        return $this->baseURL;
    }

    public function setToken($token)
    {
        $this->token = $token;
    }

    protected function setMessage(String $message, bool $append = true) {
        if ($append) {
            $this->message .= $message;
        } else {
            $this->message = $message;
        }
    }

    protected function getMessage() {
        return $this->message;
    }

    protected function requestIssue(string $filter) {
        $url = $this->baseURL . '/rest/api/3/search';

        $body = array(
            "expand" => array(""),
            "fields" => array(
                "*navigable"
            ),
            "fieldsByKeys" => false,
            "jql" => $filter,
            "maxResults" => 150,
            "startAt" => 0
        );

        $base64_token = base64_encode($this->token);

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $base64_token
        ])->post($url, $body);

        if ($response->ok()) {
            return $response->json();
        } else {
            $this->setMessage($response->status() . ' ' . $response->body());
            return null;
        }
    }

    protected function updateIssue($key, $values) {
        $url = $this->baseURL . '/rest/api/3/issue/' . $key;

        $base64_token = base64_encode($this->token);

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $base64_token
        ])->put($url, $values);

        if ($response->ok()) {
            return $response->json();
        } else {
            $this->setMessage($response->status() . ' ' . $response->body());
            return null;
        }
    }

    protected function jiraDateToDate($jiraDate) {
        // "2023-06-05T15:15:14.303-0300" -> "2023-06-05 15:15:14"
        if (isset($jiraDate)) {
            return substr($jiraDate, 0, 10) . " " . substr($jiraDate, 11, 8);
        }

        return null;
    }

}
