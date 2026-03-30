<?php

namespace App\Models;

use App\Enums\VendorStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Department extends Model
{
    protected $fillable = ['name', 'slug', 'active'];

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function scopePublished(Builder $query)
    {
        return $query->where('active', true);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($department) {
            if (empty($department->slug)) {
                $department->slug = Str::slug($department->name);
            }
        });
    }
}
