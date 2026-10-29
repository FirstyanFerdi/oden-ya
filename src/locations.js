// Sistem Peta Kota & Pindah Lokasi Kedai

export const LOCATIONS = [
  {
    id: 'stasiun',
    name: 'Gang Stasiun Kereta Tua',
    title: 'Awal Perjalanan',
    icon: '🚉',
    repReq: 0,
    bonusDesc: 'Lokasi awal yang damai. Pegawai kantoran & pelajar sering mampir berteduh.',
    priceMultiplier: 1.0,
    tipMultiplier: 1.0,
    bgColor: '#0a0d1e',
    particle: 'rain',
    unlocked: true
  },
  {
    id: 'sakura',
    name: 'Tepi Kanal Bawah Pohon Sakura',
    title: 'Romantisme Musim Gugur',
    icon: '🌸',
    repReq: 35,
    bonusDesc: 'Pemandangan indah kelopak sakura berguguran. Harga jual makanan meningkat +25%!',
    priceMultiplier: 1.25,
    tipMultiplier: 1.2,
    bgColor: '#160d24',
    particle: 'sakura',
    unlocked: false
  },
  {
    id: 'shinjuku',
    name: 'Distrik Lampu Neon Kota',
    title: 'Pusat Kehidupan Malam',
    icon: '🏙️',
    repReq: 75,
    bonusDesc: 'Lampu neon futuristik memantul di aspal basah. Uang tip melimpah ruah (+50%)!',
    priceMultiplier: 1.5,
    tipMultiplier: 1.5,
    bgColor: '#0d091a',
    particle: 'neon',
    unlocked: false
  }
]
