<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('matieres_preferees');
            $table->json('centres_interet');
            $table->decimal('moyenne_generale', 4, 2);
            $table->string('serie_bac');
            $table->string('ville_souhaitee')->nullable();
            $table->decimal('budget_mensuel', 10, 2)->nullable();
            $table->json('aspirations_professionnelles')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questionnaires');
    }
};
