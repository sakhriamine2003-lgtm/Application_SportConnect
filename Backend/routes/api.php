<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\dashboardSportif\profil\AfficherProfil;


Route::post('/login', [Login::class, 'loginUser']); 

Route::middleware('auth:sanctum')
     ->get('/profil', [AfficherProfil::class, 'AfficherProfil']);