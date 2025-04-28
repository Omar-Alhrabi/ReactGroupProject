<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'post_id',
        'comment_id',
    ];

    /**
     * Define a relationship to the user who liked the post or comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define a relationship to the post that was liked.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Define a relationship to the comment that was liked.
     */
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
