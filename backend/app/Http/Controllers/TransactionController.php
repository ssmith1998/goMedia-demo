<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function getAll(){

        $transactions = Transaction::all();

        return response()->json([
            'logs' => $transactions
        ]);
    }

    public function filterTransactions(Request $request){
            if($request->has('search')){
                $transactions = Transaction::where('user_id', 'like', '%' . $request->input('search') . '%')
                ->orWhere('action', 'like', '%' . $request->input('search') . '%')->get();

                return response()->json([
                    'logs' => $transactions
                ]);
            }
    }
}
