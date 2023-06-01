<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller{
  public function __construct(){
    $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
  }

  public function register(Request $request){
    $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', Password::min(3)->mixedCase()->numbers()],
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    $token = auth('api')->claims(['email' => $request->email])->login($user);
    return response()->json([
      'accessToken' => $token
    ]);
  }

  public function login(Request $request){
    $credentials = request(['email', 'password']);
    if(!$token = auth('api')->claims(['email' => $request->email])->attempt($credentials)){
      return response()->json(['error' => 'Unauthorized'], 401);
    }
    return response()->json([
      'accessToken' => $token
    ]);
  }

  public function logout(){
    auth('api')->logout();
    return response(Response::HTTP_OK);
  }

  public function refresh(){
    return response()->json([
      'accessToken' => auth('api')->refresh()
    ]);
  }
}
