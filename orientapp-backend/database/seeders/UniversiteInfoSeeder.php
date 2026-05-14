<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Seeder;

class UniversiteInfoSeeder extends Seeder
{
    public function run(): void
    {
        $infos = [
            'Université Cheikh Anta Diop (UCAD)' => [
                'site_web' => 'https://www.ucad.sn',
                'logo_url' => 'https://www.ucad.sn/images/logo-ucad.png',
            ],
            'École Supérieure Polytechnique (ESP)' => [
                'site_web' => 'https://www.esp.sn',
                'logo_url' => 'https://www.esp.sn/images/logo.png',
            ],
            'Université Gaston Berger (UGB)' => [
                'site_web' => 'https://www.ugb.sn',
                'logo_url' => 'https://www.ugb.sn/images/logo-ugb.png',
            ],
            'École Polytechnique de Thiès (EPT)' => [
                'site_web' => 'https://www.ept.sn',
                'logo_url' => 'https://www.ept.sn/images/logo.png',
            ],
            'Institut Supérieur de Management (ISM)' => [
                'site_web' => 'https://www.ism.sn',
                'logo_url' => 'https://www.ism.sn/images/logo-ism.png',
            ],
            'Institut Africain de Management (IAM)' => [
                'site_web' => 'https://www.iam.sn',
                'logo_url' => 'https://www.iam.sn/images/logo.png',
            ],
            'Université Alioune Diop de Bambey (UADB)' => [
                'site_web' => 'https://www.uadb.edu.sn',
                'logo_url' => 'https://www.uadb.edu.sn/images/logo.png',
            ],
            'Université Assane Seck de Ziguinchor' => [
                'site_web' => 'https://www.univ-zig.sn',
                'logo_url' => 'https://www.univ-zig.sn/images/logo.png',
            ],
            'Université de Thiès (UTS)' => [
                'site_web' => 'https://www.univ-thies.sn',
                'logo_url' => 'https://www.univ-thies.sn/images/logo.png',
            ],
            'Institut Supérieur d\'Enseignement et de Gestion (ISEG)' => [
                'site_web' => 'https://www.iseg.sn',
                'logo_url' => 'https://www.iseg.sn/images/logo.png',
            ],
            'Sup de Co Dakar' => [
                'site_web' => 'https://www.supcodakar.com',
                'logo_url' => 'https://www.supcodakar.com/images/logo.png',
            ],
            'Institut Supérieur des Sciences de l\'Information et de la Communication (ISD)' => [
                'site_web' => 'https://www.isd.sn',
                'logo_url' => 'https://www.isd.sn/images/logo.png',
            ],
            'Centre de Stratégie et de Sciences (CSS)' => [
                'site_web' => 'https://www.css.sn',
                'logo_url' => 'https://www.css.sn/images/logo.png',
            ],
            'Bureau International du Design (BID)' => [
                'site_web' => 'https://www.bid.sn',
                'logo_url' => 'https://www.bid.sn/images/logo.png',
            ],
            'École Supérieure Multinationale des Télécommunications (ESMT)' => [
                'site_web' => 'https://www.esmt.sn',
                'logo_url' => 'https://www.esmt.sn/wp-content/uploads/2020/01/logo-esmt.png',
            ],
        ];

        foreach ($infos as $etablissement => $data) {
            Formation::where('etablissement', $etablissement)->update($data);
            echo "✓ $etablissement mis à jour\n";
        }
    }
}
