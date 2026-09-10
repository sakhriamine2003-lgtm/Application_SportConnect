<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Models\Portfolio;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AfficherPortfolio extends Controller
{
    public function afficherPortfolio()
    {
       $portfolio =Portfolio::where("user_id", Auth::id())->first();
       return response()->json($portfolio);
    
    if(!$portfolio){
        return response()->json([
            'message' => 'Aucun portfolio trouvé pour cet utilisateur.',
        ], 404);
    }

    }
}