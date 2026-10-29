// Karakter Khusus, Dialog Bercabang, dan Peristiwa Acak (Random Encounters)

export const CHARACTERS = {
  gimin: {
    id: 'gimin',
    name: 'Pak Gimin',
    title: 'Pegawai Kantor Lelah',
    avatar: '👔',
    hair: '#1f1b24',
    shirt: '#4b6584',
    favItems: ['egg', 'chikuwa'],
    favCondiment: 'ocha',
    favMusic: 'jazz',
    stories: [
      {
        chapter: 1,
        title: 'Lembur Lagi...',
        dialogue: 'Hah... akhirnya sampai di kedai ini. Bos di kantor tadi marah-marah cuma karena salah ketik satu angka di laporan. Menurutmu, apa aku terlalu tua untuk bertahan di kantor itu?',
        choices: [
          {
            text: 'Sabar Pak, yang penting rezeki halal untuk keluarga.',
            response: 'Kamu benar... wajah anak dan istriku di rumah yang bikin aku kuat.',
            affinity: 2,
            reward: 'Uang Tip Ekstra +¥100'
          },
          {
            text: 'Jangan biarkan amarah bos merusak malam hangat ini. Nikmati odennya!',
            response: 'Haha! Benar juga kata pemilik kedai. Kuah ini jauh lebih berharga dari ocehan bos!',
            affinity: 3,
            reward: 'Reputasi +4'
          }
        ]
      },
      {
        chapter: 2,
        title: 'Mimpi Masa Muda',
        dialogue: 'Dulu waktu SMA, saya bercita-cita jadi komikus. Buku gambarku masih tersimpan di lemari. Apa menurutmu konyol kalau orang seumuranku masih ingin menggambar komik di akhir pekan?',
        choices: [
          {
            text: 'Tidak ada kata terlambat untuk berkarya, Pak!',
            response: 'Mendengar itu dari orang muda sepertimu... hatiku rasanya bergetar. Aku akan mulai menggambar lagi malam ini!',
            affinity: 4,
            reward: 'Pak Gimin membuka impian komiknya (+¥250)'
          },
          {
            text: 'Jadikan komik sebagai hobi pelepas lelah saja.',
            response: 'Iya ya, tanpa beban komersial, menggambar bisa jadi terapi jiwa terbaik.',
            affinity: 2,
            reward: 'Reputasi +3'
          }
        ]
      },
      {
        chapter: 3,
        title: 'Kabar Bahagia',
        dialogue: 'Pemilik kedai! Komik pendek yang kukirim ke kompetisi online kemarin masuk nominasi 5 besar! Rasanya seperti mimpi!',
        choices: [
          {
            text: 'Selamat Pak Gimin! Kedai ini bangga padamu!',
            response: 'Terima kasih banyak! Kamulah orang pertama yang percaya padaku saat aku hampir menyerah.',
            affinity: 5,
            reward: 'Langganan Setia: Pak Gimin memberi tip +50% selamanya!'
          }
        ]
      }
    ]
  },
  hana: {
    id: 'hana',
    name: 'Hana',
    title: 'Siswi Perantau',
    avatar: '🎒',
    hair: '#574b90',
    shirt: '#e15f41',
    favItems: ['kinchaku', 'daikon'],
    favCondiment: 'scallion',
    favMusic: 'lofi',
    stories: [
      {
        chapter: 1,
        title: 'Payung yang Tertinggal',
        dialogue: 'Permisi paman... untung kedai ini buka! Payung saya tertinggal di perpustakaan kota. Dingin banget... kadang rasanya kesepian tinggal sendirian di kota besar ini.',
        choices: [
          {
            text: 'Di kedai ini, kamu tidak pernah sendirian. Hangatkan badanmu.',
            response: 'Huu... paman baik sekali. Rasa mochi kinchaku ini seperti pelukan hangat.',
            affinity: 3,
            reward: 'Reputasi +3'
          },
          {
            text: 'Perantauan memang keras, tapi ini yang akan mendewasakanmu.',
            response: 'Iya paman! Aku tidak boleh cengeng demi orang tua di kampung.',
            affinity: 2,
            reward: 'Tip Tambahan +¥120'
          }
        ]
      },
      {
        chapter: 2,
        title: 'Kecemasan Ujian',
        dialogue: 'Minggu depan ujian masuk perguruan tinggi sastra. Saya takut sekali blank saat menjawab soal.',
        choices: [
          {
            text: 'Tarik napas dalam-dalam. Usahamu selama ini tidak akan mengkhianati.',
            response: 'Terima kasih paman... kuah kaldu oden ini menenangkan debaran dadaku.',
            affinity: 3,
            reward: 'Jimat Ketenangan: Kesabaran tamu +3 detik'
          },
          {
            text: 'Jangan belajar larut malam lagi, tidur cukup itu kuncinya.',
            response: 'Betul juga paman. Malam ini setelah makan, aku akan istirahat total.',
            affinity: 2,
            reward: 'Reputasi +4'
          }
        ]
      },
      {
        chapter: 3,
        title: 'Lolos Seleksi Sastra!',
        dialogue: 'Paman! Aku lolos ke jurusan sastra nomor satu! Surat penerimaannya baru tiba sore tadi!',
        choices: [
          {
            text: 'Luar biasa, Hana! Masa depan cerah menantimu!',
            response: 'Semua ini berkat kedai paman yang jadi tempat berteduh teraman saat aku gundah!',
            affinity: 5,
            reward: 'Keberuntungan Pelajar: Bonus Reputasi +15'
          }
        ]
      }
    ]
  },
  kenzo: {
    id: 'kenzo',
    name: 'Detektif Kenzo',
    title: 'Penyelidik Malam',
    avatar: '🕵️',
    hair: '#2c3e50',
    shirt: '#7f8c8d',
    favItems: ['gyusuji', 'tako'],
    favCondiment: 'karashi',
    favMusic: 'citypop',
    stories: [
      {
        chapter: 1,
        title: 'Jejak di Tengah Gerimis',
        dialogue: 'Beri aku yang hangat dan pedas, Kawan. Malam ini kota terasa sunyi, tapi firasat detektifku berkata ada pergerakan mencurigakan di dermaga.',
        choices: [
          {
            text: 'Hati-hati di jalan Kenzo, kota ini butuh penjaga seperti dirimu.',
            response: 'Terima kasih, Kawan. Dengan semangkuk urat sapi berkaldu pedas ini, energiku terisi penuh.',
            affinity: 3,
            reward: 'Tip Tambahan +¥200'
          },
          {
            text: 'Jangan bekerja terlalu keras sampai lupa istirahat.',
            response: 'Haha, penjahat tidak kenal jam istirahat! Tapi kamu benar, semangkuk oden ini jeda terbaikku.',
            affinity: 2,
            reward: 'Reputasi +3'
          }
        ]
      },
      {
        chapter: 2,
        title: 'Kasus Terakhir',
        dialogue: 'Tiga bulan lagi aku pensiun dari kepolisian. Rasanya aneh membayangkan malam tanpa pistol dan lencana.',
        choices: [
          {
            text: 'Setelah pensiun, kamu bisa mampir ke sini setiap malam sebagai tamu santai.',
            response: 'Ide cemerlang! Duduk santai di bangku ini tanpa perlu memikirkan kasus terdengar seperti surga.',
            affinity: 4,
            reward: 'Detektif Kenzo menjadi Pelindung Kedai (Keamanan +100%)'
          }
        ]
      }
    ]
  },
  sumi: {
    id: 'sumi',
    name: 'Nenek Sumi',
    title: 'Penghuni Kota Tua',
    avatar: '👵',
    hair: '#d2dae2',
    shirt: '#10ac84',
    favItems: ['konnyaku', 'atsuage'],
    favCondiment: 'ocha',
    favMusic: 'shamisen',
    stories: [
      {
        chapter: 1,
        title: 'Lentera Merah Nostalgia',
        dialogue: 'Aduh ramahnya... melihat lentera merah kedai ini rasanya seperti melihat kembali kedai oden zaman kakek masih hidup 40 tahun lalu.',
        choices: [
          {
            text: 'Semoga rasa oden kami bisa membawa kenangan manis bagi Nenek.',
            response: 'Sangat manis, Nak. Kaldu kombumu mengingatkanku pada masa muda kami yang penuh senyum.',
            affinity: 3,
            reward: 'Berkah Nenek: Reputasi +5'
          }
        ]
      },
      {
        chapter: 2,
        title: 'Rahasia Tahu Goreng',
        dialogue: 'Tahukah kamu rahasia agar tahu goreng empuk meresap? Harus direbus perlahan dengan api kecil, jangan terburu-buru.',
        choices: [
          {
            text: 'Terima kasih ilmunya Nenek Sumi, akan saya terapkan selalu.',
            response: 'Anak yang rendah hati pasti masakannya disukai banyak orang. Ini hadiah resep kuno untukmu.',
            affinity: 4,
            reward: 'Resep Nenek: Harga jual tahu goreng meningkat +¥50'
          }
        ]
      }
    ]
  }
}

// Karakter Acak Spesial (Random Encounters)
export const SPECIAL_ENCOUNTERS = {
  pengembara: {
    id: 'pengembara',
    name: 'Kakek Pengembara',
    avatar: '🎋',
    hair: '#ecf0f1',
    shirt: '#95a5a6',
    dialogue: 'Maafkan orang tua ini... saya kehujanan dan sudah dua hari belum makan. Uang saya sudah habis dicuri orang... bolehkah saya minta kuah hangat?',
    choices: [
      {
        text: 'Tentu Kakek! Duduklah, saya siapkan semangkuk oden hangat gratis.',
        response: 'Air mata saya menetes... semoga kemurahan hatimu dibalas berlipat ganda, Pemilik Kedai.',
        isGenerous: true,
        reward: 'Karma Baik: Kakek berjanji akan membalas kebaikanmu!'
      },
      {
        text: 'Maaf Kek, ini tempat usaha bukan yayasan sosial.',
        response: 'Saya mengerti... terima kasih sudah mendengarkan.',
        isGenerous: false,
        reward: 'Reputasi -2'
      }
    ]
  },
  kritikus: {
    id: 'kritikus',
    name: 'Tuan Arata (Kritikus Kuliner)',
    avatar: '🧐',
    hair: '#1e272c',
    shirt: '#d35400',
    dialogue: 'Saya mendengar kabar burung ada kedai oden tersembunyi di gang hujan ini. Sajikan padaku oden terbaikmu dengan kematangan sempurna!',
    favItems: ['daikon', 'gyusuji', 'tako'],
    reward: 'Ulasan Koran Bintang 5: Reputasi Kedai Meroket +20!'
  },
  ryu: {
    id: 'ryu',
    name: 'Tuan Ryu',
    title: 'Bos Yakuza Kota Malam',
    avatar: '🐉',
    hair: '#111111',
    shirt: '#f5f6fa',
    isBoss: true,
    dialogue: 'Beri aku oden daging terpanas dengan Karashi ekstra pedas membakar lidah! Cepat, mobil pengawalku sudah menunggu di seberang gang!',
    favItems: ['gyusuji', 'tako', 'chikuwa'],
    favCondiment: 'karashi',
    patience: 14,
    rewardMoney: 4500,
    rewardRep: 12,
    failRep: -6
  },
  vivienne: {
    id: 'vivienne',
    name: 'Nyonya Vivienne',
    title: 'Kritikus Panduan Michelin',
    avatar: '🎩',
    hair: '#8c7ae6',
    shirt: '#2f3640',
    isBoss: true,
    dialogue: 'Teka-teki untukmu: Sajikan padaku cita rasa samudra di malam musim dingin dengan minuman yang menenangkan jiwa.',
    favItems: ['tako', 'konnyaku'],
    favCondiment: 'ocha',
    patience: 18,
    rewardMoney: 3000,
    rewardRep: 15,
    failRep: -4
  },
  inspector: {
    id: 'inspector',
    name: 'Pak Masaru (Tamu Misterius)',
    title: 'Inspektur Michelin Menyamar',
    avatar: '🕵️‍♂️',
    hair: '#34495e',
    shirt: '#7f8c8d',
    isInspector: true,
    dialogue: 'Saya ingin semangkuk oden dashi murni dengan kematangan rebusan emas tanpa cela. Bisakah kedai kecil ini memuaskan lidah saya?',
    favItems: ['daikon', 'tamago', 'kinchaku'],
    favCondiment: 'scallion',
    patience: 20,
    rewardMoney: 5000,
    rewardRep: 25,
    failRep: -8
  }
}

export function checkStoryTrigger(charId, currentProgress, satisfaction) {
  const char = CHARACTERS[charId]
  if (!char || satisfaction < 0.75) return null
  const currentChapter = currentProgress[charId] || 0
  if (currentChapter < char.stories.length) {
    return char.stories[currentChapter]
  }
  return null
}
