<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conseil extends Model
{
    use HasFactory;

    protected $fillable = [
        'conseiller_id', 'etudiant_id', 'formation_id',
        'type', 'message', 'lu',
    ];

    protected function casts(): array
    {
        return ['lu' => 'boolean'];
    }

    public function conseiller()
    {
        return $this->belongsTo(User::class, 'conseiller_id');
    }

    public function etudiant()
    {
        return $this->belongsTo(User::class, 'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
