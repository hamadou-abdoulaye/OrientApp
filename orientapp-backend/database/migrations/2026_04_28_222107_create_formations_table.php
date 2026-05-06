<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('domaine');
            $table->text('description')->nullable();
            $table->string('etablissement');
            $table->string('ville');
            $table->decimal('frais_scolarite', 10, 2)->nullable();
            $table->integer('duree_annees');
            $table->text('debouches')->nullable();
            $table->text('conditions_acces')->nullable();
            $table->enum('niveau', ['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre'])->default('Licence');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
