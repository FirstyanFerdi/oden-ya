# 🍢 Kedai Oden - Berteduh dari Hujan (Oden-ya Ameyadori)

Game simulasi manajemen kedai oden malam hari bergaya *retro pixel art* dengan suasana hujan hangat, audio ASMR, cerita curhat pelanggan, dan mekanik memasak mendalam — dibuat dengan **React + Vite + HTML5 Canvas**.

---

## 🚀 Cara Menjalankan (Setelah Clone)

### 1. Clone & Masuk ke Folder:
```bash
git clone https://github.com/USERNAME/NAMA_REPO.git
cd NAMA_REPO
```

### 2. Jalankan Permainan:

#### Opsi A: Sekali Klik (Pengguna Windows)
Cukup klik dua kali berkas **[dev.bat](dev.bat)**. Script ini otomatis mendeteksi dan memasang dependensi jika belum ada, lalu langsung menyalakan server game.

#### Opsi B: Lewat Terminal / Linux / macOS
```bash
# Pasang dependensi (hanya saat pertama kali clone):
npm install
# (atau gunakan: yarn install / pnpm install)

# Jalankan server pengembangan:
npm run dev
```

### 3. Buka di Peramban:
Buka browser (Chrome / Edge / Firefox) di: **[http://localhost:5173](http://localhost:5173)**

---

## ✨ Fitur-Fitur Permainan

### 1. 🍲 Panci Oden 4 Sekat Fisik & Waktu Kematangan (*Real-Time Simmering*)
- Panci tembaga terbagi dalam 4 kompartemen:
  - **Sekat 0**: Sayuran (*Lobak & Konnyaku*)
  - **Sekat 1**: Olahan Laut (*Chikuwa & Sate Gurita*)
  - **Sekat 2**: Daging (*Urat Sapi*)
  - **Sekat 3**: Telur, Mochi & Tahu (*Telur, Mochi Kinchaku, Tahu Goreng*)
- **Tingkat Kematangan Waktu Nyata**:
  - `0 - 5 dtk`: *Mentah* (Pengali kepuasan x0.6)
  - `5 - 18 dtk`: *Matang Pas* (Pengali kepuasan x1.0)
  - `18 - 40 dtk`: *⭐ Rebusan Emas!* (Pengali kepuasan x1.5, efek bersinar kilau keemasan & tip berlipat!)
  - `> 40 dtk`: *Terlalu Lembek* (Pengali kepuasan x0.75)
- Pemain mengambil bahan matang langsung dari sekat panci ke piring saji, serta dapat memasukkan bahan mentah dari persediaan stok.

### 2. 🛒 Pasar Grosir Pagi & Manajemen Stok Harian
- Pilihan bahan oden membutuhkan stok fisik (`stock`).
- **Harga Pasar Dinamis**: Setiap hari baru, harga pasokan bahan di pasar grosir berfluktuasi (-20% s/d +20%).
- Pemain berbelanja stok per 5 porsi melalui menu **🛒 Pasar & Panci**.

### 3. 📻 Pemutar Kaset Radio Lo-Fi Multi-Genre
Radio antik di kedai memiliki 4 kaset pita yang dapat diputar secara bebas:
- 🎷 **Rainy Night Jazz**: Akord piano melankolis (disukai Pak Gimin).
- 🌃 **Showa City Pop**: Synthesizer 80-an ceria retro (disukai Detektif Kenzo).
- 🪕 **Old Temple Shamisen**: Petikan dawai tradisional Jepang (disukai Nenek Sumi).
- ☕ **Cozy Lo-Fi Beats**: Ketukan santai penenang stres (disukai Hana).
- *Efek Khusus*: Memutar kaset yang sesuai selera tamu menambah kesabaran menunggu mereka sebesar +6 detik!

### 4. 🥣 Racikan Kaldu Dashi Harian
Pemain dapat menentukan jenis kaldu harian sebelum melayani tamu:
- 🥣 **Kombu & Shoyu Klasik**: Rasa gurih seimbang (Kepuasan umum +10%).
- 🌶️ **Kaldu Tulang Sapi Pedas**: Rebusan rempah pedas (Penjualan daging +25%).
- 🍲 **Kaldu Miso Manis Menghangatkan**: Menghangatkan tubuh (Kesabaran tamu +5 dtk saat hujan deras).

### 5. 📖 Curhat & Dialog Bercabang dengan Pilihan Nasihat
Tamu langganan unik memiliki kisah hidup bertahap:
- **👔 Pak Gimin** (*Pegawai Kantor Lelah*): Pegawai lembur yang merindukan impian masa mudanya.
- **🎒 Hana** (*Siswi Perantau*): Pelajar yang cemas akan masa depan dan ujian perguruan tinggi.
- **🕵️ Detektif Kenzo** (*Penyelidik Malam*): Penyelidik jalanan yang menyukai kuah oden pedas.
- **👵 Nenek Sumi** (*Penghuni Kota Tua*): Pelanggan sepuh penyimpan nostalgia kota tua.
- **Pilihan Respon Nasihat**: Saat mereka curhat, pilih respon nasihat terbaikmu untuk menentukan kedekatan hubungan (*Affinity*) dan hadiah peningkatan kedai yang tercatat di **📖 Jurnal**.

### 6. 🏮 Kustomisasi & Dekorasi Kedai
Gunakan keuntungan kedai untuk mendekorasi warung:
- **Tirai Noren**: Merah Klasik, Biru Indigo Ombak Laut, atau Putih Zen Elegan.
- **Pajangan Meja**:
  - *Patung Maneki-neko*: Menambah uang tip +15%.
  - *Vas Bunga Krisan*: Menambah kesabaran tamu +5 detik.

### 7. 🐱 Kuro si Kucing Berteduh
- Kucing hitam jalanan yang berteduh di dalam kotak kardus kecil di samping kedai.
- Pemain bisa membelai atau memberinya makan potongan oden (¥50) untuk menaikkan poin persahabatan (♥).
- Saat mencapai level 3 ke atas, Kuro akan duduk santai di pojok meja kedai sebagai maskot penarik pelanggan langganan.

### 8. 🔥 Rantai Kombo & FEVER MODE (3x Pendapatan)
- **Kombo Kecepatan & Kematangan Emas**: Menyajikan pesanan dengan kepuasan tinggi secara beruntun mengaktifkan rantai `COMBO x2`, `COMBO x3`, dst.
- **⚡ FEVER MODE**: Saat kombo mencapai x3, kedai memasuki mode demam emas selama 16 detik!
  - Penjualan makanan dan uang tip berlipat **3x lipat**!
  - Efek visual layar berpendar keemasan dinamis dan partikel bintang gemerlap.
  - Efek audio petikan nada kombo bertingkat dan jingle pemicu yang mendebarkan.

### 9. 📖 Buku Resep Rahasia & Fusion Dex
- Bereksperimen dengan kombinasi bahan dan bumbu dalam satu piring untuk mengungkap menu rahasia legendaris:
  - 🌸 *Haru-Ichiban* (Lobak + Mochi + Daun Bawang): Bonus +¥280
  - 🏮 *Last Train Oden* (Urat Sapi + Chikuwa + Karashi): Bonus +¥350
  - 🌊 *Midnight Tide* (Gurita + Telur + Ocha Hangat): Bonus +¥420
  - 🏯 *Mangkuk Biara Zen Kuno* (Tahu + Konnyaku + Daun Bawang): Bonus +¥250
  - 🐉 *Dragon Stamina* (Urat Sapi + Gurita + Karashi): Bonus +¥550
  - 👑 *Rebusan Emas Kaisar* (Lobak + Telur + Mochi + Daun Bawang): Bonus +¥650
- Catatan resep yang berhasil ditemukan dapat dicek di menu **📖 Resep**.

### 10. 🗺️ Peta Kota & Relokasi Gerobak Oden
Tingkatkan reputasi kedaimu untuk berpindah ke distrik kota yang lebih ramai dan menguntungkan:
- 🏮 **Gang Stasiun Kereta Tua**: Lokasi awal (Pengali 1.0x).
- 🌸 **Tepi Kanal Bunga Sakura (Meguro)**: Terbuka pada Reputasi ★35, kelopak bunga sakura berguguran ditiup angin malam (Pengali harga 1.25x, tip 1.2x).
- 🌃 **Distrik Lampu Neon Kota (Shinjuku)**: Terbuka pada Reputasi ★75, reklame neon gemerlap dan pelanggan boros (Pengali harga 1.5x, tip 1.5x).

### 11. 🍶 Minigame Tuang Sake Hangat (Atsukan Pouring)
- Tamu kedai sewaktu-waktu meminta sajian sake hangat beruap (*Atsukan*).
- Tahan tombol tuang dan lepas tepat pada **Zona Hijau (70% - 88%)** botol keramik Tokkuri untuk mendapatkan tip ekstra hingga **+¥180**!

### 12. 👥 Manajemen & Rekrut Asisten Kedai
Pekerjakan asisten kedai melalui menu **🏪 Toko & Staf**:
- 👦 **Kenji (Anak Magang)**: Mengisi ulang bahan mentah dari persediaan pasar ke sekat panci secara otomatis saat panci kosong.
- 🎸 **Nona Aoi (Penyanyi Jalanan)**: Petikan gitarnya menenangkan tamu, menurunkan laju berkurangnya kesabaran tamu sebesar 30%.

### 13. 🐉 Tamu Spesial VIP Boss & Kritikus Michelin
- **Tuan Ryu (Bos Yakuza)**: Tamu yang tidak sabaran (14 dtk) menginginkan oden daging terpanas dengan Karashi ekstra. Hadiah: +¥4,500 dan Reputasi +12.
- **Nyonya Vivienne (Kritikus Michelin)**: Tamu peminta teka-teki cita rasa samudra dingin dengan teh ocha hangat. Hadiah: +¥3,000 dan Reputasi +15.

### 14. 🎆 Peristiwa Acak & Malam Festival Kembang Api
- **Kakek Pengembara**: Datang kelaparan tanpa uang; jika dibantu secara cuma-cuma, karma baik akan membalas di kemudian hari.
- **Malam Festival Kembang Api**: Terjadi setiap kelipatan Hari ke-5. Langit malam dihiasi kembang api dan kedatangan tamu meningkat 2x lipat!

### 15. ⏰ Siklus Jam Kedai & Laporan Penutupan Harian
- Jam kedai berputar mulai **17:00 sore** hingga **02:00 dini hari**.
- Pada pukul 02:00, kedai otomatis tutup dan menampilkan **Rangkuman Laba Harian** (jumlah tamu terlayani, pendapatan kotor, uang tip kepuasan, dan total kas).
- Dinamika cuaca yang berganti tiap hari: *Gerimis Hangat*, *Hujan Deras* (dengan petir), dan *Angin Malam*.

### 17. 🍢 Sub-Stasiun Panggangan Sate Yakitori & Arang Binchotan
- Di samping panci rebusan oden, kini terdapat panggangan arang tradisional Shichirin dengan 3 slot tusukan sate waktu nyata.
- **Menu Sate Malam**: *Yakitori Negima* (Paha Ayam + Daun Bawang), *Tsukune Tare* (Bakso Ayam), dan *Shiitake Butter*.
- **Interaksi Memasak**: Balik tusukan sate pada timing pas, olesi saus manis gurih (*Tare Glaze*), dan raih status *⭐ Karamel Emas* (+¥100 per tusuk). Jangan sampai gosong!
- **Aroma Asap Sate**: Asap harum bakaran sate menenangkan tamu yang sedang menunggu antrean di kedai.

### 18. 🐟 Minigame Lelang Subuh Pasar Ikan Tsukiji
- Buka sesi lelang subuh melawan Chef Kuroda dan Tuan Tanaka untuk mengamankan bahan langka grade S-Tier:
  - 🐙 *Gurita Raksasa Hokkaido Grade A* (Pengali harga pesanan gurita melonjak 2.5x lipat).
  - 🥩 *Urat Sapi Wagyu A5 Matsusaka* (Pengali harga pesanan daging sapi melonjak 3.0x lipat).
  - 🌿 *Kombu Liar 10 Tahun* (Meningkatkan kepuasan kaldu dashi +30%).
- Pasang tawaran bid tepat waktu sebelum palu juru lelang diketuk 3 kali!

### 19. ⛈️ Dinamika Cuaca Ekstrem & Insiden Malam Hari
- 🌀 **Malam Topan Badai**: Angin kencang menggoyang tenda. Kencangkan terpal yang bocor dengan tombol darurat `🛠️ Kencangkan Terpal!` untuk mendapatkan tip dobel 2x dari tamu yang berteduh.
- ❄️ **Malam Salju Pertama**: Butiran salju turun di layar. Suhu udara dingin mendinginkan panci; tekan `🔥 Tambah Arang Kompor` untuk menjaga kuah tetap di titik kematangan emas.
- ⚡ **Insiden Mati Lampu Kota**: Pemadaman listrik distrik membuat kedai gelap gulita. Nyalakan lilin antik meja (`🕯️ Nyalakan Lilin Meja`) untuk menciptakan suasana intim ASMR yang memicu curhat rahasia pelanggan.

### 20. 🎴 Ramalan Nasib Pelanggan Showa (Omikuji)
- Kocok tabung bambu dan tarik bilah ramalan kayu untuk tamu kedai:
  - 🌟 *Daikichi (大吉)*: Keberuntungan besar, tip tunai instan +¥260 & Reputasi +5!
  - 🌸 *Chukichi (中吉)*: Berkah damai, kedekatan cerita (Affinity) +3.
  - ⚡ *Kyo (凶)*: Ujian hidup, berikan nasihat tulus untuk menjadikan mereka pelanggan setia seumur hidup (+30% tip selamanya).

### 21. 🏆 Inspeksi Samaran & Sertifikat Bintang Michelin
- Tamu misterius *Pak Masaru* datang menyamar sebagai pelanggan biasa tanpa atribut khusus.
- Sajikan semangkuk oden dashi murni dengan kematangan rebusan emas untuk membuka identitasnya sebagai Inspektur Michelin!
- Raih **Plakat Emas Michelin** (Bintang 1 s/d 3) yang terpajang di dinding belakang kedai pada canvas render, mendatangkan tamu mancanegara kaya yang membayar hingga 1.8x lipat.

### 22. 💾 Penyimpanan Otomatis (Auto-Save)
- Seluruh progres permainan (saldo uang, reputasi, level kedai, stok bahan, sate panggangan, buff lelang S-tier, bintang Michelin, peralatan, staf, resep terbuka, lokasi aktif, cerita karakter, hari, kaldu, dekorasi, kaset, dan persahabatan kucing) otomatis tersimpan di `localStorage` peramban.

---

## 🎮 Cara Bermain

1. **Persiapan Pagi/Sore**:
   - Buka menu **🛒 Pasar & Panci** untuk mengecek harga pasar, membeli stok bahan, memilih jenis kaldu, dan memastikan sekat panci sudah terisi bahan rebusan.
   - Buka menu **🐟 Lelang Tsukiji** untuk mengikuti perang lelang bahan langka S-Tier.
   - Buka menu **🗺️ Peta** untuk berpindah distrik kota yang telah terbuka.
   - Buka menu **📻 Radio** untuk memutar kaset pita favoritmu.
   - Buka menu **🏪 Toko & Staf** untuk memperbesar kapasitas panci dan merekrut asisten.
2. **Memasuki Kedai**: Klik pada gerobak/tenda kedai untuk masuk.
3. **Melayani Tamu & Menjaga Kombo**: Saat tamu duduk di kursi, **klik tamu tersebut** untuk membuka panci oden.
4. **Mengambil Bahan Matang & Sate Bakar**:
   - Perhatikan pesanan tamu dan permintaan bumbu tambahannya.
   - Ambil bahan yang sudah **Matang Pas** atau **⭐ Rebusan Emas** dari sekat panci.
   - Buka panggangan sate untuk memanggang, membalik, dan mengoles saus tare sate yakitori.
   - Tambahkan bumbu pelengkap jika diminta (Karashi, Daun Bawang, Teh Ocha).
   - Jika tamu meminta sake hangat, klik tombol minigame **🍶 Tuang Sake** dan lepas tepat di zona hijau.
   - Jika tamu ingin diramal, klik **🎴 Ramalkan Nasib (Omikuji)**.
   - Klik **🍲 Sajikan ke Tamu!**.
   - Layani tamu berturut-turut untuk memicu **⚡ FEVER MODE (3x Uang)**!
5. **Mendengarkan Curhat**: Jika pesanan memuaskan, dengarkan curhat tamu dan pilih nasihat bijakmu.
6. **Menutup Hari**: Layani tamu hingga pukul 02:00, periksa laporan laba harianmu, lalu klik *☀️ Mulai Hari Berikutnya*.

---

## 📂 Struktur Berkas

- [src/grill.js](src/grill.js) – Sub-stasiun panggangan sate yakitori, status bakar, balik sate, oles saus tare, dan bonus karamel emas.
- [src/auction.js](src/auction.js) – Minigame lelang subuh Pasar Ikan Tsukiji, bot penawar saingan, dan bahan grade S-Tier.
- [src/fortune.js](src/fortune.js) – Sistem ramalan nasib pelanggan Showa (Omikuji Daikichi, Chukichi, Kyo).
- [src/recipes.js](src/recipes.js) – Daftar 6 resep kombinasi rahasia (*Fusion Dex*), deteksi kecocokan piring, dan bonus harga.
- [src/locations.js](src/locations.js) – Sistem 3 distrik peta kota (Stasiun, Meguro Sakura, Shinjuku Neon) beserta pengali harga dan tip.
- [src/audio.js](src/audio.js) – Mesin synthesizer Web Audio API dengan 4 genre kaset radio, jingle FEVER MODE, kombo berjenjang, desis yakitori, palu lelang, dan omikuji.
- [src/characters.js](src/characters.js) – Profil karakter unik, sistem dialog bercabang dengan pilihan respon, VIP Boss (Tuan Ryu & Vivienne), dan Inspektur Michelin Masaru.
- [src/decorations.js](src/decorations.js) – Definisi racikan kaldu dashi, tirai noren, mangkuk, dan pajangan meja.
- [src/game.js](src/game.js) – Logika inti: panggangan yakitori, lelang, omikuji, kombo, FEVER MODE, minigame sake, panci 4 sekat, timer kematangan, pasar stok, staf, siklus jam, dan auto-save.
- [src/render.js](src/render.js) – Mesin perender Canvas 320×180, panggangan sate arang, plakat emas Michelin di dinding, salju, topan badai, efek mati lampu lilin, lampion, kucing Kuro, dan kembang api festival.
- [src/App.jsx](src/App.jsx) – Antarmuka pengguna React lengkap dengan modal Panggangan Yakitori, Lelang Tsukiji, Ramalan Omikuji, Recipe Dex, Peta Kota, Minigame Sake, Rekrut Staf, Radio, Dekorasi, dan Jurnal.
- [src/styles.css](src/styles.css) – Seluruh gaya tampilan retro pixel art modern, animasi pendar FEVER, botol sake, bar lelang, dan tata letak responsif.
- [proses.md](proses.md) – Riwayat lengkap analisis masalah, rancangan arsitektur, dan log perubahan fitur dari Tahap 1 hingga Tahap 4.

