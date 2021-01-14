<?php

namespace App\Http\Requests;

class StoreBookRequest extends Request
{
    public function rules()
    {
        return [
            'title' => 'required',
            'copies' => 'required|min:1',
        ];
    }
}
