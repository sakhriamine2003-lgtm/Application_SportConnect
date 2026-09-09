<?php

namespace App\Http\Controllers\dashboardSportif\profil;

use App\Http\Controllers\Controller;
use App\Models\User;
// use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AfficherProfil extends Controller
{
    public function AfficherProfil(Request $request)
    {
        $user = request()->user(); // Get the authenticated user

        return response()->json($user);
    }
}
