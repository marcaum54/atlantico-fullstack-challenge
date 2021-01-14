<?php

namespace App\Http\Requests;

class UpdateUserRequest extends Request
{
    public function rules()
    {
        return [
            'email' => 'email',
            'password' => 'min:6',
        ];
    }
}
