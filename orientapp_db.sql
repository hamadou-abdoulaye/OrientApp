mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: orientapp_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel-cache-07RU2qsYlbth2NK3','s:7:\"forever\";',2094080345),('laravel-cache-2lPO0N96AZ3iqvlJ','s:7:\"forever\";',2094079046),('laravel-cache-bKdoY6bpQZiqtFBq','s:7:\"forever\";',2094078057),('laravel-cache-dH6tyqHLIGhABCsm','s:7:\"forever\";',2092996323),('laravel-cache-GZvZmahMBC3YusOG','s:7:\"forever\";',2094079541),('laravel-cache-hRCAmny2OlyRz3sM','s:7:\"forever\";',2094078097),('laravel-cache-I1ODWmx02azJasEv','s:7:\"forever\";',2094080287),('laravel-cache-kyAoTzhOQdIY4dgK','s:7:\"forever\";',2094077079),('laravel-cache-MJEHuntOWCUEBWzp','s:7:\"forever\";',2092997173),('laravel-cache-noHkF4usibIW6xol','s:7:\"forever\";',2094077265),('laravel-cache-NwKfUmJTWjBbu5Yt','s:7:\"forever\";',2094080259),('laravel-cache-OptcOooVpycH0xD7','s:7:\"forever\";',2094077118),('laravel-cache-Osg7XccIL23nJmr0','s:7:\"forever\";',2094079269),('laravel-cache-pb5BE6ZPqOb6MdUu','s:7:\"forever\";',2094079688),('laravel-cache-pi8ZztdlyuJkSMNJ','s:7:\"forever\";',2094078562),('laravel-cache-PWgjEj1Tcg4Va6nw','s:7:\"forever\";',2094079880),('laravel-cache-RcROgaDvjDTtbAWy','s:7:\"forever\";',2092997256),('laravel-cache-rWFGHPkYu1aLwPCv','s:7:\"forever\";',2092997311),('laravel-cache-SUBKJFiL91OaaA2x','s:7:\"forever\";',2094077909),('laravel-cache-swCHmcZFCTpMqYdE','s:7:\"forever\";',2094079908),('laravel-cache-xTwPWZ50q3UPCyWu','s:7:\"forever\";',2094080325),('laravel-cache-yrRxbtbgkkCLQE6F','s:7:\"forever\";',2092997370),('laravel-cache-ZIOT9lfDskdo1SZe','s:7:\"forever\";',2094078852);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conseils`
--

DROP TABLE IF EXISTS `conseils`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conseils` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `conseiller_id` bigint unsigned NOT NULL,
  `etudiant_id` bigint unsigned NOT NULL,
  `formation_id` bigint unsigned DEFAULT NULL,
  `type` enum('note','suggestion') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'note',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lu` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `conseils_conseiller_id_foreign` (`conseiller_id`),
  KEY `conseils_etudiant_id_foreign` (`etudiant_id`),
  KEY `conseils_formation_id_foreign` (`formation_id`),
  CONSTRAINT `conseils_conseiller_id_foreign` FOREIGN KEY (`conseiller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `conseils_etudiant_id_foreign` FOREIGN KEY (`etudiant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `conseils_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conseils`
--

LOCK TABLES `conseils` WRITE;
/*!40000 ALTER TABLE `conseils` DISABLE KEYS */;
INSERT INTO `conseils` VALUES (1,4,2,NULL,'note','fais esp',1,'2026-05-01 12:08:58','2026-05-01 12:09:36'),(2,4,2,NULL,'note','fais esp',1,'2026-05-01 12:09:02','2026-05-01 12:09:36'),(3,4,2,NULL,'note','fais esp',1,'2026-05-01 12:09:07','2026-05-01 12:09:36'),(4,4,2,9,'suggestion','fais esp',1,'2026-05-01 12:09:24','2026-05-01 12:09:36');
/*!40000 ALTER TABLE `conseils` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formations`
--

DROP TABLE IF EXISTS `formations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domaine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `etablissement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `frais_scolarite` decimal(10,2) DEFAULT NULL,
  `duree_annees` int NOT NULL,
  `debouches` text COLLATE utf8mb4_unicode_ci,
  `conditions_acces` text COLLATE utf8mb4_unicode_ci,
  `niveau` enum('Licence','Master','BTS','DUT','Doctorat','Autre') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Licence',
  `type` enum('public','prive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_web` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formations`
--

LOCK TABLES `formations` WRITE;
/*!40000 ALTER TABLE `formations` DISABLE KEYS */;
INSERT INTO `formations` VALUES (1,'Licence Informatique','Informatique Technologie','Formation en développement logiciel, algorithmique, réseaux et systèmes d\'information.','Université Cheikh Anta Diop (UCAD)','Dakar',150000.00,3,'Développeur web/mobile, Administrateur réseau, Chef de projet IT','Bac S, Bac T, Maths, Physique, Informatique','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:16','2026-05-14 00:24:53'),(2,'Licence Médecine','Santé Médecine Biologie','Formation médicale complète pour devenir médecin généraliste ou spécialiste.','Université Cheikh Anta Diop (UCAD)','Dakar',200000.00,7,'Médecin généraliste, Spécialiste, Chercheur en santé','Bac S, Biologie, Chimie, Physique, moyenne élevée','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:16','2026-05-14 00:24:53'),(3,'Licence Droit Privé','Droit Sciences Juridiques','Formation juridique couvrant le droit civil, commercial, du travail et des affaires.','Université Cheikh Anta Diop (UCAD)','Dakar',120000.00,3,'Avocat, Notaire, Juriste d\'entreprise, Magistrat','Bac L, Bac S, Français, Histoire-Géographie','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:16','2026-05-14 00:24:53'),(4,'Licence Sciences Économiques','Économie Finance Gestion','Formation en économie appliquée, macroéconomie, microéconomie et analyse financière.','Université Cheikh Anta Diop (UCAD)','Dakar',130000.00,3,'Économiste, Analyste financier, Gestionnaire, Banquier','Bac ES, Bac S, Économie, Maths','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:16','2026-05-14 00:24:53'),(5,'Licence Mathématiques','Mathématiques Sciences','Formation en mathématiques pures et appliquées, statistiques et probabilités.','Université Cheikh Anta Diop (UCAD)','Dakar',120000.00,3,'Enseignant, Statisticien, Actuaire, Data Analyst','Bac S, Maths, Physique','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:16','2026-05-14 00:24:53'),(6,'Master Gestion des Entreprises','Gestion Management','Formation avancée en management stratégique, finance d\'entreprise et leadership.','Université Cheikh Anta Diop (UCAD)','Dakar',300000.00,2,'Directeur financier, Manager, Consultant, Entrepreneur','Licence Gestion, Économie ou équivalent','Master','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(7,'Licence Pharmacie','Santé Pharmacie Chimie','Formation en sciences pharmaceutiques, chimie organique et biologie moléculaire.','Université Cheikh Anta Diop (UCAD)','Dakar',180000.00,6,'Pharmacien, Chercheur, Biologiste médical','Bac S, Chimie, Biologie, Physique','Licence','public','https://www.ucad.sn/images/logo-ucad.png',NULL,'https://www.ucad.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(8,'Diplôme d\'Ingénieur en Informatique','Informatique Technologie Ingénierie','Formation d\'ingénieur en génie logiciel, intelligence artificielle et systèmes embarqués.','École Supérieure Polytechnique (ESP)','Dakar',450000.00,5,'Ingénieur logiciel, Architecte système, Data Engineer','Bac S, Maths, Physique, Informatique, concours d\'entrée','Master','public','https://www.esp.sn/images/logo.png',NULL,'https://www.esp.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(9,'Diplôme d\'Ingénieur en Génie Électrique','Électronique Électricité Ingénierie','Formation en électronique de puissance, automatisme, énergies renouvelables.','École Supérieure Polytechnique (ESP)','Dakar',450000.00,5,'Ingénieur électricien, Automaticien, Chef de projet énergie','Bac S, Maths, Physique, concours d\'entrée','Master','public','https://www.esp.sn/images/logo.png',NULL,'https://www.esp.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(10,'Master Intelligence Artificielle','Informatique Intelligence Artificielle','Formation spécialisée en machine learning, deep learning, NLP et data science.','École Supérieure Polytechnique (ESP)','Dakar',500000.00,2,'Data Scientist, Ingénieur IA, Chercheur, MLOps Engineer','Licence Informatique, Maths, Statistiques','Master','public','https://www.esp.sn/images/logo.png',NULL,'https://www.esp.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(11,'Licence Droit Public','Droit Sciences Juridiques Politique','Formation en droit constitutionnel, administratif, international et sciences politiques.','Université Gaston Berger (UGB)','Saint-Louis',120000.00,3,'Fonctionnaire, Diplomate, Juriste, Magistrat','Bac L, Bac S, Français, Histoire','Licence','public','https://www.ugb.sn/images/logo-ugb.png',NULL,'https://www.ugb.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(12,'Licence Sociologie','Sciences Sociales Humanités','Étude des phénomènes sociaux, des organisations et des comportements humains.','Université Gaston Berger (UGB)','Saint-Louis',100000.00,3,'Sociologue, Chargé d\'études, Travailleur social, ONG','Bac L, Bac S, Sciences Humaines','Licence','public','https://www.ugb.sn/images/logo-ugb.png',NULL,'https://www.ugb.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(13,'Master Développement Local','Développement Économie Territoire','Formation en planification territoriale, gestion de projets de développement et politiques publiques.','Université Gaston Berger (UGB)','Saint-Louis',250000.00,2,'Chef de projet, Consultant développement, Fonctionnaire territorial','Licence Sciences Sociales, Économie ou Géographie','Master','public','https://www.ugb.sn/images/logo-ugb.png',NULL,'https://www.ugb.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(14,'Diplôme d\'Ingénieur Génie Civil','Génie Civil Construction BTP','Formation en construction, structures, hydraulique et gestion de projets d\'infrastructure.','École Polytechnique de Thiès (EPT)','Thiès',500000.00,5,'Ingénieur BTP, Chef de chantier, Directeur travaux, Bureau d\'études','Bac S, Maths, Physique, concours national','Master','public','https://www.ept.sn/images/logo.png',NULL,'https://www.ept.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(15,'Diplôme d\'Ingénieur Mécanique','Mécanique Ingénierie Industrie','Formation en mécanique des fluides, thermodynamique, conception mécanique et maintenance industrielle.','École Polytechnique de Thiès (EPT)','Thiès',500000.00,5,'Ingénieur mécanique, Responsable maintenance, Chef de production','Bac S, Maths, Physique, concours national','Master','public','https://www.ept.sn/images/logo.png',NULL,'https://www.ept.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(16,'BTS Commerce International','Commerce Gestion International','Formation en commerce, import-export, logistique et gestion des échanges internationaux.','Institut Supérieur de Management (ISM)','Dakar',800000.00,2,'Commercial export, Chargé d\'affaires, Responsable logistique','Bac toutes séries, Économie, Anglais','BTS','prive','https://www.ism.sn/images/logo-ism.png',NULL,'https://www.ism.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(17,'Bachelor Marketing Digital','Marketing Communication Digital','Formation en marketing digital, réseaux sociaux, SEO, e-commerce et stratégie de communication.','Institut Supérieur de Management (ISM)','Dakar',1200000.00,3,'Community manager, Chef de projet digital, Responsable marketing','Bac toutes séries, Français, Anglais','Licence','prive','https://www.ism.sn/images/logo-ism.png',NULL,'https://www.ism.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(18,'MBA Management','Management Leadership Stratégie','Programme MBA axé sur le leadership, la stratégie d\'entreprise et la gestion des organisations.','Institut Supérieur de Management (ISM)','Dakar',2500000.00,2,'Directeur général, Manager senior, Consultant stratégique','Bac+3 minimum, expérience professionnelle recommandée','Master','prive','https://www.ism.sn/images/logo-ism.png',NULL,'https://www.ism.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(19,'BTS Comptabilité et Gestion','Finance Comptabilité Gestion','Formation en comptabilité générale, fiscalité, contrôle de gestion et audit.','Institut Africain de Management (IAM)','Dakar',600000.00,2,'Comptable, Contrôleur de gestion, Auditeur, Expert-comptable','Bac G, Bac S, Maths, Économie','BTS','prive','https://www.iam.sn/images/logo.png',NULL,'https://www.iam.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(20,'Licence Ressources Humaines','Ressources Humaines Management','Formation en gestion du personnel, droit du travail, recrutement et développement des compétences.','Institut Africain de Management (IAM)','Dakar',900000.00,3,'DRH, Chargé de recrutement, Responsable formation, Consultant RH','Bac toutes séries, Français, Sciences Humaines','Licence','prive','https://www.iam.sn/images/logo.png',NULL,'https://www.iam.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(21,'Licence Sciences de l\'Éducation','Éducation Enseignement Pédagogie','Formation pour les futurs enseignants et professionnels de l\'éducation et de la formation.','Université Alioune Diop de Bambey (UADB)','Bambey',100000.00,3,'Enseignant, Conseiller pédagogique, Formateur, Inspecteur','Bac L, Bac S, Français, Philosophie','Licence','public','https://www.uadb.edu.sn/images/logo.png',NULL,'https://www.uadb.edu.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(22,'Licence Agronomie','Agriculture Agronomie Environnement','Formation en sciences agricoles, gestion des ressources naturelles et développement rural.','Université Alioune Diop de Bambey (UADB)','Bambey',120000.00,3,'Agronome, Conseiller agricole, Gestionnaire de projets ruraux','Bac S, Biologie, Chimie, Sciences de la Vie','Licence','public','https://www.uadb.edu.sn/images/logo.png',NULL,'https://www.uadb.edu.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(23,'Licence Tourisme et Hôtellerie','Tourisme Hôtellerie Service','Formation en gestion hôtelière, tourisme durable et développement de destinations touristiques.','Université Assane Seck de Ziguinchor','Ziguinchor',110000.00,3,'Gestionnaire hôtelier, Guide touristique, Responsable tourisme','Bac toutes séries, Français, Anglais','Licence','public','https://www.univ-zig.sn/images/logo.png',NULL,'https://www.univ-zig.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(24,'Licence Biologie','Biologie Sciences de la Vie','Formation en biologie cellulaire, génétique, écologie et biotechnologies.','Université Assane Seck de Ziguinchor','Ziguinchor',100000.00,3,'Biologiste, Chercheur, Technicien de laboratoire, Enseignant','Bac S, Biologie, Chimie, Sciences de la Vie','Licence','public','https://www.univ-zig.sn/images/logo.png',NULL,'https://www.univ-zig.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(25,'BTS Électronique et Informatique Industrielle','Électronique Informatique Industrie','Formation technique en électronique, automatisme, maintenance industrielle et réseaux.','Université de Thiès (UTS)','Thiès',250000.00,2,'Technicien électronicien, Automaticien, Maintenancier industriel','Bac S, Bac T, Physique, Maths','BTS','public','https://www.univ-thies.sn/images/logo.png',NULL,'https://www.univ-thies.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(26,'Licence Finance et Banque','Finance Banque Économie','Formation en finance d\'entreprise, marchés financiers, banque et assurance.','Institut Supérieur d\'Enseignement et de Gestion (ISEG)','Dakar',700000.00,3,'Banquier, Analyste financier, Gestionnaire de patrimoine, Assureur','Bac ES, Bac S, Maths, Économie','Licence','prive','https://www.iseg.sn/images/logo.png',NULL,'https://www.iseg.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(27,'BTS Secrétariat de Direction','Administration Secrétariat Gestion','Formation en secrétariat, bureautique, gestion administrative et communication professionnelle.','Institut Supérieur d\'Enseignement et de Gestion (ISEG)','Dakar',400000.00,2,'Secrétaire de direction, Assistant administratif, Office manager','Bac toutes séries, Français, Informatique','BTS','prive','https://www.iseg.sn/images/logo.png',NULL,'https://www.iseg.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(28,'Bachelor Business Administration','Commerce Gestion Management','Formation en gestion des affaires, entrepreneuriat, finance et marketing international.','Sup de Co Dakar','Dakar',1500000.00,3,'Manager, Entrepreneur, Chargé d\'affaires, Consultant','Bac toutes séries, Anglais, Français','Licence','prive','https://www.supcodakar.com/images/logo.png',NULL,'https://www.supcodakar.com','2026-05-01 12:05:17','2026-05-14 00:24:53'),(29,'Master Finance d\'Entreprise','Finance Gestion Comptabilité','Formation spécialisée en finance corporative, investissement et gestion des risques.','Sup de Co Dakar','Dakar',2000000.00,2,'Directeur financier, Analyste investissement, Risk manager','Licence Finance, Gestion ou équivalent','Master','prive','https://www.supcodakar.com/images/logo.png',NULL,'https://www.supcodakar.com','2026-05-01 12:05:17','2026-05-14 00:24:53'),(30,'Licence Communication et Journalisme','Communication Médias Journalisme','Formation en journalisme, communication institutionnelle, médias numériques et relations publiques.','Institut Supérieur des Sciences de l\'Information et de la Communication (ISD)','Dakar',850000.00,3,'Journaliste, Chargé de communication, Attaché de presse, Community manager','Bac toutes séries, Français, Culture générale','Licence','prive','https://www.isd.sn/images/logo.png',NULL,'https://www.isd.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(31,'Licence Informatique de Gestion','Informatique Gestion Systèmes','Formation alliant informatique et gestion : ERP, systèmes d\'information, développement web.','Centre de Stratégie et de Sciences (CSS)','Dakar',750000.00,3,'Développeur, Administrateur SI, Analyste métier','Bac S, Bac T, Maths, Informatique','Licence','prive','https://www.css.sn/images/logo.png',NULL,'https://www.css.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(32,'BTS Développement Web et Mobile','Informatique Développement Web','Formation pratique en développement web (HTML, CSS, JS, PHP) et applications mobiles.','Centre de Stratégie et de Sciences (CSS)','Dakar',500000.00,2,'Développeur web, Développeur mobile, Freelance','Bac toutes séries, Logique, Informatique','BTS','prive','https://www.css.sn/images/logo.png',NULL,'https://www.css.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(33,'Licence Architecture','Architecture Design Urbanisme','Formation en architecture, design d\'intérieur, urbanisme et gestion de projets de construction.','Bureau International du Design (BID)','Dakar',1800000.00,5,'Architecte, Designer d\'intérieur, Urbaniste, Chef de projet BTP','Bac S, Bac A, Arts plastiques, Maths, concours','Master','prive','https://www.bid.sn/images/logo.png',NULL,'https://www.bid.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(34,'Licence Télécommunications et Réseaux','Télécommunications Réseaux Informatique','Formation en réseaux informatiques, télécommunications, sécurité et cloud computing.','École Supérieure Multinationale des Télécommunications (ESMT)','Dakar',1200000.00,3,'Ingénieur réseaux, Administrateur système, Expert cybersécurité','Bac S, Bac T, Maths, Physique, Informatique','Licence','prive','https://www.esmt.sn/wp-content/uploads/2020/01/logo-esmt.png',NULL,'https://www.esmt.sn','2026-05-01 12:05:17','2026-05-14 00:24:53'),(35,'Master Cybersécurité','Informatique Sécurité Réseaux','Formation avancée en sécurité informatique, cryptographie, forensics et gestion des risques cyber.','École Supérieure Multinationale des Télécommunications (ESMT)','Dakar',1800000.00,2,'Expert cybersécurité, Pentesteur, RSSI, Consultant sécurité','Licence Informatique, Réseaux ou équivalent','Master','prive','https://www.esmt.sn/wp-content/uploads/2020/01/logo-esmt.png',NULL,'https://www.esmt.sn','2026-05-01 12:05:17','2026-05-14 00:24:53');
/*!40000 ALTER TABLE `formations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interets`
--

DROP TABLE IF EXISTS `interets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `formation_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `interets_user_id_formation_id_unique` (`user_id`,`formation_id`),
  KEY `interets_formation_id_foreign` (`formation_id`),
  CONSTRAINT `interets_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `interets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interets`
--

LOCK TABLES `interets` WRITE;
/*!40000 ALTER TABLE `interets` DISABLE KEYS */;
/*!40000 ALTER TABLE `interets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_04_28_222106_add_role_to_users_table',1),(5,'2026_04_28_222107_create_formations_table',1),(6,'2026_04_28_222108_create_questionnaires_table',1),(7,'2026_04_28_222109_create_recommandations_table',1),(8,'2026_04_28_225937_add_logo_to_formations_table',1),(9,'2026_04_28_234044_create_conseils_table',1),(10,'2026_05_01_120323_add_type_to_formations_table',2),(11,'2026_05_01_121214_add_interets_to_formations_table',3),(12,'2026_05_01_121236_create_interets_table',3),(13,'2026_05_01_132011_add_avatar_to_users_table',4),(14,'2026_05_01_132012_add_image_to_formations_table',4),(15,'2026_05_14_001750_add_site_web_to_formations_table',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionnaires`
--

DROP TABLE IF EXISTS `questionnaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionnaires` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `matieres_preferees` json NOT NULL,
  `centres_interet` json NOT NULL,
  `moyenne_generale` decimal(4,2) NOT NULL,
  `serie_bac` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville_souhaitee` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget_mensuel` decimal(10,2) DEFAULT NULL,
  `aspirations_professionnelles` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questionnaires_user_id_foreign` (`user_id`),
  CONSTRAINT `questionnaires_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionnaires`
--

LOCK TABLES `questionnaires` WRITE;
/*!40000 ALTER TABLE `questionnaires` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionnaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommandations`
--

DROP TABLE IF EXISTS `recommandations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommandations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `formation_id` bigint unsigned NOT NULL,
  `score_compatibilite` decimal(5,2) NOT NULL,
  `justification` text COLLATE utf8mb4_unicode_ci,
  `est_favori` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recommandations_user_id_foreign` (`user_id`),
  KEY `recommandations_formation_id_foreign` (`formation_id`),
  CONSTRAINT `recommandations_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recommandations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommandations`
--

LOCK TABLES `recommandations` WRITE;
/*!40000 ALTER TABLE `recommandations` DISABLE KEYS */;
/*!40000 ALTER TABLE `recommandations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('etudiant','conseiller','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'etudiant',
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget_mensuel` decimal(10,2) DEFAULT NULL,
  `serie_bac` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moyenne_bac` decimal(4,2) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Hamadou Abdoulaye Nana','etudiant@orientapp.com','avatars/5nrPYnntrUoZlpirEBOLMbsH1Z72bXYRZQ0mrmAa.jpg','etudiant',NULL,NULL,NULL,NULL,NULL,NULL,'$2y$12$TjQv5u.MJu7yHU5OCbgR6eYWR.gxtti/nY2//VE/W8eemEFqTkz3O',NULL,'2026-05-01 11:48:41','2026-05-06 15:22:36'),(3,'Admin','admin@orientapp.com',NULL,'admin',NULL,NULL,NULL,NULL,NULL,NULL,'$2y$12$yZYTSSZVRgrvurvy5.npKegjb.cFpSiUcWwkfVtyjBSVG0IcY/5Da',NULL,'2026-05-01 11:53:43','2026-05-01 11:53:43'),(4,'Hamadou Abdoulaye Nana','conseiller@orientapp.com',NULL,'conseiller',NULL,NULL,NULL,NULL,NULL,NULL,'$2y$12$AphNMH0cyxzf6WrDG.g6OeszfhmvWCS6Gsslu7pYpyn39HKnhjlWa',NULL,'2026-05-01 12:08:26','2026-05-01 12:08:26'),(5,'Test User','test@example.com',NULL,'etudiant',NULL,NULL,NULL,NULL,NULL,'2026-05-14 00:03:55','$2y$12$xa6QZaKrrakvvAzaEywSre6dYOi4..aehUozXm3owGehIqGaTnpIG','XRTNrmTeFr','2026-05-14 00:03:56','2026-05-14 00:03:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-14  1:09:19
