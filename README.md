# NihonMatch - Learn Japanese Words Through Memory Game

## Project Title
NihonMatch - A Fun Memory Game for Learning Japanese Vocabulary

## Description
NihonMatch adalah aplikasi web game memori interaktif yang dirancang khusus sebagai alat bantu edukasi inovatif untuk mempelajari kosakata dasar bahasa Jepang. Permainan ini mengatasi tantangan pembelajaran bahasa yang seringkali terasa monoton dengan menawarkan pengalaman yang menyenangkan dan mudah diakses. Mekanisme utamanya melibatkan pencocokan kartu yang menampilkan visual (gambar benda) dan teks Jepang (Hiragana/Katakana) dengan pasangannya yang berisi arti kata dalam bahasa Inggris dan cara membacanya (Romaji). Pendekatan ganda ini tidak hanya memperkuat asosiasi visual dan tekstual, tetapi juga memaksimalkan retensi memori dan pemahaman bagi pengguna. Tujuan proyek ini adalah mengubah proses belajar bahasa Jepang menjadi pengalaman yang menarik dan efektif bagi siapa saja, dari pemula hingga mereka yang ingin memperkuat kosakata dasar.

Proyek ini memenuhi kriteria "Mini Games" Capstone Project karena memiliki logika permainan yang jelas, interaksi pengguna langsung, tampilan skor, dan tidak memerlukan *backend*.

## Technologies Used
* **HTML5:** Digunakan untuk membangun struktur dasar halaman web.
* **CSS3:** Bertanggung jawab untuk *styling*, tata letak responsif, dan animasi visual game yang menarik, termasuk efek membalik kartu.
* **JavaScript (Vanilla JS):** Menangani logika game inti, seperti pengacakan kartu, deteksi pencocokan, manajemen skor dan *timer*, serta interaksi pengguna.
* **Google Fonts:**
    * `Poppins`: Dipilih untuk teks umum antarmuka pengguna (UI), judul, dan Romaji, memberikan tampilan yang modern dan bersih.
    * `Noto Sans JP`: Digunakan secara spesifik untuk karakter Jepang (Hiragana/Katakana/Kanji) untuk memastikan render yang akurat, kejelasan, dan estetika yang sesuai.
* **HTML Audio API:** Diintegrasikan untuk menyediakan berbagai efek suara yang memperkaya pengalaman bermain game dan memberikan *feedback* audio kepada pemain.
* **Git & GitHub:** Digunakan untuk sistem kontrol versi, memungkinkan pelacakan perubahan kode, kolaborasi, dan hosting *source code* proyek.
* **Vercel:** Akan digunakan sebagai platform deployment untuk menghosting aplikasi web statis ini, membuatnya dapat diakses secara publik.

## Features
* **Interactive Card Matching:** Fitur ini memungkinkan pemain untuk membalik kartu dengan animasi transisi yang halus. Sistem pencocokan dirancang untuk menghubungkan kartu yang menampilkan **gambar benda dan teks Jepang (Hiragana/Katakana)** dengan kartu pasangannya yang berisi **arti kata dalam bahasa Inggris dan cara membacanya (Romaji)**.
* **Dynamic Score & Timer:** Aplikasi ini secara dinamis menampilkan skor perolehan yang menunjukkan jumlah pasangan yang berhasil ditemukan. Selain itu, terdapat sebuah *timer* hitung mundur yang memberikan tantangan waktu kepada pemain, menampilkan sisa waktu secara *real-time* selama permainan berlangsung.
* **Engaging Audio Feedback:** Untuk memperkaya pengalaman bermain, berbagai efek suara telah diintegrasikan. Ini termasuk suara untuk setiap aksi membalik kartu, suara khusus untuk kecocokan yang benar, suara berbeda untuk kecocokan yang salah, serta audio spesifik untuk kondisi Game Over atau kemenangan.
* **Game Controls:** Aplikasi ini dilengkapi dengan kontrol game yang intuitif. Tombol "Start" memulai permainan baru, tombol "Pause" menghentikan sementara permainan yang dapat dilanjutkan dengan tombol "Resume", dan tombol "Restart" memungkinkan pemain untuk memulai ulang kapan saja.
* **Responsive Design:** Desain aplikasi telah dioptimalkan agar elemen UI dan tata letak game menyesuaikan secara otomatis. Hal ini memastikan pengalaman bermain yang optimal dan nyaman di berbagai ukuran layar perangkat, mulai dari desktop, tablet, hingga ponsel pintar.

## Setup Instructions
Untuk menjalankan proyek NihonMatch secara lokal di komputer Anda:

1.  **Clone the repository:**
    Buka terminal atau command prompt Anda, lalu jalankan perintah berikut:
    ```bash
    git clone [https://github.com/lvkimm/NihonMatch.git](https://github.com/lvkimm/NihonMatch.git)
    ```

2.  **Navigate to the project directory:**
    Masuk ke folder proyek yang baru saja di-clone:
    ```bash
    cd NihonMatch
    ```

3.  **Open `index.html`:**
    Karena ini adalah aplikasi front-end murni, Anda tidak memerlukan server lokal. Cukup buka file `index.html` langsung di browser web favorit Anda (misalnya, Google Chrome, Mozilla Firefox).

## AI Support Explanation
Selama fase pengembangan proyek NihonMatch, **IBM Granite** digunakan secara strategis untuk meningkatkan efisiensi dan kualitas *coding*. Meskipun AI tidak diintegrasikan ke dalam produk akhir yang dimainkan oleh pengguna, perannya sebagai asisten cerdas sangat signifikan:

* **Generasi Kode *Boilerplate*:** IBM Granite membantu menghasilkan struktur dasar HTML untuk *game board* dan elemen kartu, serta kerangka CSS untuk tata letak grid kartu dan efek flip. Ini mempercepat *setup* awal proyek secara signifikan.
* **Optimisasi Logika JavaScript:** AI digunakan untuk mendapatkan saran algoritma pengacakan kartu (`shuffleArray`) dan mengoptimalkan logika perbandingan kartu (`checkMatch`), memastikan fungsionalitas game berjalan efisien dan bebas *bug*.
* **Peningkatan UI/UX:** IBM Granite turut berkontribusi dalam implementasi dinamis pesan-pesan di antarmuka pengguna, seperti menampilkan pesan "がんばれ！" di awal permainan atau "おめでとうございます！" saat kemenangan, yang menambah sentuhan personal dan interaktif.
* **Bantuan Dokumentasi:** AI juga membantu dalam penyusunan poin-poin penting dan kerangka untuk file `README.md` proyek ini, memastikan dokumentasi yang komprehensif dan jelas sesuai dengan standar proyek.

Penggunaan IBM Granite secara langsung berkontribusi pada **pengurangan waktu pengembangan** secara signifikan, terutama untuk tugas-tugas berulang dan pembuatan kode *boilerplate*. Hal ini memungkinkan saya untuk lebih berfokus pada detail *user experience*, penyempurnaan desain visual, dan fitur-fitur unik game, alih-alih terjebak pada tugas *coding* dasar.
