<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserController extends Controller
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function store(StoreUserRequest $request)
    {
        $user = $this->model->create($request->all());
        return response()->json($user, 201);
    }

    public function update(UpdateUserRequest $request, $uuid)
    {
        $user = $this->model->where('uuid', $uuid)->firstOrFail();
        $user->fill($request->all());
        $user->save();

        return response()->json($user);
    }

    public function my_books($user_uuid)
    {
        $user = $this->model->where('uuid', $user_uuid)->firstOrFail();

        $books = $user->books()->orderBy('book_user.id', 'DESC')->get();

        return response()->json($books);
    }
}
