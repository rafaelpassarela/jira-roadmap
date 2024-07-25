<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'user_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'guid',
        'active'
    ];

        /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    // auto serialize the sharedWith relationship
    //protected $with = ['sharedWith'];

    public function sharedWith()
    {
        return $this->belongsToMany(User::class, 'roadmap_users');
    }

}
