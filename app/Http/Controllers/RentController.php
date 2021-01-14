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
        $user = User::where('uuid', $request->input('user_uuid'))->firstOrFail();
        $book = Book::where('uuid', $request->input('book_uuid'))->firstOrFail();

        $attached = $user->books()->attach($book->id, [
            'status' => BookUser::STATUS_ONGOING,
            'rented_at' => date('Y-m-d'),
            'expirated_at' => $request->input('expirated_at'),
        ]);

        return response()->json($attached);
    }
}
