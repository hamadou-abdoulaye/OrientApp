<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['etudiant', 'conseiller', 'admin'])->default('etudiant')->after('email');
            $table->string('telephone')->nullable()->after('role');
            $table->string('ville')->nullable()->after('telephone');
            $table->decimal('budget_mensuel', 10, 2)->nullable()->after('ville');
            $table->string('serie_bac')->nullable()->after('budget_mensuel');
            $table->decimal('moyenne_bac', 4, 2)->nullable()->after('serie_bac');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'telephone', 'ville', 'budget_mensuel', 'serie_bac', 'moyenne_bac']);
        });
    }
};
