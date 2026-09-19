<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PortfolioController extends Controller
{
    public function ajouterPortfolio(Request $request): JsonResponse
    {
        try {
            $photoRules = $request->hasFile('photo')
                ? ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120']
                : ['nullable', 'string', 'max:2048'];

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
                'photo' => $photoRules,
            ]);

            $user = $request->user();

            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('portfolios', 'public');
                $validatedData['photo'] = url('/storage/'.$path);
            }

            $oldPhoto = $user->portfolio?->photo;
            $portfolio = $user->portfolio()->updateOrCreate([], $validatedData);

            if ($request->hasFile('photo') && $oldPhoto) {
                $oldPath = parse_url($oldPhoto, PHP_URL_PATH);
                $oldPath = is_string($oldPath) ? ltrim(str_replace('/storage/', '', $oldPath), '/') : null;

                if ($oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            return response()->json([
                'message' => 'Portfolio enregistré avec succès.',
                'data' => $portfolio,
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation.',
                'errors' => $e->errors(),
            ], 422);

        }
    }
}
