<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(auth()->user());
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'name'          => 'sometimes|string|max:255',
            'email'         => 'sometimes|email|unique:users,email,' . $user->id,
            'telephone'     => 'nullable|string|max:20',
            'ville'         => 'nullable|string|max:100',
            'budget_mensuel'=> 'nullable|numeric',
            'serie_bac'     => 'nullable|string|max:10',
            'moyenne_bac'   => 'nullable|numeric|min:0|max:20',
        ]);

        $user->update($data);
        return response()->json($user);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password'         => 'required|string|min:6|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect'], 400);
        }

        $user->update(['password' => Hash::make($request->password)]);
        return response()->json(['message' => 'Mot de passe mis à jour']);
    }
}
