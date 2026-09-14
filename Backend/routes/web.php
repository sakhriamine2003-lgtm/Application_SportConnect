<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'login')->name('login');
Route::view('/login', 'login');
Route::view('/dashboard/admin', 'dashboard.admin')->name('dashboard.admin');
Route::view('/dashboard/sportif', 'dashboard.sportif')->name('dashboard.sportif');
