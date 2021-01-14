<?php

namespace App\Http\Requests;

use App\Sanitizers\Sanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class Request extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function sanitizers()
    {
        return [];
    }

    protected function prepareForValidation()
    {
        $values = $this->all();
        $sanitizers = $this->sanitizers();

        foreach ($values as $field => $value)
            if (!$value)
                unset($sanitizers[$field]);

        $sanitizer = new Sanitizer($sanitizers);
        $sanitizedData = $sanitizer->sanitize($values);

        if ($sanitizedData)
            $this->replace($sanitizedData);
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
