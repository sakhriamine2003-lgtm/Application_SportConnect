<?php 
namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\OffreRecrutement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreRecrutementController extends Controller
{
    public function index()
    {
        $offres = OffreRecrutement::latest()->get();

        return response()->json($offres);
}}