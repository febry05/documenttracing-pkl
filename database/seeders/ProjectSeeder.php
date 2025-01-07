<?php

namespace Database\Seeders;

use App\Models\MasterData\ProjectBusinessType;
use App\Models\Users\User;
use Illuminate\Database\Seeder;
use App\Models\Projects\Project;
use App\Models\Users\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Pengadaan Jasa Pengelolaan Passengger Service Charges On Ticket System (POTS) di Bandar Udara yang dikelola AP1',
                'code' => 'SRV.JKT.0217.00013',
                'customer' => 'AP I',
                'contract_number' => 'PJKP-20004344',
                'contract_start' => '2020-02-14',
                'contract_end' => '2025-02-15',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Azhim Nugroho')->first()->id,
            ],
            [
                'name' => 'Jasa Sistem Pelaporan Keberangkatan Penumpang Pesawat Common Use Check In System (CUCS) di 15 Lokasi 22',
                'code' => 'RNT.JKT.0818.00136',
                'customer' => 'AP I',
                'contract_number' => 'PKS/42/III/2022/D0',
                'contract_start' => '2021-11-10',
                'contract_end' => '2027-04-21',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Rental')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Azhim Nugroho')->first()->id,
            ],
            [
                'name' => 'Pengelolaan Layanan Penguat Sinyal IBCS dan Outdoor Terminal Baru Bandara Syamsudin Noor Banjarmasin',
                'code' => 'SRV.JKT.1118.00121',
                'customer' => 'AP I',
                'contract_number' => 'BA.DUB.028/KB.03/2024',
                'contract_start' => '2024-07-01',
                'contract_end' => '2025-06-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Azhim Nugroho')->first()->id,
            ],
            [
                'name' => 'Pengelolaan Seat Management Peralatan TI di Bandara Syamsudin Noor Banjarmasin',
                'code' => 'RNT.JKT.0816.00050',
                'customer' => 'AP I',
                'contract_number' => 'PJKP-20004413',
                'contract_start' => '2020-04-30',
                'contract_end' => '2024-12-31',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Rental')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Azhim Nugroho')->first()->id,
            ],
            [
                'name' => 'Pengelolaan Wifi Managed Service Concordia Lounge PT. Angkasa Pura Hotel',
                'code' => 'SRV.BDJ.0120.00001',
                'customer' => 'APH',
                'contract_number' => 'BA.094/VII/2022/APS/BM.BDJ',
                'contract_start' => '2022-07-07',
                'contract_end' => '2025-07-07',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Azhim Nugroho')->first()->id,
            ],
            [
                'name' => 'Pekerjaan Jasa Layanan UHOSS di Cordia Hotel Banjarbaru',
                'code' => 'SRV.BDJ.0922.00025',
                'customer' => 'APH',
                'contract_number' => '077/BA/II/2024/APS/BM.BDJ',
                'contract_start' => '2023-01-12',
                'contract_end' => '2024-11-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Penyedia Jasa Manage Service Jaringan LAN di 13 Bandara Angkasa Pura 1 (Air Asia)',
                'code' => 'SRV.JKT.0818.00110',
                'customer' => 'PT Indonesia AirAsia',
                'contract_number' => 'BA.084/APS/XIII/2022/DOC',
                'contract_start' => '2023-01-01',
                'contract_end' => '2024-12-31',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Pekerjaan Jasa Layanan Internet Lintang Cafe (Bakso Tengkleng)',
                'code' => 'SRV.BDJ.1023.00038',
                'customer' => 'PT LINTANG SUKSES BERDIKARI',
                'contract_number' => '186/BA/IX/2023/APS/M.BDJ',
                'contract_start' => '2023-10-01',
                'contract_end' => '2024-09-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Pekerjaan Jasa Layanan Internet Lintang Cafe (Pawon Semarang)',
                'code' => 'SRV.BDJ.1123.00039',
                'customer' => 'PT LINTANG SUKSES BERDIKARI',
                'contract_number' => '242/BA/XI/2023/APS/BM.BDJ',
                'contract_start' => '2023-11-01',
                'contract_end' => '2024-11-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Pekerjaan Jasa Layanan Internet di Tenant KFC Bandara Syamsudin Noor Banjarmasin',
                'code' => 'SRV.BDJ.1223.00048',
                'customer' => 'PT Fast Food Indonesia, Tbk',
                'contract_number' => '283/BA/XII/2023/APS/BM.BDJ',
                'contract_start' => '2023-01-12',
                'contract_end' => '2024-11-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Penyediaan Jasa Layanan Internet 50 Mbps (CentrePark)',
                'code' => 'SRV.BDJ.0524.00055',
                'customer' => 'PT Cetrepark Citra Corpora',
                'contract_number' => '162/BA/IV/2024/APS/BM.BDJ',
                'contract_start' => '2024-01-05',
                'contract_end' => '2025-04-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Service')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
            [
                'name' => 'Pengelolaan Seat Management Peralatan TI di Carg APLOG',
                'code' => 'RNT.BDJ.1223.00024',
                'customer' => 'APL',
                'contract_number' => '278/BA/XII/2023/APS/BM.BDJ',
                'contract_start' => '2023-01-12',
                'contract_end' => '2025-11-30',
                'project_business_type_id' => ProjectBusinessType::where('name', 'Rental')->first()->id,
                'user_profile_id' => UserProfile::where('name', 'Muhammad Ferdy Maulana')->first()->id,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
