<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a post.
     */
    public function index($postId)
    {
        $post = Post::findOrFail($postId);

        return response()->json($post->comments()->with('user', 'children')->get());
    }

    /**
     * Store a newly created comment.
     */
    public function store(Request $request, $postId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $post = Post::findOrFail($postId);

        $comment = $post->comments()->create([
            'user_id' => $request->user_id,
            'body' => $request->body,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json(['message' => 'Comment added successfully!', 'comment' => $comment]);
    }

    /**
     * Display the specified comment.
     */
    public function show($id)
    {
        $comment = Comment::with('user', 'children')->findOrFail($id);

        return response()->json($comment);
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update([
            'body' => $request->body,
        ]);

        return response()->json(['message' => 'Comment updated successfully!', 'comment' => $comment]);
    }

    /**
     * Remove the specified comment.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully!']);
    }
}
