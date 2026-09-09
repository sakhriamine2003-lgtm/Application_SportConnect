<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    //
    public function user()
{
    return $this->belongsTo(User::class);
}

public function offreRecrutement()
{
    return $this->belongsTo(OffreRecrutement::class);
}
}
