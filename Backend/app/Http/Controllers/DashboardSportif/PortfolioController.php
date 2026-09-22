<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function ajouterPortfolio(Request $request)
    {
        // 1. Vérifier les données
        $data = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'age' => 'required|integer',
            'sport' => 'required|string',
            'niveau' => 'required|string',
            'position' => 'required|string',
            'equipe' => 'nullable|string',
            'ville' => 'required|string',
            'taille' => 'required|numeric',
            'poids' => 'required|numeric',
            'experience' => 'required|string',
            'palmares' => 'required|string',
        ]);

        $data['user_id'] = $request->user()->id;
        $portfolio = Portfolio::updateOrCreate(
            ['user_id' => $data['user_id']],
            $data,
        );

        return response()->json([
            'message' => 'Portfolio enregistré avec succès.',
            'data' => $portfolio
        ]);
    }
}
