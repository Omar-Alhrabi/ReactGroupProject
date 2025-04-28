<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'body',
        'user_id',
    ];

    /**
     * Define a relationship to the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define a relationship to comments.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Define a relationship to likes.
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
