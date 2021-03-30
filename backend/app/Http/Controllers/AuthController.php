<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        if($request->has('email') && $request->has('password')){

            $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            
            //issue token
            $token = $request->user()->createToken('authToken');

            return response()->json([
                'success' => true,
                'message' => 'login success!',
                'token' => $token
            ]);

        }else{
            return response()->json([
                'success' => false,
                'message' => 'Invalid Credentials'
            ]);
        }


        }else{
            return response()->json([
                'success' => false,
                'message' => 'Misssing fields'
            ]);
        }
    }
}
