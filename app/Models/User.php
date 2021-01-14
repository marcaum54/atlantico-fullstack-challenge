<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    use UUid {
        booted as UuidBooted;
    }

    protected $hidden = ['password', 'remember_token'];
    protected $fillable = ['name', 'email', 'password'];

    protected static function booted()
    {
        self::UuidBooted();
        static::saving(function ($row) {
            $row->password = Hash::make($row->password);
        });
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function books()
    {
        return $this->belongsToMany(Book::class)->using(BookUser::class)->withPivot(['status', 'rentend_at']);
    }
}
