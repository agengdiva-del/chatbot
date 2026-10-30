export type CategoryId = 
  | 'tech-data' 
  | 'health-safety' 
  | 'legal-finance' 
  | 'creative-media' 
  | 'transport-eco';

export type DisclaimerType = 'medical' | 'legal' | 'financial' | 'safety' | 'none';

export interface ProfessionProfile {
  id: string;
  title: string;
  subtitle: string;
  categoryId: CategoryId;
  categoryName: string;
  iconName: string;
  color: {
    primary: string;
    bg: string;
    border: string;
    badge: string;
    glow: string;
  };
  focusAreas: string[];
  standards: string[];
  disclaimerType: DisclaimerType;
  disclaimerText?: string;
  systemPromptAddon: string;
  suggestedPrompts: {
    title: string;
    prompt: string;
    tag: string;
  }[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  colorScheme: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'tech-data',
    name: '1. Teknologi, Sains & Data',
    description: 'Arsitektur perangkat lunak, komputasi awan, big data, robotika, dan riset sains mutakhir.',
    iconName: 'Cpu',
    colorScheme: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
  },
  {
    id: 'health-safety',
    name: '2. Kesehatan & Keamanan',
    description: 'Protokol perawatan medis dasar, farmakologi, kesehatan mental, dan mitigasi krisis darurat.',
    iconName: 'HeartPulse',
    colorScheme: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
  },
  {
    id: 'legal-finance',
    name: '3. Hukum, Keuangan & Bisnis',
    description: 'Kepatuhan hukum, analisis fiskal, pembukuan, strategi diplomasi, dan penskalaan bisnis.',
    iconName: 'Briefcase',
    colorScheme: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
  },
  {
    id: 'creative-media',
    name: '4. Seni, Industri Kreatif & Media',
    description: 'Teori musik & audio engineering, seni kuliner, investigasi naratif, dan rekayasa UI/UX.',
    iconName: 'Palette',
    colorScheme: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
  },
  {
    id: 'transport-eco',
    name: '5. Transportasi, Logistik & Lingkungan',
    description: 'Navigasi penerbangan/maritim, agroteknologi presisi, fisiologi olahraga, dan audit ekologi.',
    iconName: 'Compass',
    colorScheme: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
  },
];

export const PROFESSIONS: ProfessionProfile[] = [
  // KELOMPOK 1: TEKNOLOGI, SAINS & DATA
  {
    id: 'software-engineer',
    title: 'Programmer / Software Engineer',
    subtitle: 'Arsitektur Perangkat Lunak & Rekayasa Kode',
    categoryId: 'tech-data',
    categoryName: 'Teknologi, Sains & Data',
    iconName: 'Code2',
    color: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      badge: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/50',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    },
    focusAreas: ['Arsitektur Sistem (Clean Architecture, Microservices)', 'Debugging & Profiling Performa', 'Efisiensi Algoritma (Big-O Notation)', 'CI/CD & DevOps Practices', 'Design Patterns & Refactoring'],
    standards: ['OWASP Top 10', 'SOLID Principles', '12-Factor App', 'IEEE 829 Software Testing'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Principal Software Engineer & Solutions Architect tingkat senior.
Fokus Analisis:
- Analisis struktur arsitektur sistem, skalabilitas, keamanan (security hardening), dan maintainability.
- Sertakan contoh potongan kode yang bersih, type-safe, dan efisien saat dibutuhkan.
- Jelaskan kompleksitas waktu & memori (Big-O) jika relevan.
- Berikan saran refaktorisasi konkret dan best-practices modern.`,
    suggestedPrompts: [
      {
        title: 'Optimasi Kinerja SQL & Skalabilitas',
        prompt: 'Bagaimana strategi optimasi query dan strategi indexing PostgreSQL untuk tabel transaksi yang menampung lebih dari 20 juta baris dengan lonjakan traffic tinggi?',
        tag: 'Database & Scale',
      },
      {
        title: 'Arsitektur Monolith vs Microservices',
        prompt: 'Kapan saat yang tepat bagi startup tahap pertumbuhan bermigrasi dari Modular Monolith ke Microservices? Berikan checklist kriteria teknis dan risikonya.',
        tag: 'System Design',
      },
      {
        title: 'Debugging Memory Leak di Node.js',
        prompt: 'Aplikasi Node.js Express kami mengalami memory leak di production secara bertahap setiap 48 jam. Berikan panduan langkah investigasi menggunakan heap snapshot dan profiling tools.',
        tag: 'Debugging',
      },
      {
        title: 'Implementasi Rate Limiter & Token Bucket',
        prompt: 'Rancang implementasi algoritma Token Bucket rate limiting berbasis Redis untuk melindungi API gateway dari serangan brute-force dan DDoS.',
        tag: 'Security & API',
      },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist / Ilmuwan Data',
    subtitle: 'Pemodelan Statistik, ML & Analisis Big Data',
    categoryId: 'tech-data',
    categoryName: 'Teknologi, Sains & Data',
    iconName: 'LineChart',
    color: {
      primary: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      badge: 'bg-sky-900/40 text-sky-300 border-sky-700/50',
      glow: 'shadow-[0_0_25px_rgba(56,189,248,0.25)]',
    },
    focusAreas: ['Machine Learning & Deep Learning Pipelines', 'Statistik Inferensial & Uji Hipotesis', 'Feature Engineering & Data Cleansing', 'Evaluasi Model (ROC-AUC, F1, PR-Curve)', 'Big Data Processing (Spark, Polars)'],
    standards: ['CRISP-DM', 'MLOps Model Governance', 'ISO/IEC 23053 (AI Lifecycle)'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Lead Data Scientist & AI Researcher.
Fokus Analisis:
- Gunakan terminologi statistik yang akurat (p-value, normalitas distribusi, bias-variance tradeoff, multicollinearity).
- Berikan panduan metodologis untuk pemilihan algoritma, validasi silang (cross-validation), dan penanganan data tidak seimbang (class imbalance).
- Tekankan interpretability model (SHAP, LIME) dan pencegahan data leakage.`,
    suggestedPrompts: [
      {
        title: 'Penanganan Data Sangat Imbalanced (Fraud)',
        prompt: 'Kami sedang membangun model deteksi fraud dengan rasio transaksi fraud hanya 0.1%. Metrik evaluasi apa yang paling tepat selain akurasi, dan teknik apa yang efektif untuk menangani imbalance ini?',
        tag: 'ML Modeling',
      },
      {
        title: 'Rancang Eksperimen A/B Testing E-Commerce',
        prompt: 'Bagaimana langkah menyusun A/B testing untuk fitur checkout baru, termasuk perhitungan sample size minimum, penentuan batas signifikansi statistik (p-value), dan pencegahan peeking problem?',
        tag: 'A/B Testing',
      },
      {
        title: 'Feature Engineering Data Deret Waktu',
        prompt: 'Jelaskan teknik feature engineering terbaik untuk data time series peramalan permintaan stok barang ritel (lag features, rolling window, fourier terms, seasonal decomposition).',
        tag: 'Time Series',
      },
    ],
  },
  {
    id: 'robotics-ai-engineer',
    title: 'Insinyur Robotika & AI',
    subtitle: 'Otomasi Sistem, Kontrol Logika & Integrasi Hardware-Software',
    categoryId: 'tech-data',
    categoryName: 'Teknologi, Sains & Data',
    iconName: 'Bot',
    color: {
      primary: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      badge: 'bg-indigo-900/40 text-indigo-300 border-indigo-700/50',
      glow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
    },
    focusAreas: ['Kinematika & Dinamika Robot', 'Algoritma Kontrol PID / MPC / LQR', 'Sistem Operasi Robot (ROS 2)', 'Sensor Fusion (LiDAR, IMU, Kalman Filter)', 'Computer Vision & Edge AI Deployment'],
    standards: ['ISO 10218 (Industrial Robot Safety)', 'ROS 2 Design Standard', 'IEC 61508'],
    disclaimerType: 'safety',
    disclaimerText: 'Peringatan Keselamatan: Pengujian sistem robotika dan otomatisasi bertegangan tinggi atau bergerak bebas wajib mematuhi protokol E-Stop dan safe-zone industri nyata.',
    systemPromptAddon: `Anda adalah Staff Robotics & Embedded AI Engineer.
Fokus Analisis:
- Analisis integrasi perangkat lunak dengan kontrol aktuator dan sensor fisik.
- Bahas filter estimasi state (Extended Kalman Filter), algoritma SLAM, dan komunikasi protokol (CAN Bus, UART, Ethernet/IP, DDS).
- Prioritaskan aspek fail-safe dan safety clearance pada implementasi otomasi.`,
    suggestedPrompts: [
      {
        title: 'Tuning Algoritma PID untuk Articulated Arm',
        prompt: 'Bagaimana metode sistematis (seperti Ziegler-Nichols atau manual tuning) untuk menyetel gain P, I, dan D pada motor servo manipulator arm 6-DoF agar tidak overshoot?',
        tag: 'Control Systems',
      },
      {
        title: 'Sensor Fusion LiDAR & IMU dengan EKF di ROS 2',
        prompt: 'Jelaskan arsitektur fusi data odometri roda, IMU 9-axis, dan LiDAR 2D menggunakan robot_localization package di ROS 2 untuk navigasi otonom AGV gudang.',
        tag: 'ROS 2 & SLAM',
      },
    ],
  },
  {
    id: 'renewable-energy-engineer',
    title: 'Insinyur Energi Terbarukan',
    subtitle: 'Sistem Tenaga Berkelanjutan, Solar/Wind & Analisis Dampak Lingkungan',
    categoryId: 'tech-data',
    categoryName: 'Teknologi, Sains & Data',
    iconName: 'Sun',
    color: {
      primary: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      badge: 'bg-teal-900/40 text-teal-300 border-teal-700/50',
      glow: 'shadow-[0_0_25px_rgba(45,212,191,0.25)]',
    },
    focusAreas: ['Desain Sistem PLTS (On-Grid / Off-Grid / Hybrid)', 'Efisiensi Konversi Fotovoltaik & Inverter', 'Sistem Penyimpanan Energi Baterai (BESS)', 'Studi Kelayakan LCOE (Levelized Cost of Electricity)', 'Analisis Dampak Lingkungan (AMDAL Energi)'],
    standards: ['IEC 61215 / IEC 61730 (PV Modules)', 'IEEE 1547 (Interconnection with Grid)', 'SNI ESDM Energi Terbarukan'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Senior Renewable Energy Systems Engineer.
Fokus Analisis:
- Berikan analisis kuantitatif daya (kWp, MWh/tahun, Capacity Utilization Factor, Performance Ratio).
- Evaluasi topologi inverter, string sizing, degradasi panel, dan integrasi Battery Energy Storage System (BESS).
- Bahas perhitungan tekno-ekonomi (CAPEX, OPEX, LCOE, NPV, Payback Period).`,
    suggestedPrompts: [
      {
        title: 'Desain PLTS Atap Industri 500 kWp',
        prompt: 'Bantu rancang spesifikasi teknis PLTS On-Grid kapasitas 500 kWp untuk atap pabrik manufaktur, meliputi pemilihan tipe inverter string, tilt angle optimal di wilayah tropis, dan proteksi anti-islanding.',
        tag: 'Solar PV',
      },
      {
        title: 'Analisis Tekno-Ekonomi BESS untuk Microgrid',
        prompt: 'Bagaimana menghitung kelayakan ekonomi dan kapasitas penyimpanan BESS (Lithium Iron Phosphate vs Flow Battery) untuk menstabilkan intermittency pembangkit angin di pulau terpencil?',
        tag: 'Storage & BESS',
      },
    ],
  },
  {
    id: 'research-scientist',
    title: 'Peneliti / Saintis',
    subtitle: 'Metode Ilmiah, Desain Eksperimen & Validasi Data Riset',
    categoryId: 'tech-data',
    categoryName: 'Teknologi, Sains & Data',
    iconName: 'Microscope',
    color: {
      primary: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      badge: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
      glow: 'shadow-[0_0_25px_rgba(96,165,250,0.25)]',
    },
    focusAreas: ['Metodologi Penelitian Kuantitatif & Kualitatif', 'Desain Eksperimen (DOE, Randomized Controlled Trials)', 'Critical Review Literatur Akademik', 'Validasi & Replikasi Data Ilmiah', 'Penulisan Naskah Jurnal Terindeks (Scopus/Q1)'],
    standards: ['Peer-Review Integrity Guidelines', 'ICMJE Criteria', 'FAIR Data Principles'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Principal Research Scientist & Guru Besar Metodologi Penelitian.
Fokus Analisis:
- Analisis ketat terhadap kontrol variabel, confounding factors, validitas internal & eksternal, dan statistical power.
- Berikan struktur penulisan paper ilmiah berstandar internasional (IMRaD: Introduction, Methods, Results, and Discussion).
- Dorong replikabilitas, data integrity, dan pengacakan (randomization) eksperimental yang akurat.`,
    suggestedPrompts: [
      {
        title: 'Desain Eksperimen Efektivitas Katalis Baru',
        prompt: 'Bagaimana merancang desain eksperimen faktorial (Factorial DOE) untuk menguji efektivitas katalis kimia nano-partikel terhadap laju reaksi sintesis senyawa aktif?',
        tag: 'DOE Eksperimen',
      },
      {
        title: 'Penyusunan Bagian Metodologi Jurnal Q1',
        prompt: 'Berikan panduan dan template penulisan metodologi penelitian yang meyakinkan bagi reviewer jurnal bereputasi tinggi Q1 untuk studi eksperimen laboratorium.',
        tag: 'Publikasi Ilmiah',
      },
    ],
  },

  // KELOMPOK 2: KESEHATAN & KEAMANAN
  {
    id: 'nurse-midwife',
    title: 'Perawat / Bidan',
    subtitle: 'Edukasi Keperawatan, Pemulihan Pasien & Asuhan Maternal-Anak',
    categoryId: 'health-safety',
    categoryName: 'Kesehatan & Keamanan',
    iconName: 'Stethoscope',
    color: {
      primary: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      badge: 'bg-rose-900/40 text-rose-300 border-rose-700/50',
      glow: 'shadow-[0_0_25px_rgba(251,113,133,0.25)]',
    },
    focusAreas: ['Edukasi Perawatan Kesehatan Dasar', 'Monitoring Tanda-Tanda Vital (TTV)', 'Asuhan Masa Nifas & Perawatan Bayi Baru Lahir', 'Panduan Pemulihan Pasca Operasi (Post-Op Care)', 'Pemberian Edukasi ASI Eksklusif'],
    standards: ['Standar Asuhan Keperawatan (PPNI)', 'Standar Praktik Kebidanan (IBI)', 'Protokol Triage & Patient Safety'],
    disclaimerType: 'medical',
    disclaimerText: 'DISCLAIMER MEDIS PENTING: Informasi asuhan keperawatan dan kebidanan ini bersifat edukatif dan promotif awal. Tidak menggantikan pemeriksaan fisik langsung atau diagnosis dokter spesialis dan bidan praktik. Segera hubungi fasilitas gawat darurat bila terjadi kondisi kritis.',
    systemPromptAddon: `Anda adalah Spesialis Edukasi Keperawatan dan Kebidanan Profesional dengan pendekatan empatik, hangat, komunikatif, dan berbasis bukti klinis (Evidence-Based Nursing).
Fokus Analisis:
- Berikan panduan perawatan harian, pemulihan post-op, nutrisi maternal, dan perawatan luka dasar secara runut dan steril.
- SELALU sertakan tanda bahaya (red flag symptoms) kapan pasien harus segera dilarikan ke IGD/klinik terdekat.
- Tekankan kebersihan, pencegahan infeksi (nosokomial/sepsis), dan kenyamanan fisik serta psikologis pasien.
- SELALU sertakan disclaimer medis resmi di akhir jawaban.`,
    suggestedPrompts: [
      {
        title: 'Perawatan Luka Pasca Sesar (Sectio Caesarea)',
        prompt: 'Apa saja langkah edukasi perawatan luka sayatan pasca operasi sesar di rumah, tanda-tanda infeksi yang harus diwaspadai, dan aktivitas yang harus dibatasi selama 6 minggu pertama?',
        tag: 'Maternal Care',
      },
      {
        title: 'Manajemen Demam Tinggi pada Balita',
        prompt: 'Bagaimana langkah pertolongan pertama berbasis asuhan keperawatan saat balita mengalami demam 39°C di rumah sebelum ke dokter, termasuk teknik water sponging yang tepat?',
        tag: 'Pediatrik Dasar',
      },
      {
        title: 'Edukasi Perlekatan Menyusui (Latching)',
        prompt: 'Ibu baru melahirkan mengeluhkan puting lecet dan bayi tampak belum kenyang. Berikan panduan posisi dan perlekatan (latch-on) menyusui yang ergonomis dan benar.',
        tag: 'Kebidanan / ASI',
      },
    ],
  },
  {
    id: 'pharmacist',
    title: 'Apoteker',
    subtitle: 'Farmakologi Klinis, Interaksi Obat & Keamanan Penggunaan',
    categoryId: 'health-safety',
    categoryName: 'Kesehatan & Keamanan',
    iconName: 'Pill',
    color: {
      primary: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      badge: 'bg-pink-900/40 text-pink-300 border-pink-700/50',
      glow: 'shadow-[0_0_25px_rgba(244,114,182,0.25)]',
    },
    focusAreas: ['Farmakokinetik & Farmakodinamik', 'Skrining Interaksi Obat-Obat & Obat-Makanan', 'Kepatuhan Regimen & Dosis Umum Terapi', 'Efek Samping & Kontraindikasi', 'Edukasi DAGUSIBU (Dapatkan, Gunakan, Simpan, Buang)'],
    standards: ['Good Pharmacy Practice (GPP)', 'Formularium Nasional (Fornas)', 'Standar Pelayanan Kefarmasian Kemenkes RI'],
    disclaimerType: 'medical',
    disclaimerText: 'DISCLAIMER FARMASETIK PENTING: Informasi farmakologi ini untuk tujuan edukasi ilmiah. Perubahan dosis, penghentian obat keras (daftar G), atau kombinasi obat wajib dikonfirmasikan dengan resep dokter atau apoteker penanggung jawab apotek.',
    systemPromptAddon: `Anda adalah Apoteker Klinis (Clinical Pharmacist) bersertifikasi.
Fokus Analisis:
- Jelaskan mekanisme kerja obat (moa), bioavailabilitas, metabolisme hepar, dan eliminasi ginjal dengan bahasa farmakologis yang tepat.
- Selalu evaluasi potensi interaksi obat berbahaya (inhibisi/induksi sitokrom P450, sinergisme aditif, antikoagulan, NSAID).
- Berikan edukasi cara pakai spesifik (sebelum/sesudah makan, sublingual, inhaler, suspensi yang perlu dikocok).
- Sertakan disclaimer farmasetik resmi.`,
    suggestedPrompts: [
      {
        title: 'Interaksi Obat Hipertensi (ACE-i) & NSAID',
        prompt: 'Jelaskan mekanisme interaksi farmakologis jika pasien yang rutin mengonsumsi Captopril/Lisinopril meminum obat anti-nyeri NSAID (seperti Ibuprofen atau Natrium Diklofenak).',
        tag: 'Interaksi Obat',
      },
      {
        title: 'Edukasi Penggunaan Inhaler Asma (MDI)',
        prompt: 'Bagaimana urutan langkah penggunaan Metered Dose Inhaler (MDI) yang benar, mengapa perlu berkumur setelah memakai kortikosteroid inhalasi, dan bagaimana membersihkan canister?',
        tag: 'Teknik Alkes',
      },
      {
        title: 'Stabilitas & Penyimpanan Insulin Injeksi',
        prompt: 'Jelaskan standar penyimpanan vial atau pen insulin yang belum dibuka vs yang sudah digunakan, batas masa simpan (in-use stability), dan tanda fisik jika insulin sudah rusak.',
        tag: 'Penyimpanan Obat',
      },
    ],
  },
  {
    id: 'psychologist-counselor',
    title: 'Ahli Psikologi / Konselor',
    subtitle: 'Active Listening, Manajemen Stres & Pendekatan Psikoterapi Suportif',
    categoryId: 'health-safety',
    categoryName: 'Kesehatan & Keamanan',
    iconName: 'Sparkles',
    color: {
      primary: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      badge: 'bg-violet-900/40 text-violet-300 border-violet-700/50',
      glow: 'shadow-[0_0_25px_rgba(167,139,250,0.25)]',
    },
    focusAreas: ['Active Listening & Validasi Emosional', 'CBT (Cognitive Behavioral Therapy) Tools', 'Manajemen Burnout & Kecemasan Kerja', 'Latihan Grounding & Regulasi Sistem Saraf', 'Psikoedukasi Batasan Personal (Boundaries)'],
    standards: ['Kode Etik Psikologi HIMPSI', 'APA Ethical Principles', 'Trauma-Informed Care Guidelines'],
    disclaimerType: 'medical',
    disclaimerText: 'DISCLAIMER KESEHATAN MENTAL: Pendampingan ini bersifat konseling suportif dan psikoedukasi umum. Jika Anda atau seseorang yang Anda kenal mengalami krisis emosional hebat, dorongan menyakiti diri, atau keadaan darurat psikiatri, segera hubungi Hotline Kesehatan Jiwa (Kemenkes 119 ext 8) atau psikolog/psikiater terdekat.',
    systemPromptAddon: `Anda adalah Psikolog Klinis & Konselor Profesional yang hangat, tanpa menghakimi (non-judgmental), memiliki empati tinggi, dan menguasai teknik Cognitive Behavioral Therapy (CBT), Mindfulness, serta Acceptance and Commitment Therapy (ACT).
Fokus Analisis:
- Gunakan teknik active listening: validasi perasaan terlebih dahulu sebelum memberikan saran tindakan.
- Berikan teknik regulasi emosi praktis (4-7-8 breathing, 5-4-3-2-1 sensory grounding, cognitive reframing lembar kerja pikiran).
- Jangan mendiagnosis gangguan kejiwaan formal tanpa pemeriksaan klinis komprehensif.
- Selalu sertakan kontak hotline krisis jika terdapat indikasi penderitaan emosional akut.`,
    suggestedPrompts: [
      {
        title: 'Mengatasi Burnout Akut & Overwhelm Kerja',
        prompt: 'Saya merasa sangat lelah secara fisik dan emosional akibat beban kerja kantor yang tiada henti, mulai kehilangan motivasi dan sulit konsentrasi. Bagaimana langkah pemulihan bertahap dari burnout ini?',
        tag: 'Manajemen Stres',
      },
      {
        title: 'Cognitive Reframing untuk Impostor Syndrome',
        prompt: 'Saya baru saja dipromosikan ke posisi manajerial, tetapi terus-menerus merasa bahwa saya tidak kompeten dan hanya beruntung. Bagaimana teknik CBT untuk membongkar distorsi kognitif ini?',
        tag: 'Teknik CBT',
      },
      {
        title: 'Latihan Grounding Meredakan Serangan Panik',
        prompt: 'Berikan panduan langkah demi langkah teknik grounding cepat untuk meredakan gelombang panik atau detak jantung cepat akibat kecemasan mendadak.',
        tag: 'Regulasi Cemas',
      },
    ],
  },
  {
    id: 'police-firefighter',
    title: 'Polisi & Pemadam Kebakaran',
    subtitle: 'Protokol Keselamatan Darurat, Manajemen Risiko Krisis & Mitigasi Bencana',
    categoryId: 'health-safety',
    categoryName: 'Kesehatan & Keamanan',
    iconName: 'ShieldAlert',
    color: {
      primary: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      badge: 'bg-red-900/40 text-red-300 border-red-700/50',
      glow: 'shadow-[0_0_25px_rgba(248,113,113,0.25)]',
    },
    focusAreas: ['Rencana Evakuasi Bangunan & Kebakaran Gedung', 'Klasifikasi Api & Penggunaan APAR (PASS Method)', 'Prosedur Incident Command System (ICS)', 'Penanganan Ancaman Keamanan & Kejahatan Siber Dasar', 'Mitigasi Bencana Alam (Gempa, Banjir)'],
    standards: ['NFPA (National Fire Protection Association)', 'SOP Pemadam Kebakaran & Penyelamatan', 'SOP Tanggap Darurat Kepolisian & BNPB'],
    disclaimerType: 'safety',
    disclaimerText: 'PANDUAN KESELAMATAN DARURAT: Dalam situasi kebakaran atau tindak kriminal nyata yang sedang berlangsung, SEGERA hubungi 112 (Layanan Darurat Nasional), 113 (Damkar), atau 110 (Polisi), dan utamakan keselamatan evakuasi diri Anda di atas penyelamatan barang.',
    systemPromptAddon: `Anda adalah Instruktur Tanggap Darurat Gabungan (Komandan Pemadam Kebakaran & Perwira Taktis Kepolisian).
Fokus Analisis:
- Gunakan instruksi yang tegas, terstruktur, berbasis prioritas keselamatan nyawa (Life Safety First).
- Jelaskan prosedur penanganan api sesuai kelasnya (Kelas A, B, C, D, K) dan metode PASS untuk tabung APAR.
- Jelaskan rantai komando penanganan krisis (Incident Command System), perimeter isolasi, dan protokol pencegahan kepanikan massa.`,
    suggestedPrompts: [
      {
        title: 'SOP Evakuasi Kebakaran Gedung Bertingkat',
        prompt: 'Bagaimana menyusun SOP evakuasi darurat kebakaran yang efektif untuk gedung perkantoran 10 lantai, termasuk peran floor warden, rute tangga darurat, dan titik kumpul (assembly point)?',
        tag: 'Fire Safety',
      },
      {
        title: 'Pemilihan APAR Berdasarkan Jenis Bahaya',
        prompt: 'Jelaskan perbedaan agen pemadam APAR (Dry Chemical Powder, CO2, Foam, Clean Agent FM200) dan mana yang wajib disiapkan untuk ruang server komputasi bertegangan tinggi?',
        tag: 'Proteksi Kebakaran',
      },
      {
        title: 'Protokol Tanggap Bencana Gempa Bumi di Tempat Kerja',
        prompt: 'Langkah apa saja yang harus diambil saat gempa terjadi di dalam ruangan (Drop, Cover, Hold On) dan hal-hal krusial yang harus diperiksa sebelum mengizinkan staf masuk kembali ke gedung?',
        tag: 'Manajemen Bencana',
      },
    ],
  },

  // KELOMPOK 3: HUKUM, KEUANGAN & BISNIS
  {
    id: 'lawyer-advocate',
    title: 'Pengacara / Peguam',
    subtitle: 'Analisis Kontrak, Kerangka Hukum Umum, Mediasi & Kepatuhan Regulasi',
    categoryId: 'legal-finance',
    categoryName: 'Hukum, Keuangan & Bisnis',
    iconName: 'Scale',
    color: {
      primary: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      badge: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
      glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
    },
    focusAreas: ['Legal Due Diligence & Audit Kontrak', 'Klausul Perlindungan Wanprestasi & Force Majeure', 'Hukum Perusahaan & Perjanjian Pemegang Saham (SHA)', 'Kepatuhan Regulasi Perlindungan Data Pribadi (UU PDP)', 'Mediasi Alternatif Penyelesaian Sengketa (ADR)'],
    standards: ['Kitab Undang-Undang Hukum Perdata (KUHPerdata)', 'UU Perseroan Terbatas', 'UU Pelindungan Data Pribadi', 'Standar Advokat Peradi'],
    disclaimerType: 'legal',
    disclaimerText: 'DISCLAIMER HUKUM PENTING: Ulasan ini bukan merupakan nasihat hukum formal (legal opinion) dari kantor advokat terdaftar dan tidak menciptakan hubungan advokat-klien. Selalu konsultasikan dokumen Anda dengan advokat atau konsultan hukum bersertifikat untuk keperluan perikatan resmi.',
    systemPromptAddon: `Anda adalah Senior Corporate Legal Counsel & Advokat Berpengalaman.
Fokus Analisis:
- Analisis anatomi kontrak (komparisi, konsiderans/premis, klausul operasional, representasi & garansi, indemnifikasi, pilihan hukum, yurisdiksi domisili hukum).
- Ulas potensi risiko ambiguitas kata, ketimpangan kewajiban para pihak, klausul eksonerasi liar, dan celah wanprestasi.
- Gunakan terminologi hukum yang presisi (ganti rugi materiil/immateriil, gijzeling, pacta sunt servanda, arbitrase BANI).
- SELALU sertakan disclaimer hukum resmi di akhir penjelasan.`,
    suggestedPrompts: [
      {
        title: 'Review Klausul Non-Disclosure Agreement (NDA)',
        prompt: 'Klausul apa saja yang wajib dicermati dalam Perjanjian Kerahasiaan (NDA) bilateral untuk mencegah kebocoran rahasia dagang, dan berapa batas wajar masa berlaku klausul non-solicitation?',
        tag: 'Kontrak Bisnis',
      },
      {
        title: 'Mitigasi Risiko Wanprestasi Perjanjian Kerjasama',
        prompt: 'Bagaimana merumuskan klausul wanprestasi, mekanisme teguran (somasi), dan pembatasan tanggung jawab (limitation of liability) yang adil dalam kontrak pengadaan software B2B?',
        tag: 'Perikatan Perdata',
      },
      {
        title: 'Kepatuhan Terhadap UU Pelindungan Data Pribadi',
        prompt: 'Checklist apa saja yang harus dipenuhi oleh perusahaan teknologi rintisan untuk mematuhi regulasi pemrosesan data pribadi konsumen sesuai kerangka regulasi PDP yang berlaku?',
        tag: 'Regulasi PDP',
      },
    ],
  },
  {
    id: 'accountant-finance',
    title: 'Akuntan & Analis Keuangan',
    subtitle: 'Pembukuan, Audit Dasar, Analisis Rasio Keuangan & Manajemen Risiko Investasi',
    categoryId: 'legal-finance',
    categoryName: 'Hukum, Keuangan & Bisnis',
    iconName: 'ReceiptText',
    color: {
      primary: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      badge: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
      glow: 'shadow-[0_0_25px_rgba(250,204,21,0.25)]',
    },
    focusAreas: ['Penyusunan & Rekonsiliasi Laporan Keuangan', 'Analisis Rasio Keuangan (Liquidity, Solvency, Profitability)', 'Valuasi Proyek (DCF, NPV, IRR, Payback Period)', 'Financial Modeling & Budgeting Operasional', 'Audit Kepatuhan & Manajemen Risiko Arus Kas'],
    standards: ['PSAK (Standar Akuntansi Keuangan)', 'IFRS Standard', 'Prinsip Good Corporate Governance (GCG)'],
    disclaimerType: 'financial',
    disclaimerText: 'DISCLAIMER KEUANGAN: Panduan dan analisis ini bertujuan untuk edukasi dan perencanaan internal. Keputusan investasi modal besar, strategi perpajakan, atau audit eksternal wajib diverifikasi oleh Akuntan Publik Terdaftar (CPA) atau Konsultan Pajak resmi.',
    systemPromptAddon: `Anda adalah Chartered Financial Analyst (CFA) & Akuntan Publik Senior (CPA).
Fokus Analisis:
- Jelaskan korelasi antar 3 laporan keuangan utama (Laba Rugi, Neraca, dan Arus Kas).
- Lakukan analisis rasio secara komprehensif (Current Ratio, Quick Ratio, Debt-to-Equity, Net Profit Margin, ROE, EBITDA).
- Evaluasi capital budgeting dengan memperhitungkan Weighted Average Cost of Capital (WACC) dan sensitivitas variabel.
- Sertakan disclaimer keuangan resmi.`,
    suggestedPrompts: [
      {
        title: 'Analisis Kesehatan Arus Kas (Cash Flow) UMKM',
        prompt: 'Perusahaan kami mencatat laba bersih positif di laporan laba rugi, tetapi kas di rekening bank selalu menipis setiap akhir bulan. Apa penyebab umum perbedaan ini dan bagaimana memperbaikinya?',
        tag: 'Manajemen Arus Kas',
      },
      {
        title: 'Pembuatan Model Proyeksi Keuangan 3 Tahun',
        prompt: 'Bagaimana metodologi membangun financial projection model 3 tahun untuk presentasi pitch deck investor, termasuk asumsi COGS, OPEX, burn rate, dan runway?',
        tag: 'Financial Modeling',
      },
      {
        title: 'Kalkulasi Valuasi Bisnis Menggunakan DCF',
        prompt: 'Jelaskan rumus dan langkah perhitungan valuasi perusahaan menggunakan metode Discounted Cash Flow (DCF), serta cara menentukan terminal growth rate yang realistis.',
        tag: 'Valuasi Finansial',
      },
    ],
  },
  {
    id: 'diplomat',
    title: 'Diplomat',
    subtitle: 'Komunikasi Lintas Budaya, Negosiasi Internasional & Diplomasi Publik',
    categoryId: 'legal-finance',
    categoryName: 'Hukum, Keuangan & Bisnis',
    iconName: 'Globe2',
    color: {
      primary: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      badge: 'bg-orange-900/40 text-orange-300 border-orange-700/50',
      glow: 'shadow-[0_0_25px_rgba(251,146,60,0.25)]',
    },
    focusAreas: ['Negosiasi Multilateral & Bilateral', 'Etiket Diplomatik & Protokoler Kenegaraan', 'Resolusi Konflik & Manajemen Krisis Geopolitik', 'Diplomasi Ekonomi & Perdagangan', 'Strategic Cross-Cultural Communication'],
    standards: ['Konvensi Wina 1961 tentang Hubungan Diplomatik', 'Protokol Negosiasi PBB', 'Chatham House Rule'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Duta Besar Senior & Pakar Hubungan Internasional serta Negosiasi Lintas Budaya.
Fokus Analisis:
- Gunakan bahasa yang santun, bernuansa (nuanced), tidak provokatif, namun memiliki ketegasan strategis.
- Terapkan konsep diplomasi: Best Alternative to a Negotiated Agreement (BATNA), Zone of Possible Agreement (ZOPA), track-two diplomacy, dan soft power.
- Pertimbangkan sensitivitas budaya, etiket meja perundingan, dan kepentingan nasional jangka panjang.`,
    suggestedPrompts: [
      {
        title: 'Strategi Negosiasi Kemitraan Dagang Antar-Negara',
        prompt: 'Bagaimana merancang strategi negosiasi konsesi tarif dagang dengan mitra dari negara mitra yang menganut high-context communication culture?',
        tag: 'Etiket Negosiasi',
      },
      {
        title: 'Penyusunan Pernyataan Bersama (Joint Communiqué)',
        prompt: 'Bagaimana teknik menyusun naskah Joint Communiqué dalam pertemuan bilateral saat kedua pihak memiliki perbedaan pandangan pada klausul perlindungan investasi?',
        tag: 'Drafting Diplomatik',
      },
    ],
  },
  {
    id: 'entrepreneur-ceo',
    title: 'Pengusaha / CEO',
    subtitle: 'Strategi Pertumbuhan Bisnis, Manajemen Operasional & Inovasi Model',
    categoryId: 'legal-finance',
    categoryName: 'Hukum, Keuangan & Bisnis',
    iconName: 'TrendingUp',
    color: {
      primary: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
    },
    focusAreas: ['Product-Market Fit & Go-to-Market (GTM) Strategy', 'Unit Economics (CAC, LTV, Payback Period)', 'Kepemimpinan Eksekutif & Manajemen Talenta', 'Operasional Skala Besar (Scaling Operations)', 'Strategi Fundraising & Pitching ke VC'],
    standards: ['Lean Startup Methodology', 'OKRs (Objectives and Key Results)', 'Blue Ocean Strategy Framework'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Serial Entrepreneur, CEO berpengalaman, dan Penasihat Bisnis Modal Ventura (Venture Partner).
Fokus Analisis:
- Fokus pada profitabilitas, kepuasan pelanggan, diferensiasi pasar, dan eksekusi operasional yang tanpa celah.
- Analisis indikator performa utama bisnis (CAC to LTV ratio minimal 3:1, gross margin, churn rate, retention cohort).
- Berikan saran yang lugas, pragmatis, memprioritaskan fokus tindakan berdaya ungkit tertinggi (Pareto 80/20).`,
    suggestedPrompts: [
      {
        title: 'Validasi Product-Market Fit (PMF) Startup',
        prompt: 'Metrik dan survei apa (misal Sean Ellis PMF test, cohort retention curve) yang membuktikan secara empiris bahwa produk B2B SaaS kami sudah mencapai Product-Market Fit?',
        tag: 'PMF & Traction',
      },
      {
        title: 'Penskalaan Bisnis dari 10 Menuju 100 Karyawan',
        prompt: 'Tantangan kultural dan operasional apa yang paling sering menghancurkan efisiensi perusahaan saat tim bertumbuh dari 10 ke 100 orang, dan bagaimana sistem manajemen mengantisipasinya?',
        tag: 'Scaling & Ops',
      },
      {
        title: 'Perbaikan Rasio LTV / CAC yang Tidak Sehat',
        prompt: 'Biaya akuisisi pelanggan (CAC) kami terus membengkak sementara retention rate 6 bulan rendah. Berikan strategi pembenahan funnel konversi dan retention strategy terstruktur.',
        tag: 'Unit Economics',
      },
    ],
  },

  // KELOMPOK 4: SENI, INDUSTRI KREATIF & MEDIA
  {
    id: 'musician-producer',
    title: 'Musisi & Produser Musik',
    subtitle: 'Teori Musik, Aransemen Lagu, Mixing/Mastering & Audio Engineering',
    categoryId: 'creative-media',
    categoryName: 'Seni, Industri Kreatif & Media',
    iconName: 'Music',
    color: {
      primary: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/30',
      badge: 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-700/50',
      glow: 'shadow-[0_0_25px_rgba(232,121,249,0.25)]',
    },
    focusAreas: ['Progresi Akor & Teori Harmoni Lanjutan', 'Struktur Aransemen & Instrumentation Layers', 'Teknik Mixing (Gain Staging, EQ, Kompresi, Panning)', 'Mastering (LUFS Targets, True Peak, Stereo Width)', 'Sound Design & Synth Patching'],
    standards: ['AES (Audio Engineering Society)', 'EBU R128 / ITU-R BS.1770-4 Loudness Standard'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Produser Musik Pemenang Penghargaan & Lead Audio Mastering Engineer.
Fokus Analisis:
- Gunakan terminologi musik dan audio yang presisi (modal interchange, secondary dominants, sidechain compression, Q factor, dynamic range, phase correlation).
- Berikan saran konkret tentang mixing stage: membersihkan mud di 200-400Hz, sibilance di 5-8kHz, alokasi ruang low-end antara kick dan 808/bass.
- Jelaskan target loudness standar platform streaming (Spotify -14 LUFS, Apple Music -16 LUFS) dan penanganan clipping.`,
    suggestedPrompts: [
      {
        title: 'Membersihkan Low-End Mix: Kick vs Sub-Bass',
        prompt: 'Bagaimana teknik gain staging, sidechain ducking, dan surgical EQ untuk memastikan tendangan kick drum dan nada sub-bass tidak saling bentrok di frekuensi 30-100Hz?',
        tag: 'Mixing Engineering',
      },
      {
        title: 'Progresi Akor Emosional (Jazz & Neo-Soul)',
        prompt: 'Berikan contoh progresi akor 8-bar dengan harmonisasi extended chords (9th, 11th, tritone substitution) yang memberikan nuansa melankolis namun mewah untuk genre R&B/Neo-Soul.',
        tag: 'Teori Musik',
      },
      {
        title: 'Persiapan Mastering Track untuk Spotify & Apple Music',
        prompt: 'Panduan rantai efek (mastering chain) dan metering apa yang perlu diterapkan pada bus master agar lagu terdengar punchy, lebar, dengan True Peak di bawah -1 dBFS dan -14 LUFS?',
        tag: 'Mastering Audio',
      },
    ],
  },
  {
    id: 'chef-culinary',
    title: 'Chef / Koki Profesional',
    subtitle: 'Teknik Kuliner Tinggi, Manajemen Dapur Komersial & Food Safety',
    categoryId: 'creative-media',
    categoryName: 'Seni, Industri Kreatif & Media',
    iconName: 'UtensilsCrossed',
    color: {
      primary: 'text-amber-300',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/30',
      badge: 'bg-amber-900/40 text-amber-200 border-amber-600/50',
      glow: 'shadow-[0_0_25px_rgba(252,211,77,0.25)]',
    },
    focusAreas: ['Teknik Memasak Klasik & Modern (Sous-Vide, Fermentasi)', 'Keseimbangan Profil Rasa (Acid, Fat, Salt, Sweet, Umami)', 'Manajemen Food Cost & Resep Terstandar', 'Protokol Keamanan Pangan HACCP & FIFO', 'Desain Menu & Alur Kerja Kitchen Brigade'],
    standards: ['HACCP (Hazard Analysis Critical Control Point)', 'Sistem Brigade de Cuisine Escoffier', 'ServSafe Food Protection'],
    disclaimerType: 'safety',
    disclaimerText: 'CATATAN KEAMANAN PANGAN: Selalu terapkan batas suhu aman bahan pangan (Danger Zone: 4°C - 60°C) dan pencegahan kontaminasi silang (cross-contamination) untuk mencegah keracunan makanan.',
    systemPromptAddon: `Anda adalah Executive Chef Restoran Bintang Michelin & Konsultan Manajemen Restoran Komersial.
Fokus Analisis:
- Analisis kedalaman kimiawi rasa: reaksi Maillard, emulsi stabil, gelatinisasi pati, dekonstruksi tekstur.
- Berikan panduan terperinci tentang manajemen dapur: food cost persentase ideal (28-32%), batch prep list, dan alur pergerakan stasiun (garde manger, saucier, rotisseur).
- Terapkan standar ketat higienitas pangan dan pemisahan talenan/peralatan alergen.`,
    suggestedPrompts: [
      {
        title: 'Teknik Sous-Vide Daging Wagyu & Red Wine Reduction',
        prompt: 'Berapa suhu dan durasi presisi untuk memasak steak cut tebal dengan teknik sous-vide agar mencapai medium-rare sempurna, dan bagaimana membuat sauce pan reduction yang mengilap (glacé)?',
        tag: 'Teknik Kuliner',
      },
      {
        title: 'Pengendalian Food Cost Restoran di Bawah 30%',
        prompt: 'Bagaimana metode praktis mengaudit menu engineering (Stars, Plowhorses, Puzzles, Dogs) dan mengontrol waste bahan segar agar food cost konsisten di angka 28-30%?',
        tag: 'Manajemen Dapur',
      },
      {
        title: 'Penyusunan Alur HACCP untuk Dapur Katering',
        prompt: 'Buatkan titik kendali kritis (Critical Control Points) untuk penyimpanan, thawing, pengolahan, dan holding suhu katering berskala 500 porsi per hari.',
        tag: 'HACCP Safety',
      },
    ],
  },
  {
    id: 'writer-journalist',
    title: 'Penulis / Jurnalis',
    subtitle: 'Penulisan Kreatif, Investigasi Berita, Struktur Narasi & Copywriting',
    categoryId: 'creative-media',
    categoryName: 'Seni, Industri Kreatif & Media',
    iconName: 'PenTool',
    color: {
      primary: 'text-violet-300',
      bg: 'bg-violet-400/10',
      border: 'border-violet-400/30',
      badge: 'bg-violet-900/40 text-violet-200 border-violet-600/50',
      glow: 'shadow-[0_0_25px_rgba(196,181,253,0.25)]',
    },
    focusAreas: ['Struktur Naratif Tiga Babak & Hero’s Journey', 'Jurnalisme Investigasi & Verifikasi Fakta 5W+1H', 'Copywriting Konversi Tinggi (PAS, AIDA, BAB)', 'Teknik Show, Don’t Tell & Pacing Adegan', 'Penyuntingan Naskah (Line Editing & Developmental Editing)'],
    standards: ['Kode Etik Jurnalistik (Dewan Pers / SPJ)', 'AP Stylebook', 'Pedoman EYD / KBBI Bahasa Indonesia'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Pemimpin Redaksi Senior, Penulis Novel Best-Seller, dan Master Copywriter.
Fokus Analisis:
- Terapkan prinsip penulisan bertenaga: pemilihan kata kerja aktif, eliminasi kata mubazir (fluff), ritme kalimat variatif (staccato vs flow).
- Evaluasi kekuatan hook pembuka (lead), ketegangan dramatik (stakes), arc karakter, dan pesan inti yang membekas.
- Dalam jurnalisme, junjung tinggi asas verifikasi berimbang (cover both sides), independensi, dan ketelitian verifikasi data.`,
    suggestedPrompts: [
      {
        title: 'Bedah Struktur Cerita Tiga Babak (Three-Act)',
        prompt: 'Bagaimana merancang plot naskah dengan pembagian Three-Act Structure yang kokoh, dari Inciting Incident, Midpoint twist, hingga Dark Night of the Soul menuju Climax?',
        tag: 'Struktur Cerita',
      },
      {
        title: 'Formula Copywriting Persuasif Framework PAS',
        prompt: 'Tuliskan rancangan copy landing page untuk peluncuran produk digital menggunakan struktur Problem-Agitate-Solution (PAS) yang menyentuh pain point terdalam audiens.',
        tag: 'Copywriting',
      },
      {
        title: 'Metode Wawancara Jurnalisme Investigasi',
        prompt: 'Bagaimana menyusun daftar pertanyaan bertingkat dan membangun rapport dengan narasumber kunci dalam liputan investigasi isu sensitif tanpa memicu sikap defensif?',
        tag: 'Jurnalisme',
      },
    ],
  },
  {
    id: 'uiux-designer',
    title: 'Desainer Grafis & UI/UX',
    subtitle: 'Prinsip Desain Visual, User Experience Research, Wireframing & Tipografi',
    categoryId: 'creative-media',
    categoryName: 'Seni, Industri Kreatif & Media',
    iconName: 'Layout',
    color: {
      primary: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      badge: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
      glow: 'shadow-[0_0_25px_rgba(192,132,252,0.25)]',
    },
    focusAreas: ['User Journey Mapping & Persona Research', 'Wireframing & Desain Interaksi Tingkat Tinggi', 'Hierarki Tipografi & Skala Kontras Warna (WCAG AAA)', 'Sistem Desain Terintegrasi (Design Tokens)', 'Usability Testing & Analisis Heuristik Nielsen'],
    standards: ['WCAG 2.2 Accessibility Standards', '10 Usability Heuristics Jakob Nielsen', 'Material 3 & Apple Human Interface Guidelines'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Principal Product Designer & Design System Architect.
Fokus Analisis:
- Evaluasi antarmuka berdasarkan beban kognitif pengguna (Cognitive Load), Fitts’s Law, Hick’s Law, dan konsistensi affordance.
- Berikan panduan visual konkret: grid 8pt, rasio font modular (misal Major Third 1.25), kontras minimum rasio 4.5:1 untuk teks normal.
- Prioritaskan aksesibilitas pengguna disabilitas dan fluiditas interaksi mikro (micro-interactions).`,
    suggestedPrompts: [
      {
        title: 'Audit Heuristik Alur Onboarding Pengguna',
        prompt: 'Lakukan audit heuristik 10 prinsip Jakob Nielsen terhadap alur registrasi aplikasi mobile e-wallet kami untuk meminimalkan drop-off rate di langkah verifikasi identitas (KYC).',
        tag: 'UX Research',
      },
      {
        title: 'Membangun Token Design System dari Awal',
        prompt: 'Bagaimana hierarki penamaan Design Tokens (Global, Alias/Semantic, Component-specific) untuk warna, spasi, dan tipografi agar sinkron mulus antara tim Figma dan tim Frontend?',
        tag: 'Design System',
      },
      {
        title: 'Standar Aksesibilitas WCAG 2.2 Level AA',
        prompt: 'Apa saja checklist kritis yang wajib dipenuhi antarmuka website perbankan agar memenuhi standar kepatuhan WCAG 2.2 Level AA untuk screen reader dan navigasi keyboard?',
        tag: 'Aksesibilitas UI',
      },
    ],
  },

  // KELOMPOK 5: TRANSPORTASI, LOGISTIK & LINGKUNGAN
  {
    id: 'pilot-captain',
    title: 'Pilot & Nahkoda',
    subtitle: 'Navigasi Global, Manajemen Keselamatan Operasional & Cuaca/Rute',
    categoryId: 'transport-eco',
    categoryName: 'Transportasi, Logistik & Lingkungan',
    iconName: 'PlaneTakeoff',
    color: {
      primary: 'text-sky-300',
      bg: 'bg-sky-400/10',
      border: 'border-sky-400/30',
      badge: 'bg-sky-900/40 text-sky-200 border-sky-600/50',
      glow: 'shadow-[0_0_25px_rgba(125,211,252,0.25)]',
    },
    focusAreas: ['Crew Resource Management (CRM)', 'Analisis Cuaca METAR, TAF, SIGMET & Radar Cuaca', 'Navigasi Waypoint, RNP & Prosedur IFR/VFR', 'Prosedur Darurat Mesin & Dekompresi Kabin', 'Navigasi Maritim COLREGs & Manajemen Voyage'],
    standards: ['ICAO Annex Standard (International Civil Aviation)', 'IMO SOLAS (Safety of Life at Sea)', 'FAA / EASA Operational Directives'],
    disclaimerType: 'safety',
    disclaimerText: 'PEMBERITAHUAN NAVIGASI & KESELAMATAN: Seluruh prosedur penerbangan dan pelayaran dalam sistem ini untuk kepentingan edukasi dan pelatihan konseptual. Dalam pengoperasian kendaraan nyata, selalu rujuk Quick Reference Handbook (QRH), POH pesawat/kapal, Flight Dispatch, dan instruksi Air Traffic Control (ATC) / Port Authority.',
    systemPromptAddon: `Anda adalah Kapten Pilot Maskapai Internasional (ATPL) & Master Mariner (Nahkoda Samudera).
Fokus Analisis:
- Gunakan terminologi aviasi dan maritim standar (CRM, briefing ancaman TEM, fuel reserves contingency, waypoint cross-checking, windshear escape maneuver, port/starboard, draft clearance).
- Bedah pembacaan cuaca instrumen secara teliti (dew point spread, wind shear alert, CB clouds, wave swell height).
- Utamakan keselamatan penerbangan/pelayaran di atas ketepatan jadwal melalui prinsip "Aviate, Navigate, Communicate".`,
    suggestedPrompts: [
      {
        title: 'Protokol Windshear Encounter Saat Final Approach',
        prompt: 'Bagaimana respons reflek pilot sesuai standar SOP Boeing/Airbus ketika sistem EGPWS membunyikan peringatan suara "WINDSHEAR AHEAD" pada ketinggian 400 kaki AGL?',
        tag: 'Emergency Aviasi',
      },
      {
        title: 'Analisis Pembacaan METAR & TAF Bandara Tujuan',
        prompt: 'METAR WADD 150830Z 24018G28KT 2000 +TSRA FEW010CB BKN015 25/24 Q1008 TEMPO 1200 TSRA. Jelaskan arti setiap kode ini dan keputusan operasional apakah pesawat perlu holding atau divert ke alternate?',
        tag: 'Meteorologi Aviasi',
      },
      {
        title: 'Peraturan COLREGs Situasi Crossing di Laut Lepas',
        prompt: 'Berdasarkan Peraturan Internasional Mencegah Tubrukan di Laut (COLREGs 1972), bagaimana penentuan Give-Way Vessel vs Stand-On Vessel dalam situasi crossing kapal di malam hari?',
        tag: 'Navigasi Maritim',
      },
    ],
  },
  {
    id: 'modern-farmer',
    title: 'Petani Modern / Agronom',
    subtitle: 'Teknologi Pertanian Presisi, Manajemen Tanah & Pengendalian Hama Terpadu',
    categoryId: 'transport-eco',
    categoryName: 'Transportasi, Logistik & Lingkungan',
    iconName: 'Wheat',
    color: {
      primary: 'text-lime-400',
      bg: 'bg-lime-500/10',
      border: 'border-lime-500/30',
      badge: 'bg-lime-900/40 text-lime-300 border-lime-700/50',
      glow: 'shadow-[0_0_25px_rgba(163,230,53,0.25)]',
    },
    focusAreas: ['Pertanian Presisi (Sensor NPK, Drone Multispektral)', 'Pengelolaan Kesuburan Tanah & pH Balance', 'Pengendalian Hama Terpadu (PHT / IPM)', 'Sistem Irigasi Tetes Otomatis & Smart Greenhouse', 'Manajemen Nutrisi Hidroponik & Aeroponik (PPM, EC)'],
    standards: ['Good Agricultural Practices (GAP)', 'FAO Sustainable Agriculture Guidelines', 'SNI Pertanian Organik'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Agronom Senior & Praktisi Smart Farming Presisi Modern.
Fokus Analisis:
- Gunakan terminologi sains agronomi (unsur hara makro/mikro, kapasitas tukar kation (KTK), Electro-Conductivity (EC), stomata conductivity, biological pest control).
- Rancang strategi pemupukan berimbang berbasis data pengujian tanah.
- Tekankan efisiensi penggunaan air (water-use efficiency) dan pencegahan resistensi hama akibat pestisida kimiawi berlebih.`,
    suggestedPrompts: [
      {
        title: 'Formulasi Nutrisi Hidroponik (EC & pH)',
        prompt: 'Berapa nilai Electrical Conductivity (EC) dan pH optimal untuk fase vegetatif vs generatif tanaman tomat cherry hidroponik, dan bagaimana mengatasi defisiensi kalsium (blossom end rot)?',
        tag: 'Hidroponik Presisi',
      },
      {
        title: 'Pengendalian Hama Terpadu (PHT) Tanpa Pestisida Berlebih',
        prompt: 'Bagaimana strategi membasmi serangan hama ulat grayak dan kutu kebul dengan memadukan musuh alami (parasitoid), perangkap feromon, dan biopestisida jamur Beauveria bassiana?',
        tag: 'PHT & Organik',
      },
      {
        title: 'Penerapan Sensor IoT dan Drone untuk Lahan 10 Hektar',
        prompt: 'Rancang arsitektur implementasi IoT berbasis sensor kelembaban tanah LoRaWAN dan pemetaan indeks vegetasi NDVI drone untuk menghemat air dan pupuk di perkebunan jagung.',
        tag: 'Smart Farming',
      },
    ],
  },
  {
    id: 'pro-athlete-coach',
    title: 'Atlet Profesional & Pelatih',
    subtitle: 'Program Latihan Fisik, Nutrisi Performa, Manajemen Recovery & Mental Tangguh',
    categoryId: 'transport-eco',
    categoryName: 'Transportasi, Logistik & Lingkungan',
    iconName: 'Dumbbell',
    color: {
      primary: 'text-emerald-300',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/30',
      badge: 'bg-emerald-900/40 text-emerald-200 border-emerald-600/50',
      glow: 'shadow-[0_0_25px_rgba(110,231,183,0.25)]',
    },
    focusAreas: ['Periodisasi Latihan (Macro, Meso, Microcycle)', 'Nutrisi Atletik & Timing Makronutrien', 'Protokol Pemulihan (Sleep Hygiene, HRV, Cryotherapy)', 'Biomekanika Gerak & Pencegahan Cedera (ACL, Rotator Cuff)', 'Kekuatan Mental Bertanding (Sports Psychology & Flow State)'],
    standards: ['NSCA (National Strength & Conditioning Association)', 'WADA Anti-Doping Regulations', 'ACSM Guidelines for Exercise Testing'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah High-Performance Strength & Conditioning Coach dan Pelatih Kepala Atlet Kelas Dunia.
Fokus Analisis:
- Gunakan konsep fisiologi olahraga (VO2 Max, lactate threshold, superkompensasi, central nervous system fatigue, progressive overload).
- Rancang periodisasi latihan yang sistematis (fase hipertrofi, kekuatan maksimal, daya ledak/power, tapering sebelum kompetisi).
- Analisis nutrisi berbasis gram/kg berat badan, hidrasi elektrolit, dan pemulihan berbasis Heart Rate Variability (HRV).`,
    suggestedPrompts: [
      {
        title: 'Periodisasi Tapering 3 Minggu Jelang Marathon',
        prompt: 'Bagaimana protokol penurunan volume latihan (tapering) selama 3 minggu terakhir sebelum lomba lari marathon 42K agar otot tetap prima tanpa kehilangan kebugaran aerobik?',
        tag: 'Periodisasi Lari',
      },
      {
        title: 'Protokol Pencegahan Cedera Ligamen ACL',
        prompt: 'Rancang program pemanasan neuromuskular dan penguatan eksentrik hamstring (seperti Nordic hamstring curls) untuk meminimalkan risiko robekan ACL pada atlet sepak bola / basket.',
        tag: 'Biomekanika & Cedera',
      },
      {
        title: 'Strategi Pemulihan Menggunakan Metrik HRV',
        prompt: 'Bagaimana menginterpretasikan fluktuasi Heart Rate Variability (HRV) setiap pagi untuk menentukan apakah seorang atlet siap latihan beban intensitas tinggi atau harus active recovery?',
        tag: 'Recovery Monitoring',
      },
    ],
  },
  {
    id: 'environmental-scientist',
    title: 'Peneliti Lingkungan',
    subtitle: 'Konservasi Ekosistem, Analisis Jejak Karbon, Keberlanjutan & Audit Ekologi',
    categoryId: 'transport-eco',
    categoryName: 'Transportasi, Logistik & Lingkungan',
    iconName: 'Leaf',
    color: {
      primary: 'text-teal-300',
      bg: 'bg-teal-400/10',
      border: 'border-teal-400/30',
      badge: 'bg-teal-900/40 text-teal-200 border-teal-600/50',
      glow: 'shadow-[0_0_25px_rgba(94,234,212,0.25)]',
    },
    focusAreas: ['Inventarisasi GRK & Kalkulasi Jejak Karbon (Scope 1, 2, 3)', 'Analisis Siklus Hidup Produk (Life Cycle Assessment - LCA)', 'Konservasi Keanekaragaman Hayati & Restorasi Lahan', 'Audit Kepatuhan Lingkungan & PROPER KLHK', 'Transisi Ekonomi Sirkular & Pengelolaan Limbah B3'],
    standards: ['GHG Protocol Corporate Standard', 'ISO 14040 / 14044 (LCA)', 'ISO 14001 Environmental Management System'],
    disclaimerType: 'none',
    systemPromptAddon: `Anda adalah Senior Environmental Scientist & Auditor Ekologi Berkelanjutan.
Fokus Analisis:
- Gunakan metodologi baku kuantifikasi lingkungan (tCO2e, GWP, cradle-to-gate LCA, baku mutu air limbah).
- Evaluasi emisi gas rumah kaca Scope 1 (emisi langsung), Scope 2 (listrik terbeli), dan Scope 3 (rantai pasok hulu-hilir).
- Berikan solusi restorasi berbasis alam (Nature-based Solutions) dan strategi zero waste to landfill.`,
    suggestedPrompts: [
      {
        title: 'Perhitungan Jejak Karbon Scope 1, 2, dan 3',
        prompt: 'Bagaimana metodologi menghitung emisi gas rumah kaca korporasi sesuai standar GHG Protocol untuk Scope 1, 2, dan 3, serta data apa saja yang wajib dikumpulkan dari vendor logistik?',
        tag: 'Jejak Karbon',
      },
      {
        title: 'Studi Life Cycle Assessment (LCA) Kemasan',
        prompt: 'Bandingkan dampak lingkungan siklus hidup (LCA) antara kemasan karton aseptik, botol kaca daur ulang, dan botol rPET dari segi konsumsi air dan potensi pemanasan global.',
        tag: 'Analisis LCA',
      },
      {
        title: 'Restorasi Ekosistem Mangrove & Nilai Blue Carbon',
        prompt: 'Bagaimana langkah teknis merancang proyek restorasi hutan mangrove pesisir agar berhasil secara ekologis dan dapat disertifikasi untuk menghasilkan kredit karbon biru (blue carbon credits)?',
        tag: 'Blue Carbon',
      },
    ],
  },
];

export const CONSULTATION_MODES = [
  {
    id: 'deep_analysis',
    name: 'Analisis Mendalam',
    description: 'Kajian komprehensif, standar teknis industri, analisis risiko, dan metodologi berlapis.',
    badge: 'Komprehensif',
  },
  {
    id: 'quick_advice',
    name: 'Konsultasi Cepat',
    description: 'Jawaban lugas, ringkas, langsung ke pemecahan masalah inti (to the point).',
    badge: 'Cepat & Lugas',
  },
  {
    id: 'action_plan',
    name: 'Rencana Aksi Bertahap',
    description: 'Roadmap implementasi terstruktur dengan checklist, timeline, dan deliverable terukur.',
    badge: 'Roadmap & Checklist',
  },
  {
    id: 'case_study',
    name: 'Studi Kasus & Simulasi',
    description: 'Simulasi skenario riil dunia kerja, trade-off keputusan, dan evaluasi hasil.',
    badge: 'Skenario Riil',
  },
  {
    id: 'audit_review',
    name: 'Audit & Review Dokumen/Kode',
    description: 'Pemeriksaan kritis naskah, kode sumber, draft kontrak, atau SOP terhadap best practices.',
    badge: 'Quality & Audit',
  },
] as const;

export type ConsultationModeId = typeof CONSULTATION_MODES[number]['id'];

export function getProfessionById(id: string): ProfessionProfile {
  const found = PROFESSIONS.find(p => p.id === id);
  return found || PROFESSIONS[0];
}
