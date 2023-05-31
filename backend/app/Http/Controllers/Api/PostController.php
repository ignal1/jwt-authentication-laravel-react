<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller{
  public function __construct(){
    $this->middleware('auth:api');
  }

  public function index(){
    return PostResource::collection(Post::all());
  }

  public function store(Request $request){
  }

  public function show(Post $post){
    return new PostResource($post);
  }

  public function update(Request $request, string $id){
  }

  public function destroy(string $id){
  }
}
