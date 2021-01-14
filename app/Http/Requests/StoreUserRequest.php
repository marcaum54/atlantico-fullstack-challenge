<?php

namespace App\Http\Requests;

class StoreUserRequest extends Request
{
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'name' => 'required',
            'password' => 'required|confirmed|min:6',
        ];
    }
}
