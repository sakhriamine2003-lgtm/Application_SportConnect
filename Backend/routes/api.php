<?php


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\profil\AfficherProfil;
use App\Http\Controllers\DashboardSportif\PortfolioController;
use App\Http\Controllers\DashboardAdmin\club\CreeClub;
use App\Http\Controllers\DashboardSportif\AfficherPortfolio;
use App\Http\Controllers\DashboardAdmin\club\AfficherClub;
use App\Http\Controllers\DashboardSportif\OffreRecrutementController;
use App\Http\Controllers\DashboardSportif\CandidatureController;

Route::post('/login', [Login::class, 'loginUser']);
Route::post('/register', [Register::class, 'Register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Déconnexion réussie.']);
    });

    Route::middleware('role:sportif')->group(function () {
        Route::get('/profil', [AfficherProfil::class, 'afficherProfil']);
        Route::get('/AfficherPortfolio', [AfficherPortfolio::class, 'afficherPortfolio']);
        Route::post('/portfolio', [PortfolioController::class, 'ajouterPortfolio']);
        Route::post('/offres/{offre}/candidatures', [CandidatureController::class, 'store']);
        Route::get('/mes-candidatures', [CandidatureController::class, 'mine']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::get('/clubs', [AfficherClub::class, 'afficherClub']);
        Route::post('/clubs', [CreeClub::class, 'creeClub']);
    });

    Route::get('/admin/sportifs', function () {
        $user = Auth::user();

        if (! $user || strtolower(trim((string) $user->role_user)) !== 'admin') {
            return response()->json(['message' => 'Accès refusé pour ce rôle.'], 403);
        }

        $sportifs = \App\Models\User::whereRaw('LOWER(TRIM(role_user)) = ?', ['sportif'])
            ->with('portfolio')
            ->get();

        return response()->json($sportifs);
    })->middleware('role:admin');

    Route::get('/offres', [OffreRecrutementController::class, 'index']);
    Route::post('/offres', [OffreRecrutementController::class, 'store'])->middleware('role:admin');
    Route::put('/offres/{offre}', [OffreRecrutementController::class, 'update'])->middleware('role:admin');
    Route::delete('/offres/{offre}', [OffreRecrutementController::class, 'destroy'])->middleware('role:admin');
    Route::get('/candidatures', [CandidatureController::class, 'index'])->middleware('role:admin');
    Route::patch('/candidatures/{candidature}', [CandidatureController::class, 'updateStatus'])->middleware('role:admin');
});


