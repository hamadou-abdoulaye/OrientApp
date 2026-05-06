<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recommandation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'formation_id', 'score_compatibilite',
        'justification', 'est_favori',
    ];

    protected function casts(): array
    {
        return [
            'score_compatibilite' => 'decimal:2',
            'est_favori' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
