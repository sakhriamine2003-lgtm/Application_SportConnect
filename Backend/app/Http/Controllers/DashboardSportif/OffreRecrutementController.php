<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\OffreRecrutement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreRecrutementController extends Controller
{
    public function index() //affiche les offre de recrutement créées par les administrateurs
    {
        $offres = OffreRecrutement::latest()->get();

        return response()->json($offres);
    }

    public function store(Request $request)   //permet aux administrateurs de créer une nouvelle offre de recrutement
    {
        $user = Auth::user();
        $userRole = $user ? strtolower(trim((string) $user->role_user)) : null;

        if ($userRole !== 'admin') {
            return response()->json([
                'message' => 'Seuls les administrateurs peuvent créer des offres.',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'sport' => ['nullable', 'string', 'in:Football,Basketball,Handball,Volleyball'],
            'date' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);

        $offre = OffreRecrutement::create([
            'title' => $validated['title'],
            'sport' => $validated['sport'] ?? null,
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

        if ($userRole !== 'admin') {
            return response()->json([
                'message' => 'Seuls les administrateurs peuvent modifier des offres.',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'sport' => ['nullable', 'string', 'in:Football,Basketball,Handball,Volleyball'],
            'date' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);

        $offre->update($validated);

        return response()->json([
            'message' => 'Offre mise à jour avec succès.',
            'data' => $offre,
        ]);
    }

    public function destroy(OffreRecrutement $offre)
    {
        $user = Auth::user();
        $userRole = $user ? strtolower(trim((string) $user->role_user)) : null;

        if ($userRole !== 'admin') {
            return response()->json([
                'message' => 'Seuls les administrateurs peuvent supprimer des offres.',
            ], 403);
        }

        $offre->delete();

        return response()->json([
            'message' => 'Offre supprimée avec succès.',
        ]);
    }
}
