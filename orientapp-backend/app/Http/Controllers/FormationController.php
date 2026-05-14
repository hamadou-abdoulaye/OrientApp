<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Interet;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    public function index(Request $request)
    {
        $query = Formation::query();

        if ($request->domaine)   $query->where('domaine', 'like', "%{$request->domaine}%");
        if ($request->ville)     $query->where('ville', 'like', "%{$request->ville}%");
        if ($request->niveau)    $query->where('niveau', $request->niveau);
        if ($request->type)      $query->where('type', $request->type);
        if ($request->search)    $query->where('nom', 'like', "%{$request->search}%");

        return response()->json($query->paginate(50));
    }

    public function show(Formation $formation)
    {
        $formation->loadCount('interets');

        $interesse = auth()->check()
            ? Interet::where('user_id', auth()->id())->where('formation_id', $formation->id)->exists()
            : false;

        return response()->json([
            ...$formation->toArray(),
            'je_suis_interesse' => $interesse,
        ]);
    }

    public function toggleInteret(Formation $formation)
    {
        $existing = Interet::where('user_id', auth()->id())
            ->where('formation_id', $formation->id)->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['interesse' => false]);
        }

        Interet::create(['user_id' => auth()->id(), 'formation_id' => $formation->id]);
        return response()->json(['interesse' => true]);
    }

    public function mesInterets()
    {
        return response()->json(
            Interet::with('formation')->where('user_id', auth()->id())->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom'              => 'required|string',
            'domaine'          => 'required|string',
            'description'      => 'nullable|string',
            'etablissement'    => 'required|string',
            'ville'            => 'required|string',
            'frais_scolarite'  => 'nullable|numeric',
            'duree_annees'     => 'required|integer',
            'debouches'        => 'nullable|string',
            'conditions_acces' => 'nullable|string',
            'niveau'           => 'in:Licence,Master,BTS,DUT,Doctorat,Autre',
            'type'             => 'in:public,prive',
            'logo_url'         => 'nullable|string',
            'site_web'         => 'nullable|string',
        ]);

        return response()->json(Formation::create($data), 201);
    }

    public function update(Request $request, Formation $formation)
    {
        $formation->update($request->validate([
            'nom'              => 'sometimes|string',
            'domaine'          => 'sometimes|string',
            'description'      => 'nullable|string',
            'etablissement'    => 'sometimes|string',
            'ville'            => 'sometimes|string',
            'frais_scolarite'  => 'nullable|numeric',
            'duree_annees'     => 'sometimes|integer',
            'debouches'        => 'nullable|string',
            'conditions_acces' => 'nullable|string',
            'niveau'           => 'in:Licence,Master,BTS,DUT,Doctorat,Autre',
            'type'             => 'in:public,prive',
            'logo_url'         => 'nullable|string',
            'site_web'         => 'nullable|string',
        ]));

        return response()->json($formation);
    }

    public function destroy(Formation $formation)
    {
        $formation->delete();
        return response()->json(['message' => 'Formation supprimée']);
    }
}
