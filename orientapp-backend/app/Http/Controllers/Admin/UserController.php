<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Formation;
use App\Models\Recommandation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_etudiants'    => User::where('role', 'etudiant')->count(),
            'total_conseillers'  => User::where('role', 'conseiller')->count(),
            'total_formations'   => Formation::count(),
            'total_recommandations' => Recommandation::count(),
        ]);
    }

    public function index(Request $request)
    {
        $query = User::query();
        if ($request->role) $query->where('role', $request->role);
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:etudiant,conseiller,admin',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => $data['role'],
        ]);

        return response()->json($user, 201);
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Impossible de supprimer votre propre compte'], 400);
        }
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'  => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'role'  => 'sometimes|in:etudiant,conseiller,admin',
        ]);
        $user->update($data);
        return response()->json($user);
    }
}
