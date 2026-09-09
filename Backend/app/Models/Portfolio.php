<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    function user()
    {
        return $this->hasOne(User::class);
    }
    
}
