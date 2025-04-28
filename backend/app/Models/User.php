<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Define a relationship to posts.
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
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

    /**
     * Define a many-to-many relationship for followers.
     */
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'followed_id', 'follower_id');
    }

    /**
     * Define a many-to-many relationship for following.
     */
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'followed_id');
    }
}
