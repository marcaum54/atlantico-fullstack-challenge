<?php

namespace App\Http\Requests;

use App\Models\Book;
use App\Models\User;

class StoreDeliverRequest extends Request
{
    public function rules()
    {
        $user = User::where('uuid', $this->user_uuid)->first();

        return [
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

                    if (!$user->isBookWithMe($book->id)) {
                        $fail('No respective rental was found for the user and the book reported.');
                    }
                },
            ],
        ];
    }
}
