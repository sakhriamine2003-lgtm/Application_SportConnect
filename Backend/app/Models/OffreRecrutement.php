<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OffreRecrutement extends Model
{
    protected $table = 'offer_recruitments';

    protected $fillable = [
        'title',
        'date',
        'description',
        'user_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}
