<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Http\Requests\StoreDeliverRequest;
use App\Models\BookUser;

class DeliverController extends Controller
{
    public function update(StoreDeliverRequest $request)
    {
        $user_uuid = $request->input('user_uuid');
        $book_uuid = $request->input('book_uuid');

        $user = User::where('uuid', $request->input('user_uuid'))->firstOrFail();
        $book = Book::where('uuid', $request->input('book_uuid'))->firstOrFail();

        $pivot_data = [
            'status' => BookUser::STATUS_PAID,
            'delivered_at' => date('Y-m-d'),
        ];

        $user->books()
            ->wherePivot('book_id', $book->id)
            ->wherePivot('status', '<>', BookUser::STATUS_PAID)
            ->update($pivot_data);

        return response()->json(compact('user_uuid', 'book_uuid') + $pivot_data);
    }
}
