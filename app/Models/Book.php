<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory, Uuid;

    protected $fillable = ['title', 'copies'];

    public function users()
    {
        return $this->belongsToMany(User::class)->using(BookUser::class)->withPivot([
            'status',
            'rented_at',
            'expirated_at',
            'delivered_at',
        ]);
    }

    public function isAvailableToRent(): bool
    {
        $rented_books = BookUser::where('book_id', $this->id)->where('status', '<>', BookUser::STATUS_PAID)->count();
        return $rented_books < $this->copies;
    }
}
