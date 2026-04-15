<?php

namespace App\Models;

use FFI;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Company extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
