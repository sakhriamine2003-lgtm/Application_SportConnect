<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\Message;
use App\Models\OffreRecrutement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CandidatureController extends Controller
{
    public function store(Request $request, OffreRecrutement $offre)
    {    //permet à un sportif de postuler à une offre de recrutement
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
    {   //affiche les candidatures du sportif connecté
        return response()->json(
            Candidature::with('offreRecrutement')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get()
        );
    }

    public function index()   //affiche toutes les candidatures pour les administrateurs
    {
        return response()->json(
            Candidature::with(['offreRecrutement', 'user.portfolio'])
                ->latest()
                ->get()
        );
    }

    public function updateStatus(Request $request, Candidature $candidature)
    { //met à jour le statut d'une candidature et envoie un message au sportif
        $validated = $request->validate([
            'status' => ['required', Rule::in(['accepted', 'rejected'])],
        ]);

        $candidature->update($validated);

        $candidature->loadMissing(['user', 'offreRecrutement']);

        Message::create([
            'user_id' => $candidature->user_id,
            'content' => $this->buildStatusMessage($candidature),
        ]);

        return response()->json([
            'message' => 'Réponse envoyée au sportif.',
            'data' => $candidature->fresh(['offreRecrutement', 'user.portfolio']),
        ]);
    }

    /**
     * Construit un message professionnel selon le statut de la candidature.
     */
    private function buildStatusMessage(Candidature $candidature): string
    {
        $sportifName = $candidature->user->name ?? 'Sportif';
        $offreTitle = $candidature->offreRecrutement->title ?? 'notre offre';

        return match ($candidature->status) {
            'accepted' => "Bonjour {$sportifName},\n\n"
                . "Nous avons le plaisir de vous informer que votre candidature pour l'offre « {$offreTitle} » a été acceptée.\n\n"
                . "Notre équipe vous contactera prochainement afin de vous communiquer les prochaines étapes.\n\n"
                . "Cordialement,\nL'équipe SportConnect",
            'rejected' => "Bonjour {$sportifName},\n\n"
                . "Nous vous remercions pour l'intérêt porté à l'offre « {$offreTitle} ».\n\n"
                . "Après étude de votre candidature, nous ne donnerons pas suite pour le moment. Nous vous encourageons à consulter nos autres offres.\n\n"
                . "Cordialement,\nL'équipe SportConnect",
            default => "Bonjour {$sportifName},\n\n"
                . "Votre candidature pour l'offre « {$offreTitle} » est toujours en cours d'examen.\n\n"
                . "Nous reviendrons vers vous dès qu'une décision sera prise.\n\n"
                . "Cordialement,\nL'équipe SportConnect",
        };
    }
}
