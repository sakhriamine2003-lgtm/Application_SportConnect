<?php   
	// nom	ville	sport	description	
namespace App\Http\Controllers\challenge;

use App\Http\Controllers\Controller;
use App\Http\models\club;
use Illuminate\Http\Request;    

class challengeController extends Controller
{
   public function CreeForme(Requesst $requesst){
try {
   $valudation = $requesst->validate([
    "nom"=> "required" ,"string", 
    "ville"=> "required" ,"string",
    "sport"=> "required" ,"string",
    "description"=> "required" ,"string" , "max:255" ,
   ]);

   if(Auth::id()= $requesst->user_id){

   $clubs = club::create($valudation);

   
   return reponse()->json([
      'message' => 'creation de formulaire et valuder',
      'data' => $clubs,
      ]);


   } //codition

   
   } catch(\Exeption $e){
    return reponse()->json([
        'message'=> $e->getMessage(),
    ]) ;
   }

   }}


