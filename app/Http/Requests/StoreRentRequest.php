<?php

namespace App\Http\Requests;

use App\Models\Book;
use App\Models\BookUser;

class StoreRentRequest extends Request
{
    public function rules()
    {
        return [
            'user_uuid' => 'required|exists:App\Models\User,uuid',
            'book_uuid' => [
                'required',
                'exists:App\Models\Book,uuid',
                function ($attribute, $value, $fail) {
                    $book = Book::where('book_uuid', $value)->firstOrFail();
                    if ($book->isAvailableToRent()) {
                        $fail('All copies are rented.');
                    }
                }
            ],
            'expirated_at' => 'required|date_format:"Y-m-d"',
        ];
    }
}
