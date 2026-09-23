<?php

namespace App\Http\Controllers\DashboardSportif;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = Message::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'data' => $messages,
            'unread_count' => $messages->whereNull('read_at')->count(),
        ]);
    }


    public function destroy(Request $request, Message $message)
    {
        if ($message->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $message->delete();

        return response()->json(['message' => 'Message supprimé.']);
    }
}
