<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Like a post.
     */
    public function likePost(Request $request, $postId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $post = Post::findOrFail($postId);

        $like = Like::create([
            'user_id' => $request->user_id,
            'post_id' => $post->id,
        ]);

        return response()->json(['message' => 'Post liked successfully!', 'like' => $like]);
    }

    /**
     * Like a comment.
     */
    public function likeComment(Request $request, $commentId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $comment = Comment::findOrFail($commentId);

        $like = Like::create([
            'user_id' => $request->user_id,
            'comment_id' => $comment->id,
        ]);

        return response()->json(['message' => 'Comment liked successfully!', 'like' => $like]);
    }

    /**
     * Remove a like from a post.
     */
    public function unlikePost(Request $request, $postId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $like = Like::where('user_id', $request->user_id)->where('post_id', $postId)->firstOrFail();
        $like->delete();

        return response()->json(['message' => 'Post unliked successfully!']);
    }

    /**
     * Remove a like from a comment.
     */
    public function unlikeComment(Request $request, $commentId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $like = Like::where('user_id', $request->user_id)->where('comment_id', $commentId)->firstOrFail();
        $like->delete();

        return response()->json(['message' => 'Comment unliked successfully!']);
    }
}
