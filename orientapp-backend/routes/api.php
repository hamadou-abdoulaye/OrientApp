<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\RecommandationController;
use App\Http\Controllers\ConseillerController;
use App\Http\Controllers\ConseilController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

// Auth publique
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Routes protégées par JWT
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::get('/me',       [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Formations
    Route::get('/formations',                          [FormationController::class, 'index']);
    Route::get('/formations/{formation}',              [FormationController::class, 'show']);
    Route::post('/formations/{formation}/interet',     [FormationController::class, 'toggleInteret']);
    Route::get('/mes-interets',                        [FormationController::class, 'mesInterets']);

    // Profil
    Route::get('/profil',                  [ProfileController::class, 'show']);
    Route::put('/profil',                  [ProfileController::class, 'update']);
    Route::put('/profil/password',         [ProfileController::class, 'updatePassword']);

    // Uploads
    Route::post('/upload/avatar',                        [UploadController::class, 'avatar']);
    Route::post('/upload/formation/{formation}/logo',    [UploadController::class, 'logoFormation']);
    Route::post('/upload/formation/{formation}/image',   [UploadController::class, 'imageFormation']);

    // Questionnaire
    Route::post('/questionnaire', [QuestionnaireController::class, 'store']);
    Route::get('/questionnaire',  [QuestionnaireController::class, 'show']);

    // Recommandations
    Route::get('/recommandations',                          [RecommandationController::class, 'index']);
    Route::get('/recommandations/favoris',                  [RecommandationController::class, 'favoris']);
    Route::patch('/recommandations/{recommandation}/favori', [RecommandationController::class, 'toggleFavori']);

    // Conseiller
    Route::middleware('role:conseiller,admin')->group(function () {
        Route::get('/conseiller/stats',              [ConseillerController::class, 'stats']);
        Route::get('/conseiller/etudiants',          [ConseillerController::class, 'etudiants']);
        Route::get('/conseiller/etudiants/{user}',   [ConseillerController::class, 'etudiant']);
        Route::post('/conseils',                     [ConseilController::class, 'store']);
        Route::get('/conseils/etudiant/{user}',      [ConseilController::class, 'parEtudiant']);
        Route::delete('/conseils/{conseil}',         [ConseilController::class, 'destroy']);
    });

    // Étudiant - conseils reçus
    Route::get('/mes-conseils',      [ConseilController::class, 'mesConseils']);
    Route::get('/mes-conseils/non-lus', [ConseilController::class, 'nonLus']);

    // Admin
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/stats',              [AdminUserController::class, 'stats']);
        Route::get('/admin/users',              [AdminUserController::class, 'index']);
        Route::post('/admin/users',             [AdminUserController::class, 'store']);
        Route::put('/admin/users/{user}',       [AdminUserController::class, 'update']);
        Route::delete('/admin/users/{user}',    [AdminUserController::class, 'destroy']);
        Route::post('/formations',              [FormationController::class, 'store']);
        Route::put('/formations/{formation}',   [FormationController::class, 'update']);
        Route::delete('/formations/{formation}',[FormationController::class, 'destroy']);
    });
});
