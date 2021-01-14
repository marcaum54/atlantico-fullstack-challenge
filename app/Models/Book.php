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
        return $this->belongsToMany(User::class)->using(BookUser::class);
    }

    public function isAvailableToRent(): bool
    {
        $rented_books = BookUser::where('book', $this->id)->where('status', '<>', BookUser::STATUS_PAID)->count();
        return (bool)$rented_books < $this->copies;
    }
}
