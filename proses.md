# Log Proses Pengembangan: Kedai Oden (Oden-ya Ameyadori)

Dokumen ini mencatat seluruh proses analisis, perbaikan sistem, dan implementasi fitur lanjutan yang dilakukan pada proyek **Kedai Oden - Berteduh dari Hujan**.

---

## 1. Fase Diagnosis & Pemulihan Sistem Awal

### Kendala: Proyek Tidak Bisa Berjalan
- **Gejala**: Pengguna melaporkan `ini gak bisa jalan gimana`.
- **Penyebab**:
  1. Folder dependensi `node_modules` belum terpasang.
  2. Perintah `npm install` mengalami galat internal package manager lokal sistem.
- **Solusi**:
  1. Menggunakan **Yarn via Corepack** (`corepack yarn install`) untuk memasang seluruh dependensi (`react`, `react-dom`, `vite`, `@vitejs/plugin-react`) secara bersih dan terisolasi.
  2. Menyediakan script eksekusi instan [dev.bat](dev.bat) agar pengguna di Windows bisa langsung menjalankan game cukup dengan klik dua kali.

---

## 2. Fase Lokalisasi Penuh ke Bahasa Indonesia

Seluruh aspek teks dalam permainan diterjemahkan ke Bahasa Indonesia yang ramah, hangat, dan alami:
- **Judul Web**: `Kedai Oden - Berteduh dari Hujan`
- **Menu Bahan Oden**:
  - `Lobak` (Daikon), `Telur` (Tamago), `Konnyaku`, `Chikuwa`, `Urat Sapi` (Gyusuji), `Mochi Kinchaku`, `Tahu Goreng` (Atsuage), `Sate Gurita` (Tako Kushi).
- **Status & Level Kedai**:
  - `Gerobak Kaki Lima` ➔ `Kedai Kecil` ➔ `Kedai Ramai` ➔ `Kedai Legendaris`
- **Antarmuka & Tombol**:
  - Petunjuk masuk, panel piring, tombol `Batal Satu`, `Tutup`, `Sajikan!`, status `Kecewa!`, dialog toko, dan spanduk kedai diperbarui menjadi tulisan piksel **`ODEN`**.

---

## 3. Fase Pengembangan Fitur Lanjutan: Tahap 1

1. **Audio Sintetis Prosedural (Web Audio API)** (`src/audio.js`):
   - Suara rintik hujan, lonceng bambu, desis kaldu mendidih, koin, meong kucing Kuro, dan akord musik lofi santai.
2. **Karakter Unik & Dialog Curhat** (`src/characters.js`):
   - Pak Gimin (*Pegawai Kantor Lelah*), Hana (*Siswi Perantau*), Detektif Kenzo (*Penyelidik Malam*), Nenek Sumi (*Penghuni Kota Tua*).
3. **Siklus Jam Kedai & Laporan Penutupan Harian**:
   - Jam berputar dari 17:00 sore s/d 02:00 dini hari, rekapitulasi laba dan tamu terlayani.
4. **Kondimen & Minuman Pelengkap**:
   - Mustard Karashi, Daun Bawang Iris, dan Teh Ocha Hangat.
5. **Kucing Kuro Maskot Kedai**:
   - Berteduh di kardus luar, bisa dibelai dan diberi makan oden (Friendship 1-10).

---

## 4. Fase Pengembangan Fitur Lanjutan: Tahap 2 (Sistem Kompleks & Mendalam)

### A. Panci Oden 4 Sekat Fisik & Waktu Kematangan Dinamis (*Interactive Simmering Pot*)
- **Sekat Kompartemen**:
  - Sekat 0: Sayuran (*Lobak & Konnyaku*)
  - Sekat 1: Olahan Laut (*Chikuwa & Sate Gurita*)
  - Sekat 2: Daging (*Urat Sapi*)
  - Sekat 3: Telur, Mochi & Tahu (*Telur, Mochi Kinchaku, Tahu Goreng*)
- **Tingkat Kematangan Waktu Nyata**:
  - `0 - 5 dtk`: *Mentah / Keras* (Pengali rasa x0.6)
  - `5 - 18 dtk`: *Matang Pas* (Pengali rasa x1.0)
  - `18 - 40 dtk`: *⭐ Rebusan Emas (Deep Simmer)* (Pengali rasa x1.5, efek bersinar kilau keemasan, tip berlipat!)
  - `> 40 dtk`: *Terlalu Lembek* (Pengali rasa x0.75)
- Pemain mengambil bahan matang langsung dari sekat panci ke piring saji, serta dapat merebus bahan mentah dari persediaan stok.

### B. Pasar Grosir Pagi & Manajemen Stok Harian (*Morning Market & Supply Chain*)
- Pilihan bahan kini membutuhkan stok fisik (`stock`).
- **Harga Pasar Dinamis**: Setiap hari baru, harga pasokan bahan di pasar grosir berfluktuasi (-20% s/d +20%).
- Pemain berbelanja stok per 5 porsi melalui menu **🛒 Pasar & Panci**.

### C. Pemutar Kaset Radio Lo-Fi Multi-Genre (`src/audio.js`)
- Radio antik kini memiliki 4 kaset pita yang dapat diganti sewaktu-waktu:
  1. 🎷 **Rainy Night Jazz**: Akord piano santai bernuansa melankolis (disukai Pak Gimin).
  2. 🌃 **Showa City Pop**: Synthesizer 80-an ceria retro (disukai Detektif Kenzo).
  3. 🪕 **Old Temple Shamisen**: Petikan dawai tradisional Jepang skala In-sen (disukai Nenek Sumi).
  4. ☕ **Cozy Lo-Fi Beats**: Ketukan santai penenang stres (disukai Hana).
- Memutar kaset yang sesuai selera tamu menambah kesabaran menunggu mereka sebesar +6 detik!

### D. Racikan Kaldu Dashi Harian (`src/decorations.js`)
- Pemain dapat memilih jenis kaldu harian:
  - 🥣 **Kombu & Shoyu Klasik**: Rasa gurih seimbang (Kepuasan umum +10%).
  - 🌶️ **Kaldu Tulang Sapi Pedas**: Rebusan rempah pedas (Penjualan daging +25%).
  - 🍲 **Kaldu Miso Manis Menghangatkan**: Menghangatkan tubuh (Kesabaran tamu +5 dtk saat hujan deras).

### E. Dialog Bercabang dengan Pilihan Respon Nasihat
- Saat karakter unik curhat, pemain diberikan 2-3 pilihan respon nasihat.
- Respon pemain menentukan:
  - Respon balasan dari tamu.
  - Poin kedekatan hubungan (*Affinity*).
  - Hadiah tip atau reputasi tambahan yang tercatat di Jurnal Kenangan.

### F. Kustomisasi & Dekorasi Kedai
- **Tirai Noren**: Pilihan tirai merah klasik, biru indigo ombak laut, atau putih Zen elegan.
- **Pajangan Meja**:
  - *Patung Maneki-neko*: Menambah uang tip +15%.
  - *Vas Bunga Krisan*: Menambah kesabaran tamu +5 detik.

### G. Peristiwa Acak & Malam Festival Kembang Api
- **Kakek Pengembara**: Muncul kelaparan tanpa uang; jika dibantu dengan cuma-cuma, karma baik akan membalas di kemudian hari.
- **Malam Festival Kembang Api**: Terjadi setiap kelipatan Hari ke-5. Efek kembang api warna-warni menyala di langit malam luar kedai dan kedatangan tamu meningkat 2x lipat (*Fever Rush Mode*)!

---

## 5. Catatan Perbaikan Bug & Kestabilan
- Memperbaiki perhitungan `dt` dan format waktu menit agar tidak bernilai `NaN`.
- Menambahkan inisialisasi default pada fungsi pemuatan simpanan (`loadSavedGame`) untuk mencegah galat properti tak terdefinisi (`dayStats`).
- Memperkuat fungsi pendaran cahaya canvas (`glow` & `fl`) dengan proteksi nilai non-finite.
- Memperbaiki kesalahan tanda kurung kurawal ekstra pada berkas `src/characters.js` yang sempat menggagalkan proses build rollup.

---

## 6. Pengembangan Tahap 3: Mekanisme Adiktif & Skala Kota (Phase 3)

Berdasarkan arahan untuk menjadikan gameplay lebih kompleks, adiktif, dan membuat ketagihan (*fast-paced flow state & addictive mechanics*), diterapkan ekspansi sistem berikut:

### A. Rantai Kombo & FEVER MODE (`src/game.js`, `src/render.js`, `src/styles.css`)
- **Kombo Saji Beruntun**: Menyajikan pesanan dengan kepuasan tinggi (bintang 3 / kematangan emas) secara berturut-turut menghasilkan rantai kombo (`COMBO x2`, `COMBO x3`, dst).
- **FEVER MODE (3x Pendapatan)**:
  - Dipicu saat kombo mencapai x3.
  - Berlangsung selama 16 detik dengan timer waktu nyata.
  - **Efek Permainan**: Seluruh penjualan makanan dan tip berlipat ganda 3x lipat!
  - **Efek Visual**: Bingkai kedai berpendar keemasan dinamis dan partikel bintang bersinar di layar.
  - Didukung efek audio pemicu dan petikan nada kombo bertingkat (`playFeverSound` & `playComboChime`).

### B. Buku Resep Rahasia & Fusion Dex (`src/recipes.js`)
- Sistem deteksi resep rahasia saat pemain menyajikan kombinasi bahan dan bumbu tertentu di satu piring:
  1. 🌸 **Mangkuk Musim Semi Haru-Ichiban**: Lobak + Mochi Kinchaku + Taburan Daun Bawang (+¥280).
  2. 🏮 **Oden Kereta Terakhir (Last Train Oden)**: Urat Sapi + Chikuwa + Karashi Ekstra Pedas (+¥350).
  3. 🌊 **Pesta Samudra Malam (Midnight Tide)**: Sate Gurita + Telur Rebus + Ocha Hangat (+¥420).
  4. 🏯 **Mangkuk Biara Zen Kuno**: Tahu Goreng + Konnyaku + Daun Bawang (+¥250).
  5. 🐉 **Kekuatan Naga Petarung (Dragon Stamina)**: Urat Sapi + Sate Gurita + Karashi Ekstra Pedas (+¥550).
  6. 👑 **Rebusan Emas Kaisar (Imperial Golden Oden)**: Lobak + Telur Rebus + Mochi Kinchaku + Daun Bawang (+¥650).
- Penemuan resep tercatat permanen di menu modal **📖 Resep** (Recipe Dex) lengkap dengan efek bonus dan ikon unik.

### C. Peta Kota & Relokasi Kedai (`src/locations.js`)
- Gerobak oden kini dapat berpindah ke 3 distrik kota yang berbeda seiring naiknya reputasi kedai:
  1. 🏮 **Gang Stasiun Kereta Tua**: Lokasi awal bernuansa nostalgia hujan (Pengali harga & tip 1.0x).
  2. 🌸 **Tepi Kanal Bawah Pohon Sakura (Meguro)**: Terbuka pada Reputasi ★35. Suasana romantis dengan kelopak bunga sakura berterbangan di udara (Pengali harga 1.25x, tip 1.2x).
  3. 🌃 **Distrik Lampu Neon Kota (Shinjuku)**: Terbuka pada Reputasi ★75. Suasana gemerlap papan reklame neon dan tamu-tamu kaya berkantong tebal (Pengali harga 1.5x, tip 1.5x).

### D. Minigame Tuang Sake Hangat (Atsukan Pouring)
- Tamu kedai sewaktu-waktu memiliki keinginan memesan sake panas (`wantsSake`).
- Menekan tombol sake membuka minigame interaktif: pemain menahan tombol untuk menuang sake ke botol keramik Tokkuri.
- Pemain harus melepaskan tuangan tepat pada **Zona Hijau (70% - 88%)**.
- **Hasil Tuangan**:
  - *Tuangan Sempurna*: Hadiah tip seketika +¥180 dan suara denting gelas sukses (`playSakeSuccess`).
  - *Cukup Baik*: Tip +¥75.
  - *Tumpah Berceceran*: Kesabaran tamu berkurang sedikit.

### E. Manajemen Staf & Asisten Kedai (`src/game.js`, `src/App.jsx`)
- Tab baru **👥 Rekrut Asisten** di dalam Toko Kedai:
  1. 👦 **Kenji (Anak Magang Pasar)**: Membantu mengisi ulang bahan mentah dari persediaan stok ke sekat panci secara otomatis saat panci kosong (Biaya rekrut: ¥800).
  2. 🎸 **Nona Aoi (Penyanyi Jalanan)**: Duduk di samping kedai sambil memetik gitar akustik, membuat suasana rileks dan memperlambat laju ketidaksabaran tamu sebesar 30% (Biaya rekrut: ¥1200).

### F. Tamu Spesial VIP Boss & Kritikus Michelin (`src/characters.js`)
- **🐉 Tuan Ryu (Bos Yakuza Kota Malam)**:
  - Memiliki waktu kesabaran sangat cepat (14 dtk) dan menuntut oden daging bersuhu panas dengan Karashi membakar lidah.
  - Berhasil menyajikan memberinya kepuasan tinggi dengan imbalan fantastis: +¥4,500 dan Reputasi +12!
- **🎩 Nyonya Vivienne (Kritikus Panduan Michelin)**:
  - Memberikan dialog teka-teki cita rasa samudra dingin dengan teh penenang.
  - Menyajikan kombinasi gurita, konnyaku, dan teh ocha memberinya imbalan +¥3,000 dan ulasan berbintang Reputasi +15!

### G. Uji Verifikasi & Kestabilan Browser
- Seluruh fitur diuji secara interaktif melalui simulasi browser:
  - Verifikasi pembukaan Recipe Dex, Peta Kota, Tab Rekrut Staf Toko, dan interior kedai.

---

## 7. Pengembangan Tahap 4: Sistem Memasak Ganda, Lelang Tsukiji, Cuaca Ekstrem, Ramalan Omikuji & Bintang Michelin (Phase 4)

Pengembangan skala besar untuk menghadirkan gameplay yang lebih mendalam, dinamis, dan sangat adiktif (*multi-tasking loop*):

### A. Sub-Stasiun Panggangan Sate Yakitori & Arang Binchotan (`src/grill.js`)
- Menghadirkan panggangan arang tradisional Shichirin di samping meja koki dengan 3 slot tusukan sate waktu nyata.
- **Menu Sate Malam**:
  1. 🍢 *Yakitori Negima* (Paha Ayam + Daun Bawang) - Modal ¥35, Jual ¥120.
  2. 🍡 *Tsukune Tare* (Bakso Ayam Saus Manis Gurih) - Modal ¥45, Jual ¥150.
  3. 🍄 *Shiitake Butter* (Jamur Shiitake Mentega Shoyu) - Modal ¥30, Jual ¥110.
- **Mekanik Timing Panggangan Interaktif**:
  - `0 - 5 dtk`: *Mentah*.
  - `5 - 11 dtk`: *Butuh Dibalik!* (Tombol `🔄 Balik Sate`).
  - `11 - 18 dtk`: *Oles Saus Tare!* (Tombol `🍯 Oles Saus Tare`).
  - `14 - 25 dtk`: *⭐ Karamel Emas!* (Sate matang sempurna, bonus harga +¥100 per tusuk, siap diambil ke piring saji).
  - `> 25 dtk`: *🔥 Gosong!* (Hangus, harus dibuang ke tempat sampah).
- **Efek Asap Harum**: Kepulan asap arang dari sate yang sedang dipanggang menenangkan tamu yang sedang menunggu antrean, memperlambat rasa tidak sabar mereka.

### B. Minigame Lelang Subuh Pasar Ikan Tsukiji (`src/auction.js`)
- Sesi lelang subuh melawan dua bot pedagang saingan: **Chef Kuroda (Restoran Ginza)** dan **Tuan Tanaka (Pedagang Pasar)**.
- **Bahan Grade S-Tier Langka**:
  1. 🐙 *Gurita Raksasa Hokkaido Grade A*: Pengali harga seluruh pesanan gurita melonjak 2.5x lipat!
  2. 🥩 *Urat Sapi Wagyu A5 Matsusaka*: Pengali harga pesanan daging urat sapi melonjak 3.0x lipat!
  3. 🌿 *Kombu Liar Pulau Rishiri 10 Tahun*: Aroma dashi legendaris yang memberikan kepuasan instan +30% pada semua tamu!
- **Sistem Bidding Waktu Nyata**:
  - Tombol pasang tawaran: `+¥50`, `+¥100`, dan `⚡ +¥200`.
  - Hitungan palu juru lelang: "Tawaran pertama... kedua... ketiga... SAH!".
  - Pemenang lelang mendapatkan pasokan 10 porsi bahan S-Tier yang langsung aktif di dapur kedai.

### C. Dinamika Cuaca Ekstrem & Insiden Malam Hari
- **🌀 Malam Topan Badai (*Typhoon Night*)**: Angin kencang menderu, terpal tenda kedai berguncang di canvas dan berpeluang lepas/bocor. Pemain menekan tombol darurat `🛠️ Kencangkan Terpal!`. Tamu yang nekat berteduh memberikan uang tip berlipat 2x!
- **❄️ Malam Salju Pertama (*First Snowfall*)**: Butiran salju putih halus berjatuhan di canvas luar dan menumpuk di atap kedai. Suhu dingin mendinginkan kompor panci; pemain menekan tombol `🔥 Tambah Arang Kompor` untuk menjaga suhu rebusan tetap di titik emas.
- **⚡ Insiden Mati Lampu Kota (*City Blackout*)**: Listrik distrik kota padam mendadak! Kedai menjadi gelap gulita bernuansa biru pekat. Pemain menyalakan lilin antik meja (`🕯️ Nyalakan Lilin Meja`) dengan pendaran cahaya radial yang hangat. Suasana hening ASMR membuat tamu membuka rahasia hati terdalam mereka.

### D. Ramalan Nasib Pelanggan Showa (*Omikuji Fortune Telling - src/fortune.js*)
- Tamu yang makan dapat diramalkan peruntungannya melalui kocokan tabung bambu dan bilah ramalan kayu:
  1. 🌟 **Daikichi (大吉 - Keberuntungan Luar Biasa)**: Tamu bersorak gembira, langsung memberikan uang tip tunai instan +¥260 dan reputasi +5.
  2. 🌸 **Chukichi (中吉 - Berkah Bertahap)**: Tamu merasa sangat damai, kedekatan karakter (Affinity) naik +3.
  3. ⚡ **Kyo (凶 - Ujian Hidup & Peringatan)**: Pemilik kedai memberikan nasihat bijak penghibur hati, membuat tamu menjadi pelanggan setia seumur hidup (+30% tip selamanya).

### E. Inspeksi Samaran & Sertifikat Bintang Michelin
- **Tamu Inspektur Samaran (*Pak Masaru*)**: Datang berpakaian jas abu-abu biasa tanpa identitas mencolok. Memesan kombinasi oden klasik murni.
- Jika disajikan dengan kematangan oden *⭐ Rebusan Emas* dan kuah dashi sempurna, ia mengungkap identitasnya sebagai inspektur Michelin!
- Memberikan **Sertifikat Plakat Emas Michelin** yang otomatis terpajang di dinding belakang kedai pada canvas render, mendatangkan tamu mancanegara kaya yang membayar pesanan dengan pengali harga hingga 1.8x lipat!


