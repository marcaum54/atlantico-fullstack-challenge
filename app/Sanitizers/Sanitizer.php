<?php

namespace App\Sanitizers;

class Sanitizer extends \Lukzgois\Sanitizer\Sanitizer
{
    public function __construct($rules = [])
    {
        $this->rules = $rules;
    }

    public function rules()
    {
        return $this->rules;
    }

    public function sanitizeCpf($value)
    {
        return preg_replace('/\D/', '', $value);
    }
}
