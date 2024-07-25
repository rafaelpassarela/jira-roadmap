<?php

namespace App\Models;

use App\Enums\IssueCSSClassEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'roadmap_id',
        'persona_id',
        'keyJira',
        'summary',
        'status',
        'startDate',
        'endDate',
        'issueType',
        'icoUrl',
        'issueUrl',
        'left',
        'top',
        'width'
    ];

    /**
     * Get the persona that is assigned to the issue.
     */
    public function persona()
    {
        return $this->belongsTo(Persona::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'persona_id',
        'roadmap_id',
        'created_at',
        'updated_at'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['css', 'exists', 'assignee'];

    // getCssClassAttribute
    protected function css(): Attribute
    {
        return new Attribute(function () {
            $config = CssConfig::where('status', $this->status)->first();
            if ($config) {
                return $config->css;
            }
            return 'error';
        });
    }

    // getExistsAttribute
    protected function exists(): Attribute
    {
        return new Attribute(function () {
            return $this->id > 0;
        });
    }

    // getAssigneeAttribute
    protected function assignee(): Attribute
    {
        return new Attribute(function () {
            return $this->persona->displayName;
        });
    }

}
