<?php 
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;    
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class Register extends Controller
{
    public function Register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_user' => 'required|string|max:255',
        ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role_user' => $request->role_user,
    ]);

    return response()->json(['message' => 'User registered successfully', 'user' => $user], 201 );
 
}}

