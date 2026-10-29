// Sistem Kustomisasi Kedai & Racikan Kaldu Harian

export const BROTHS = [
  {
    id: 'kombu',
    name: 'Kombu & Shoyu Klasik',
    icon: '🥣',
    desc: 'Kaldu rumput laut & kecap asin tradisional. Rasa gurih seimbang yang disukai semua orang.',
    color: '#c28a3c',
    bonus: 'Kepuasan umum +10%'
  },
  {
    id: 'spicy',
    name: 'Kaldu Tulang Sapi Pedas',
    icon: '🌶️',
    desc: 'Rebusan rempah pedas yang menghangatkan tenggorokan. Favorit Detektif Kenzo.',
    color: '#b33939',
    bonus: 'Penjualan daging/urat sapi +25%'
  },
  {
    id: 'miso',
    name: 'Kaldu Miso Manis Menghangatkan',
    icon: '🍲',
    desc: 'Pasta kedelai fermentasi kental yang manis lembut. Disukai Hana & Pak Gimin.',
    color: '#d4a548',
    bonus: 'Kesabaran tamu +5 detik saat hujan deras'
  }
]

export const NORENS = [
  {id: 'merah', name: 'Tirai Merah Klasik', color: '#7a1d1d', desc: 'Warna kedai oden tradisional era Showa', cost: 0},
  {id: 'indigo', name: 'Tirai Biru Indigo Ombak', color: '#1b2a4e', desc: 'Kain celup nila dengan corak ombak laut tenang', cost: 350},
  {id: 'putih', name: 'Tirai Putih Zen', color: '#e0d8c3', desc: 'Kain katun putih krem bernuansa bersih & elegan', cost: 500}
]

export const BOWLS = [
  {id: 'tanah', name: 'Mangkuk Tanah Liat Rustik', desc: 'Tembikar buatan tangan bertekstur kasar hangat', cost: 0},
  {id: 'biru', name: 'Mangkuk Keramik Ombak Biru', desc: 'Porselen halus bermotif ombak tradisional', cost: 400}
]

export const ORNAMENTS = [
  {id: 'none', name: 'Meja Bersih', icon: '🧹', desc: 'Tanpa pajangan tambahan di meja', cost: 0},
  {id: 'manekineko', name: 'Patung Maneki-neko', icon: '🐱', desc: 'Pajangan kucing pengundang rezeki (Uang tip bertambah +15%)', cost: 600},
  {id: 'krisan', name: 'Vas Bunga Krisan Malam', icon: '🌼', desc: 'Aroma bunga segar yang menenangkan (Kesabaran tamu +5 detik)', cost: 450}
]
