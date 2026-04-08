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
    thumbnail: "/images/indosaji2.jpeg",
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
    thumbnail: "/images/intern1.jpeg",
    images: [
      { src: "/images/intern1.jpeg", caption: { id: "Dashboard Utama", en: "Main Dashboard" } },
      { src: "/images/intern2.jpeg", caption: { id: "Visualisasi Data Konsumsi", en: "Consumption Data Visualization" } },
      { src: "/images/intern3.jpeg", caption: { id: "Analisis Pola Anomali", en: "Anomaly Pattern Analysis" } },
      { src: "/images/intern4.jpeg", caption: { id: "Prediksi Model ML", en: "ML Model Prediction" } },
      { src: "/images/intern5.jpeg", caption: { id: "Perbandingan Model", en: "Model Comparison" } },
      { src: "/images/intern6.jpeg", caption: { id: "Heatmap Konsumsi Energi", en: "Energy Consumption Heatmap" } },
      { src: "/images/intern7.jpeg", caption: { id: "Laporan Analisis", en: "Analysis Report" } },
    ],
    githubUrl: "https://github.com/ferdiansyach",
  },
  {
    slug: "anambas",
    title: "Anambas Tourism Website",
    description: {
      id: "Platform pariwisata interaktif yang responsif, dibangun dengan ekosistem Next.js dan Tailwind CSS.",
      en: "An interactive and responsive tourism platform built with the Next.js and Tailwind CSS ecosystem.",
    },
    longDescription: {
      id: "Proyek pengembangan website pariwisata untuk Kepulauan Anambas menggunakan Next.js dan Tailwind CSS. Bertanggung jawab dalam mengembangkan komponen-komponen UI yang menarik dan responsif, serta berkolaborasi dalam arsitektur front-end untuk meningkatkan performa website secara keseluruhan.",
      en: "A tourism website development project for the Anambas Islands using Next.js and Tailwind CSS. Responsible for developing attractive and responsive UI components, and collaborating on front-end architecture to improve overall website performance.",
    },
    challenges: {
      id: "Tantangan utama adalah menciptakan pengalaman visual yang immersive untuk menampilkan keindahan Kepulauan Anambas sambil menjaga performa website tetap optimal. Penggunaan Next.js Image component dan lazy loading sangat membantu dalam mengoptimalkan loading gambar dengan resolusi tinggi.",
      en: "The main challenge was creating an immersive visual experience to showcase the beauty of the Anambas Islands while maintaining optimal website performance. The use of Next.js Image component and lazy loading greatly helped optimize high-resolution image loading.",
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: "webdev",
    thumbnail: "/images/anambas1.jpeg",
    images: [
      { src: "/images/anambas1.jpeg", caption: { id: "Halaman Utama", en: "Homepage" } },
      { src: "/images/anambas2.jpeg", caption: { id: "Galeri Destinasi", en: "Destination Gallery" } },
      { src: "/images/anambas3.jpeg", caption: { id: "Detail Destinasi", en: "Destination Detail" } },
      { src: "/images/anambas4.jpeg", caption: { id: "Peta Lokasi", en: "Location Map" } },
      { src: "/images/anambas5.jpeg", caption: { id: "Informasi Wisata", en: "Tourism Information" } },
      { src: "/images/anambas6.jpeg", caption: { id: "Komponen UI", en: "UI Components" } },
      { src: "/images/anambas7.jpeg", caption: { id: "Responsif Mobile", en: "Mobile Responsive" } },
    ],
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
    thumbnail: "/images/unasfest1.jpeg",
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
    thumbnail: "/images/himasi1.jpeg",
    images: [
      { src: "/images/himasi1.jpeg", caption: { id: "Halaman Utama HIMASI", en: "HIMASI Homepage" } },
      { src: "/images/himasi2.jpeg", caption: { id: "Berita & Artikel", en: "News & Articles" } },
      { src: "/images/himasi3.jpeg", caption: { id: "Profil Organisasi", en: "Organization Profile" } },
      { src: "/images/himasi4.jpeg", caption: { id: "Galeri Kegiatan", en: "Activity Gallery" } },
      { src: "/images/himasi5.jpeg", caption: { id: "Informasi Anggota", en: "Member Information" } },
    ],
    githubUrl: "https://github.com/ferdiansyach",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
