<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Questionnaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'matieres_preferees', 'centres_interet',
        'moyenne_generale', 'serie_bac', 'ville_souhaitee',
        'budget_mensuel', 'aspirations_professionnelles',
    ];

    protected function casts(): array
    {
        return [
            'matieres_preferees' => 'array',
            'centres_interet' => 'array',
            'aspirations_professionnelles' => 'array',
            'moyenne_generale' => 'decimal:2',
            'budget_mensuel' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
