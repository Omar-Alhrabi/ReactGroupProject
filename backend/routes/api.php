<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\CommentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('posts', PostController::class);
Route::apiResource('users', UserController::class);

// Liking posts and comments
Route::post('/posts/{postId}/like', [LikeController::class, 'likePost']);
Route::post('/comments/{commentId}/like', [LikeController::class, 'likeComment']);

// Removing likes from posts and comments
Route::delete('/posts/{postId}/unlike', [LikeController::class, 'unlikePost']);
Route::delete('/comments/{commentId}/unlike', [LikeController::class, 'unlikeComment']);

// Follow and unfollow users
Route::post('/users/{followedId}/follow', [FollowerController::class, 'follow']);
Route::delete('/users/{followedId}/unfollow', [FollowerController::class, 'unfollow']);

// Fetch followers and following
Route::get('/users/{userId}/followers', [FollowerController::class, 'followers']);
Route::get('/users/{userId}/following', [FollowerController::class, 'following']);

// Comments CRUD
Route::get('/posts/{postId}/comments', [CommentController::class, 'index']);
Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
Route::get('/comments/{id}', [CommentController::class, 'show']);
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
