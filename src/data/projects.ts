import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "magangtracking",
    title: "MagangTracking Platform",
    description: {
      id: "Platform fullstack pelacak dan analitik program magang untuk MagangHub Kemnaker — dibangun dengan Go (Gin) sebagai backend, Next.js 16 sebagai frontend, dan Supabase PostgreSQL sebagai database.",
      en: "Fullstack internship tracker & analytics platform for MagangHub Kemnaker — built with Go (Gin) as backend, Next.js 16 as frontend, and Supabase PostgreSQL as the database.",
    },
    longDescription: {
      id: "Platform manajemen dan analitik program magang terintegrasi untuk MagangHub Kemnaker. Arsitektur fullstack terpisah antara backend (Go dengan framework Gin untuk RESTful API yang performan) dan frontend (Next.js 16 dengan Tailwind CSS v4). Database menggunakan Supabase PostgreSQL sebagai managed cloud database. Sistem mendukung tracking peserta magang, manajemen program, dan dashboard analitik untuk memonitoring perkembangan program magang secara real-time.",
      en: "An integrated internship program management and analytics platform for MagangHub Kemnaker. The fullstack architecture separates concerns between a Go (Gin framework) backend for performant RESTful APIs and a Next.js 16 frontend with Tailwind CSS v4. Database powered by Supabase PostgreSQL as managed cloud storage. Supports intern tracking, program management, and an analytics dashboard for monitoring internship program progress in real-time.",
    },
    challenges: {
      id: "Tantangan utama adalah merancang arsitektur REST API yang efisien dengan Go (Gin) yang dapat melayani request dari Next.js frontend secara aman menggunakan CORS dan autentikasi berbasis token. Manajemen koneksi Supabase PostgreSQL dan query optimasi untuk dashboard analitik real-time juga memerlukan perhatian khusus.",
      en: "The main challenge was designing an efficient REST API architecture with Go (Gin) that can securely serve requests from the Next.js frontend using CORS and token-based authentication. Supabase PostgreSQL connection management and query optimization for real-time analytics dashboards also required careful attention.",
    },
    technologies: ["Go", "Gin", "Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS v4", "REST API"],
    category: "webdev",
    period: "2026",
    thumbnail: "/images/magangtracking1.png",
    pdfBullets: [
      {
        id: "Membangun backend RESTful API dengan Go (Gin framework) yang melayani data magang dari Supabase PostgreSQL ke frontend Next.js 16 secara aman dengan autentikasi berbasis token.",
        en: "Built a RESTful API backend with Go (Gin framework) serving internship data from Supabase PostgreSQL to a Next.js 16 frontend with token-based authentication.",
      },
      {
        id: "Merancang arsitektur fullstack terpisah (Go API + Next.js SPA) dengan Supabase PostgreSQL sebagai managed cloud database, dideploy di Vercel dengan integrasi CI/CD.",
        en: "Architected a decoupled fullstack system (Go API + Next.js SPA) with Supabase PostgreSQL as managed cloud database, deployed on Vercel with CI/CD integration.",
      },
      {
        id: "Mengimplementasikan dashboard analitik real-time untuk monitoring program magang MagangHub Kemnaker dengan visualisasi data peserta dan progress tracking.",
        en: "Implemented a real-time analytics dashboard for monitoring MagangHub Kemnaker internship programs with participant data visualization and progress tracking.",
      },
    ],
    images: [
      { src: "/images/magangtracking1.png", caption: { id: "Dashboard Statistik MagangHub", en: "MagangHub Analytics Dashboard" } },
      { src: "/images/magangtracking2.png", caption: { id: "Katalog Lowongan Magang", en: "Internship Vacancies Catalog" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/magangtracking",
    liveUrl: "https://magangtracking.vercel.app",
    role: { id: "Fullstack Developer (Go + Next.js)", en: "Fullstack Developer (Go + Next.js)" },
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
    period: "2026",
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
    githubNote: {
      id: "Private repo - tersedia atas permintaan",
      en: "Private repo - available upon request",
    },
    role: { id: "Data Analyst & Spesialis GIS", en: "Data Analyst & GIS Specialist" },
  },
  {
    slug: "waste-classification-app",
    title: "Waste Classification AI App",
    description: {
      id: "Aplikasi web fullstack klasifikasi sampah berbasis AI — upload foto, dapat kategori & rekomendasi penanganan secara instan. Dibangun dengan Next.js 15, Gemini Vision API, PostgreSQL, dan Drizzle ORM.",
      en: "AI-powered fullstack waste classification web app — upload a photo, get instant category & handling recommendations. Built with Next.js 15, Gemini Vision API, PostgreSQL, and Drizzle ORM.",
    },
    longDescription: {
      id: "Aplikasi web fullstack yang memanfaatkan Gemini Vision API (Google AI) untuk klasifikasi jenis sampah secara otomatis berdasarkan foto yang diunggah pengguna. Dibangun dengan arsitektur fullstack modern: Next.js 15 App Router sebagai frontend dan server-side API, PostgreSQL dengan Drizzle ORM sebagai database, dan Tailwind CSS untuk antarmuka responsif. Pengguna cukup mengunggah foto sampah dan sistem akan mengidentifikasi kategori (organik, anorganik, B3) beserta rekomendasi penanganan yang tepat secara real-time.",
      en: "A fullstack web application leveraging the Gemini Vision API (Google AI) for automatic waste classification from user-uploaded photos. Built with modern fullstack architecture: Next.js 15 App Router for both frontend and server-side API handling, PostgreSQL with Drizzle ORM as the database layer, and Tailwind CSS for a responsive UI. Users simply upload a waste photo and the system identifies the category (organic, inorganic, hazardous) along with proper handling recommendations in real-time.",
    },
    challenges: {
      id: "Tantangan utama adalah mengintegrasikan Gemini Vision API secara efisien dalam Next.js API Routes sambil mengelola state upload gambar dan menampilkan hasil klasifikasi secara real-time. Diperlukan optimasi prompt engineering untuk mendapatkan output terstruktur dari model AI, serta perancangan skema database PostgreSQL yang fleksibel untuk menyimpan riwayat klasifikasi pengguna.",
      en: "The main challenge was integrating the Gemini Vision API efficiently within Next.js API Routes while managing image upload state and displaying classification results in real-time. Required prompt engineering optimization to get structured output from the AI model, and PostgreSQL schema design to flexibly store user classification history.",
    },
    technologies: ["Next.js 15", "TypeScript", "Gemini Vision API", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Google AI"],
    category: "webdev",
    period: "2025",
    thumbnail: "/images/intern3.jpeg",
    pdfBullets: [
      {
        id: "Membangun aplikasi web fullstack klasifikasi sampah berbasis AI dengan Next.js 15 App Router dan Gemini Vision API, memproses klasifikasi foto secara real-time dan menyimpan riwayat ke PostgreSQL via Drizzle ORM.",
        en: "Built a fullstack AI waste classification web app with Next.js 15 App Router and Gemini Vision API, processing real-time photo classification and persisting history to PostgreSQL via Drizzle ORM.",
      },
      {
        id: "Merancang skema PostgreSQL dan REST API layer dengan Drizzle ORM untuk penyimpanan data klasifikasi pengguna yang terstruktur, dideploy secara penuh di Vercel.",
        en: "Designed PostgreSQL schema and REST API layer with Drizzle ORM for structured user classification data storage, fully deployed on Vercel.",
      },
      {
        id: "Mengimplementasikan prompt engineering pada Gemini Vision API untuk menghasilkan output terstruktur (kategori sampah + rekomendasi penanganan) dari input foto pengguna.",
        en: "Implemented prompt engineering on Gemini Vision API to produce structured output (waste category + handling recommendations) from user photo inputs.",
      },
    ],
    images: [
      { src: "/images/intern3.jpeg", caption: { id: "Klasifikasi Sampah AI", en: "AI Waste Classification" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/waste-classification",
    liveUrl: "https://waste-classification-rust.vercel.app",
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
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
    githubUrl: "https://github.com/ferdiansyach/Energy_Effeciency",
    role: { id: "Data Analyst & ML Engineer", en: "Data Analyst & ML Engineer" },
  },
  {
    slug: "waste-classification-pkm",
    title: "AI Waste Detection System (PKM × DLHK Depok)",
    description: {
      id: "Model deteksi sampah real-time berbasis YOLOv11 dengan mAP (IoU 0.5) 97.5% — kolaborasi PKM Pengabdian Masyarakat dengan DLHK Kota Depok untuk pengelolaan sampah berbasis AI.",
      en: "Real-time YOLOv11 waste detection model achieving mAP (IoU 0.5) 97.5% — PKM community service collaboration with Depok City Environmental Agency (DLHK) for AI-powered waste management.",
    },
    longDescription: {
      id: "Proyek PKM Pengabdian Masyarakat yang mengembangkan sistem deteksi dan klasifikasi sampah real-time menggunakan arsitektur YOLOv11 deep learning, berkolaborasi dengan Dinas Lingkungan Hidup dan Kebersihan (DLHK) Kota Depok. Model dilatih pada 10.000+ citra sampah teranotasi lintas 6 kategori (kardus, kaca, logam, kertas, plastik, sampah umum), mencapai mAP (IoU 0.5) sebesar 97.5%, Precision 96.2%, dan Recall 95.8%. Dilengkapi platform web klasifikasi sampah dengan dashboard admin untuk monitoring real-time, serta pelaksanaan pelatihan transfer teknologi kepada komunitas pengelola sampah di Beji dan Mekarjaya, Depok.",
      en: "A PKM (Student Creativity Program) community service project developing a real-time waste detection and classification system using YOLOv11 deep learning architecture, in collaboration with the Depok City Environmental and Sanitation Agency (DLHK). The model was trained on 10,000+ annotated images across 6 waste categories (cardboard, glass, metal, paper, plastic, trash), achieving mAP (IoU 0.5) of 97.5%, Precision of 96.2%, and Recall of 95.8%. The project also includes a web-based waste classification platform with an admin dashboard for real-time monitoring, and field deployment with technology transfer training for waste management communities in Beji and Mekarjaya, Depok.",
    },
    challenges: {
      id: "Tantangan utama adalah membangun dataset citra sampah berkualitas tinggi pada berbagai kondisi pencahayaan dan latar belakang nyata, serta melakukan fine-tuning YOLOv11 agar robust terhadap variasi visual 6 kategori sampah. Integrasi model ke platform web untuk real-time inference juga memerlukan optimasi performa agar dapat berjalan pada hardware terbatas.",
      en: "Key challenges included building a high-quality waste image dataset under varied real-world lighting and background conditions, and fine-tuning YOLOv11 to be robust across 6 waste category visual variations. Integrating the model into a web platform for real-time inference also required performance optimization for constrained hardware environments.",
    },
    technologies: ["Python", "YOLOv11", "Computer Vision", "Deep Learning", "PyTorch", "OpenCV", "Next.js", "Streamlit"],
    category: "datascience",
    period: "2024 – 2025",
    thumbnail: "/images/intern3.jpeg",
    pdfBullets: [
      {
        id: "Merancang dan melatih model deteksi objek YOLOv11 pada 10.000+ citra sampah teranotasi lintas 6 kategori, mencapai mAP (IoU 0.5) 97.5%, Precision 96.2%, dan Recall 95.8% dalam kolaborasi dengan DLHK Kota Depok.",
        en: "Engineered and trained a YOLOv11 object detection model on 10,000+ annotated waste images across 6 categories, achieving mAP (IoU 0.5) of 97.5%, Precision 96.2%, and Recall 95.8%, in collaboration with Depok City Environmental Agency (DLHK).",
      },
      {
        id: "Mengembangkan platform web klasifikasi sampah berbasis AI dengan dashboard admin real-time, serta melaksanakan pelatihan transfer teknologi kepada komunitas pengelola sampah di Beji dan Mekarjaya, Depok.",
        en: "Developed an AI-powered waste classification web platform with a real-time admin dashboard, and conducted technology transfer training for waste management communities in Beji and Mekarjaya, Depok.",
      },
    ],
    images: [
      { src: "/images/intern3.jpeg", caption: { id: "Deteksi Sampah YOLOv11", en: "YOLOv11 Waste Detection" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/waste-classification",
    role: { id: "Computer Vision & ML Developer", en: "Computer Vision & ML Developer" },
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
      id: "Dikembangkan via WordPress CMS (Tanpa repo kode publik)",
      en: "Developed via WordPress CMS (No public code repository)",
    },
    role: { id: "WordPress Developer & Pengelola Konten", en: "WordPress Developer & Content Manager" },
  },
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
    githubNote: {
      id: "Private repo - tersedia atas permintaan",
      en: "Private repo - available upon request",
    },
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
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
    githubNote: {
      id: "Private repo - tersedia atas permintaan",
      en: "Private repo - available upon request",
    },
    role: { id: "Frontend Developer & QA Engineer", en: "Frontend Developer & QA Engineer" },
  },
  {
    slug: "sentiment-analysis-dashboard",
    title: "Sentiment Analysis Dashboard",
    description: {
      id: "Streamlit Dashboard interaktif untuk analisis sentimen teks menggunakan Natural Language Processing (NLP) dan Machine Learning.",
      en: "Interactive Streamlit dashboard for text sentiment analysis using Natural Language Processing (NLP) and Machine Learning.",
    },
    longDescription: {
      id: "Aplikasi web interaktif berbasis Streamlit untuk menganalisis sentimen dari dataset teks publik. Melibatkan pembersihan teks (text preprocessing, stopword removal, stemming/lemmatization), ekstraksi fitur TF-IDF, serta klasifikasi sentimen positif, netral, dan negatif menggunakan algoritma Machine Learning. Dilengkapi visualisasi distribusi kata (wordcloud) dan grafik sentimen.",
      en: "An interactive web application built with Streamlit to analyze sentiment from public text datasets. Involves text preprocessing (cleaning, stopword removal, stemming/lemmatization), TF-IDF feature extraction, and classification of positive, neutral, and negative sentiments using Machine Learning algorithms. Features wordcloud visualizations and sentiment distribution charts.",
    },
    challenges: {
      id: "Mengoptimalkan pipeline preprocessing teks bahasa Indonesia/Inggris dan menangani ketidakseimbangan kelas (class imbalance) pada dataset sentimen untuk mempertahankan akurasi klasifikasi.",
      en: "Optimizing text preprocessing pipeline for Indonesian/English text and handling class imbalance in sentiment datasets to maintain classification accuracy.",
    },
    technologies: ["Python", "Streamlit", "NLP", "NLTK", "Scikit-learn", "Pandas", "Text Processing"],
    category: "datascience",
    period: "2024",
    thumbnail: "/images/intern2.jpeg",
    pdfBullets: [
      {
        id: "Mengembangkan dashboard interaktif Streamlit untuk klasifikasi sentimen teks real-time dengan ekstraksi fitur TF-IDF dan visualisasi WordCloud.",
        en: "Developed an interactive Streamlit dashboard for real-time text sentiment classification using TF-IDF feature extraction and WordCloud visualization.",
      },
      {
        id: "Merancang pipeline NLP (preprocessing, stopword removal, lemmatization) untuk meningkatkan performa klasifikasi model Machine Learning.",
        en: "Architected an NLP pipeline (preprocessing, stopword removal, lemmatization) to enhance Machine Learning model classification performance.",
      },
    ],
    images: [
      { src: "/images/intern2.jpeg", caption: { id: "Visualisasi Sentimen", en: "Sentiment Visualization" } },
    ],
    githubUrl: "https://github.com/ferdiansyach/Sentiment-Analysis-Dashboard",
    role: { id: "Data Analyst & NLP Developer", en: "Data Analyst & NLP Developer" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAdjacentProjects(slug: string): { prevProject: Project | undefined; nextProject: Project | undefined } {
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { prevProject: undefined, nextProject: undefined };

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return {
    prevProject: projects[prevIndex],
    nextProject: projects[nextIndex],
  };
}
