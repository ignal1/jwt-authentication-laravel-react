<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

    $token = auth('api')->login($user);
    return response()->json([
      'status' => 'success',
      'message' => 'User created successfully',
      'user' => $user,
      'authorisation' => [
        'token' => $token,
        'type' => 'bearer',
      ]
    ]);
  }

  public function login(){
    $credentials = request(['email', 'password']);
    if(!$token = auth('api')->attempt($credentials)){
      return response()->json(['error' => 'Unauthorized'], 401);
    }
    return $this->respondWithToken($token);
  }

  public function me(){
    return response()->json(auth('api')->user());
  }

  public function logout(){
    auth('api')->logout();
    return response()->json(['message' => 'Successfully logged out']);
  }

  public function refresh(){
    return $this->respondWithToken(auth('api')->refresh());
  }

  protected function respondWithToken($token){
    return response()->json([
      'access_token' => $token,
      'token_type' => 'Bearer',
      'expires_in' => config('jwt.ttl')
    ]);
  }
}
