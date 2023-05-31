<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder{
  /**
   * Seed the application's database.
   */
  public function run():void{
    Post::factory()->create([
      'title' => 'Post 1',
      'content' => 'content of post 1'
    ]);

    Post::factory()->create([
      'title' => 'Post 2',
      'content' => 'content of post 2'
    ]);
  }
}