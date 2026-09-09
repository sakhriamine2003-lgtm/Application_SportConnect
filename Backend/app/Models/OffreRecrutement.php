<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OffreRecrutement extends Model
{
    //
    public function club()
{
    return $this->belongsTo(Club::class);
}

public function candidatures()
{
    return $this->hasMany(Candidature::class);
}
}
