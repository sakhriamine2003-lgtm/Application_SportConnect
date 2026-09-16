<?php

namespace App\Http\Controllers\profil;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AfficherProfil extends Controller
{
    public function afficherProfil(Request $request)
    {
        $user = request()->user(); 

        return response()->json($user);
    }
}
