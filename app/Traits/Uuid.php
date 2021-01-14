<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Uuid
{
    protected static function booted()
    {
        static::creating(function ($row) {
            $row->uuid = Str::uuid();
        });
    }
}
