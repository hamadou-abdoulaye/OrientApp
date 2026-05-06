<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Seeder;

class FormationSeeder extends Seeder
{
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Formation::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $ucad = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/UCAD_Logo.jpg/320px-UCAD_Logo.jpg';
        $ugb  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Universit%C3%A9_Gaston_Berger_logo.png/220px-Universit%C3%A9_Gaston_Berger_logo.png';
        $esp  = 'https://esp.sn/wp-content/uploads/2021/01/ESP-logo.png';
        $ism  = 'https://www.ism.education/wp-content/uploads/2022/05/ISM-logo-2022.png';
        $ept  = 'https://ept.sn/wp-content/uploads/2021/01/logo-ept.png';
        $iam  = 'https://iam.sn/wp-content/uploads/2020/01/logo-iam.png';
        $uadb = 'https://uadb.edu.sn/wp-content/uploads/2021/01/logo-uadb.png';
        $uz   = 'https://univ-zig.sn/wp-content/uploads/2021/01/logo-uz.png';
        $uts  = 'https://via.placeholder.com/100x100/10B981/ffffff?text=UTS';
        $iseg = 'https://via.placeholder.com/100x100/6366F1/ffffff?text=ISEG';
        $supdeco = 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=SUP';
        $isd  = 'https://via.placeholder.com/100x100/EF4444/ffffff?text=ISD';
        $css  = 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=CSS';
        $bid  = 'https://via.placeholder.com/100x100/06B6D4/ffffff?text=BID';
        $esmt = 'https://via.placeholder.com/100x100/EC4899/ffffff?text=ESMT';

        $formations = [
            // ===== UCAD =====
            [
                'nom' => 'Licence Informatique',
                'domaine' => 'Informatique Technologie',
                'description' => 'Formation en développement logiciel, algorithmique, réseaux et systèmes d\'information.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 150000,
                'duree_annees' => 3,
                'debouches' => 'Développeur web/mobile, Administrateur réseau, Chef de projet IT',
                'conditions_acces' => 'Bac S, Bac T, Maths, Physique, Informatique',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Licence Médecine',
                'domaine' => 'Santé Médecine Biologie',
                'description' => 'Formation médicale complète pour devenir médecin généraliste ou spécialiste.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 200000,
                'duree_annees' => 7,
                'debouches' => 'Médecin généraliste, Spécialiste, Chercheur en santé',
                'conditions_acces' => 'Bac S, Biologie, Chimie, Physique, moyenne élevée',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Licence Droit Privé',
                'domaine' => 'Droit Sciences Juridiques',
                'description' => 'Formation juridique couvrant le droit civil, commercial, du travail et des affaires.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 120000,
                'duree_annees' => 3,
                'debouches' => 'Avocat, Notaire, Juriste d\'entreprise, Magistrat',
                'conditions_acces' => 'Bac L, Bac S, Français, Histoire-Géographie',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Licence Sciences Économiques',
                'domaine' => 'Économie Finance Gestion',
                'description' => 'Formation en économie appliquée, macroéconomie, microéconomie et analyse financière.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 130000,
                'duree_annees' => 3,
                'debouches' => 'Économiste, Analyste financier, Gestionnaire, Banquier',
                'conditions_acces' => 'Bac ES, Bac S, Économie, Maths',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Licence Mathématiques',
                'domaine' => 'Mathématiques Sciences',
                'description' => 'Formation en mathématiques pures et appliquées, statistiques et probabilités.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 120000,
                'duree_annees' => 3,
                'debouches' => 'Enseignant, Statisticien, Actuaire, Data Analyst',
                'conditions_acces' => 'Bac S, Maths, Physique',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Master Gestion des Entreprises',
                'domaine' => 'Gestion Management',
                'description' => 'Formation avancée en management stratégique, finance d\'entreprise et leadership.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 300000,
                'duree_annees' => 2,
                'debouches' => 'Directeur financier, Manager, Consultant, Entrepreneur',
                'conditions_acces' => 'Licence Gestion, Économie ou équivalent',
                'niveau' => 'Master',
                'logo_url' => $ucad,
            ],
            [
                'nom' => 'Licence Pharmacie',
                'domaine' => 'Santé Pharmacie Chimie',
                'description' => 'Formation en sciences pharmaceutiques, chimie organique et biologie moléculaire.',
                'etablissement' => 'Université Cheikh Anta Diop (UCAD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 180000,
                'duree_annees' => 6,
                'debouches' => 'Pharmacien, Chercheur, Biologiste médical',
                'conditions_acces' => 'Bac S, Chimie, Biologie, Physique',
                'niveau' => 'Licence',
                'logo_url' => $ucad,
            ],

            // ===== ESP =====
            [
                'nom' => 'Diplôme d\'Ingénieur en Informatique',
                'domaine' => 'Informatique Technologie Ingénierie',
                'description' => 'Formation d\'ingénieur en génie logiciel, intelligence artificielle et systèmes embarqués.',
                'etablissement' => 'École Supérieure Polytechnique (ESP)',
                'ville' => 'Dakar',
                'frais_scolarite' => 450000,
                'duree_annees' => 5,
                'debouches' => 'Ingénieur logiciel, Architecte système, Data Engineer',
                'conditions_acces' => 'Bac S, Maths, Physique, Informatique, concours d\'entrée',
                'niveau' => 'Master',
                'logo_url' => $esp,
            ],
            [
                'nom' => 'Diplôme d\'Ingénieur en Génie Électrique',
                'domaine' => 'Électronique Électricité Ingénierie',
                'description' => 'Formation en électronique de puissance, automatisme, énergies renouvelables.',
                'etablissement' => 'École Supérieure Polytechnique (ESP)',
                'ville' => 'Dakar',
                'frais_scolarite' => 450000,
                'duree_annees' => 5,
                'debouches' => 'Ingénieur électricien, Automaticien, Chef de projet énergie',
                'conditions_acces' => 'Bac S, Maths, Physique, concours d\'entrée',
                'niveau' => 'Master',
                'logo_url' => $esp,
            ],
            [
                'nom' => 'Master Intelligence Artificielle',
                'domaine' => 'Informatique Intelligence Artificielle',
                'description' => 'Formation spécialisée en machine learning, deep learning, NLP et data science.',
                'etablissement' => 'École Supérieure Polytechnique (ESP)',
                'ville' => 'Dakar',
                'frais_scolarite' => 500000,
                'duree_annees' => 2,
                'debouches' => 'Data Scientist, Ingénieur IA, Chercheur, MLOps Engineer',
                'conditions_acces' => 'Licence Informatique, Maths, Statistiques',
                'niveau' => 'Master',
                'logo_url' => $esp,
            ],

            // ===== UGB =====
            [
                'nom' => 'Licence Droit Public',
                'domaine' => 'Droit Sciences Juridiques Politique',
                'description' => 'Formation en droit constitutionnel, administratif, international et sciences politiques.',
                'etablissement' => 'Université Gaston Berger (UGB)',
                'ville' => 'Saint-Louis',
                'frais_scolarite' => 120000,
                'duree_annees' => 3,
                'debouches' => 'Fonctionnaire, Diplomate, Juriste, Magistrat',
                'conditions_acces' => 'Bac L, Bac S, Français, Histoire',
                'niveau' => 'Licence',
                'logo_url' => $ugb,
            ],
            [
                'nom' => 'Licence Sociologie',
                'domaine' => 'Sciences Sociales Humanités',
                'description' => 'Étude des phénomènes sociaux, des organisations et des comportements humains.',
                'etablissement' => 'Université Gaston Berger (UGB)',
                'ville' => 'Saint-Louis',
                'frais_scolarite' => 100000,
                'duree_annees' => 3,
                'debouches' => 'Sociologue, Chargé d\'études, Travailleur social, ONG',
                'conditions_acces' => 'Bac L, Bac S, Sciences Humaines',
                'niveau' => 'Licence',
                'logo_url' => $ugb,
            ],
            [
                'nom' => 'Master Développement Local',
                'domaine' => 'Développement Économie Territoire',
                'description' => 'Formation en planification territoriale, gestion de projets de développement et politiques publiques.',
                'etablissement' => 'Université Gaston Berger (UGB)',
                'ville' => 'Saint-Louis',
                'frais_scolarite' => 250000,
                'duree_annees' => 2,
                'debouches' => 'Chef de projet, Consultant développement, Fonctionnaire territorial',
                'conditions_acces' => 'Licence Sciences Sociales, Économie ou Géographie',
                'niveau' => 'Master',
                'logo_url' => $ugb,
            ],

            // ===== EPT =====
            [
                'nom' => 'Diplôme d\'Ingénieur Génie Civil',
                'domaine' => 'Génie Civil Construction BTP',
                'description' => 'Formation en construction, structures, hydraulique et gestion de projets d\'infrastructure.',
                'etablissement' => 'École Polytechnique de Thiès (EPT)',
                'ville' => 'Thiès',
                'frais_scolarite' => 500000,
                'duree_annees' => 5,
                'debouches' => 'Ingénieur BTP, Chef de chantier, Directeur travaux, Bureau d\'études',
                'conditions_acces' => 'Bac S, Maths, Physique, concours national',
                'niveau' => 'Master',
                'logo_url' => $ept,
            ],
            [
                'nom' => 'Diplôme d\'Ingénieur Mécanique',
                'domaine' => 'Mécanique Ingénierie Industrie',
                'description' => 'Formation en mécanique des fluides, thermodynamique, conception mécanique et maintenance industrielle.',
                'etablissement' => 'École Polytechnique de Thiès (EPT)',
                'ville' => 'Thiès',
                'frais_scolarite' => 500000,
                'duree_annees' => 5,
                'debouches' => 'Ingénieur mécanique, Responsable maintenance, Chef de production',
                'conditions_acces' => 'Bac S, Maths, Physique, concours national',
                'niveau' => 'Master',
                'logo_url' => $ept,
            ],

            // ===== ISM =====
            [
                'nom' => 'BTS Commerce International',
                'domaine' => 'Commerce Gestion International',
                'description' => 'Formation en commerce, import-export, logistique et gestion des échanges internationaux.',
                'etablissement' => 'Institut Supérieur de Management (ISM)',
                'ville' => 'Dakar',
                'frais_scolarite' => 800000,
                'duree_annees' => 2,
                'debouches' => 'Commercial export, Chargé d\'affaires, Responsable logistique',
                'conditions_acces' => 'Bac toutes séries, Économie, Anglais',
                'niveau' => 'BTS',
                'logo_url' => $ism,
            ],
            [
                'nom' => 'Bachelor Marketing Digital',
                'domaine' => 'Marketing Communication Digital',
                'description' => 'Formation en marketing digital, réseaux sociaux, SEO, e-commerce et stratégie de communication.',
                'etablissement' => 'Institut Supérieur de Management (ISM)',
                'ville' => 'Dakar',
                'frais_scolarite' => 1200000,
                'duree_annees' => 3,
                'debouches' => 'Community manager, Chef de projet digital, Responsable marketing',
                'conditions_acces' => 'Bac toutes séries, Français, Anglais',
                'niveau' => 'Licence',
                'logo_url' => $ism,
            ],
            [
                'nom' => 'MBA Management',
                'domaine' => 'Management Leadership Stratégie',
                'description' => 'Programme MBA axé sur le leadership, la stratégie d\'entreprise et la gestion des organisations.',
                'etablissement' => 'Institut Supérieur de Management (ISM)',
                'ville' => 'Dakar',
                'frais_scolarite' => 2500000,
                'duree_annees' => 2,
                'debouches' => 'Directeur général, Manager senior, Consultant stratégique',
                'conditions_acces' => 'Bac+3 minimum, expérience professionnelle recommandée',
                'niveau' => 'Master',
                'logo_url' => $ism,
            ],

            // ===== IAM =====
            [
                'nom' => 'BTS Comptabilité et Gestion',
                'domaine' => 'Finance Comptabilité Gestion',
                'description' => 'Formation en comptabilité générale, fiscalité, contrôle de gestion et audit.',
                'etablissement' => 'Institut Africain de Management (IAM)',
                'ville' => 'Dakar',
                'frais_scolarite' => 600000,
                'duree_annees' => 2,
                'debouches' => 'Comptable, Contrôleur de gestion, Auditeur, Expert-comptable',
                'conditions_acces' => 'Bac G, Bac S, Maths, Économie',
                'niveau' => 'BTS',
                'logo_url' => $iam,
            ],
            [
                'nom' => 'Licence Ressources Humaines',
                'domaine' => 'Ressources Humaines Management',
                'description' => 'Formation en gestion du personnel, droit du travail, recrutement et développement des compétences.',
                'etablissement' => 'Institut Africain de Management (IAM)',
                'ville' => 'Dakar',
                'frais_scolarite' => 900000,
                'duree_annees' => 3,
                'debouches' => 'DRH, Chargé de recrutement, Responsable formation, Consultant RH',
                'conditions_acces' => 'Bac toutes séries, Français, Sciences Humaines',
                'niveau' => 'Licence',
                'logo_url' => $iam,
            ],

            // ===== UADB =====
            [
                'nom' => 'Licence Sciences de l\'Éducation',
                'domaine' => 'Éducation Enseignement Pédagogie',
                'description' => 'Formation pour les futurs enseignants et professionnels de l\'éducation et de la formation.',
                'etablissement' => 'Université Alioune Diop de Bambey (UADB)',
                'ville' => 'Bambey',
                'frais_scolarite' => 100000,
                'duree_annees' => 3,
                'debouches' => 'Enseignant, Conseiller pédagogique, Formateur, Inspecteur',
                'conditions_acces' => 'Bac L, Bac S, Français, Philosophie',
                'niveau' => 'Licence',
                'logo_url' => $uadb,
            ],
            [
                'nom' => 'Licence Agronomie',
                'domaine' => 'Agriculture Agronomie Environnement',
                'description' => 'Formation en sciences agricoles, gestion des ressources naturelles et développement rural.',
                'etablissement' => 'Université Alioune Diop de Bambey (UADB)',
                'ville' => 'Bambey',
                'frais_scolarite' => 120000,
                'duree_annees' => 3,
                'debouches' => 'Agronome, Conseiller agricole, Gestionnaire de projets ruraux',
                'conditions_acces' => 'Bac S, Biologie, Chimie, Sciences de la Vie',
                'niveau' => 'Licence',
                'logo_url' => $uadb,
            ],

            // ===== Université de Ziguinchor =====
            [
                'nom' => 'Licence Tourisme et Hôtellerie',
                'domaine' => 'Tourisme Hôtellerie Service',
                'description' => 'Formation en gestion hôtelière, tourisme durable et développement de destinations touristiques.',
                'etablissement' => 'Université Assane Seck de Ziguinchor',
                'ville' => 'Ziguinchor',
                'frais_scolarite' => 110000,
                'duree_annees' => 3,
                'debouches' => 'Gestionnaire hôtelier, Guide touristique, Responsable tourisme',
                'conditions_acces' => 'Bac toutes séries, Français, Anglais',
                'niveau' => 'Licence',
                'logo_url' => $uz,
            ],
            [
                'nom' => 'Licence Biologie',
                'domaine' => 'Biologie Sciences de la Vie',
                'description' => 'Formation en biologie cellulaire, génétique, écologie et biotechnologies.',
                'etablissement' => 'Université Assane Seck de Ziguinchor',
                'ville' => 'Ziguinchor',
                'frais_scolarite' => 100000,
                'duree_annees' => 3,
                'debouches' => 'Biologiste, Chercheur, Technicien de laboratoire, Enseignant',
                'conditions_acces' => 'Bac S, Biologie, Chimie, Sciences de la Vie',
                'niveau' => 'Licence',
                'logo_url' => $uz,
            ],

            // ===== UTS =====
            [
                'nom' => 'BTS Électronique et Informatique Industrielle',
                'domaine' => 'Électronique Informatique Industrie',
                'description' => 'Formation technique en électronique, automatisme, maintenance industrielle et réseaux.',
                'etablissement' => 'Université de Thiès (UTS)',
                'ville' => 'Thiès',
                'frais_scolarite' => 250000,
                'duree_annees' => 2,
                'debouches' => 'Technicien électronicien, Automaticien, Maintenancier industriel',
                'conditions_acces' => 'Bac S, Bac T, Physique, Maths',
                'niveau' => 'BTS',
                'logo_url' => $uts,
            ],

            // ===== ISEG =====
            [
                'nom' => 'Licence Finance et Banque',
                'domaine' => 'Finance Banque Économie',
                'description' => 'Formation en finance d\'entreprise, marchés financiers, banque et assurance.',
                'etablissement' => 'Institut Supérieur d\'Enseignement et de Gestion (ISEG)',
                'ville' => 'Dakar',
                'frais_scolarite' => 700000,
                'duree_annees' => 3,
                'debouches' => 'Banquier, Analyste financier, Gestionnaire de patrimoine, Assureur',
                'conditions_acces' => 'Bac ES, Bac S, Maths, Économie',
                'niveau' => 'Licence',
                'logo_url' => $iseg,
            ],
            [
                'nom' => 'BTS Secrétariat de Direction',
                'domaine' => 'Administration Secrétariat Gestion',
                'description' => 'Formation en secrétariat, bureautique, gestion administrative et communication professionnelle.',
                'etablissement' => 'Institut Supérieur d\'Enseignement et de Gestion (ISEG)',
                'ville' => 'Dakar',
                'frais_scolarite' => 400000,
                'duree_annees' => 2,
                'debouches' => 'Secrétaire de direction, Assistant administratif, Office manager',
                'conditions_acces' => 'Bac toutes séries, Français, Informatique',
                'niveau' => 'BTS',
                'logo_url' => $iseg,
            ],

            // ===== FACS PRIVÉES =====

            // SUP DE CO Dakar
            [
                'nom' => 'Bachelor Business Administration',
                'domaine' => 'Commerce Gestion Management',
                'description' => 'Formation en gestion des affaires, entrepreneuriat, finance et marketing international.',
                'etablissement' => 'Sup de Co Dakar',
                'ville' => 'Dakar',
                'frais_scolarite' => 1500000,
                'duree_annees' => 3,
                'debouches' => 'Manager, Entrepreneur, Chargé d\'affaires, Consultant',
                'conditions_acces' => 'Bac toutes séries, Anglais, Français',
                'niveau' => 'Licence',
                'logo_url' => $supdeco,
            ],
            [
                'nom' => 'Master Finance d\'Entreprise',
                'domaine' => 'Finance Gestion Comptabilité',
                'description' => 'Formation spécialisée en finance corporative, investissement et gestion des risques.',
                'etablissement' => 'Sup de Co Dakar',
                'ville' => 'Dakar',
                'frais_scolarite' => 2000000,
                'duree_annees' => 2,
                'debouches' => 'Directeur financier, Analyste investissement, Risk manager',
                'conditions_acces' => 'Licence Finance, Gestion ou équivalent',
                'niveau' => 'Master',
                'logo_url' => $supdeco,
            ],

            // ISD
            [
                'nom' => 'Licence Communication et Journalisme',
                'domaine' => 'Communication Médias Journalisme',
                'description' => 'Formation en journalisme, communication institutionnelle, médias numériques et relations publiques.',
                'etablissement' => 'Institut Supérieur des Sciences de l\'Information et de la Communication (ISD)',
                'ville' => 'Dakar',
                'frais_scolarite' => 850000,
                'duree_annees' => 3,
                'debouches' => 'Journaliste, Chargé de communication, Attaché de presse, Community manager',
                'conditions_acces' => 'Bac toutes séries, Français, Culture générale',
                'niveau' => 'Licence',
                'logo_url' => $isd,
            ],

            // CSS
            [
                'nom' => 'Licence Informatique de Gestion',
                'domaine' => 'Informatique Gestion Systèmes',
                'description' => 'Formation alliant informatique et gestion : ERP, systèmes d\'information, développement web.',
                'etablissement' => 'Centre de Stratégie et de Sciences (CSS)',
                'ville' => 'Dakar',
                'frais_scolarite' => 750000,
                'duree_annees' => 3,
                'debouches' => 'Développeur, Administrateur SI, Analyste métier',
                'conditions_acces' => 'Bac S, Bac T, Maths, Informatique',
                'niveau' => 'Licence',
                'logo_url' => $css,
            ],
            [
                'nom' => 'BTS Développement Web et Mobile',
                'domaine' => 'Informatique Développement Web',
                'description' => 'Formation pratique en développement web (HTML, CSS, JS, PHP) et applications mobiles.',
                'etablissement' => 'Centre de Stratégie et de Sciences (CSS)',
                'ville' => 'Dakar',
                'frais_scolarite' => 500000,
                'duree_annees' => 2,
                'debouches' => 'Développeur web, Développeur mobile, Freelance',
                'conditions_acces' => 'Bac toutes séries, Logique, Informatique',
                'niveau' => 'BTS',
                'logo_url' => $css,
            ],

            // BID
            [
                'nom' => 'Licence Architecture',
                'domaine' => 'Architecture Design Urbanisme',
                'description' => 'Formation en architecture, design d\'intérieur, urbanisme et gestion de projets de construction.',
                'etablissement' => 'Bureau International du Design (BID)',
                'ville' => 'Dakar',
                'frais_scolarite' => 1800000,
                'duree_annees' => 5,
                'debouches' => 'Architecte, Designer d\'intérieur, Urbaniste, Chef de projet BTP',
                'conditions_acces' => 'Bac S, Bac A, Arts plastiques, Maths, concours',
                'niveau' => 'Master',
                'logo_url' => $bid,
            ],

            // ESMT
            [
                'nom' => 'Licence Télécommunications et Réseaux',
                'domaine' => 'Télécommunications Réseaux Informatique',
                'description' => 'Formation en réseaux informatiques, télécommunications, sécurité et cloud computing.',
                'etablissement' => 'École Supérieure Multinationale des Télécommunications (ESMT)',
                'ville' => 'Dakar',
                'frais_scolarite' => 1200000,
                'duree_annees' => 3,
                'debouches' => 'Ingénieur réseaux, Administrateur système, Expert cybersécurité',
                'conditions_acces' => 'Bac S, Bac T, Maths, Physique, Informatique',
                'niveau' => 'Licence',
                'logo_url' => $esmt,
            ],
            [
                'nom' => 'Master Cybersécurité',
                'domaine' => 'Informatique Sécurité Réseaux',
                'description' => 'Formation avancée en sécurité informatique, cryptographie, forensics et gestion des risques cyber.',
                'etablissement' => 'École Supérieure Multinationale des Télécommunications (ESMT)',
                'ville' => 'Dakar',
                'frais_scolarite' => 1800000,
                'duree_annees' => 2,
                'debouches' => 'Expert cybersécurité, Pentesteur, RSSI, Consultant sécurité',
                'conditions_acces' => 'Licence Informatique, Réseaux ou équivalent',
                'niveau' => 'Master',
                'logo_url' => $esmt,
            ],
        ];

        foreach ($formations as $formation) {
            // Ajouter type automatiquement selon l'établissement
            $publics = ['UCAD', 'UGB', 'ESP', 'EPT', 'UADB', 'Ziguinchor', 'Thiès (UTS)'];
            $isPublic = false;
            foreach ($publics as $p) {
                if (stripos($formation['etablissement'], $p) !== false) {
                    $isPublic = true;
                    break;
                }
            }
            $formation['type'] = $isPublic ? 'public' : 'prive';
            Formation::create($formation);
        }
    }
}
