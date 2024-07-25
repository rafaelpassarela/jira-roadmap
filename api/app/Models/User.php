<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'jira_token',
        'jira_accountId',
        'jira_accountType',
        'avatarUrl',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'jira_accountId',
        'jira_token',
        'email_verified_at',
        'created_at',
        'updated_at',
        'pivot'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sharedRoadmaps()
    {
        return $this->belongsToMany(Roadmap::class, 'roadmap_users');
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['has_jira_token', 'token_jira'];

    // getHasJiraTokenAttribute
    protected function hasJiraToken(): Attribute
    {
        return new Attribute(function () {
            return $this->jira_token ? true : false;
        });
    }

    // getHasJiraTokenAttribute
    protected function tokenJira(): Attribute
    {
        return new Attribute(function () {
            $token = $this->jira_token;
            if (!$token || strlen($token) < 6) {
                return '';
            }
            // return $token with only 3 first characters and 3 last characters, everithing else is *
            $token = substr($token, 0, 5) . str_repeat('*', 40) . substr($token, -5);
            return $token;
        });
    }
}
