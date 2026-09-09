<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;

class PortfolioController extends Controller    
{
    public function ajouterPortfolio(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'nom' => ['required', 'string', 'max:255'],
                'prenom' => ['required', 'string', 'max:255'],
                'age' => ['required', 'integer', 'min:1', 'max:120'],
                'sport' => ['required', 'string', 'max:255'],
                'niveau' => ['required', 'string', 'max:255'],
                'position' => ['required', 'string', 'max:255'],
                'equipe' => ['nullable', 'string', 'max:255'],
                'ville' => ['required', 'string', 'max:255'],
                'taille' => ['required', 'numeric', 'min:0'],
                'poids' => ['required', 'numeric', 'min:0'],
                'experience' => ['required', 'string'],
                'palmares' => ['required', 'string'],
                'photo' => ['nullable', 'string'],
            ]);

            $user = $request->user();

            if ($user->portfolio()->exists()) {
                return response()->json([
                    'message' => 'Un portfolio existe déjà pour cet utilisateur.',
                ], 409);
            }

            $portfolio = $user->portfolio()->create($validatedData);

            return response()->json([
                'message' => 'Portfolio ajouté avec succès.',
                'data' => $portfolio,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation.',
                'errors' => $e->errors(),
            ], 422);

        } 
    }
}