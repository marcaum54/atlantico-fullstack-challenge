<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Http\Requests\StoreDeliverRequest;
use App\Models\BookUser;

class DeliverController extends Controller
{
    public function store(StoreDeliverRequest $request)
    {
        $user = User::where('uuid', $request->input('user_uuid'))->firstOrFail();
        $book = Book::where('uuid', $request->input('book_uuid'))->firstOrFail();

        $user->books()->attach($book->id, [
            'status' => BookUser::STATUS_ONGOING,
            'rented_at' => date('Y-m-d'),
            'expirated_at' => $request->input('expirated_at'),
        ]);
    }
}
