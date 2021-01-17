<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentRequest;
use App\Models\Book;
use App\Models\BookUser;
use App\Models\User;

class RentController extends Controller
{
    public function store(StoreRentRequest $request)
    {
        $all = $request->all();

        $user_uuid = $all['user_uuid'];
        $book_uuid = $all['book_uuid'];

        $user = User::where('uuid', $user_uuid)->firstOrFail();
        $book = Book::where('uuid', $book_uuid)->firstOrFail();

        $user->books()->attach($book->id, ($pivot_data = [
            'status' => BookUser::STATUS_ONGOING,
            'rented_at' => $all['rented_at'],
            'expirated_at' => date('Y-m-d', strtotime("{$all['rented_at']} + 7 days")),
        ]));

        return response()->json(compact('user_uuid', 'book_uuid') + $pivot_data);
    }
}
