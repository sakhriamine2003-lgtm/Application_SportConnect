<?php
// filepath: c:\Users\SOFIMED-ADMIN\Desktop\Sport_Connect\Backend\app\Http\DashboardAdmin\club\CreeClub.php

namespace App\Http\Controllers\DashboardAdmin\club;

use App\Models\Club;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreeClub extends Controller
{
    public function creeClub(Request $request)
    {
        try {
            $validationData = $request->validate([
                'nom' => ['required', 'string', 'max:255'],
                'ville' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
            ]);




            $validationData['user_id'] = Auth::id();

            $club = Club::create($validationData);

            return response()->json([
                'message' => 'Club créé avec succès.',
                'data' => $club,
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création du club.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}