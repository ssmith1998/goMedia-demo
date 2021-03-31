<?php

namespace App\Http\Controllers;
use App\Models\Book;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;

class BookController extends Controller
{
    public function bookNew(Request $request){

        if($request->has('name') && $request->has('author') && $request->input('name') !== null && $request->input('author') !== null){
            /** @var User $user */
            $user = $request->user();
            /** @var Book $book */
           $book =  new Book();

           $book->author = ($request->input('author'));
           $book->name = ($request->input('name'));

           $book->user()->associate($user);

           $book->save();

           $books = $user->books()->get();

           $transaction = new Transaction();

           $transaction->action = 'book created';

           $transaction->user()->associate($user);

           $transaction->save();

           



            return response()->json([
                'success' => true,
                'book' => $books
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'please fill all fields'
            ]);
        }
    }

    public function getBook(Request $request, $id){

        $foundBook = Book::find($id);
        if($foundBook){
            return response()->json([
                'success' => true,
                'book' => $foundBook
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No Item Found'
            ]); 
        }

    }

    public function getBooks(Request $request){
        /** @var User $user */
        $user = $request->user();

        $allBooks = $user->books()->get();

            if(COUNT($allBooks) > 0){
                return response()->json([
                    'success' => true,
                    'books' => $allBooks
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'No books Found',
                    'books' => []
                ]);
            }
    }

    public function deleteBook(Request $request, $id){
        /** @var User $user */
        $user = $request->user();

        $foundBook = Book::find($id);
        if($foundBook){
            $foundBook->delete();
            $books = $user->books()->get();

            $transaction = new Transaction();

            $transaction->action = 'book deleted';
 
            $transaction->user()->associate($user);
 
            $transaction->save();
            return response()->json([
                'success' => true,
                'books' => $books
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No Item Found'
            ]); 
        }

    }

    public function editBook(Request $request){

        /** @var User $user */
        $user = $request->user();

        if($request->has('bookId') && $request->has('name') && $request->has('author') && $request->input('name') !== null && $request->input('author') !== null){
            /** @var Book $foundBook */
            $foundBook = Book::find($request->input('bookId'));
        if($foundBook){
            $foundBook->name = $request->input('name');
            $foundBook->author = $request->input('author');
            $foundBook->save();

            $transaction = new Transaction();

            $transaction->action = 'book updated';
 
            $transaction->user()->associate($user);
 
            $transaction->save();

            $books = $user->books()->get();
            return response()->json([
                'success' => true,
                'books' => $books
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No Item Found'
            ]); 
        }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'please fill all required fields'
            ]); 
        }
    }
}
