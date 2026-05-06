<?php

namespace App\Http\Controllers;

use App\Models\Conseil;
use App\Models\User;
use Illuminate\Http\Request;

class ConseilController extends Controller
{
    // Conseiller envoie un conseil/suggestion à un étudiant
    public function store(Request $request)
    {
        $data = $request->validate([
            'etudiant_id'  => 'required|exists:users,id',
            'type'         => 'required|in:note,suggestion',
            'message'      => 'required|string|max:1000',
            'formation_id' => 'nullable|exists:formations,id',
        ]);

        $etudiant = User::findOrFail($data['etudiant_id']);
        if ($etudiant->role !== 'etudiant') {
            return response()->json(['message' => 'Destinataire invalide'], 400);
        }

        $conseil = Conseil::create([
            ...$data,
            'conseiller_id' => auth()->id(),
        ]);

        return response()->json($conseil->load(['conseiller', 'formation']), 201);
    }

    // Conseiller voit tous ses conseils envoyés à un étudiant
    public function parEtudiant(User $user)
    {
        $conseils = Conseil::with(['formation'])
            ->where('conseiller_id', auth()->id())
            ->where('etudiant_id', $user->id)
            ->latest()
            ->get();

        return response()->json($conseils);
    }

    // Étudiant voit ses conseils reçus
    public function mesConseils()
    {
        $conseils = Conseil::with(['conseiller', 'formation'])
            ->where('etudiant_id', auth()->id())
            ->latest()
            ->get();

        // Marquer comme lus
        Conseil::where('etudiant_id', auth()->id())
            ->where('lu', false)
            ->update(['lu' => true]);

        return response()->json($conseils);
    }

    // Nombre de conseils non lus pour l'étudiant
    public function nonLus()
    {
        $count = Conseil::where('etudiant_id', auth()->id())
            ->where('lu', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    // Supprimer un conseil
    public function destroy(Conseil $conseil)
    {
        if ($conseil->conseiller_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $conseil->delete();
        return response()->json(['message' => 'Conseil supprimé']);
    }
}
