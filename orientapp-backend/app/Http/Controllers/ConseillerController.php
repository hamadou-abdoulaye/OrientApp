<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recommandation;
use Illuminate\Http\Request;

class ConseillerController extends Controller
{
    public function etudiants()
    {
        $etudiants = User::where('role', 'etudiant')
            ->withCount('recommandations')
            ->with('questionnaires')
            ->get();

        return response()->json($etudiants);
    }

    public function etudiant(User $user)
    {
        if ($user->role !== 'etudiant') {
            return response()->json(['message' => 'Cet utilisateur n\'est pas un étudiant'], 400);
        }

        return response()->json([
            'etudiant'        => $user,
            'questionnaire'   => $user->questionnaires()->latest()->first(),
            'recommandations' => $user->recommandations()->with('formation')->orderByDesc('score_compatibilite')->get(),
        ]);
    }

    public function stats()
    {
        return response()->json([
            'total_etudiants'       => User::where('role', 'etudiant')->count(),
            'etudiants_avec_questionnaire' => User::where('role', 'etudiant')->whereHas('questionnaires')->count(),
            'total_recommandations' => Recommandation::count(),
            'moyenne_score'         => round(Recommandation::avg('score_compatibilite'), 1),
        ]);
    }
}
