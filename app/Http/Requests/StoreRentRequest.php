<?php

namespace App\Http\Requests;

use App\Models\Book;
use App\Models\User;

class StoreRentRequest extends Request
{
    public function rules()
    {
        $user = User::where('uuid', $this->user_uuid)->first();

        return [
            'rented_at' => 'required|date_format:"Y-m-d"',
            'user_uuid' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    if (!$user) {
                        $fail('User not found.');
                    }
                },
            ],
            'book_uuid' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    $book = Book::where('uuid', $value)->firstOrFail();

                    if (!$book) {
                        $fail('Book not found.');
                    }

                    if (!$book->isAvailableToRent()) {
                        $fail('All copies are rented.');
                    }

                    if ($user) {
                        if ($user->isBookWithMe($book->id)) {
                            $fail('There is already a copy with me.');
                        }
                    }
                },
            ],
        ];
    }
}
