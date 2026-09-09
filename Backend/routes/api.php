<?php
// filepath: c:\Users\SOFIMED-ADMIN\Desktop\Sport_Connect\Backend\routes\Api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\profil\AfficherProfil;
use App\Http\Controllers\DashboardSportif\PortfolioController;

Route::post('/login', [Login::class, 'loginUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profil', [AfficherProfil::class, 'afficherProfil']);
    Route::post('/portfolio', [PortfolioController::class, 'ajouterPortfolio']);
});

