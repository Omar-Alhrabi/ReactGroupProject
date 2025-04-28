<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'follower_id',
        'followed_id',
    ];

    /**
     * Define a relationship to the user who is following.
     */
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    /**
     * Define a relationship to the user who is being followed.
     */
    public function followed()
    {
        return $this->belongsTo(User::class, 'followed_id');
    }
}
