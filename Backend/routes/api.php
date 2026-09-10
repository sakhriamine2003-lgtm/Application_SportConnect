<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\profil\AfficherProfil;
use App\Http\Controllers\DashboardSportif\PortfolioController;
use App\Http\Controllers\DashboardAdmin\club\CreeClub;
use App\Http\Controllers\DashboardSportif\AfficherPortfolio;

Route::post('/login', [Login::class, 'loginUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profil', [AfficherProfil::class, 'afficherProfil']);
    Route::get('/AfficherPortfolio', [AfficherPortfolio::class, 'afficherPortfolio']);
    Route::post('/portfolio', [PortfolioController::class, 'ajouterPortfolio']);
    Route::post('/clubs', [CreeClub::class, 'creeClub']);
});

