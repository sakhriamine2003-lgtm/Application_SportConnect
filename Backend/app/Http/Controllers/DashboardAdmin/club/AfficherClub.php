<?php

namespace App\Http\Controllers\DashboardAdmin\club;

use App\Models\Club;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AfficherClub extends Controller
{
    public function afficherClub()
    {
        $club = Club::where('user_id', Auth::id())->first();

        if (!$club) {
            return response()->json([
                'message' => 'Aucun club trouvé pour cet utilisateur.',
            ], 404);
        }

        return response()->json($club);
    }
}
