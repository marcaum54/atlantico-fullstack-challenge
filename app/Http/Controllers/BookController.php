<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;

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

    public function rent()
}
