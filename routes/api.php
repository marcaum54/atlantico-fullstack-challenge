<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DeliverController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/current-user', [AuthController::class, 'current_user']);
        Route::post('/register', [AuthController::class, 'register']);
    });

    Route::resource('/user', UserController::class)->except(['create', 'edit']);
    Route::resource('/book', BookController::class)->except(['create', 'edit']);

    Route::get('/user/my-books/{user_uuid}', [UserController::class, 'my_books']);
    Route::get('/book/available/{user_uuid}', [BookController::class, 'available']);

    Route::post('/rent', [RentController::class, 'store'])->name('rent.store');
    Route::put('/deliver', [DeliverController::class, 'update'])->name('deliver.update');
});
