<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\profil\AfficherProfil;
use App\Http\Controllers\DashboardSportif\PortfolioController;
use App\Http\Controllers\DashboardAdmin\club\CreeClub;

Route::post('/login', [Login::class, 'loginUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profil', [AfficherProfil::class, 'afficherProfil']);
    Route::post('/portfolio', [PortfolioController::class, 'ajouterPortfolio']);

    });