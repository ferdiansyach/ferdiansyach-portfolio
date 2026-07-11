import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "indosaji",
    title: "Indosaji E-commerce",
    description: {
      id: "Platform e-commerce full-stack end-to-end berbasis MERN dengan integrasi payment gateway.",
      en: "An end-to-end full-stack e-commerce platform based on MERN with payment gateway integration.",
    },
    longDescription: {
      id: "Indosaji adalah aplikasi web e-commerce yang dirancang khusus untuk industri makanan dan minuman. Proyek ini dikembangkan secara end-to-end, mencakup sisi klien (pengguna) dan sisi server (admin), untuk memberikan pengalaman belanja online yang mulus dan manajemen yang efisien. Sebagai Fullstack Developer, bertanggung jawab penuh atas arsitektur aplikasi, mulai dari perancangan skema database di MongoDB, pembuatan RESTful API menggunakan Node.js & Express, hingga pengembangan antarmuka pengguna (UI) yang dinamis dan interaktif dengan React. Proyek ini juga mengintegrasikan payment gateway Stripe untuk proses transaksi yang aman.",
      en: "Indosaji is an e-commerce web application designed specifically for the food and beverage industry. This project was developed end-to-end, covering both the client side (user) and server side (admin), to provide a seamless online shopping experience and efficient management. As a Fullstack Developer, fully responsible for the application architecture, from designing the database schema in MongoDB, creating RESTful APIs using Node.js & Express, to developing a dynamic and interactive user interface (UI) with React. This project also integrates the Stripe payment gateway for secure transactions.",
    },
    challenges: {
      id: "Salah satu tantangan utama adalah mengelola state aplikasi secara global dan efisien, terutama untuk fitur krusial seperti autentikasi pengguna dan keranjang belanja. Untuk mengatasinya, diimplementasikan React Context API agar data dapat diakses secara konsisten. Selain itu, tantangan lainnya adalah mengintegrasikan sistem pembayaran yang aman. Berhasil mengimplementasikan Stripe API di sisi backend untuk memproses transaksi dan memverifikasi pembayaran sebelum pesanan dikonfirmasi.",
      en: "One of the main challenges was managing application state globally and efficiently, especially for crucial features like user authentication and shopping cart. To address this, React Context API was implemented so that data can be accessed consistently. Another challenge was integrating a secure payment system. Successfully implemented the Stripe API on the backend to process transactions and verify payments before orders are confirmed.",
    },
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST API", "JWT Auth", "Stripe"],
    category: "webdev",
    period: "2024",
    thumbnail: "/images/indosaji2.jpeg",
    pdfBullets: [
      {
        id: "Membangun platform e-commerce full-stack end-to-end (MERN) dengan integrasi payment gateway Stripe, memproses transaksi pengguna secara real-time dari sisi klien hingga server.",
        en: "Built a full-stack MERN e-commerce platform with Stripe payment gateway integration, processing real-time user transactions from client to server.",
      },
      {
        id: "Mengimplementasikan React Context API untuk manajemen state global (autentikasi & keranjang belanja), memastikan konsistensi UX di seluruh halaman aplikasi.",
        en: "Implemented React Context API for global state management (auth & shopping cart), ensuring consistent UX across all application views.",
      },
      {
        id: "Merancang RESTful API dengan Node.js & Express, didukung skema MongoDB yang terstruktur untuk memisahkan role admin dan pengguna secara aman.",
        en: "Architected RESTful API with Node.js & Express backed by structured MongoDB schema, enabling secure admin/user role separation.",
      },
    ],
    images: [
      { src: "/images/indosaji7.jpeg", caption: { id: "Halaman Utama & Display Produk", en: "Homepage & Product Display" } },
      { src: "/images/indosaji1.jpeg", caption: { id: "Autentikasi Pengguna", en: "User Authentication" } },
      { src: "/images/indosaji4.jpeg", caption: { id: "Keranjang Belanja", en: "Shopping Cart" } },
      { src: "/images/indosaji6.jpeg", caption: { id: "Proses Pemesanan", en: "Order Process" } },
      { src: "/images/indosaji8.jpeg", caption: { id: "Integrasi Pembayaran Stripe", en: "Stripe Payment Integration" } },
      { src: "/images/indosaji5.jpeg", caption: { id: "Riwayat Pesanan Pengguna", en: "User Order History" } },
      { src: "/images/indosaji10.jpeg", caption: { id: "Admin: Tambah Produk", en: "Admin: Add Product" } },
      { src: "/images/indosaji3.jpeg", caption: { id: "Admin: Manajemen Produk", en: "Admin: Product Management" } },
      { src: "/images/indosaji9.jpeg", caption: { id: "Admin: Manajemen Pesanan", en: "Admin: Order Management" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/indosaji",
  },
  {
    slug: "smart-meter",
    title: "Smart Meter Analysis",
    description: {
      id: "Model AI prediktif (LSTM & XGBoost) untuk deteksi anomali energi dengan dashboard interaktif real-time.",
      en: "Predictive AI models (LSTM & XGBoost) for energy anomaly detection with a real-time interactive dashboard.",
    },
    longDescription: {
      id: "Proyek analisis data konsumsi energi smart meter menggunakan teknik machine learning untuk mendeteksi pola anomali dan mengoptimalkan efisiensi energi. Melibatkan pemrosesan data besar, feature engineering, dan implementasi model prediktif menggunakan Gradient Boosting dan LSTM. Dashboard interaktif dibangun menggunakan Streamlit untuk visualisasi hasil analisis secara real-time.",
      en: "A smart meter energy consumption data analysis project using machine learning techniques to detect anomaly patterns and optimize energy efficiency. Involves large-scale data processing, feature engineering, and implementation of predictive models using Gradient Boosting and LSTM. An interactive dashboard was built using Streamlit for real-time visualization of analysis results.",
    },
    challenges: {
      id: "Tantangan utama adalah menangani dataset besar dengan banyak noise dan missing values. Diperlukan pipeline preprocessing yang robust untuk memastikan kualitas data sebelum melatih model. Selain itu, memilih arsitektur model yang tepat untuk time-series forecasting juga menjadi tantangan, di mana LSTM memberikan hasil terbaik setelah tuning hyperparameter yang ekstensif.",
      en: "The main challenge was handling large datasets with significant noise and missing values. A robust preprocessing pipeline was needed to ensure data quality before training models. Additionally, selecting the right model architecture for time-series forecasting was challenging, where LSTM provided the best results after extensive hyperparameter tuning.",
    },
    technologies: ["Python", "Machine Learning", "Data Analysis", "Streamlit", "XGBoost", "LSTM", "Pandas"],
    category: "datascience",
    period: "2025",
    thumbnail: "/images/intern1.jpeg",
    pdfBullets: [
      {
        id: "Membangun model prediktif LSTM + XGBoost dengan akurasi 92% untuk peramalan konsumsi energi dari 50.000+ data poin smart meter.",
        en: "Engineered LSTM + XGBoost predictive models achieving 92% accuracy on 50,000+ smart meter data points for energy consumption forecasting.",
      },
      {
        id: "Merancang pipeline data end-to-end (ingest → preprocessing → deployment) dengan deteksi anomali skala besar untuk divisi analisis tekno-ekonomi Telkom Indonesia.",
        en: "Built an end-to-end data pipeline (ingestion → preprocessing → deployment) with large-scale anomaly detection for Telkom Indonesia's techno-economic analysis division.",
      },
      {
        id: "Mengembangkan dashboard Streamlit real-time untuk visualisasi konsumsi energi dan perbandingan performa model, diadopsi langsung oleh tim internal.",
        en: "Developed a real-time Streamlit dashboard for energy consumption visualization and model performance comparison, adopted directly by the internal team.",
      },
    ],
    images: [
      { src: "/images/intern1.jpeg", caption: { id: "Dashboard Utama", en: "Main Dashboard" } },
      { src: "/images/intern2.jpeg", caption: { id: "Visualisasi Data Konsumsi", en: "Consumption Data Visualization" } },
      { src: "/images/intern3.jpeg", caption: { id: "Analisis Pola Anomali", en: "Anomaly Pattern Analysis" } },
      { src: "/images/intern4.jpeg", caption: { id: "Prediksi Model ML", en: "ML Model Prediction" } },
      { src: "/images/intern5.jpeg", caption: { id: "Perbandingan Model", en: "Model Comparison" } },
      { src: "/images/intern6.jpeg", caption: { id: "Heatmap Konsumsi Energi", en: "Energy Consumption Heatmap" } },
      { src: "/images/intern7.jpeg", caption: { id: "Laporan Analisis", en: "Analysis Report" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/smart-meter-analysis",
    githubNote: {
      id: "Private repo - tersedia atas permintaan",
      en: "Private repo - available upon request",
    },
  },
  {
    slug: "coastal-water-quality",
    title: "Coastal Water Quality Monitoring",
    description: {
      id: "Monitoring kualitas perairan pesisir Jakarta & Banten via Google Earth Engine (2019–2025) dengan Sentinel-2, Landsat-8, K-Means, dan Mann-Kendall.",
      en: "Coastal water quality monitoring for Jakarta & Banten via Google Earth Engine (2019–2025) using Sentinel-2, Landsat-8, K-Means, and Mann-Kendall.",
    },
    longDescription: {
      id: "Proyek ini membangun sistem monitoring kualitas perairan pesisir Jakarta dan Banten secara temporal (2019–2025) menggunakan platform Google Earth Engine (GEE). Data satelit Sentinel-2 dan Landsat-8 digunakan untuk mengekstrak parameter optik air seperti turbiditas, klorofil-a, dan Total Suspended Solid (TSS). Analisis spasial dilengkapi dengan clustering K-Means untuk mengidentifikasi zona kualitas air, serta uji tren Mann-Kendall untuk mendeteksi perubahan signifikan secara statistik dari waktu ke waktu. Seluruh hasil analisis divisualisasikan melalui dashboard interaktif berbasis Streamlit.",
      en: "This project builds a temporal coastal water quality monitoring system for Jakarta and Banten (2019–2025) using the Google Earth Engine (GEE) platform. Sentinel-2 and Landsat-8 satellite data were used to extract water optical parameters such as turbidity, chlorophyll-a, and Total Suspended Solids (TSS). Spatial analysis was enhanced with K-Means clustering to identify water quality zones, and Mann-Kendall trend tests to statistically detect significant changes over time. All results are visualized through an interactive Streamlit dashboard.",
    },
    challenges: {
      id: "Tantangan utama adalah mengelola data time-series dari dua sumber satelit berbeda (Sentinel-2 dan Landsat-8) dengan resolusi dan karakteristik spektral yang berbeda. Diperlukan harmonisasi data antar sensor agar analisis tren jangka panjang tetap konsisten. Selain itu, cloud masking pada citra pesisir menjadi tantangan tersendiri karena wilayah pesisir kerap tertutup awan, sehingga diperlukan strategi kompositing yang cermat untuk memastikan kualitas data.",
      en: "The main challenge was managing time-series data from two different satellite sources (Sentinel-2 and Landsat-8) with different resolutions and spectral characteristics. Data harmonization across sensors was required to ensure consistent long-term trend analysis. Additionally, cloud masking on coastal imagery was challenging since coastal areas are frequently cloud-covered, requiring careful compositing strategies to ensure data quality.",
    },
    technologies: [
      "Python",
      "Google Earth Engine",
      "Sentinel-2",
      "Landsat-8",
      "Streamlit",
      "K-Means",
      "Mann-Kendall",
      "Remote Sensing",
    ],
    category: "datascience",
    period: "2025",
    thumbnail: "/images/coastal1.jpeg",
    pdfBullets: [
      {
        id: "Membangun sistem monitoring temporal kualitas perairan pesisir Jakarta & Banten (2019–2025) menggunakan Google Earth Engine dengan data multi-sensor Sentinel-2 & Landsat-8.",
        en: "Built a temporal coastal water quality monitoring system for Jakarta & Banten (2019–2025) using Google Earth Engine with multi-sensor Sentinel-2 & Landsat-8 data.",
      },
      {
        id: "Mengimplementasikan K-Means clustering untuk zonasi kualitas air dan uji tren Mann-Kendall untuk deteksi perubahan parameter (turbiditas, klorofil-a, TSS) secara statistik.",
        en: "Implemented K-Means clustering for water quality zoning and Mann-Kendall trend tests for statistical detection of parameter changes (turbidity, chlorophyll-a, TSS).",
      },
      {
        id: "Mengembangkan Streamlit dashboard interaktif untuk visualisasi spasial & temporal kualitas perairan, memudahkan interpretasi data satelit bagi pemangku kepentingan non-teknis.",
        en: "Developed an interactive Streamlit dashboard for spatial & temporal water quality visualization, making satellite data interpretation accessible to non-technical stakeholders.",
      },
    ],
    images: [
      {
        src: "/images/coastal1.jpeg",
        caption: { id: "Dashboard Utama Streamlit", en: "Main Streamlit Dashboard" },
      },
      {
        src: "/images/coastal2.jpeg",
        caption: { id: "Peta Kualitas Air (GEE)", en: "Water Quality Map (GEE)" },
      },
      {
        src: "/images/coastal3.jpeg",
        caption: { id: "Analisis Temporal 2019–2025", en: "Temporal Analysis 2019–2025" },
      },
      {
        src: "/images/coastal4.jpeg",
        caption: { id: "K-Means Clustering Zona Air", en: "K-Means Water Zone Clustering" },
      },
      {
        src: "/images/coastal5.jpeg",
        caption: { id: "Uji Tren Mann-Kendall", en: "Mann-Kendall Trend Test" },
      },
      {
        src: "/images/coastal6.jpeg",
        caption: { id: "Distribusi Parameter TSS", en: "TSS Parameter Distribution" },
      },
    ],
    githubUrl: "https://github.com/ferdiansyach/coastal-water-quality-gee",
  },
  {
    slug: "unasfest",
    title: "Website UNAS FEST",
    description: {
      id: "Portal website resmi berskala besar untuk mendukung operasional festival tahunan universitas.",
      en: "A large-scale official web portal to support the operations of the university's annual festival.",
    },
    longDescription: {
      id: "Website resmi untuk UNAS FEST (Universitas Nasional Festival), sebuah acara besar tahunan universitas. Dikembangkan sebagai fullstack developer yang bertanggung jawab dalam membangun komponen website yang responsif menggunakan TypeScript dan Tailwind CSS. Melakukan pengujian dan debugging komponen untuk memastikan stabilitas dan performa optimal.",
      en: "The official website for UNAS FEST (Universitas Nasional Festival), a major annual university event. Developed as a fullstack developer responsible for building responsive website components using TypeScript and Tailwind CSS. Conducted testing and debugging of components to ensure optimal stability and performance.",
    },
    challenges: {
      id: "Tantangan terbesar adalah mengelola deadline yang ketat dengan koordinasi tim yang terdiri dari beberapa developer. Menggunakan Git branching strategy yang efektif dan code review untuk memastikan kualitas kode tetap terjaga selama development yang intensif.",
      en: "The biggest challenge was managing tight deadlines with team coordination involving multiple developers. Used an effective Git branching strategy and code reviews to maintain code quality during intensive development.",
    },
    technologies: ["TypeScript", "React", "Tailwind CSS", "Next.js"],
    category: "webdev",
    period: "2024",
    thumbnail: "/images/unasfest1.jpeg",
    githubUrl: "https://github.com/ferdiansyach/unasfest-end",
    pdfBullets: [
      {
        id: "Mengembangkan 10+ komponen website responsif dengan TypeScript & Tailwind CSS, mencapai skor Lighthouse 90+ untuk performa dan aksesibilitas pada portal festival resmi.",
        en: "Developed 10+ responsive components with TypeScript & Tailwind CSS, achieving a Lighthouse score of 90+ for performance and accessibility on the official festival portal.",
      },
      {
        id: "Merancang pipeline testing komprehensif (Jest, RTL) yang memangkas bug rate produksi sebesar 60% sebelum rilis publik yang digunakan seluruh civitas universitas.",
        en: "Engineered a comprehensive testing pipeline (Jest, RTL) reducing the production bug rate by 60% before a public release used by the entire university community.",
      },
      {
        id: "Berkolaborasi dalam tim multi-developer menggunakan Git branching strategy dan code review untuk menjaga kualitas kode di bawah deadline yang ketat.",
        en: "Collaborated in a multi-developer team using Git branching strategy and code reviews to maintain code quality under tight deadlines.",
      },
    ],
    images: [
      { src: "/images/unasfest1.jpeg", caption: { id: "Halaman Utama Festival", en: "Festival Homepage" } },
      { src: "/images/unasfest2.jpeg", caption: { id: "Lineup Acara", en: "Event Lineup" } },
      { src: "/images/unasfest3.jpeg", caption: { id: "Informasi Tiket", en: "Ticket Information" } },
      { src: "/images/unasfest4.jpeg", caption: { id: "Galeri Kegiatan", en: "Activity Gallery" } },
      { src: "/images/unasfest5.jpeg", caption: { id: "Sponsor & Partner", en: "Sponsors & Partners" } },
      { src: "/images/unasfest6.jpeg", caption: { id: "Responsif Design", en: "Responsive Design" } },
      { src: "/images/unasfest7.jpeg", caption: { id: "Dokumentasi Acara", en: "Event Documentation" } },
    ],
  },
  {
    slug: "himasi",
    title: "HIMASI UNAS Website",
    description: {
      id: "Sistem Manajemen Konten (CMS) profesional yang dioptimalkan untuk organisasi himpunan mahasiswa.",
      en: "A professional Content Management System (CMS) optimized for the student association.",
    },
    longDescription: {
      id: "Website resmi Himpunan Mahasiswa Sistem Informasi (HIMASI) Universitas Nasional. Bertanggung jawab dalam mengembangkan dan mengelola website menggunakan WordPress, termasuk pembuatan konten, manajemen plugin, dan optimasi performa untuk meningkatkan keterlibatan anggota himpunan.",
      en: "The official website for the Information Systems Student Association (HIMASI) of Universitas Nasional. Responsible for developing and managing the website using WordPress, including content creation, plugin management, and performance optimization to increase member engagement.",
    },
    challenges: {
      id: "Tantangan utama adalah membuat website yang mudah dikelola oleh anggota non-teknis sekaligus tetap memiliki tampilan profesional. Menggunakan page builder yang intuitif dan membuat dokumentasi pengelolaan agar serah terima ke pengurus selanjutnya berjalan lancar.",
      en: "The main challenge was creating a website that is easy to manage by non-technical members while maintaining a professional look. Used an intuitive page builder and created management documentation to ensure smooth handover to the next management team.",
    },
    technologies: ["WordPress", "Content Management", "SEO", "Plugin Management"],
    category: "wordpress",
    period: "2024 – 2025",
    thumbnail: "/images/himasi1.jpeg",
    pdfBullets: [
      {
        id: "Mengembangkan website resmi himpunan mahasiswa menggunakan WordPress, meningkatkan traffic sebesar 40% melalui konten terstruktur yang dioptimalkan SEO.",
        en: "Developed the official student association website on WordPress, increasing traffic by 40% through structured, SEO-optimized content.",
      },
      {
        id: "Mengelola ekosistem plugin dan arsitektur konten agar dapat dikelola mandiri oleh anggota non-teknis tanpa menurunkan tampilan profesional.",
        en: "Managed plugin ecosystem and content architecture, enabling non-technical members to self-manage content without compromising professional appearance.",
      },
      {
        id: "Membuat dokumentasi serah terima pengelolaan website yang komprehensif, memastikan transisi mulus ke pengurus himpunan periode selanjutnya.",
        en: "Created comprehensive website handover documentation, ensuring a smooth management transition to the next student association committee.",
      },
    ],
    images: [
      { src: "/images/himasi1.jpeg", caption: { id: "Halaman Utama HIMASI", en: "HIMASI Homepage" } },
      { src: "/images/himasi2.jpeg", caption: { id: "Berita & Artikel", en: "News & Articles" } },
      { src: "/images/himasi3.jpeg", caption: { id: "Profil Organisasi", en: "Organization Profile" } },
      { src: "/images/himasi4.jpeg", caption: { id: "Galeri Kegiatan", en: "Activity Gallery" } },
      { src: "/images/himasi5.jpeg", caption: { id: "Informasi Anggota", en: "Member Information" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/himasi-unas",
    githubNote: {
      id: "Private repo - tersedia atas permintaan",
      en: "Private repo - available upon request",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
