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

### 22. 🍲 Sistem Kuali Biang Kaldu Induk & Fermentasi Berumur
- Mengelola kuali besar di samping meja koki dengan 4 racikan master: *Katsuobushi Grade A*, *Niboshi Teri Bakar*, *Mirin & Gula Tebu*, dan *Shoyu Vintage 10 Tahun*.
- **Mekanik Umur Kaldu Harian (*Aging Vat*)**:
  - *Hari ke-1*: Kaldu Segar (Standar).
  - *Hari ke-3*: **⭐ Biang Kaldu Emas 3 Hari** (Harga sajian x1.45 lipat dan kepuasan +20%).
  - *Hari ke-7*: **👑 Biang Kaldu Pusaka 7 Hari** (Harga sajian oden x2.2 lipat dan kepuasan +35%).
- Aksi rutin `Saring Busa & Abu Kaldu` untuk menjaga kejernihan kuah dan mencegah kaldu menjadi basi.

### 23. 🧠 Psikologi & Mood Adaptif Tamu (Resonansi Katarsis & Pusaka)
- Setiap tamu memiliki **Kondisi Jiwa / Mood Dinamis**: 💔 *Patah Hati*, 💼 *Lelah Lembur*, 🌧️ *Nostalgia Masa Kecil*, atau 💢 *Tegang & Emosional*.
- **Sapaan Empati Koki**: Koki memilih nada sapaan lembut, semangat, nostalgia, atau ketenangan batin.
- **Efek Katarsis Emosional**: Jika sapaan + alunan kaset radio + kaldu cocok dengan suasana hati tamu, tamu mengalami katarsis emosional mendalam! Meneteskan air mata bahagia, harga sajian x1.5 lipat, dan berpeluang menghadiahi **Barang Pusaka Bersejarah Showa**:
  - ⏱️ *Jam Saku Showa 1972*: Durasi Fever Mode +5 detik permanen!
  - 🥢 *Tusuk Konde Perak*: Reputasi kedai naik +25% permanen!
  - 🪙 *Koin Kuno 100 Yen Perak*: Belanja bahan di pasar diskon 15% permanen!
  - 🖋️ *Pena Tinta Emas Pujangga*: Setiap dialog cerita tamu memberi bonus uang +¥200!

### 24. 🔪 Minigame Pisau Dapur Presisi Siang Hari
- Latih ketangkasan koki dengan 3 teknik pisau presisi: *Keratan Berlian Lobak Daikon*, *Ikatan Tali Kanpyo Kinchaku*, dan *Tusukan Spiral Sate Yakitori*.
- Tebas pisau tepat pada **Zona Emas Tengah** (*Sweet Spot*) untuk meraih kualitas **Masterwork Cut (Bintang Koki)** yang matang 35% lebih cepat dan bernilai harga jual tinggi.

### 25. ☎️ Pesanan Telepon Putar & Bento Antar Sepeda
- Telepon meja antik berdering *Kringgg!*, menerima pesanan bento dari Pos Polisi Stasiun, Rumah Sakit Showa, atau Studio Radio Malam.
- Kemas 3 oden pilihan ke dalam kotak bento kayu bertermometer (suhu panas berangsur turun).
- Kirim staf Kenji mengayuh sepeda onthel melintasi jalanan malam untuk mengantar pesanan sebelum kuahnya mendingin! Tiba dalam kondisi panas ($\ge 65^\circ\text{C}$) melipatgandakan uang tip dan reputasi distrik.

### 26. 🏮 Intrik Jalanan: Klan Yakuza, Inspektur Sanitasi, & Gerobak Saingan
- **Klan Yakuza Kurogane**: Bos mafia malam Ryuzo mampir; pelayanan hormat memberi perlindungan preman malam.
- **Inspektur Sanitasi Hokenjo Tokyo (Inspektur Kato)**: Pemeriksaan kebersihan kuali, kestabilan api kompor, dan ketiadaan sate gosong. Lolos inspeksi memberi **Sertifikat Higienis Bintang 5** (bebas pajak distrik, +15% pendapatan).
- **Gerobak Saingan "Yamada-ya"**: Gerobak saingan buka di seberang jalan mencoba merebut pengunjung dengan potongan harga. Lawan dengan aroma panggangan sate, lampion terang, dan atraksi tuang sake!

### 27. 🍂 Siklus 4 Musim Dinamis & Warta Pasar Komoditas
- Musim berganti setiap 7 hari kedai: 🌸 *Musim Semi (Haru)*, 🍧 *Musim Panas (Natsu)*, 🍁 *Musim Gugur (Aki)*, dan ❄️ *Musim Dingin (Fuyu)*.
- Masing-masing musim menghadirkan bahan eksklusif: *Rebung Bambu Muda (Takenoko)*, *Es Serut Sirup Melon (Kakigori)*, *Jamur Matsutake Liar*, dan *Capit Kepiting Salju (Kani Claw)*.
- Warta berita pasar komoditas harian yang membuat harga bahan naik-turun drastis (panen raya vs badai laut), membuka kesempatan menimbun stok (*stockpiling*).

### 28. 🌙 Modus Rahasia Tengah Malam: "Shinya Shokudo" (02:00 – 05:00)
- Tepat pukul 02:00 dini hari, pemain bebas memilih **Tutup Kedai & Tidur** atau **Buka Shinya Shokudo (02:00 - 05:00 Dini Hari)**.
- Layar berubah bernuansa tematik malam ungu kebiruan dengan lampion ungu spesial "深夜".
- Tamu nokturnal misterius (Detektif Kenzo, Mangaka Eiji, Aktris Sayuri, Pak Goro) memesan menggunakan **Teka-Teki Puitis (*Poetic Riddles*)**.
- Tebakan bahan yang tepat dihadiahi uang tunai ribuan Yen, lonjakan reputasi, dan pembukaan foto polaroid nostalgia.

### 29. 🔥 Duel Kuliner Terbuka vs Yamada-ya (Cook-Off Turf War)
- Pertarungan 3 babak langsung di hadapan juri warga distrik:
  - *Babak 1*: Adu Harum Kaldu (*Aroma Clash*).
  - *Babak 2*: Adu Kecepatan Membalik Sate Yakitori (*Speed Grilling*).
  - *Babak 3*: Harmoni Penjurian Akhir (*Kaiseki Plating*).
- Menang duel menganugerahkan hadiah tunai +¥3.500, +25 Reputasi, dan **Monopoli Distrik 3 Hari** (pengunjung kedai melonjak 100%).

### 30. 📜 Pohon Keahlian Koki & Buku Silsilah Pusaka (Chef Mastery Skill Tree)
- Kumpulkan **Poin Keahlian Master** setiap melayani 4 tamu dengan puas.
- 4 Cabang Keahlian Showa:
  - 🔪 *Itamae (Pisau Emas)*: Goresan pisau ekstra stok & perebusan kilat pola wajik.
  - 💖 *Kokoro (Batin & Empati)*: Mata batin melihat mood tamu & resonansi katarsis berlipat.
  - 🔥 *Homura (Api & Arang)*: Toleransi panggangan sate tidak mudah gosong & kompor kebal dingin salju.
  - 🪙 *Akiudo (Bisnis & Relasi)*: Diskon belanja pasar 20% & magnet pemikat tamu VIP.

### 31. 🍱 Seni Tata Hidang Estetika Kaiseki & Album Foto Polaroid Nostalgia
- Penilaian harmoni estetika visual piring saji (Wabi-Sabi). Skor Kaiseki $\ge 80\%$ memberikan bonus nilai hidangan instan **+25%**.
- **Album Foto Polaroid Kenangan Showa**: Galeri 6 foto instan polaroid berbingkai retro vintage yang mengabadikan kisah emosional para tamu ikonik kedai.

### 32. 💾 Penyimpanan Otomatis (Auto-Save)
- Seluruh progres permainan (saldo uang, reputasi, level kedai, biang kaldu vat, stok bahan, pisau prep, sate panggangan, buff lelang S-tier, bintang Michelin, pusaka heirlooms, bento sepeda, sertifikat higienis, poin keahlian master, album polaroid, musim aktif, dan monopoli distrik) otomatis tersimpan di `localStorage` peramban.

---

## 🎮 Cara Bermain

1. **Persiapan Pagi/Sore**:
   - Buka menu **🛒 Pasar & Panci** untuk mengecek warta berita komoditas dan membeli stok bahan dengan harga diskon.
   - Buka menu **🍂 Musim** untuk memeriksa kalender musim aktif dan bahan eksklusifnya.
   - Buka menu **📜 Keahlian** untuk membuka ranting skill pohon keahlian master.
   - Buka menu **🐟 Lelang Tsukiji** untuk mengikuti perang lelang bahan langka S-Tier.
   - Buka menu **🗺️ Peta** untuk berpindah distrik kota yang telah terbuka.
   - Buka menu **📻 Radio** untuk memutar kaset pita favoritmu.
   - Buka menu **🏪 Toko & Staf** untuk memperbesar kapasitas panci dan merekrut asisten.
2. **Memasuki Kedai**: Klik pada gerobak/tenda kedai untuk masuk.
3. **Melayani Tamu & Menjaga Kombo**: Saat tamu duduk di kursi, **klik tamu tersebut** untuk membuka panci oden.
4. **Mengambil Bahan Matang & Sate Bakar**:
   - Perhatikan pesanan tamu, bumbu pelengkap, dan perhatikan skor **🍱 Harmoni Kaiseki** di piring saji.
   - Jika tamu meminta sake hangat, klik tombol minigame **🍶 Tuang Sake** dan lepas tepat di zona hijau.
   - Jika tamu ingin diramal, klik **🎴 Ramalkan Nasib (Omikuji)**.
   - Klik **🍲 Sajikan ke Tamu!**.
   - Layani tamu berturut-turut untuk memicu **⚡ FEVER MODE (3x Uang)**!
5. **Duel Kuliner**: Buka menu **🔥 Duel Yamada** untuk menantang gerobak saingan Yamada-ya demi memenangkan monopoli distrik 3 hari.
6. **Jam 02:00 Dini Hari**: Pilih **Tutup & Tidur** atau **Buka Shinya Shokudo** untuk melayani tamu teka-teki nokturnal hingga jam 05:00 subuh!

---

## 📂 Struktur Berkas

- [src/seasons.js](src/seasons.js) – Siklus 4 musim dinamis (Haru, Natsu, Aki, Fuyu), bahan musiman eksklusif, dan warta berita fluktuasi pasar komoditas.
- [src/midnight.js](src/midnight.js) – Modus rahasia tengah malam Shinya Shokudo (02:00 - 05:00), tamu nokturnal misterius, dan evaluasi teka-teki puitis.
- [src/cookoff.js](src/cookoff.js) – Duel kuliner jalanan terbuka melawan rival Yamada-ya (3 babak: Adu Aroma, Kecepatan Sate, dan Harmoni Kaiseki).
- [src/mastery.js](src/mastery.js) – Pohon keahlian master koki Showa (4 ranting: Itamae, Kokoro, Homura, Akiudo).
- [src/kaiseki.js](src/kaiseki.js) – Penilaian harmoni estetika visual piring saji Kaiseki dan album foto polaroid nostalgia Showa.
- [src/dashi.js](src/dashi.js) – Sistem kuali biang kaldu induk master, fermentasi umur kaldu (1, 3, 7 hari), saring busa kotoran, dan buff harga umami.
- [src/psychology.js](src/psychology.js) – Sistem psikologi & mood adaptif tamu (Patah Hati, Burnout, Nostalgia, Tegang), sapaan empati koki, katarsis emosional, dan 4 barang pusaka bersejarah.
- [src/knifeprep.js](src/knifeprep.js) – Minigame pisau dapur presisi siang hari: keratan berlian Daikon, ikatan simpul Kinchaku, dan tusukan spiral Yakitori dengan bar timing sweet spot.
- [src/delivery.js](src/delivery.js) – Pesanan telepon putar vintage, pengemasan kotak bento kayu bertermometer panas, dan pengantaran sepeda onthel staf Kenji.
- [src/intrigue.js](src/intrigue.js) – Intrik jalanan Showa: klan Yakuza Kurogane, evaluasi inspeksi sanitasi Hokenjo Tokyo, dan gerobak saingan Yamada-ya.
- [src/grill.js](src/grill.js) – Sub-stasiun panggangan sate yakitori, status bakar, balik sate, oles saus tare, dan bonus karamel emas.
- [src/auction.js](src/auction.js) – Minigame lelang subuh Pasar Ikan Tsukiji, bot penawar saingan, dan bahan grade S-Tier.
- [src/fortune.js](src/fortune.js) – Sistem ramalan nasib pelanggan Showa (Omikuji Daikichi, Chukichi, Kyo).
- [src/recipes.js](src/recipes.js) – Daftar 6 resep kombinasi rahasia (*Fusion Dex*), deteksi kecocokan piring, dan bonus harga.
- [src/locations.js](src/locations.js) – Sistem 3 distrik peta kota (Stasiun, Meguro Sakura, Shinjuku Neon) beserta pengali harga dan tip.
- [src/audio.js](src/audio.js) – Mesin synthesizer Web Audio API dengan 4 genre kaset radio, jingle FEVER MODE, kombo berjenjang, jepretan polaroid, genderang cook-off, dan lonceng midnight.
- [src/characters.js](src/characters.js) – Profil karakter unik, sistem dialog bercabang dengan pilihan respon, VIP Boss (Tuan Ryu & Vivienne), Inspektur Michelin Masaru, dan Inspektur Sanitasi Kato.
- [src/decorations.js](src/decorations.js) – Definisi racikan kaldu dashi, tirai noren, mangkuk, dan pajangan meja.
- [src/game.js](src/game.js) – Logika inti: panggangan yakitori, biang kaldu, pisau prep, pesanan bento telepon, lelang, omikuji, kombo, FEVER MODE, minigame sake, panci 4 sekat, timer kematangan, pasar stok, staf, siklus jam, Shinya Shokudo, cook-off, mastery tree, polaroid, dan auto-save.
- [src/render.js](src/render.js) – Mesin perender Canvas 320×180, partikel musim (sakura, maple, salju), suasana malam Shinya Shokudo, kuali biang kaldu master, telepon putar, sepeda pengantar, gerobak saingan Yamada-ya, panggangan sate arang, plakat emas Michelin, lampion, kucing Kuro, dan kembang api festival.
- [src/App.jsx](src/App.jsx) – Antarmuka pengguna React lengkap dengan modal Musim & Berita, Duel Yamada Cook-Off, Pohon Keahlian, Album Polaroid, Kuali Master, Pisau Koki, Bento Sepeda, Lemari Pusaka, Panggangan Yakitori, Lelang Tsukiji, Ramalan Omikuji, Recipe Dex, Peta Kota, Minigame Sake, Rekrut Staf, Radio, Dekorasi, dan Jurnal.
- [src/styles.css](src/styles.css) – Seluruh gaya tampilan retro pixel art modern, animasi pendar FEVER, bingkai polaroid, arena cook-off, pohon skill, termometer bento, bar lelang, dan tata letak responsif.
- [proses.md](proses.md) – Riwayat lengkap analisis masalah, rancangan arsitektur, dan log perubahan fitur dari Tahap 1 hingga Tahap 6.

