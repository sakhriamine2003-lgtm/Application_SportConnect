<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\OffreRecrutement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CandidatureController extends Controller
{
    public function store(Request $request, OffreRecrutement $offre)
    {
        $sportif = $request->user();

        if (! $sportif->portfolio()->exists()) {
            return response()->json([
                'message' => 'Créez votre portfolio avant de postuler.',
            ], 422);
        }

        if (Candidature::where('offre_recrutement_id', $offre->id)
            ->where('user_id', $sportif->id)
            ->exists()) {
            return response()->json([
                'message' => 'Vous avez déjà postulé à cette offre.',
            ], 409);
        }

        $candidature = Candidature::create([
            'offre_recrutement_id' => $offre->id,
            'user_id' => $sportif->id,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Votre candidature a été envoyée. Elle est en attente de réponse de l’administrateur.',
            'data' => $candidature->load(['offreRecrutement', 'user.portfolio']),
        ], 201);
    }


    public function mine(Request $request)
    {
        return response()->json(
            Candidature::with('offreRecrutement')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get()
        );
    }

    public function index()
    {
        return response()->json(
            Candidature::with(['offreRecrutement', 'user.portfolio'])
                ->latest()
                ->get()
        );
    }

    public function updateStatus(Request $request, Candidature $candidature)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['accepted', 'rejected'])],
        ]);

        $candidature->update($validated);

        return response()->json([
            'message' => 'Réponse envoyée au sportif.',
            'data' => $candidature->fresh(['offreRecrutement', 'user.portfolio']),
        ]);
    }
}
