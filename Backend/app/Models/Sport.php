<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    //

    public function user()
{
    return $this->belongsTo(User::class);
}

public function competences()
{
    return $this->hasMany(Competence::class);
}
}
