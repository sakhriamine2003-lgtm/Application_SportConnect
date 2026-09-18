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

        $offre = OffreRecrutement::create([
            'title' => $validated['title'],
            'date' => $validated['date'],
            'description' => $validated['description'],
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Offre créée avec succès.',
            'data' => $offre,
        ], 201);
    }

     public function update(Request $request, OffreRecrutement $offre)
    {
        $user = Auth::user();
        $userRole = $user ? strtolower(trim((string) $user->role_user)) : null;

        if (! $user || $userRole !== 'admin') {
            return response()->json([
                'message' => 'Seuls les administrateurs peuvent modifier des offres.',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);

        $offre->update($validated);

        return response()->json([
            'message' => 'Offre mise à jour avec succès.',
            'data' => $offre,
        ]);
    }

}