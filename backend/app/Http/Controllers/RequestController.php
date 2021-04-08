<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestBook;
use App\Models\User;
use App\Models\Book;

class RequestController extends Controller
{

    public function requestsMade(Request $request)
    {
        /** @var User $user*/
        $user = $request->user();

        /** @var RequestBook[] $requests*/
        $requests = $user->requests()->get();

        return response()->json([
            'requests' => $requests
        ]);
    }


    public function requestsRecieved(Request $request)
    {
        /** @var User $user*/
        $user = $request->user();

        $books = $user->books()->get();

        /** @var RequestBook[] $requests*/
        $requests = [];


        /** @var Book[] $books */
        foreach ($books as $book) {

            /** @var RequestBook $requestBook */
            foreach ($book->requests()->get() as $requestBook) {
                $requests[] =  [
                    'user' => $requestBook->user()->first(),
                    'book' => $requestBook->book()->first(),
                ];
            }
        }

        return response()->json([
            'requests' => $requests
        ]);
    }

    public function acceptRequest($requestId)
    {
        /** @var RequestBook $requestBook */
        $requestBook = RequestBook::find($requestId);


        $bookId = $requestBook->book_id;

        /** @var Book $book */
        $book = Book::find($bookId);

        //get the user who is requesting the book
        /** @var User $requestedUser */
        $requestedUser = $requestBook->user()->first();

        //set request to accepted
        $requestBook->accepted = true;
        //set book availability to false
        $book->available = false;
        //associate new user 
        $book->user()->associate($requestedUser);

        //save book
        $book->save();
        //save request
        $requestBook->save();

        return response()->json([
            'request' => $requestBook,
            'book' => $book
        ]);
    }

    public function rejectRequest($requestId)
    {

        /** @var RequestBook $requestBook */
        $requestBook = RequestBook::find($requestId);

        $requestBook->rejected = true;

        return response()->json([
            'request' => $requestBook
        ]);
    }


    public function sendRequest($bookId, Request $request)
    {

        //findbook
        /** @var Book $book */
        $book = Book::find($bookId);
        //make new request book
        $newBookRequest = new RequestBook();

        //save user to request book
        /** @var User $user */
        $user = $request->user();

        $newBookRequest->user()->associate($user);

        //save book to request book
        $newBookRequest->book()->associate($book);
        //save request book

        $newBookRequest->save();
        //return response

        return response()->json([
            'request' => $newBookRequest
        ]);
    }

    public function deleteRequest($requestBookId, Request $request)
    {

        /** @var RequestBook $requestBook */
        $requestBook = RequestBook::find($requestBookId);

        if ($requestBook) {
            $requestBook->delete();

            return response()->json([
                'request' => $requestBook
            ]);
        }
    }
}
