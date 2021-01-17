<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $token = auth()->attempt($request->all());
        if ($token) {
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => auth()->user()
            ]);
        }

        return response()->json(['message' => 'No user was found, check that the email and password provided are correct.'], 500);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function current_user()
    {
        return response()->json(auth()->user());
    }
}
