<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Models\Portfolio;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AfficherPortfolio extends Controller
{
    public function afficherPortfolio()
    {
       $portfolio = Portfolio::where("user_id", Auth::id())->first();

       if (!$portfolio) {
           return response()->json([
               'message' => 'Aucun portfolio trouvé pour cet utilisateur.',
           ], 404);
       }

       return response()->json($portfolio);

    }

    public function afficherPortfolioParUser($userId)
    {
        $portfolio = Portfolio::where('user_id', $userId)->first();

        if (!$portfolio) {
            return response()->json([
                'message' => 'Aucun portfolio trouvé pour ce sportif.',
            ], 404);
        }

        return response()->json($portfolio);
    }
}