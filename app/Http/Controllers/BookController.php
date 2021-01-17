<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Http\Requests\StoreBookRequest;
use App\Models\BookUser;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function __construct(Book $book)
    {
        $this->model = $book;
    }

    public function store(StoreBookRequest $request)
    {
        $book = $this->model->create($request->all());
        return response()->json($book);
    }

    public function update(StoreBookRequest $request, $uuid)
    {
        $book = $this->model->where('uuid', $uuid)->firstOrFail();
        $book->fill($request->all());
        $book->save();

        return response()->json($book);
    }

    public function available($user_uuid)
    {
        $user = User::where('uuid', $user_uuid)->firstOrFail();

        $books_not_available = $user->allBooksStillWithMe()->pluck('books.id')->all();
        $books = $this->model
            ->whereNotIn('id', $books_not_available)
            ->withCount([
                'users',
                'users as users_count' => function ($query) {
                    $query->where('status', '<>', BookUser::STATUS_PAID);
                }
            ])->having('users_count', '<', DB::raw('`copies`'));

        return response()->json($books->get());
    }
}
