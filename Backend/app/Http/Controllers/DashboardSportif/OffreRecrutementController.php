<?php 
namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\OffreRecrutement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreRecrutementController extends Controller
{
    public function index()
    {
        $offres = OffreRecrutement::latest()->get();

        return response()->json($offres);
}

  public function store(Request $request)
    {
        $user = Auth::user();
        $userRole = $user ? strtolower(trim((string) $user->role_user)) : null;

        if (! $user || $userRole !== 'admin') {
            return response()->json([
                'message' => 'Seuls les administrateurs peuvent créer des offres.',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);
    }}