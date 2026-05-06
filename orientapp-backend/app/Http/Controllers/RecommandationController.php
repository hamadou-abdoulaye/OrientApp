<?php

namespace App\Http\Controllers;

use App\Models\Recommandation;
use Illuminate\Http\Request;

class RecommandationController extends Controller
{
    public function index()
    {
        $recommandations = Recommandation::with('formation')
            ->where('user_id', auth()->id())
            ->orderByDesc('score_compatibilite')
            ->get();

        return response()->json($recommandations);
    }

    public function toggleFavori(Recommandation $recommandation)
    {
        if ($recommandation->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $recommandation->update(['est_favori' => !$recommandation->est_favori]);
        return response()->json($recommandation);
    }

    public function favoris()
    {
        $favoris = Recommandation::with('formation')
            ->where('user_id', auth()->id())
            ->where('est_favori', true)
            ->orderByDesc('score_compatibilite')
            ->get();

        return response()->json($favoris);
    }
}
