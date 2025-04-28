<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * Follow a user.
     */
    public function follow(Request $request, $followedId)
    {
        $request->validate([
            'follower_id' => 'required|exists:users,id',
        ]);

        $followedUser = User::findOrFail($followedId);

        $followedUser->followers()->attach($request->follower_id);

        return response()->json(['message' => 'User followed successfully!']);
    }

    /**
     * Unfollow a user.
     */
    public function unfollow(Request $request, $followedId)
    {
        $request->validate([
            'follower_id' => 'required|exists:users,id',
        ]);

        $followedUser = User::findOrFail($followedId);

        $followedUser->followers()->detach($request->follower_id);

        return response()->json(['message' => 'User unfollowed successfully!']);
    }

    /**
     * Get the followers of a user.
     */
    public function followers($userId)
    {
        $user = User::findOrFail($userId);

        return response()->json($user->followers);
    }

    /**
     * Get the users that a user is following.
     */
    public function following($userId)
    {
        $user = User::findOrFail($userId);

        return response()->json($user->following);
    }
}
