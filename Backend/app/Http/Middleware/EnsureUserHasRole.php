<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        $user = Auth::user();
        $userRole = $user ? strtolower(trim((string) $user->role_user)) : null;
        $expectedRole = strtolower(trim($role));

        if (! $user || $userRole !== $expectedRole) {
            return response()->json([
                'message' => 'Accès refusé pour ce rôle.',
            ], 403);
        }

        return $next($request);
    }
}
