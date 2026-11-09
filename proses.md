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

---

## 8. Fase 5: "The Grand Showa Culinary Odyssey" (Sistem Kompleks, Adiktif & Adaptif)

### A. Sistem Kuali Biang Kaldu Induk & Fermentasi Berumur (`src/dashi.js`)
- **Kuali Besar Biang Kaldu Tua**:
  - *Katsuobushi Grade A*: Serpihan cakalang asap memperkuat aroma kuah (+30% laju tamu masuk).
  - *Niboshi Teri Bakar*: Ikan teri kering panggang memperdalam rasa gurih umami (+25% batas kesabaran antrean tamu).
  - *Mirin & Gula Tebu Okinawa*: Kilau kuah emas (+20% durasi & multiplier Fever Mode).
  - *Kecap Shoyu Vintage 10 Tahun*: Melipatgandakan nilai jual kaldu (+25% harga kuah).
- **Mekanik Umur Kaldu Harian (*Aging Vat*)**:
  - *Hari ke-1*: Kaldu Segar (Standar).
  - *Hari ke-3*: **⭐ Biang Kaldu Emas 3 Hari** (Harga sajian x1.45 lipat dan kepuasan +20%).
  - *Hari ke-7*: **👑 Biang Kaldu Pusaka 7 Hari** (Harga sajian oden x2.2 lipat dan kepuasan +35%).
- **Saring Busa & Abu Kotoran Kaldu**: Aksi menyaring buih kotoran arang (`filterVatScum`) untuk menjaga kejernihan kaldu dan mencegah basi.

### B. Mood Psikologi Adaptif & Resonansi Katarsis Emosional (`src/psychology.js`)
- **4 Kondisi Batin / Mood Tamu Dinamis**:
  1. 💔 *Patah Hati*: Butuh sapaan empati lembut, lagu Jazz Hujan, dan kaldu kombu manis.
  2. 💼 *Kelelahan Lembur (Burnout)*: Butuh sapaan kobaran semangat, lagu City Pop, dan kaldu pedas.
  3. 🌧️ *Nostalgia Masa Kecil*: Butuh sapaan nostalgia, lagu Enka, dan kaldu miso hangat.
  4. 💢 *Tegang & Emosional*: Butuh sapaan ketenangan pikiran, alunan folk, dan kaldu kombu.
- **Respon Sapaan Empati Koki (*Chef's Greeting Choice*)**:
  - Saat tamu duduk, koki memilih 1 dari 4 gaya sapaan.
  - **Efek Katarsis Emosional (*Deep Catharsis*)**: Jika mood + sapaan koki + kaset radio + kaldu cocok, tamu mengalami katarsis emosional mendalam! Meneteskan air mata bahagia, harga pesanan x1.5 lipat, dan berpeluang menghadiahi **Barang Pusaka Bersejarah Showa**:
    - ⏱️ *Jam Saku Showa 1972*: Waktu Fever Mode +5 detik!
    - 🥢 *Tusuk Konde Perak*: Reputasi kedai naik +25% permanen!
    - 🪙 *Koin Kuno 100 Yen Perak*: Belanja bahan di pasar diskon 15%!
    - 🖋️ *Pena Tinta Emas Pujangga*: Setiap dialog cerita tamu memberi bonus uang +¥200!

### C. Minigame Pisau Dapur Presisi Siang Hari (`src/knifeprep.js`)
- **Teknik Mengiris Bahan Bintang Koki**:
  - *Keratan Berlian Lobak (Diamond Scoring)*: Mengiris pola silang wajik di atas Daikon.
  - *Ikatan Tali Kanpyo (Kinchaku Tie)*: Mengikat kantong tahu isi mochi dengan tali kanpyo.
  - *Tusukan Spiral Koki (Spiral Skewer)*: Menusuk daging sate ayam secara spiral.
- **Bar Timing Presisi (*Sweet Spot*)**:
  - Kursor bergerak bolak-balik dengan kecepatan dinamis.
  - Menekan tombol tebas pada *Zona Emas Tengah* menghasilkan potongan presisi sempurna (*Masterwork Cut*).
  - Bahan olahan pisau koki matang 35% lebih cepat di panci dan bernilai harga jual ekstra mahal!

### D. Pesanan Telepon Putar & Kotak Bento Antar Sepeda (`src/delivery.js`)
- **Telepon Meja Vintage Showa Berdering**:
  - Menerima pesanan telepon masuk dari pos polisi patroli malam, rumah sakit perawat jaga, atau studio siaran radio malam.
- **Termometer Kehangatan Bento (*Thermal Gauge*)**:
  - Susun 3 oden pilihan ke dalam kotak bento kayu.
  - Suhu bento terus mendingin seiring waktu (100°C $\rightarrow$ 20°C).
  - Staf Kenji mengayuh sepeda onthel melintasi jalanan malam untuk mengantar pesanan.
  - Berhasil tiba dalam kondisi panas beruap ($\ge 65^\circ\text{C}$) melipatgandakan uang tip dan reputasi distrik kota Tokyo!

### E. Intrik Jalanan: Klan Yakuza, Inspektur Sanitasi, & Gerobak Saingan (`src/intrigue.js`)
- **Klan Yakuza Kurogane**: Bos mafia malam Ryuzo mampir. Dilayani dengan potongan daging terbaik memberi perlindungan dari gangguan preman malam.
- **Inspektur Sanitasi Hokenjo Tokyo (Inspektur Kato)**: Memeriksa kebersihan kuali kaldu, kestabilan api kompor, dan ketiadaan sate gosong. Lolos inspeksi memberi **Sertifikat Higienis Bintang 5** yang membebaskan kedai dari pajak distrik (+15% pendapatan permanen).
- **Gerobak Saingan "Yamada-ya"**: Gerobak saingan buka di seberang jalan mencoba merebut tamu dengan potongan harga. Pemain melawan dengan menyebarkan aroma asap sate Shichirin, memasang lentera lebih terang, dan atraksi sake!

---

## 9. Fase 6: "The Grandmaster of Showa – Dynasty & Midnight Tales" (Ekspansi Puncak)

### A. Siklus 4 Musim Dinamis & Fluktuasi Pasar Komoditas Spekulatif (`src/seasons.js`)
- **Pergantian Musim Setiap 7 Hari**:
  1. 🌸 **Musim Semi (*Haru*)**: Kelopak sakura berguguran di canvas. Bahan eksklusif: *Rebung Bambu Muda (Takenoko)*. Bonus kepuasan tamu +15%.
  2. 🍧 **Musim Panas (*Natsu*)**: Malam festival gerimis. Bahan eksklusif: *Es Serut Sirup Melon (Kakigori)*. Tamu mudah haus dan minta teh ocha dingin.
  3. 🍁 **Musim Gugur (*Aki*)**: Dedaunan maple merah melayang di canvas. Bahan eksklusif: *Jamur Matsutake Liar*. Nafsu makan tamu melonjak tinggi (+30% porsi).
  4. ❄️ **Musim Dingin (*Fuyu*)**: Badai salju ekstrem. Bahan eksklusif: *Capit Kepiting Salju (Kani Claw)*. Harga sajian makanan otomatis melonjak +35%!
- **Warta Berita Pasar Komoditas Harian**:
  - Berita fluktuasi harga bahan mentah harian (panen melimpah menurunkan harga hingga 35%, badai laut melonjakkan harga hingga 1.85x lipat).
  - Pemain dapat menimbun stok (*stockpiling*) saat harga murah untuk meraup untung maksimal.

### B. Modus Rahasia Tengah Malam: "Shinya Shokudo" (`src/midnight.js`)
- Pada pukul 02:00 dini hari, pemain dapat memilih **Tutup Kedai & Tidur** atau **Buka Shinya Shokudo (02:00 - 05:00 Dini Hari)**.
- Layar bertransformasi tematik malam ungu kebiruan dengan lampion ungu spesial "深夜".
- Tamu nokturnal misterius memesan dengan **Teka-Teki Puitis (*Poetic Riddles*)**:
  - 🕵️ *Detektif Kenzo*: "Kepedihan samudra dalam yang diselimuti kabut ladang musim semi..." (Sate Gurita + Lobak + Karashi).
  - 🖋️ *Mangaka Eiji*: "Bakar semangat begadangku dengan urat baja..." (Urat Sapi + Chikuwa + Karashi).
  - 🎬 *Nona Sayuri (Aktris Noir)*: "Kehangatan pelukan rumah yang lembut bersahaja..." (Telur + Mochi Kinchaku + Ocha).
  - 🌧️ *Pak Goro (Pengembara)*: "Kesederhanaan tanah yang meresap kaldu murni..." (Lobak + Tahu Goreng + Scallion).
- Berhasil memecahkan teka-teki menghasilkan hadiah ribuan Yen, lonjakan reputasi, dan pembukaan foto polaroid nostalgia.

### C. Duel Kuliner Terbuka vs Yamada-ya (`src/cookoff.js`)
- Pertarungan 3 babak langsung di hadapan juri warga distrik:
  - *Babak 1: Adu Harum Kaldu (Aroma Clash)*: Klik secepat mungkin untuk menyebarkan aroma kuah kaldu.
  - *Babak 2: Kecepatan Panggangan Sate*: Balik tusukan sate secepatnya sebelum timer habis.
  - *Babak 3: Harmoni Kaiseki Final*: Penjurian estetika hidangan oleh warga.
- Menang duel menganugerahkan hadiah tunai +¥3.500, +25 Reputasi, dan **Monopoli Distrik 3 Hari** (pengunjung membludak 100%).

### D. Pohon Keahlian Koki & Buku Silsilah Pusaka (`src/mastery.js`)
- Setiap melayani 4 tamu dengan puas, koki memperoleh **+1 Poin Keahlian Master**.
- 4 Ranting Keahlian Showa:
  - 🔪 *Itamae (Pisau Emas)*: Goresan pisau ekstra stok dan perebusan cepat pola berlian.
  - 💖 *Kokoro (Batin & Empati)*: Mata batin melihat mood tamu dan resonansi katarsis berlipat.
  - 🔥 *Homura (Api & Arang)*: Toleransi panggangan sate tidak mudah gosong dan kompor kebal dingin salju.
  - 🪙 *Akiudo (Bisnis & Relasi)*: Diskon belanja pasar 20% dan magnet pemikat tamu VIP.

### E. Seni Tata Hidang Estetika Kaiseki & Album Polaroid (`src/kaiseki.js`)
- **Penilaian Harmoni Estetika Visual (0 - 100%)**:
  - Mengukur keseimbangan variasi bahan, kehadiran tusukan sate bakar, dan aksen warna bumbu kondimen.
  - Skor Kaiseki $\ge 80\%$ memberikan bonus nilai hidangan instan **+25%**.
- **Album Foto Polaroid Kenangan Showa**:
  - Galeri 6 foto instan polaroid berbingkai retro vintage yang mengabadikan kisah emosional para tamu ikonik kedai.

### F. Efek Audio Prosedural Baru (`src/audio.js`)
- `playCameraShutter()`: Suara jepretan rana kamera mekanik kuno dan pendaran lampu kilat.
- `playCookOffTaiko()`: Tabuhan genderang perang taiko pembuka duel jalanan.
- `playMidnightBell()`: Dentang lonceng kuil tengah malam penanda 02:00 Shinya Shokudo.
- `playSkillUnlock()`: Fanfare arpeggio kemenangan saat membuka keahlian master koki.

---

## 10. Fase Pengembangan Fitur Lanjutan: Tahap 7 (The Showa Dynasty & Culinary Grand Prix)

Ekspansi sistem strategi mendalam, tingkat kesulitan adaptif, serta konten *mid-to-endgame* untuk menjaga daya tarik jangka panjang.

### A. Tingkat Kesulitan Adaptif: Arashi Rush Hour & Zen Focus (`src/arashi.js`)
- **Indikator Arashi Rush**:
  - Meteran bertambah seiring kecepatan dan akurasi sajian koki. Saat mencapai 100%, mode **Arashi Rush** terpicu selama 35 detik.
  - Kesulitan meningkat secara adaptif: durasi kesabaran berkurang 25%, tamu memesan paket multi-tahap (Oden + Sate / Sake), namun pengganda tip meroket menjadi **x3.5**.
- **Mata Batin Zen Focus (Bullet-Time)**:
  - Berhasil mempertahankan kombo tinggi ($\ge 6$) saat Arashi aktif memicu **Zen Focus** selama 9 detik.
  - Waktu kesabaran tamu dan pemanggangan melambat drastis ($0.45\times$), disertai pendaran aura emas dan detak jantung koki yang ritmis.

### B. Warisan Dinasti Showa & Restoran Flagship Ginza (`src/dynasty.js`)
- **Sistem Prestige (Reinkarnasi Warisan)**:
  - Dibuka setelah meraih Bintang Michelin 3 (★★★), modal ¥60.000, atau Reputasi 85.
  - Koki mengangkat murid kepala (Kenji atau Nona Aoi) untuk mengelola gerobak lama, menghasilkan dividen harian pasif (**¥1.800 – ¥3.000 / hari**).
  - Membuka lokasi ke-4: **Restoran Flagship Ginza Showa** (`ginza`) dengan dekorasi tatami Hinoki dan Ruang Tertutup Zashiki.
  - Mewariskan kaldu leluhur keemasan (*Golden Dashi Heritage*) dengan bonus kepuasan dasar +25% permanen.
- **Tamu Bangsawan Ruang VIP Zashiki**:
  - Tiga tokoh era Showa: *Menteri Kebudayaan Kato*, *Sutradara Sinema Otomo*, dan *Taipan Zaibatsu Tanaka* yang memberikan anggaran sajian masif ($4.0\times - 6.0\times$ harga normal).

### C. Turnamen Akbar Kuliner: Grand Prix Kanto vs Kansai (`src/grandprix.js`)
- Turnamen knockout 3 babak bergengsi melawan Master Koki Ryuji dari Kansai:
  - **Babak 1 (Dashi Blind Tasting)**: Menyeimbangkan rasio Kombu, Katsuobushi, dan Shoyu agar mendekati harmoni juri kekaisaran.
  - **Babak 2 (Speed Kaiseki Plating)**: Menata 3 bahan pesanan kehormatan (Lobak, Telur, Kepiting Matsuba) dalam batas waktu ketat.
  - **Babak 3 (Duel Kuali Api Ryuji)**: Kecepatan mengaduk kuali untuk karamelisasi Kaldu Imperial sebelum rival menyusul.
- **Hadiah Kemenangan**:
  - **Piala Bergilir Kaisar Showa** yang terpajang megah di rak kedai dan restoran.
  - Gelar *Master Itamae Nasional* (+50% perolehan reputasi harian).
  - Pembukaan pasokan bahan langka S-Tier: *Kepiting Matsuba Echizen* dan *Lobak Istana Kyoto*.

### D. Gudang Fermentasi Bawah Tanah & Sommelier Sake (`src/fermentation.js`)
- **3 Gentong Keramik Kuno (*Kame*)**:
  - *Telur Marinasi Shoyu 3 Hari*: Menghasilkan **Telur Selai Emas** bernilai jual tinggi.
  - *Aged Karashi Miso 2 Hari*: Mustard pedas beraroma perilla fermentasi.
  - *Gentong Sake Koshu Vintage 1975*: Mematangkan botol sake kayu cedar antik selama 4 hari.
- **Matriks Harmoni Pasangan Makanan & Sake (Food-Sake Pairing)**:
  - *Atsukan Hangat*: Harmonisasi sempurna dengan kue tahu, telur, dan mochi.
  - *Junmai Ginjo Kering*: Mengangkat kesegaran kuah sayur lobak dan konnyaku.
  - *Koshu Vintage 1975*: Ledakan rasa gurih untuk urat sapi empuk, gurita, dan kepiting (+150% tip & efek *Gourmet Euphoria*).

### E. Segitiga Pengaruh Faksi Distrik (`src/factions.js`)
- Tiga faksi yang bersaing memperebutkan pengaruh di jalanan:
  - 👮‍♂️ **Koban (Inspektur Kenzo)**: Hak istimewa *Patroli Koban* (bebas razia sanitasi dan anti pencuri).
  - 🐉 **Klan Gumi (Oyabun Ryuzo)**: Hak istimewa *Pasar Gelap Tsukiji* (diskon lelang 40% dan rival tidak berkutik).
  - 🏮 **Shoutengai (Madam Yoshiko)**: Hak istimewa *Festival Matsuri Rakyat* (pengunjung melonjak 250%).
- **Dilema Distrik Harian**:
  - Setiap 3 hari muncul peristiwa dilematis (jam malam, sumbangan lampion festival, tawaran pasokan kombu gelap) yang mengubah neraca kekuasaan ketiga faksi.

### F. Efek Audio Prosedural Tambahan (`src/audio.js`)
- `playZenFocusBeat()`: Detak jantung koki saat memasuki konsentrasi pelan waktu.
- `playEuphoriaChime()`: Denting harmoni keemasan saat pasangan makanan dan sake pas.
- `playArashiRushFanfare()`: Fanfare genderang mendadak tanda badai pesanan datang.
- `playGrandPrixGong()`: Resonansi gong kuil pembuka dan penutup pertandingan kejuaraan nasional.
- `playPrestigeFanfare()`: Melodi Gagaku klasik kaisar saat pembukaan dinasti dan perjamuan bangsawan.

---

## 11. Fase Pengembangan Fitur Lanjutan: Tahap 8 (The Wandering Gourmet & Soul of Itamae)

Ekspansi sistem adaptif, petualangan rute provinsi, kustomisasi kimia dashi murni, pasar gelap sindikat berisiko tinggi, serta perkembangan naratif jangka panjang para tamu kedai.

### A. Mesin Deteksi Jiwa Koki (Player Culinary Soul & Archetype Engine) (`src/soul.js`)
- **Analisis Gaya Bermain Pemain**:
  - Menganalisis kecepatan saji (*fastServe*), kepatuhan estetika kaiseki (*highKaisekiCount*), serta akumulasi kekayaan dan perdagangan pasar (*marketTrades* & *coins*).
  - Tiga arketipe jiwa koki:
    1. **Itamae Kilat (Speed Artisan - ⚡)**: Aura cyan elektrik. Peningkatan kedatangan tamu komuter +30% dan kombo tip +25%.
    2. **Wabi-Sabi Purist (Zen Perfectionist - 🌸)**: Aura hijau giok/emas. Peluang kedatangan bangsawan/kritikus +50% dan bonus reputasi +40%.
    3. **Saudagar Showa (Market Tycoon - 🪙)**: Aura amber hangat. Diskon belanja pasar 25% dan tingkat kecurigaan polisi Koban mendingin 30% lebih cepat.
- **Pendaran Aura Visual Koki**:
  - Canvas secara dinamis merender pendaran aura di sekeliling koki sesuai arketipe jiwa aktifnya.

### B. Ekspedisi Kereta Api Uap Restorasi (The SL Ginga Gastronomic Journey) (`src/expedition.js`)
- **4 Rute Provinsi Legendaris Showa**:
  - **Tokyo Central (🗼)**: Rute awal ibu kota.
  - **Otaru Salju Abadi (Hokkaido - ❄️)**: Suhu beku $-15^\circ\text{C}$ mendinginkan kompor 2x lebih cepat. Membuka bahan *Capit Kepiting Raja* dan *Mentega Susu Otaru* (pengganda harga $\times1.4$, tip $\times1.3$).
  - **Arashiyama Kuil Suci (Kyoto - ⛩️)**: Peziarah mengutamakan sajian vegetarian bernilai Kaiseki tinggi. Membuka *Kembang Tahu Sutra* dan *Rebung Rebus Bambu* (pengganda harga $\times1.5$, tip $\times1.4$).
  - **Dotonbori Gemerlap (Osaka - 🐙)**: Budaya tempo cepat dengan aturan sakral tanpa celup saus dua kali. Membuka *Doteyaki Urat Miso Manis* dan *Acar Jahe Merah Pedas* (pengganda harga $\times1.6$, tip $\times1.6$).
  - **Pesisir Teluk Yatai (Hakata - 🍜)**: Tenda pesisir buka hingga subuh dengan riuh alkohol. Membuka *Telur Ikan Mentaiko Pedas* dan *Ekstrak Rebusan Gurih* (pengganda harga $\times1.75$, tip $\times1.8$).
- **Atmosfer Visual Partikel Provinsi**:
  - Partikel kabut es lembut di Hokkaido, dedaunan bambu melayang di Kyoto, kedipan neon di Osaka, serta semilir kabut pesisir di Hakata.

### C. Laboratorium Kaldu Kustom (Master Broth Alchemy Lab) (`src/alchemy.js`)
- **5 Parameter Rasa Alami**:
  - *Umami* (Kombu & Katsuobushi), *Amami* (Mirin & Lobak), *Shio* (Garam Samudra), *Kaori* (Yuzu & Cedar), dan *Koku* (Kolagen Daging).
- **Kalkulator Harmoni Sinergi Rasa Tradisional**:
  - Harmoni dihitung dari keseimbangan Shio-Amami, sinergi Umami-Koku, serta aroma Kaori.
- **Hak Paten Asosiasi Kuliner & Integrasi Panci**:
  - Kaldu dengan skor harmoni $\ge 80\%$ dapat didaftarkan dengan nama kustom buatan pemain (biaya registrasi $\yen 3.000$, reputasi +20).
  - Formula paten dapat dituangkan ke panci oden utama untuk memberikan pengganda harga permanen **+35%** pada seluruh bahan rebusan.

### D. Pasar Gelap Sindikat Jam 03:30 & Pusaka Terkutuk (`src/syndicate.js`)
- **Pusaka Berdaya Mistis**:
  - *Arang Hitam Kuno 100 Tahun*: Suhu kompor tidak pernah turun di bawah $85\%$ dan sate yakitori tidak akan gosong (Heat +25).
  - *Pisau Pusaka Masamune*: Setiap irisan bahan langsung berstatus rebusan Emas bernilai $+50\%$ harga (Heat +35).
  - *Kendi Garam Samudra Purba*: Mengembalikan kesabaran tamu yang marah menjadi $100\%$ penuh (Heat +20).
- **Mekanik Risiko Polisi Koban (Heat Level & Razia)**:
  - Heat level bertambah setiap membeli artefak. Jika Heat $\ge 75\%$, memicu peringatan sirine razia Koban.
  - Pemain dapat menyuap dan menyembunyikan pusaka di kompartemen rahasia bawah tatami ($\yen 500$, Heat -35) untuk menghindari penyitaan.

### E. Garis Hidup Dinamis Pelanggan & Malam Reuni (`src/lifearc.js`)
- **Evolusi Karakter Bertahap (3 Tahap Kehidupan)**:
  - *Pak Gimin*: Pegawai Lembur Lelah $\to$ Promosi Kepala Divisi $\to$ Perayaan Makan Malam Keluarga.
  - *Nona Hana*: Siswi Desa Perantau $\to$ Mahasiswi Kedokteran Unggulan $\to$ Dokter Muda Penuh Syukur.
  - *Detektif Kenzo*: Penyelidik Malam Tanpa Nama $\to$ Titik Terang Kasus Kota Tua $\to$ Piagam Bintang Emas Kepolisian.
  - *Nenek Sumi*: Penghuni Kenangan Kota Tua $\to$ Surat Manis dari Cucu $\to$ Warisan Resep Dashi Leluhur.
- **Malam Reuni Akbar Showa (The Grand Reunion)**:
  - Terbuka ketika minimal 3 karakter mencapai Tahap 2+.
  - Menghasilkan bonus hadiah $\yen 5.000$, reputasi +30, perayaan bersulang seluruh tamu dengan partikel konfeti warna-warni, serta foto kenangan di album polaroid.

### F. Efek Audio Prosedural Baru (`src/audio.js`)
- `playSteamTrainWhistle()`: Peluit uap antik kereta SL Ginga bergaung saat tiba di stasiun provinsi baru.
- `playMortarGrind()`: Gesekan lumpang batu dan alu kayu saat meracik rempah kaldu kustom.
- `playSyndicateWhisper()`: Bisikan lorong gelap mistis saat transaksi pasar gelap bawah tanah.
- `playReunionChime()`: Dentingan lonceng perak bahagia saat Malam Reuni Akbar dimulai.

---

## 12. Tahap 12: Fase 9 (Fitur 1) — Sistem Sumpah Senja & Perjanjian Roh Kelaparan (The Twilight Pacts & Gaki's Gamble)

### A. Latar Belakang & Desain Risk-and-Reward Ekstrem
Memasuki tahap endgame, pemain membutuhkan tantangan dengan taruhan tinggi (*high-stakes contracts*) yang menguji ketangkasan mental, manajemen kuali berkecepatan tinggi, dan interaksi dengan entitas folklore mistis zaman Showa. Sistem **Sumpah Senja** menghadirkan pilihan kontrak sukarela yang dapat diikat setiap sore hari sebelum fajar tiba, memberikan pengganda imbalan masif atau hukuman penalti berat jika gagal memenuhi kriteria.

### B. Modul Logika Perjanjian (`src/pacts.js`)
- **3 Kontrak Sumpah Senja Berbahaya**:
  1. **Sumpah Kuali Mendidih Neraka (`boiling_hell`)**:
     - *Kondisi*: Suhu kompor terkunci pada panas maksimum ($100\%$) dan bahan di sekat panci matang $2.5\times$ lebih cepat.
     - *Syarat Kemenangan*: Tidak boleh ada $1$ bahan pun di seluruh sekat yang melepuh / overcooked (`simmer > 40` detik).
     - *Imbalan Sukses*: Omset kotor penjualan hari itu dikalikan **$\times 3.5$**, jackpot tunai $+\yen 15.000$, dan Reputasi $+25$.
     - *Penalti Gagal*: Kuali meletup! Denda tunai $\yen 6.000$ dan Reputasi anjlok $-15$.
  2. **Sumpah Pelayanan Tanpa Nafas (`silent_storm`)**:
     - *Kondisi*: Tamu kedai menjadi sangat tidak sabaran (pengurangan durasi kesabaran $1.4\times$ lebih deras).
     - *Syarat Kemenangan*: Rantai kombo pelayanan tidak boleh terputus atau reset kembali ke $0$ setelah menyajikan makanan ke tamu pertama (minimal $3$ tamu terlayani).
     - *Imbalan Sukses*: Terbukanya bumbu pusaka legendaris **"Shoyu Hitam Abadi 50 Tahun"** (+50% Tip Pelanggan Permanen), uang tunai $+\yen 8.000$, dan Reputasi $+20$.
     - *Penalti Gagal*: Denda kegagalan mental koki berupa Reputasi $-10$.
  3. **Sumpah Kursi Keramat Roh Kelaparan (`cursed_stool`)**:
     - *Kondisi*: Kursi nomor 1 diduduki oleh entitas mistis **Roh Kelaparan (Gaki)** yang menuntut sajian oden spesifik setiap 40 detik. Kursi 1 secara otomatis diisolasi dari tamu manusia normal.
     - *Syarat Kemenangan*: Menyuap dan memberi makan Gaki minimal $3$ kali sebelum timer laparnya habis.
     - *Imbalan Sukses*: Dihadiahi $+2$ Koin Emas Roh (*Spiritual Koban*), Peti Pusaka Bayangan ($+\yen 12.000$ & Relik Rahasia), dan Reputasi $+30$.
     - *Penalti Gagal*: Gaki yang murka menyedot habis seluruh kaldu kuali, menambah kotoran busa kuali master $+40\%$, dan Reputasi $-12$.
- **Fungsi Logika Utama**:
  - `createInitialPactState()`: Inisialisasi status kontrak, timer Gaki, token spiritual, serta pembukaan pusaka Shoyu 50 tahun.
  - `signTwilightPact(pactState, pactId, g)`: Mengikat kontrak harian, mengatur panas kompor, dan membangkitkan Gaki jika memilih `cursed_stool`.
  - `cancelTwilightPact(pactState, g)`: Pembatalan darurat kontrak dengan penalti biaya tebusan $\yen 1.000$.
  - `feedGaki(pactState, itemId, g)`: Menyuapkan bahan yang diminta dari stok gudang atau comotan sekat panci ke Roh Gaki.
  - `updatePactLoop(pactState, dt, g)`: Loop pemantau hitung mundur kelaparan Gaki dan pemicu amarahnya.
  - `resolveDayEndPact(pactState, g)`: Resolusi akhir hari di kasir, menghitung pengali omset x3.5, penalti denda, pencatatan histori perjanjian, serta pemberian pusaka permanen.

### C. Efek Visual Canvas Retrostil Waktu Nyata (`src/render.js`)
1. **Atmosfer Kuali Mendidih Neraka**: Pendaran api membara merah crimson di sekeliling pinggiran kuali tembaga dan partikel letupan bara api melayang secara dinamis.
2. **Badai Petir Violet Hening**: Efek vignette berkedip ungu mistis di keempat sudut layar selama Sumpah Pelayanan Tanpa Nafas berlangsung.
3. **Entitas Roh Gaki di Kursi 0**: Render sosok makhluk gaib berpendar ungu di Kursi nomor 1 dengan balon pikiran (*thought bubble*) menampilkan ikon bahan yang sedang ia tuntut, serta bilah bar meteran lapar waktu nyata.
4. **Siluet Sosok Senja**: Siluet bayangan mistis berdiri mengawasi di luar jendela kedai tepat pada jam 17:00 senja Showa.

### D. Audio Synthesizer Prosedural Web Audio API (`src/audio.js`)
- `playTwilightGong()`: Resonansi gong senja mistis frekuensi rendah (75 Hz $\to$ 40 Hz) dengan modulasi overtone misterius saat sumpah ditandatangani.
- `playDemonGulp()`: Suara glek menelan lahap berdenting oktaf berat saat Roh Gaki menerima sajian suap oden.
- `playHellBoilSizzle()`: Desisan kuah meletup panas bergemuruh ketika bahan rebusan melepuh atau gosong di kuali neraka.
- `playPactRewardChime()`: Rangkaian akord perak keemasan arpeggio 4 nada (D5 $\to$ F#5 $\to$ A5 $\to$ D6) saat pemain berhasil menuntaskan sumpah senja di akhir hari.

### E. Integrasi Gameplay & Antarmuka UI (`src/game.js`, `src/App.jsx`, `src/styles.css`)
- **Pusaka Bumbu Shoyu Hitam Abadi 50 Tahun**: Terbuka secara permanen di state permainan, menambahkan bonus $+50\%$ tip pada fungsi `serve()`.
- **Top HUD & Navigasi**: Tombol HUD "🔥 Sumpah Senja" berkedip di atas layar dan tombol navigasi di bilah menu bawah.
- **Modal Interaktif Sumpah Senja**: Menampilkan katalog 3 kartu sumpah, status sumpah berjalan hari ini, tombol interaktif suap Gaki langsung dari modal, tombol batalkan sumpah, dan tampilan koleksi Koin Emas Roh.
- **Ringkasan Hari (Day Summary)**: Banner hasil resolusi sumpah senja menampilkan status keberhasilan, rincian bonus tunai, perubahan reputasi, dan pesan catatan sejarah.
- **Uji Coba & Verifikasi**: 6 unit test suites berhasil lulus 100% dan bundle produksi Vite terverifikasi bersih tanpa galat.

---

## 13. Tahap 13: Fase 9 (Fitur 2) — Insiden Darurat & Peristiwa Acak Tak Terduga (The Midnight Anomalies & Sudden Street Dramas)

### A. Latar Belakang & Desain Ketegangan Situasional
Untuk memecahkan repetisi gameplay dan menghadirkan dinamika malam kota tua Showa yang hidup dan mendebarkan, sistem **Insiden Darurat & Peristiwa Acak** menghadirkan 4 skenario darurat unik yang dapat melanda kedai secara acak pada malam hari (pukul 20:00 - 02:00 dini hari). Setiap insiden menuntut adaptasi refleks koki yang berbeda: mulai dari serbuan supir truk, memasak tanpa visual (audio cooking), sorotan blitz kamera film 35mm, hingga penutupan kuali koki dari serpihan abu vulkanik.

### B. Modul Logika Insiden Jalanan (`src/anomalies.js`)
- **4 Peristiwa Darurat Ekstrem**:
  1. **Konvoi Truk Dekotora Showa (`dekotora_convoy`)**:
     - *Kondisi*: Klakson angin ganda menggelegar dan sorotan neon truk tronton menyapu kedai. 3-4 supir truk Dekotora kekar menyerbu kedai secara serentak menuntut porsi jumbo dalam 90 detik.
     - *Syarat Kemenangan*: Layani minimal 3 supir truk Dekotora sebelum timer 90 detik habis.
     - *Imbalan Sukses*: Traktiran seisi kedai dari bos supir sebesar $+\yen 12.000$ dan Reputasi $+25$.
     - *Penalti Gagal*: Supir mengumpat kelaparan karena terlambat (Reputasi $-10$).
  2. **Ledakan Gardu Trafo Distrik (`district_blackout`)**:
     - *Kondisi*: Gardu listrik distrik meledak! Lampu kota dan kedai padam total. Seluruh kedai gelap gulita hanya berbekal pendaran redup bara kuali kompor.
     - *Mekanik Audio Cooking*: Pemain harus memasak mengandalkan isyarat audio (*audio cue*), gelembung kuah, dan desis kematangan dalam gelap. Tombol lilin darurat tersedia untuk sedikit memulihkan visibilitas.
     - *Syarat Kemenangan*: Layani minimal 2 tamu selama blackout berlangsung (45 detik).
     - *Imbalan Sukses*: Gelar *"Koki Telinga Emas"* Showa, hadiah tunai $+\yen 8.000$, dan Reputasi $+20$.
     - *Penalti Gagal*: Tamu tersandung dalam kegelapan (Reputasi $-8$).
  3. **Kru Film Sinema Menyamar (`film_crew`)**:
     - *Kondisi*: Sutradara era 1970-an tiba-tiba syuting gerilya di depan kedai dengan kamera tripod antik 35mm dan mikrofon boom.
     - *Syarat Kemenangan*: Sajikan minimal 2 hidangan berestetika Kaiseki tinggi ($\ge 75$ pts / bintang 3) dalam 60 detik. Setiap sajian memicu kilatan blitz kamera putih 35mm di layar.
     - *Imbalan Sukses*: Honor syuting film $+\yen 10.000$, Reputasi melonjak $+50$, dan gelar *"Kartu Pers Sinema 35mm"*.
     - *Penalti Gagal*: Sutradara kecewa "CUT!" (Reputasi $-5$).
  4. **Hujan Abu Vulkanik Gunung Fuji (`volcanic_ashfall`)**:
     - *Kondisi*: Butiran abu vulkanik melayang turun dari langit selama 50 detik dengan hembusan angin abu periodik.
     - *Mekanik Penutup Kuali Otoshi-buta*: Pemain wajib memasang penutup kayu kuali (*Otoshi-buta*) saat angin abu menebal agar kaldu tidak tercemar kotoran busa ($+20\%$ per cemaran). Saat kuali tertutup, bahan tidak bisa diambil/dimasukkan. Pemain harus buka-tutup dengan cermat di sela hembusan angin!
     - *Syarat Kemenangan*: Bertahan selama 50 detik tanpa membiarkan kaldu tercemar lebih dari 2 kali.
     - *Imbalan Sukses*: Mineral abu vulkanik langka menyuburkan aroma kaldu (Uang Tunai $+\yen 9.000$ dan Reputasi $+20$).
     - *Penalti Gagal*: Kaldu tercemar abu, denda kuras $\yen 3.000$ dan Reputasi $-12$.

### C. Efek Visual Canvas Retrostil (`src/render.js`)
1. **Sorotan Lampu Neon Dekotora**: Sorotan 4 berkas cahaya neon warna-warni (oranye, cyan, merah crimson, emas) berayun sweeping melintasi kedai di tengah hujan dengan border neon berkedip dinamis.
2. **Kegelapan Total Blackout & Pendar Lilin**: Kanvas digelapkan dengan lapisan `rgba(4, 5, 14, 0.93)`, memancarkan lingkaran merah bara kompor di sekeliling kuali (`PX, PY`) dan cahaya lilin meja hangat jika lilin dinyalakan.
3. **Kru Film & Kilatan Blitz 35mm**: Siluet juru kamera dan tripod antik 35mm digambar di sisi pintu kedai, disertai kilatan blitz putih terang seketika (`cameraFlashAlpha = 1.0` yang memudar halus) saat hidangan disajikan.
4. **Hujan Abu & Penutup Kayu Otoshi-buta**: Partikel abu keperakan melayang turun dari langit, kabut hembusan abu vulkanik, serta penutup papan kayu berbilah (*Otoshi-buta*) dengan pegangan kayu yang menutupi sekat panci oden secara presisi.

### D. Audio Synthesizer Web Audio API Baru (`src/audio.js`)
- `playTruckHorn()`: Klakson angin ganda nada gana F3 & A3 khas truk tronton Showa.
- `playTransformerExplosion()`: Letupan ledakan listrik trafo berfrekuensi rendah dengan percikan bunga api.
- `playBlackoutHum()`: Dengung frekuensi rendah listrik padam (55 Hz) yang memudar lambat ke keheningan.
- `playCameraCrank()`: Bunyi klik putaran rol mekanik kamera film 35mm antik.
- `playClapperboard()`: Ketukan tajam kayu papan clapperboard sutradara film.
- `playVolcanicRumble()`: Gemuruh sub-bass vulkanik dalam (42 Hz) bergelombang.
- `playOtoshiButaWood()`: Hantaman tutup papan kayu pada bibir kuali tembaga oden.

### E. Integrasi Antarmuka UI & Siklus Gameplay (`src/App.jsx`, `src/styles.css`, `src/game.js`)
- **Top HUD & Emergency Alert Bar**: Bar peringatan darurat merah berdenyut menampilkan nama insiden, timer hitung mundur waktu nyata, progres objektif, serta tombol aksi cepat (Lilin Darurat / Tutup Kuali).
- **Modal Arsip & Latihan Insiden**: Memuat arsip 4 bencana distrik Showa, monitor insiden aktif, tombol pemicu latihan mandiri, dan lencana pencapaian gelar darurat.
- **Ringkasan Hari (Day Summary)**: Banner hasil insiden darurat menampilkan rincian audit finansial dan reputasi yang diperoleh saat penutupan hari.
- **Uji Coba & Verifikasi**: 6 unit test suites terverifikasi lulus 100% dan bundle produksi Vite sukses tanpa kendala.

---

## 14. Tahap 14: Fase 9 (Fitur 3 & 4) — Pohon Takdir Musiman Hanafuda & Arena Perjudian Gelap Chou-Han (The Celestial Ema & Midnight Speakeasy)

### A. Latar Belakang & Desain Permainan
Untuk melengkapi kedalaman simulasi dengan variabilitas harian (*daily run modifiers*) dan sensasi pertaruhan bawah tanah (*underground risk-and-reward*), Tahap 14 mengintegrasikan dua pilar mekanik baru:
1. **Pohon Takdir Musiman & Horoskop Bintang Showa (*The Celestial Ema & Hanafuda Fate Matrix*)**: Setiap fajar baru, kartu cahaya Hanafuda legendaris ditarik secara otomatis untuk menentukan feng-shui dan pengubah ekonomi kedai sepanjang hari. Pemain juga dapat menggantung papan doa kayu Ema di pelataran kedai.
2. **Arena Perjudian Gelap: "Chou-Han Lorong Belakang" (*The Midnight Speakeasy & Bakuto Dice Den*)**: Pada larut malam (pukul 23:00 - 05:00), pintu geser kayu tersembunyi dengan simbol dadu merah menyala di lorong samping kedai. Pemain dapat memasuki sarang judi dadu arang bambu tradisional Jepang era Showa untuk melipatgandakan modal kas dengan bertaruh pada Chou (Genap) atau Han (Ganjil), serta memburu Jackpot Naga Kembar.

### B. Modul Logika Takdir Hanafuda (`src/fate.js`)
- **6 Kartu Cahaya Legendaris (*Hikari Cards*)**:
  1. 🌲🕊️ **Matsu ni Tsuru (Pinus & Bangau)**: *Keberuntungan Kaisar*. Anggaran belanja tamu bertambah $+60\%$ dan peluang tamu bangsawan Zashiki VIP melonjak $+50\%$.
  2. 🌸🍶 **Sakura ni Maku (Bunga Sakura & Tirai Pesta)**: *Mabuk Musim Semi*. Tamu memesan sake $2\times$ lebih sering, kesabaran berkurang $50\%$ lebih lambat, dan tip pasangan sake (*pairing*) berlipat ganda ($+100\%$).
  3. 🌕🌾 **Tsuki ni Susuki (Bulan Merah & Ilalang)**: *Gerhana Bulan Darah*. Seluruh bahan oden yang mencapai tingkat rebusan Emas (*Golden Simmer*) bernilai jual $+50\%$, dan fusi resep baru memberikan bonus tunai $+\yen 1.000$.
  4. 🌧️🐸 **Ame ni Ono no Michikaze (Pujangga Hujan & Katak)**: *Malam Pujangga Hujan*. Dialog curhat tamu memberikan imbalan uang $3\times$ lipat ($+\yen 600$) dan peluang kedatangan kakek pengembara meningkat $+35\%$.
  5. 🌼🏆 **Kiku ni Sakazuki (Krisan & Cawan Arak Emas)**: *Jamuan Panjang Umur*. Setiap piring dengan harmoni Kaiseki $\ge 80$ poin memberikan tambahan reputasi $+5$, serta pengali omset FEVER MODE melonjak menjadi $4.0\times$.
  6. 🍁🦌 **Momiji ni Shika (Maple Musim Gugur & Rusa)**: *Angin Niaga Keemasan*. Diskon belanja bahan di pasar grosir pagi sebesar $35\%$ dan penjualan sate bakar Yakitori berlipat ganda ($2.0\times$).
- **Mekanik Kocok Ulang Takdir (*Fate Reroll*)**: Pemain dapat membayar mahar $\yen 1.500$ untuk mengocok ulang kartu takdir harian jika menginginkan pengubah yang lebih selaras dengan strategi bisnisnya.
- **Papan Doa Kayu Ema (*Celestial Ema Altar*)**: Pemain dapat menuliskan doa harapan di papan kayu Ema dengan biaya sumbangan $\yen 2.000$ untuk memperoleh reputasi instan $+15$ dan mengaktifkan restu bintang surgawi.

### C. Modul Logika Arena Perjudian Chou-Han (`src/speakeasy.js`)
- **Aturan Dadu Tradisional Bakuto**:
  - Bandar bertato menaruh 2 dadu arang bambu di dalam mangkuk anyaman bambu (*Chawan*), mengocoknya dengan ritme khas, lalu menghentakkannya terbalik ke atas meja tatami.
  - Pemain memilih tebakan: **Chou (Genap)** atau **Han (Ganjil)**.
  - 5 Tingkatan Taruhan Fleksibel: $\yen 500$, $\yen 1.000$, $\yen 2.500$, $\yen 5.000$, dan $\yen 10.000$.
  - Tebakan Benar: Menang imbalan $2.0\times$ nilai taruhan ($+100\%$ laba bersih) dan menaikkan rantai kemenangan (*Win Streak*).
  - Tebakan Salah: Bandar menyapu uang taruhan di atas meja, rantai kemenangan reset ke 0, dan $25\%$ uang kekalahan dialirkan ke dalam brankas Jackpot Pool kumulatif.
- **Jackpot Naga Kembar (*Double Dragon Jackpot*)**:
  - Terjadi saat kedua dadu menunjukkan angka kembar sakral: **1-1 ("Mata Ular Hitam")** atau **6-6 ("Naga Emas")** (~$5.5\%$ probabilitas).
  - Pemain memenangkan seluruh isi brankas jackpot kumulatif (minimal $+\yen 25.000$) ditambah $2\times$ taruhan dasar!
  - Membuka secara permanen pusaka terlarang: **"Gulungan Resep Dashi Kaisar yang Hilang"** (*The Emperor's Lost Dashi Scroll*), yang memberikan buff permanen $+20\%$ pada seluruh harga jual kuah kaldu kedai!

### D. Audio Synthesizer Prosedural Web Audio API Baru (`src/audio.js`)
1. `playHanafudaSnap()`: Hantaman kartu Hanafuda berdensitas tebal pada permukaan tikar tatami.
2. `playFateShine()`: Kilauan mistis resonansi frekuensi tinggi melambangkan restu bintang keberuntungan Showa.
3. `playDiceShake()`: Gemeretak perputaran 2 dadu arang bambu di dalam ruang mangkuk anyaman bambu.
4. `playCupSlam()`: Hantaman mantap mangkuk bambu terbalik ke atas meja kayu dengan redaman bantalan kain.
5. `playDiceWin()`: Rangkaian nada kemenangan pentatonik ceria saat tebakan Chou-Han berhasil.
6. `playDiceLose()`: Resonansi nada minor meluncur turun pertanda bandar menyapu koin taruhan.

### E. Integrasi Efek Visual Canvas Retrostil (`src/render.js`)
- **Partikel Atmosfer Takdir Hanafuda**:
  - `cherry_petals`: Kelopak bunga sakura merah muda melayang berputar tertiup angin musim semi saat kartu *Sakura ni Maku* aktif.
  - `maple_leaves`: Daun maple merah oranye gugur meliuk-liuk saat kartu *Momiji ni Shika* aktif.
  - `gold_leaves` & `golden_sparkles`: Pendaran debu emas melayang ke udara saat kartu *Matsu ni Tsuru* atau *Kiku ni Sakazuki* aktif.
  - `blood_moon`: Pendaran bulan purnama merah tua mistis saat kartu *Tsuki ni Susuki* aktif.
- **Pintu Geser Rahasia Speakeasy**:
  - Pada jam 23:00 hingga 04:59 subuh, pintu geser kayu misterius dengan simbol dadu merah menyala dan lampion lentera merah remang-remang muncul di dinding lorong samping kedai luar (`outside` scene).

### F. Integrasi Antarmuka UI & Siklus Gameplay (`src/App.jsx`, `src/styles.css`, `src/game.js`)
- **Top HUD & Navigasi**: Tombol HUD "🎴 Takdir" dan "🎲 Chou-Han" bersinar di bilah atas layar, serta tombol akses cepat di bilah navigasi bawah.
- **Modal Interaktif Pohon Takdir**: Kartu Hanafuda aktif ditampilkan dengan bingkai artistik, deskripsi efek terapan, tombol kocok ulang takdir, altar persembahan Ema lengkap dengan input doa, serta ensiklopedia 6 kartu takdir.
- **Modal Interaktif Chou-Han Speakeasy**: Meja tatami gelap dengan siluet bandar Bakuto, mangkuk kocok bambu animasi 3D, sepasang dadu arang bambu, 5 tombol tingkatan taruhan koin, tombol aksi Chou dan Han, papan brankas Jackpot Pool, serta rekaman histori 20 putaran terakhir.
- **Uji Coba & Verifikasi**: 22 unit test suites diverifikasi lulus 100% dan bundle build produksi Vite sukses tanpa kendala.

---

## 15. Tahap 15: Fase 9 (Fitur 5) — Ekspedisi Kapal Selam Palung Laut & Bahan Legendaris Punah (Deep Abyssal Foraging)

### A. Latar Belakang & Desain Penyelaman Abisal Shinkai 2000
Untuk memuaskan hasrat penjelajahan para kolektor dan menghadirkan siklus penantian berbobot tinggi (*high-stakes delayed gratification*), Tahap 15 mengintegrasikan armada kapal selam riset samudra era Showa: **Shinkai 2000 (深海2000)**. Pemain dapat membiayai misi eksplorasi bawah laut ke palung terdalam Samudra Pasifik untuk memanen 4 bahan prasejarah yang telah lama punah dari peradaban manusia, merebusnya di kuali oden bercahaya neon, dan membuka Pustaka Mahakarya Terlarang.

### B. Modul Logika Penyelaman Palung Laut (`src/abyssal.js`)
- **4 Zona Kedalaman Palung Laut**:
  1. 🦑 **Palung Izu-Ogasawara (Zona Senja Samudra / Twilight Zone: 200m - 1.000m)**:
     - *Biaya*: $\yen 3.500$ | *Durasi*: 1 Hari (kembali keesokan fajar).
     - *Target Legendaris*: **Capit Cumi Abisal Neon (`abyssal_squid`)**.
     - *Efek Masakan*: Kuah kaldu dan mangkuk memancarkan cahaya neon biru. Sajian di malam hari (20:00 - 05:00) melipatgandakan tip $2\times$ lipat ($+100\%$) ditambah bonus flat $+\yen 400$.
  2. ✨ **Palung Kristal Bintang (Zona Batipelagik: 1.000m - 3.000m)**:
     - *Biaya*: $\yen 6.000$ | *Durasi*: 2 Hari.
     - *Target Legendaris*: **Konnyaku Kristal Bintang (`starlight_konnyaku`)**.
     - *Efek Masakan*: Konnyaku sebening kaca dari lelehan batu meteorit purba yang menyerap $300\%$ sari rasa kaldu, melipatgandakan kepuasan tamu dan mendongkrak omset hidangan sebesar $+50\%$.
  3. 🎋 **Palung Purba Hutan Yakushima (Zona Abisopelagik: 3.000m - 6.000m)**:
     - *Biaya*: $\yen 10.000$ | *Durasi*: 2 Hari.
     - *Target Legendaris*: **Rebung Emas 1.000 Tahun (`millennium_takenoko`)**.
     - *Efek Masakan*: Mengeluarkan aroma wangi pohon Hinoki purba yang menenangkan seisi kedai; menambah kesabaran seluruh tamu yang sedang menunggu di kedai sebesar $+12$ detik secara pasif!
  4. 🐉 **Palung Hadal Mariana (Zona Terdalam Bumi: 6.000m - 10.920m+)**:
     - *Biaya*: $\yen 18.000$ | *Durasi*: 3 Hari.
     - *Target Legendaris*: **Telur Naga Laut Purba (`ryujin_roe`)**.
     - *Efek Masakan*: Sajian sakral istana dasar samudra Ryugu-jo! Memberikan tambahan reputasi instan $+15$, bonus tunai kramat $+\yen 1.500$, dan membuka Grimoire Legendaris.
- **Pustaka Mahakarya Terlarang (*The Lost Shokunin Grimoire*)**:
  - Menyimpan 4 slot hologram emas bahan abisal. Saat keempat bahan purba berhasil dipanen minimal 1 kali, Grimoire terbuka secara permanen: memberikan reputasi seketika $+50$ dan buff omset kedai permanen **+15%**.

### C. Efek Visual Canvas Retrostil Waktu Nyata (`src/render.js`)
1. **Kuah Panci Bioluminesen Abisal**: Saat bahan abisal direbus di sekat kompartemen panci oden, kuah memancarkan pendaran cahaya neon cyan berdenyut halus (`rgba(0, 210, 211, alpha)`) dan partikel gelembung gas laut melayang ke atas.
2. **Dermaga Kapal Selam Shinkai 2000 di Kanal Luar**:
   - Saat berstatus *Menyelam* (`diving`), pelampung antena radio hidrofon terapung berdenyut memancarkan sinyal sonar biru neon di atas air kanal samping kedai.
   - Saat *Berlabuh* (`returned`), miniatur lambung kapal selam kuning-putih Shinkai 2000 bersandar di dermaga dengan suar hijau menyala dan teks `⚓ SIAP KLAIM!`.

### D. Audio Synthesizer Prosedural Web Audio API Baru (`src/audio.js`)
- `playSonarPing()`: Dentingan sonar frekuensi tinggi 1.760 Hz dengan gema akustik harmonik air dalam 3.520 Hz.
- `playSubmarineEngine()`: Gemuruh baling-baling kapal selam frekuensi rendah (46 Hz - 52 Hz) berguncang.
- `playBubbleAscend()`: Rantai 5 gelembung udara laut meletup berjenjang naik dari 240 Hz hingga 680 Hz.
- `playAbyssalDiscovery()`: Arpeggio akord laut dalam mistis prasejarah (C3 - Eb3 - G3 - Bb3 - C4 - G4).
- `playBioluminescentHum()`: Dengung frekuensi lembut 432 Hz pertanda pendaran senyawa kimia alami laut dalam.

### E. Integrasi Gameplay, Resep Rahasia & UI (`src/App.jsx`, `src/styles.css`, `src/game.js`, `src/recipes.js`)
- **2 Resep Fusi Rahasia Baru**:
  - 🌌 *Nebula Samudra Purba* (Capit Cumi Abisal + Konnyaku Kristal Bintang): Bonus harga $+\yen 900$.
  - 🐉🌊 *Santapan Dewa Naga Ryujin* (Telur Naga Laut Purba + Rebung Emas 1.000 Tahun + Daun Bawang): Bonus harga $+\yen 1.200$.
- **Top HUD & Navigasi**: Tombol HUD "🌊 Shinkai 2000" dengan indikator status dinamis (*Standby*, *Menyelam*, atau *Klaim Tangkapan*), serta tombol navigasi di bilah bawah.
- **Modal Interaktif Kapal Selam**:
  - Layar Radar Sonar berputar memindai dasar laut secara animatif dengan pembacaan kedalaman meteran waktu nyata.
  - Telemetri log transmisi hidrofon dasar samudra.
  - Banner klaim tangkapan beriluminasi hijau saat kapal selam berlabuh.
  - Kartu 4 zona palung laut lengkap dengan spesifikasi kedalaman, risiko, target bahan, dan tombol luncurkan.
  - Galeri slot The Lost Shokunin Grimoire dengan bilah bar progres koleksi.
- **Uji Coba & Verifikasi**: Seluruh 35 unit test suites terverifikasi lulus 100% dan bundle build produksi Vite sukses tanpa kendala.











---

## 10. Full-Project Audit & Deep System Debugging (Audit Menyeluruh & Penstabilan Sistem)

### A. Ruang Lingkup Audit & Pemetaan Sistem
Pemeriksaan end-to-end dilakukan terhadap seluruh 38 file script, dependensi modular, siklus rendering canvas, engine sintesis audio prosedural Web Audio API, serta loop simpan/muat data (`localStorage`).

### B. Daftar Isu Kritis yang Ditemukan & Diperbaiki
1. **Inkonsistensi Tipe Data `G.pop` & `G.storiesUnlocked`**:
   - *Akar Masalah*: Pada inisialisasi awal atau migrasi file save lama, `pop` dapat terisi sebagai integer/angka (`1`), menyebabkan kegagalan fatal `TypeError: Cannot create property on number '1'` saat mengeksekusi `G.pop[i] = (G.pop[i] || 0) + 1`. Selain itu, `storiesUnlocked` yang tersimpan sebagai array akan kehilangan properti key-string saat di-serialize dengan `JSON.stringify()`.
   - *Solusi*: Normalisasi di `newGame()` dan safe sanitization fallback di `loadSavedGame()` memastikan tipe data selalu berupa dictionary object `{}`.
2. **Kehilangan Bahan Oden & Sate Secara Diam-diam (Inventory Destruction Bug)**:
   - *Akar Masalah*: Pemain yang mengambil bahan dari panci ke piring (`takeFromPot`) atau sate bakar ke piring (`plateSate`), lalu menutup dialog pesanan (`closeOrder`) atau tamu pergi karena kehabisan kesabaran (`leaveShop`), mengalami penghapusan total bahan di `G.plate` tanpa dikembalikan ke stok inventaris (`G.stock` / `G.sateStock`).
   - *Solusi*: Menambahkan loop pengembalian refund stok otomatis di `closeOrder()`, `leaveShop()`, dan `undoPlate()` sebelum array piring dikosongkan.
3. **Bahan Abisal Tidak Muncul di Tombol Masak Panci Oden**:
   - *Akar Masalah*: Saat hasil ekspedisi kapal selam diklaim di `claimExpeditionCatch()`, bahan hanya ditambahkan ke `g.stock` tanpa dipasangkan ke `g.owned`. Filter tombol di UI `App.jsx` mengabaikan bahan yang belum ada di `g.owned`.
   - *Solusi*: Menambahkan `g.owned.push(itemId)` saat klaim panen, serta menyempurnakan filter di `App.jsx` agar memeriksa kepemilikan maupun stok positif (`g.owned.includes(aid) || (g.stock[aid] || 0) > 0`).
4. **Race Condition & Spamming Taruhan Dadu Chou-Han**:
   - *Akar Masalah*: Flag `speakeasyState.rolling` dinonaktifkan secara sinkron langsung pada frame yang sama dengan penekanan tombol, menyebabkan dialog animasi dealer terlewati dan memungkinkan spam klik taruhan berulang kali saat audio guncangan dadu masih berputar.
   - *Solusi*: Mengaktifkan guard penolakan taruhan ganda saat dadu berguncang, menonaktifkan tombol di UI `App.jsx` saat `g.speakeasy?.rolling`, dan menyetel reset flag menggunakan `setTimeout(..., 450)`.
5. **Potensi Kesalahan Pembagian dengan Nol (`NaN`) pada Kalkulasi Kepuasan Tamu**:
   - *Akar Masalah*: Ekspresi `(m / c.order.length)` dan `(c.pat / c.max)` pada fungsi `serve()` dapat menghasilkan `NaN` apabila pesanan tamu kosong atau nilai `c.max` bernilai nol.
   - *Solusi*: Ditambahkan fallback guard `orderLen = c.order?.length || 1` dan `maxPat = c.max || 100`, serta penanganan fallback harga bahan tak terdaftar `ITEMS.find(...)?.p || 100`.
6. **Kebocoran Interval Pemutar Musik Kaset Web Audio API**:
   - *Akar Masalah*: Pemanggilan `startCassetteMusic()` berulang kali tidak membersihkan `musicInterval` sebelumnya, menyebabkan tumpukan interval nada yang mengonsumsi memori dan mengacaukan tempo musik.
   - *Solusi*: Ditambahkan pembersihan `clearInterval(musicInterval)` sebelum instans interval baru dibentuk.
7. **Penyempurnaan 20 Selektor CSS yang Belum Terdefinisi di `src/styles.css`**:
   - *Solusi*: Melengkapi definisi styling untuk komponen UI modal, kartu resep, arena pertandingan duel koki Yamada-ya, piala Grand Prix, dan panel bumbu pelengkap.

### C. Hasil Uji Verifikasi Otomatis
- **Vite Production Build**: Berhasil dikompilasi sempurna tanpa peringatan atau error (`67 modules transformed`, 0 error).
- **Audit Test Suite (`test_audit_suite.mjs`)**: 7 skenario uji integrasi kritis lulus 100%.


---

## 11. Redesain Antarmuka Menu: Top HUD Ringkas, Quick-Bar & Sidebar Drawer Showa

### A. Latar Belakang & Masalah Tampilan
Seiring penambahan fitur dari Fase 1 hingga Fase 9 (mencapai 31 modul fitur interaktif), penempatan tombol secara langsung pada layar menghasilkan:
- **Top HUD Bertumpuk**: Lebih dari 20 chip/tombol membungkus menjadi 2 baris yang menutupi bagian atas layar.
- **Bottom Navigation Penuh Sesak**: Sebanyak 29 tombol membungkus menjadi 4 baris tebal yang menutupi separuh bawah kanvas grafis retro kedai oden.

### B. Solusi Arsitektur UI Baru
1. **Top HUD Status Bar (1 Baris Bersih & Terorganisir)**:
   - *Sisi Kiri*: Metrik utama (Kas $\yen$, Waktu & Hari, Cuaca/Festival, Lokasi Distrik, Kaldu Aktif).
   - *Sisi Tengah*: Tombol aksi darurat dan status yang hanya muncul saat sedang aktif (Lilin Pemadaman, Kencangkan Terpal, Arang Salju, Bento Telepon Masuk, Fever Mode, Zen Focus, Arashi Rush).
   - *Sisi Kanan*: Reputasi bintang kedai, tombol bisu/nyala audio, dan tombol utama `[ ☰ MENU KEDAI ]` beraksen neon emas dengan indikator titik berkedip `(!)` jika ada alert yang membutuhkan perhatian.
2. **Bottom Quick-Bar (1 Baris Ringkas Akses Pokok)**:
   - Menyederhanakan 29 tombol menjadi 7 tombol esensial aktivitas kedai: `🚪 Keluar`, `🛒 Pasar`, `📖 Resep`, `🍢 Sate`, `🍲 Kuali Master`, `🏪 Toko & Staf`, `🐱 Kuro`, serta tombol pintas `☰ Manajemen & Fitur (30+)`.
3. **Sidebar Drawer Manajemen Kedai (`SidebarDrawer`)**:
   - Ditambahkan laci navigasi samping (*slide-over drawer*) retro yang meluncur halus dari sisi kanan layar saat tombol menu ditekan atau melalui pintasan keyboard `M` / `Escape`.
   - Mengelompokkan seluruh 30+ fitur ke dalam 5 Tab Kategori Tematik:
     - 🍲 **Dapur & Masak**: Kuali Master, Pisau Koki, Panggangan Sate, Kaldu Kustom, Gudang Fermentasi, Buku Resep.
     - 🏪 **Pasar & Usaha**: Pasar Tradisional, Lelang Tsukiji, Toko & Staf, Dekorasi Kedai, Peta Lokasi, Bento Antar, Pusaka Leluhur.
     - 🏆 **Duel & Musim**: Duel Yamada-ya, Grand Prix Showa, Restoran Dinasti, Siklus 4 Musim, Faksi Distrik, Kereta SL Ginga.
     - 🌙 **Lorong Malam**: Sindikat 03:30, Judi Chou-Han, Shinkai 2000, Sumpah Senja, Warta Insiden, Altar Takdir.
     - 📜 **Arsip & Profil**: Jurnal Cerita, Jejak Reuni, Pohon Keahlian, Album Polaroid, Kucing Kuro, Kaset Radio.
   - Setiap kartu menu dilengkapi ikon, nama, status dinamis (misal: "Deep Dive 2h", "Paten Aktif", "Bento Masuk!"), dan lencana notifikasi `(!)` / `★`.
4. **Tab Mengambang Sisi Kanan (`Floating Tab`)**:
   - Tab vertikal elegan `[ ☰ MENU KEDAI ]` di pinggir kanan layar canvas untuk membuka drawer kapan saja dengan 1 klik.

---

## 12. Audit Kode Fitur demi Fitur & Penambatan Kerentanan (Feature-by-Feature Deep Audit & Hardening)

### A. Metodologi Audit
Pemeriksaan kode komprehensif baris demi baris dijalankan terhadap seluruh 31 sistem gameplay dan modul fungsional di direktori `src/`. Setiap sistem diuji perilakunya saat menghadapi nilai *edge-case*, *null/undefined*, parameter kosong, serta transisi state waktu nyata:

1. **Siklus Hidup & State Game**: `game.js`, `render.js`, `App.jsx`, `audio.js`
2. **Sistem Dapur & Kuliner**: `grill.js`, `dashi.js`, `knifeprep.js`, `recipes.js`, `alchemy.js`, `fermentation.js`
3. **Ekonomi & Pasar**: `auction.js`, `delivery.js`, `seasons.js`, `locations.js`, `dynasty.js`, `expedition.js`
4. **Karakter & Interaksi Sosial**: `characters.js`, `psychology.js`, `lifearc.js`, `factions.js`, `midnight.js`
5. **Turnamen, Tantangan & Sumpah**: `cookoff.js`, `grandprix.js`, `arashi.js`, `pacts.js`, `anomalies.js`, `mastery.js`
6. **Misteri, Takdir & Laut Dalam**: `abyssal.js`, `fate.js`, `speakeasy.js`, `syndicate.js`, `soul.js`, `fortune.js`, `kaiseki.js`

### B. Daftar Bug Nyata & Akar Masalah yang Berhasil Diperbaiki
Sebanyak 15 kerentanan *runtime error* dan *unhandled exception* berhasil diidentifikasi dan ditambal secara langsung:

1. **`src/characters.js` — Crash Pelayanan Inspektur Sanitasi (`sanitation`)**:
   - *Akar Masalah*: Karakter khusus Inspektur Kato (`sanitation`) tidak memiliki properti dialog cerita bertingkat (`stories`). Ketika ia dilayani dengan kepuasan $\ge 75\%$, pemanggilan `checkStoryTrigger` menabrak `char.stories.length` dari `undefined`, memicu `TypeError` fatal yang memutus proses penyelesaian pesanan.
   - *Perbaikan*: Ditambahkan pemeriksaan `Array.isArray(char.stories)` dan *default argument* pada `checkStoryTrigger`.
2. **`src/auction.js` — Crash Inisialisasi Lelang Tsukiji**:
   - *Akar Masalah*: Fungsi `createAuctionSession(day)` mengasumsikan parameter `day` selalu valid. Jika dipanggil tanpa argumen atau saat `day` bernilai `undefined`, ekspresi `(undefined - 1) % AUCTION_ITEMS.length` menghasilkan `NaN`, sehingga `AUCTION_ITEMS[NaN]` bernilai `undefined` dan memicu `TypeError: Cannot read properties of undefined (reading 'basePrice')`.
   - *Perbaikan*: Menambahkan default parameter `day = 1` dengan *sanitization guard* `Number.isFinite(day) && day > 0`.
3. **`src/kaiseki.js` — Kerentanan Evaluasi Plating Wabi-Sabi**:
   - *Akar Masalah*: Evaluasi `calculateKaisekiScore` langsung mengakses `plateCondiments.length` tanpa perlindungan *nullish*. Jika piring disajikan tanpa array kondimen, game melempar uncaught error.
   - *Perbaikan*: Menambahkan *default parameters* `(plate = [], plateCondiments = [], plateSate = [])` dan pemeriksaan tipe `Array.isArray`.
4. **`src/mastery.js` — Kerentanan Akses Array Pohon Keahlian**:
   - *Akar Masalah*: Fungsi `canUnlockSkill` memanggil `unlockedSkills.includes(skillId)` tanpa validasi keberadaan array.
   - *Perbaikan*: Menambahkan sanitasi *safe unlocked array fallback* `Array.isArray(unlockedSkills) ? unlockedSkills : []`.
5. **`src/midnight.js` — Crash Evaluasi Teka-Teki Shinya & Hari Tak Valid**:
   - *Akar Masalah*: `getMidnightGuest` menghasilkan `undefined` jika `day` bernilai `NaN`/tak bertipe numerik. Selain itu, `evaluateMidnightRiddle` berpotensi *freeze* jika piring saji tidak membawa array kondimen.
   - *Perbaikan*: Diberikan proteksi nilai hari positif dan jaminan array fallback `plate = []` serta `plateCondiments = []`.
6. **`src/recipes.js` — Kerentanan Eksekusi Cek Penemuan Resep (*Recipe Discovery*)**:
   - *Akar Masalah*: `.every()` dipanggil langsung pada `plateItems` dan `plateCondiments` tanpa jaminan tipe data array.
   - *Perbaikan*: Menambahkan *safe array wrap* untuk seluruh parameter piring dan resep terbuka (`unlockedList`).
7. **`src/seasons.js` — Kerusakan Indeks Musim & Berita Pasar Harian**:
   - *Akar Masalah*: Pada `getSeasonForDay(day)` dan `generateDailyMarketNews(day)`, nilai `day` yang `undefined` menghasilkan `NaN`, mengembalikan `undefined` dan merusak visual kalender musim serta fluktuasi harga komoditas.
   - *Perbaikan*: Ditambahkan fallback hari default aman `safeDay` dan *fallback return* ke entri default pertama.
8. **`src/intrigue.js` — Kerentanan Inspeksi Sanitasi Kuali & Gerobak Saingan**:
   - *Akar Masalah*: `potSlots.reduce` dan `G.grillSlots.filter` dipanggil tanpa verifikasi keberadaan array slot panggangan atau sekat panci.
   - *Perbaikan*: Ditambahkan array checks `Array.isArray` pada `potSlots`, `grillSlots`, dan `G.rivalStall`.
9. **`src/alchemy.js` — Guard Mutasi State Paten Kaldu Kustom**:
   - *Akar Masalah*: Pendaftaran paten kaldu di `patentCustomBroth` langsung memotong saldo kas dan menambah reputasi tanpa verifikasi integritas objek state pemain.
   - *Perbaikan*: Ditambahkan pengecekan numerik eksplisit pada `g.money`, `g.rep`, serta proteksi array notifikasi teks `g.floats`.
10. **`src/fate.js` — Guard Ritual Gantung Papan Ema**:
    - *Akar Masalah*: Fungsi `hangCelestialEma` mengasumsikan properti kas dan reputasi selalu tersedia dalam bentuk numerik.
    - *Perbaikan*: Ditambahkan pengamanan pemotongan biaya uang kas, penambahan reputasi, dan array doa kayu `emaWishes`.
11. **`src/fermentation.js` — Validasi Transaksi Fermentasi Gentong**:
    - *Akar Masalah*: `startFermenting` langsung mengurangkan biaya resep dari kas pemain tanpa pengecekan tipe data `g.money`.
    - *Perbaikan*: Menambahkan validasi `typeof g.money === 'number'` dan penjagaan ketersediaan `cellar.vats`.
12. **`src/delivery.js` — Guard Pengemasan Bento Telepon Putar**:
    - *Akar Masalah*: `packItemToBento` mengakses `stock[itemId]` tanpa verifikasi keberadaan objek inventaris `stock`.
    - *Perbaikan*: Diberikan penjagaan `!stock || (stock[itemId] || 0) <= 0`.
13. **`src/soul.js` — Proteksi Notifikasi Jiwa Koki**:
    - *Akar Masalah*: Pembaruan metrik jiwa koki `evaluateSoulArchetype` langsung memanggil `g.floats.push` tanpa memastikan array `floats` telah terinisialisasi.
    - *Perbaikan*: Diberikan pengecekan eksistensi `if (g.floats && arch)`.
14. **`src/dashi.js` — Kepastian Nilai Kembalian Saring Kaldu (`skimVat`)**:
    - *Akar Masalah*: Fungsi `skimVat` mengembalikan `undefined`, menyebabkan pemanggil yang mengharapkan nilai boolean kepastian status menerima falsy.
    - *Perbaikan*: Mengembalikan `true` secara eksplisit saat penyaringan berhasil.
15. **`src/grandprix.js` — Penambahan Status Return Nilai Uji Dashi**:
    - *Akar Masalah*: `submitDashiTasting` (Babak 1 Grand Prix) tidak mengembalikan status eksekusi atau skor pemain/rival ke pemanggil.
    - *Perbaikan*: Mengembalikan objek `{ success: true, pScore, rScore }` agar pemanggil UI dapat membaca skor babak secara reaktif.

### C. Ringkasan File yang Dimodifikasi
| Berkas Script | Lingkup Perbaikan |
|---|---|
| `src/characters.js` | Penanganan aman karakter tanpa cerita bertingkat (`sanitation`). |
| `src/auction.js` | Guard parameter `day` pada inisialisasi lelang pasar Tsukiji. |
| `src/kaiseki.js` | Default parameter array aman pada evaluasi estetika plating. |
| `src/mastery.js` | Guard array kepemilikan skill pada pohon keahlian koki. |
| `src/midnight.js` | Guard evaluasi teka-teki puitis dan indeks tamu nokturnal. |
| `src/recipes.js` | Safe array parameter checks pada sistem penemuan resep rahasia. |
| `src/seasons.js` | Sanitasi kalkulasi indeks musim 4 cuaca dan berita pasar harian. |
| `src/intrigue.js` | Guard pengecekan kebersihan kuali dan gerobak saingan Yamada-ya. |
| `src/alchemy.js` | Proteksi numerik saldo dan float teks pada paten kaldu kustom. |
| `src/fate.js` | Proteksi transaksi ritual gantung papan kayu doa Ema. |
| `src/fermentation.js` | Validasi saldo uang kas dan array gentong bawah tanah. |
| `src/delivery.js` | Guard objek stok saat pengemasan bento bersepeda. |
| `src/soul.js` | Guard visual pendaran teks notifikasi jiwa koki. |
| `src/dashi.js` | Kepastian nilai kembalian boolean `true` pada penyaringan biang kaldu. |
| `src/grandprix.js` | Pengembalian objek hasil penilaian skor Dashi Blind Tasting. |

### D. Hasil Verifikasi Akhir
- **Automated Test Runner**: Seluruh 20 skenario uji modular lulus 100% tanpa error (*Zero Failures*).
- **Vite Production Bundler**: Kompilasi produksi berhasil tanpa kendala (`67 modules transformed, built in 944ms`, 0 warning/error).



---

## 13. Redesain & Polishing Visual Total Bertema Retro Pixel Art (16-Bit Showa Era Aesthetics)

Berdasarkan permintaan untuk mempercantik seluruh tampilan antarmuka visual permainan tanpa meninggalkan esensi tema pixel retro, telah dilakukan pembaruan grafis dan UI styling secara menyeluruh dari lapisan kanvas procedural rendering hingga komponen modal HTML/CSS:

### A. Atmosfer Layar & Emulasi Monitor CRT Retro
1. **Lapisan CRT Scanlines & Screen Vignette (`src/App.jsx` & `src/styles.css`)**:
   - Menambahkan elemen `<div className="crt-overlay" />` di atas canvas permainan.
   - Menggunakan teknik linear scanlines horizontal statis tiap 3px berpadu dengan radial vignette lembut di keempat sudut layar untuk menghadirkan nuansa monitor tabung arcade Showa era autentik tanpa mengganggu performa dan tanpa menghalangi interaksi klik kursor mouse (`pointer-events: none`).
2. **Bezel Kabinet Arcade 4-Lapis**:
   - Container panggung utama (`.stage`) kini diperkuat dengan multibevel bingkai kayu jati pernis dan bodi arcade hitam (`0 0 0 3px #000, 0 0 0 7px #2e1a12, 0 0 0 10px #150a06, 0 0 0 12px #000`), memberikan kedalaman fisik seperti mesin dingdong retro.

### B. Polishing Canvas Rendering & Kontras Teks Pixel (`src/render.js`)
1. **Helper Pixel Outline `Toutline`**:
   - Diimplementasikan fungsi `Toutline(s, x, y, c, z, outline)` untuk menggambar outline pixel hitam solid 1px di sekeliling teks mengambang dinamis (`G.floats`) dan papan nama outdoor gerobak (`ODEN`, `YAMADA`, `BAR`, `⚓ SIAP`, `📡 SELAM`). Teks kini selalu tajam dan kontras tinggi di atas partikel salju, hujan, maupun lampu lentera malam.
2. **Refleksi Genangan Air Aspal Basah**:
   - Adegan luar kedai (`outside`) saat cuaca hujan deras kini memancarkan pantulan cahaya lentera merah di genangan air jalanan dengan kerlipan *specular glint* pixelated yang hidup.
3. **Relief Kayu 3D Noren**:
   - Spanduk kain dan palang kayu noren gerobak diberi bayangan pixel terstruktur sehingga terlihat memiliki volume nyata.

### C. Pembersihan Total Sudut Rounded Modern & Penyeragaman 16-Bit UI (`src/styles.css`)
1. **Normalisasi Sudut Kotak Tajam (Zero `border-radius`)**:
   - Menghapus lebih dari 50 deklarasi `border-radius: [1-9]px` modern yang sebelumnya membuat beberapa modal tampak tidak konsisten. Seluruh jendela popup, kartu ekspedisi, papan resep, slot panggangan yakitori, botol sake, hingga chip bumbu distandarisasi ke bentuk sudut kotak pixel murni (`border-radius: 0;`).
2. **Double Pixel Bevel & Tactile Press Feedback**:
   - Komponen `.box` dan `.btn` kini mengusung double pixel stroke (`border: 2px solid #000; outline: 2px solid #d4b886`) dengan bayangan inset 3D yang memberikan respon tekan fisik nyata (`transform: translate(2px, 2px)`) layaknya tombol mikrosaklar arcade.
3. **Scrollbar Pixel Art Kustom Universal**:
   - Track scrollbar bertema malam Showa (`#06040b`) dipadu thumb balok kayu bertekstur pixelated (`#d35400`) dengan border hitam 1px tegas di seluruh kontainer modal yang dapat di-scroll.
4. **Kotak Dialog Percakapan Bergaya Classic JRPG**:
   - Kotak dialog pelanggan (`.dialogue-modal`) dirombak menyerupai gaya JRPG legendaris era 90-an (*Dragon Quest* / *Earthbound*) dengan bingkai ganda kayu gelap beraksen emas, pigura avatar pixel speaker berlatar malam, dan opsi pilihan berpenanda panah retro (`▶`).
5. **HUD Atas & Konsol Telemetri Palung Laut**:
   - HUD atas ditata menyerupai panel instrumen dasbor kedai dengan jam LED retro, plakat koin emboss, dan panel status kapal selam Shinkai 2000 berbingkai radar sonar cyan retro.

### D. Status Uji & Kompilasi
- **Vite Build**: Sukses 100% (`✓ built in 1.08s`, 0 error, 0 warning).


---

## 14. Audit Komprehensif Seluruh Fitur & Perbaikan Bug Tersembunyi (End-to-End Dynamic Testing)

Melalui simulasi pengujian mendalam lintas seluruh 38 modul script dan interaksi gameplay (meliputi state machine, game loop, siklus hari, minigame, dan input ekstrem), telah diidentifikasi dan diperbaiki 10 bug tersembunyi berisiko tinggi:

### A. Rincian Temuan Masalah & Solusi Teknis
1. **`src/game.js` — Crash Out of Bounds pada Sekat Panci (`addToPot`)**:
   - *Akar Masalah*: Pemanggilan `addToPot(compIdx, itemId)` dengan indeks sekat yang tidak valid atau di luar jangkauan memicu `TypeError: Cannot read properties of undefined (reading 'length')` karena `G.potSlots[compIdx]` menghasilkan `undefined`.
   - *Perbaikan*: Menambahkan penjagaan `const comp = G.potSlots?.[compIdx]; if (!comp || comp.length >= 6) return false;`.

2. **`src/speakeasy.js` — Kerentanan Polusi `NaN` pada Kas Pemain di Arena Chou-Han**:
   - *Akar Masalah*: Evaluasi taruhan `Math.max(500, betAmount || ...)` mengembalikan nilai `NaN` jika `betAmount` bernilai `NaN`. Operasi `g.money -= bet` dan `g.money += winAmount` menyebabkan seluruh saldo kas pemain rusak permanen menjadi `NaN`.
   - *Perbaikan*: Diberikan validasi tipe numerik eksplisit `typeof betAmount === 'number' && !isNaN(betAmount)` dengan `Math.floor`, penjagaan saldo kas `typeof g.money === 'number'`, serta sanitasi notifikasi teks melayang.

3. **`src/anomalies.js` — Crash Destructuring & Notifikasi Teks Melayang pada `onIncidentServe`**:
   - *Akar Masalah*: Fungsi `onIncidentServe(anomalyState, g, serveData)` mendestrukturisasi properti `customer`, `kaisekiScore`, dan `sat` dari `serveData` tanpa nilai default parameter, mengakibatkan crash saat dipanggil tanpa argumen ketiga. Selain itu, terdapat duplikasi blok penutup kode sintaksis dan pemanggilan `g.floats.push` tanpa pengecekan tipe array.
   - *Perbaikan*: Menambahkan default parameter `serveData = {}`, perlindungan `Array.isArray(g.floats)` pada seluruh penanganan insiden, serta pembersihan duplikasi baris kode.

4. **`src/abyssal.js` — Proteksi Nullish Ekspedisi Kapal Selam Palung Laut Shinkai 2000**:
   - *Akar Masalah*: Fungsi `launchExpedition`, `advanceExpeditionDay`, dan `claimExpeditionCatch` mengakses properti `g.money`, `g.stock`, `g.owned`, dan `g.floats` tanpa perlindungan ketersediaan objek/array ketika state eksternal belum siap.
   - *Perbaikan*: Ditambahkan inisialisasi default `g.stock = g.stock || {}`, penjagaan tipe saldo `g.money = (g.money || 0) - zone.cost`, dan safe check `Array.isArray(g?.floats)`.

5. **`src/pacts.js` — Crash Array Indexing pada Pencarian Bahan Sesaji Roh Gaki (`feedGaki`)**:
   - *Akar Masalah*: Pada loop pencarian bahan sesaji di `g.potSlots`, elemen slot diakses langsung dengan `.findIndex` tanpa verifikasi apakah slot tersebut bertipe array valid (`Array.isArray(g.potSlots[c])`).
   - *Perbaikan*: Ditambahkan pengecekan `if (!Array.isArray(g.potSlots[c])) continue;` dan penjagaan eksistensi objek item `it && it.id === itemId`.

6. **`src/fate.js` — Null Safety pada Ritual Pengocokan Ulang & Papan Ema**:
   - *Akar Masalah*: `drawDailyFateCard` dan `rerollFateCard` memanggil `g.floats.push` langsung dan mengasumsikan `g.day` selalu ada tanpa nullish guard pada objek `g`.
   - *Perbaikan*: Ditambahkan `g?.day || 1`, safe push `Array.isArray(g?.floats)`, dan verifikasi `typeof g.money === 'number'`.

7. **`src/syndicate.js` — Proteksi Kas & Array Pusaka Terlarang**:
   - *Akar Masalah*: `buySyndicateRelic` dan `hideContraband` mengakses dan memodifikasi `g.money` serta `g.floats` tanpa validasi keberadaan objek state `g`.
   - *Perbaikan*: Ditambahkan pengecekan tipe numerik saldo `!g || typeof g.money !== 'number'`, inisialisasi `state.ownedRelics = state.ownedRelics || []`, dan proteksi `Array.isArray(g.floats)`.

8. **`src/lifearc.js` — Crash Akses Properti Milestone Jejak Reuni**:
   - *Akar Masalah*: `advanceCharacterArc` mengakses `LIFE_MILESTONES[charId][arcState.progress[charId] - 1].title` tanpa safe navigation `?.`, berisiko crash jika indeks melebihi data milestone yang tersedia.
   - *Perbaikan*: Digunakan safe chaining `LIFE_MILESTONES[charId]?.[...]` dan proteksi array float teks serta kalkulasi saldo kas.

9. **`src/alchemy.js` — Proteksi NaN Harmoni Kaldu Kustom**:
   - *Akar Masalah*: `calculateHarmony(params)` mendestrukturisasi parameter rasa tanpa nilai default, menghasilkan `NaN` saat salah satu parameter bernilai `undefined`.
   - *Perbaikan*: Diberikan parameter default nilai tengah `umami = 50, amami = 50, shio = 50, kaori = 50, koku = 50` pada `calculateHarmony`.

10. **`src/fermentation.js` — Crash Array Inspection pada Pasangan Makanan & Sake**:
    - *Akar Masalah*: `evaluateSakePairing(plateItems, sakeType)` memanggil `.some()` pada `plateItems` tanpa verifikasi tipe array.
    - *Perbaikan*: Ditambahkan safe wrap `const safePlate = Array.isArray(plateItems) ? plateItems : []`.

### B. Hasil Pengujian Akhir
- **Automated Lifecycle & Mechanics Test**: Seluruh 15 fitur inti dan 7 subsistem minigame lulus 100% tanpa error (*Zero Failures*).
- **Vite Production Bundler**: Kompilasi produksi berhasil bersih tanpa error (`✓ built in 1.17s`, 0 error, 0 warning).
