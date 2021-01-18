<?php

namespace App\Http\Requests;

class UpdateUserRequest extends Request
{
    public function rules()
    {
        return [
            'email' => 'email|unique:users',
            'password' => 'min:6',
        ];
    }
}
