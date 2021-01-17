<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class BookUser extends Pivot
{
    const STATUS_ONGOING = 'ongoing';
    const STATUS_LATE = 'late';
    const STATUS_PAID = 'paid';

    const STATUS_OPTIONS = [
        self::STATUS_ONGOING,
        self::STATUS_LATE,
        self::STATUS_PAID,
    ];
}
