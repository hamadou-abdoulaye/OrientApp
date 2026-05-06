<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'domaine', 'description', 'etablissement',
        'ville', 'frais_scolarite', 'duree_annees',
        'debouches', 'conditions_acces', 'niveau', 'logo_url', 'type', 'image_url',
    ];

    protected function casts(): array
    {
        return [
            'frais_scolarite' => 'decimal:2',
        ];
    }

    public function recommandations()
    {
        return $this->hasMany(Recommandation::class);
    }

    public function interets()
    {
        return $this->hasMany(\App\Models\Interet::class);
    }
}
