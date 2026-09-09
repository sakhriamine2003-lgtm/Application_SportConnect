<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    //

    public function sport()
{
    return $this->belongsTo(Sport::class);
}
}
