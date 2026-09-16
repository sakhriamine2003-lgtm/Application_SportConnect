<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
     protected $fillable = [
        'nom',
        'ville',
        'description'
        
    ];

    //

    public function user()
{
    return $this->belongsTo(User::class);
}

public function offresRecrutement()
{
    return $this->hasMany(OffreRecrutement::class);
}

public function candidatures()
{
    return $this->hasMany(Candidature::class);
}
}
