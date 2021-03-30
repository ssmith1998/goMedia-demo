<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\TransactionController;

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

//login route
Route::post('/login', [AuthController::class, 'login'])->name('login');

//listing routes
Route::get('/book/{id}', [BookController::class, 'getBook'])->middleware('auth:sanctum');;
Route::get('/books', [BookController::class, 'getBooks'])->middleware('auth:sanctum');;
Route::post('/book/edit', [BookController::class, 'editBook'])->middleware('auth:sanctum');;
Route::get('/book/delete/{id}', [BookController::class, 'deleteBook'])->middleware('auth:sanctum');;
Route::post('/book/new', [BookController::class, 'bookNew'])->middleware('auth:sanctum');;

//transactions 
Route::get('/logs', [TransactionController::class, 'getAll'])->middleware('auth:sanctum');
Route::post('/logs/filter', [TransactionController::class, 'filterTransactions'])->middleware('auth:sanctum');


