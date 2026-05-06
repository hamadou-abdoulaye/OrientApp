<?php

namespace App\Http\Controllers;

use App\Models\Questionnaire;
use App\Models\Formation;
use App\Models\Recommandation;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'matieres_preferees'         => 'required|array',
            'centres_interet'            => 'required|array',
            'moyenne_generale'           => 'required|numeric|min:0|max:20',
            'serie_bac'                  => 'required|string',
            'ville_souhaitee'            => 'nullable|string',
            'budget_mensuel'             => 'nullable|numeric',
            'aspirations_professionnelles' => 'nullable|array',
        ]);

        $data['user_id'] = auth()->id();

        $questionnaire = Questionnaire::updateOrCreate(
            ['user_id' => auth()->id()],
            $data
        );

        $recommandations = $this->genererRecommandations($questionnaire);

        return response()->json([
            'questionnaire'   => $questionnaire,
            'recommandations' => $recommandations,
        ], 201);
    }

    public function show()
    {
        $questionnaire = Questionnaire::where('user_id', auth()->id())->firstOrFail();
        return response()->json($questionnaire);
    }

    private function genererRecommandations(Questionnaire $q): array
    {
        Recommandation::where('user_id', $q->user_id)->delete();

        $formations = Formation::all();
        $recommandations = [];

        foreach ($formations as $formation) {
            $score = $this->calculerScore($q, $formation);

            if ($score >= 30) {
                $rec = Recommandation::create([
                    'user_id'             => $q->user_id,
                    'formation_id'        => $formation->id,
                    'score_compatibilite' => $score,
                    'justification'       => $this->genererJustification($q, $formation, $score),
                ]);
                $recommandations[] = $rec->load('formation');
            }
        }

        usort($recommandations, fn($a, $b) => $b->score_compatibilite <=> $a->score_compatibilite);

        return array_slice($recommandations, 0, 10);
    }

    private function calculerScore(Questionnaire $q, Formation $formation): float
    {
        $score = 0;
        $details = [];

        // 1. Score basé sur la moyenne (30 pts max)
        $scoreMoyenne = match(true) {
            $q->moyenne_generale >= 16 => 30,
            $q->moyenne_generale >= 14 => 25,
            $q->moyenne_generale >= 12 => 20,
            $q->moyenne_generale >= 10 => 10,
            default => 0,
        };
        $score += $scoreMoyenne;

        // 2. Correspondance centres d'intérêt / domaine (25 pts max)
        $scoreDomaine = 0;
        foreach ($q->centres_interet as $interet) {
            similar_text(strtolower($interet), strtolower($formation->domaine), $pct);
            if ($pct > 50 || stripos($formation->domaine, $interet) !== false) {
                $scoreDomaine = 25;
                break;
            } elseif ($pct > 30) {
                $scoreDomaine = max($scoreDomaine, 12);
            }
        }
        $score += $scoreDomaine;

        // 3. Correspondance matières / conditions d'accès (20 pts max)
        $scoreMatiere = 0;
        if ($formation->conditions_acces) {
            foreach ($q->matieres_preferees as $matiere) {
                if (stripos($formation->conditions_acces, $matiere) !== false) {
                    $scoreMatiere += 10;
                }
            }
        }
        $score += min($scoreMatiere, 20);

        // 4. Ville souhaitée (15 pts)
        if ($q->ville_souhaitee && stripos($formation->ville, $q->ville_souhaitee) !== false) {
            $score += 15;
        }

        // 5. Budget (10 pts)
        if ($q->budget_mensuel && $formation->frais_scolarite) {
            $frais_mensuel = $formation->frais_scolarite / 12;
            if ($frais_mensuel <= $q->budget_mensuel) {
                $score += 10;
            } elseif ($frais_mensuel <= $q->budget_mensuel * 1.2) {
                $score += 5;
            }
        } elseif (!$formation->frais_scolarite) {
            $score += 10; // gratuit = toujours accessible
        }

        // 6. Aspirations professionnelles / débouchés (bonus 10 pts)
        if ($q->aspirations_professionnelles && $formation->debouches) {
            foreach ($q->aspirations_professionnelles as $aspiration) {
                if (stripos($formation->debouches, $aspiration) !== false) {
                    $score += 10;
                    break;
                }
            }
        }

        return min(round($score), 100);
    }

    private function genererJustification(Questionnaire $q, Formation $formation, float $score): string
    {
        $niveau = $score >= 80 ? 'Excellente' : ($score >= 60 ? 'Bonne' : 'Correcte');
        return "{$niveau} compatibilité ({$score}%) avec {$formation->nom} à {$formation->etablissement}.";
    }
}
