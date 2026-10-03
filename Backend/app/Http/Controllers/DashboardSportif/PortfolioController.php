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
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $data['user_id'] = $request->user()->id;
        Portfolio::where('user_id', $data['user_id'])->delete();

        $portfolio = Portfolio::create($data);

        return response()->json([
            'message' => 'Portfolio créé avec succès',
            'data' => $portfolio
        ]);
    }
}
