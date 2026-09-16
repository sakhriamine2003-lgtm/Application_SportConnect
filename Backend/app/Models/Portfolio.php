<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'age',
        'sport',
        'niveau',
        'position',
        'equipe',
        'ville',
        'taille',
        'poids',
        'experience',
        'palmares',
        'photo',
    ];

  
Public function user()
    {
        return $this->hasOne(User::class);
    }
}