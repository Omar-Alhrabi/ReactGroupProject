<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'body',
        'user_id',
        'post_id',
        'parent_id',
    ];

    /**
     * Define a relationship to the user who created the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define a relationship to the post the comment belongs to.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Define a relationship to the parent comment (for nested comments).
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Define a relationship to child comments (replies).
     */
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
