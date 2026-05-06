<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    // Upload avatar utilisateur
    public function avatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = auth()->user();

        // Supprimer l'ancien avatar
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return response()->json([
            'avatar' => $path,
            'avatar_url' => asset('storage/' . $path),
        ]);
    }

    // Upload logo formation
    public function logoFormation(Request $request, Formation $formation)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,webp,svg|max:2048',
        ]);

        if ($formation->logo_url && !str_starts_with($formation->logo_url, 'http') && Storage::disk('public')->exists($formation->logo_url)) {
            Storage::disk('public')->delete($formation->logo_url);
        }

        $path = $request->file('logo')->store('logos', 'public');
        $formation->update(['logo_url' => asset('storage/' . $path)]);

        return response()->json(['logo_url' => asset('storage/' . $path)]);
    }

    // Upload image bannière formation
    public function imageFormation(Request $request, Formation $formation)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($formation->image_url && !str_starts_with($formation->image_url, 'http') && Storage::disk('public')->exists($formation->image_url)) {
            Storage::disk('public')->delete($formation->image_url);
        }

        $path = $request->file('image')->store('formations', 'public');
        $formation->update(['image_url' => asset('storage/' . $path)]);

        return response()->json(['image_url' => asset('storage/' . $path)]);
    }
}
