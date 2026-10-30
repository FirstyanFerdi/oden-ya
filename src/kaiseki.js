// Seni Tata Hidang Estetika Kaiseki & Album Foto Polaroid Nostalgia Showa
// Penilaian harmoni visual piring saji (Wabi-Sabi) & galeri foto instan kenangan para tamu.

export const POLAROID_ALBUM = [
  {
    id: 'polaroid_salaryman',
    title: 'Malam Gaji Pertama Tuan Tanaka',
    guestName: 'Tuan Tanaka (Salaryman)',
    dateText: 'Showa 47 - Stasiun Kereta Tua',
    icon: '💼',
    desc: '"Semangkuk oden hangat ini menyelamatkan malam terberatku setelah lembur 14 jam."',
    borderColor: '#f1c40f'
  },
  {
    id: 'polaroid_detective',
    title: 'Jejak Rahasia di Bawah Rembulan',
    guestName: 'Detektif Kenzo',
    dateText: 'Showa 49 - Jam 03:15 Dini Hari',
    icon: '🕵️‍♂️',
    desc: '"Di balik kepulan uap kaldu dashi, sebuah teka-teki konspirasi kota terpecahkan."',
    borderColor: '#3498db'
  },
  {
    id: 'polaroid_actress',
    title: 'Senyuman Lepas Nona Sayuri',
    guestName: 'Nona Sayuri (Aktris)',
    dateText: 'Showa 51 - Gerimis Hangat',
    icon: '🎬',
    desc: '"Tanpa sorot lampu studio dan riasan tebal, di sini aku menemukan diriku yang sebenarnya."',
    borderColor: '#9b59b6'
  },
  {
    id: 'polaroid_mangaka',
    title: 'Goresan Fajar Sang Pujangga',
    guestName: 'Mangaka Eiji',
    dateText: 'Showa 52 - Menjelang Subuh',
    icon: '🖋️',
    desc: '"Urat sapi membara ini melahirkan babak klimaks komik terbaikku."',
    borderColor: '#e67e22'
  },
  {
    id: 'polaroid_kuro',
    title: 'Kuro si Kucing Berteduh',
    guestName: 'Kuro (Kucing Hitam)',
    dateText: 'Showa 48 - Hujan Pertama Musim Gugur',
    icon: '🐱',
    desc: '"Duduk santai di atas kardus samping lampion, setia menemani setiap mangkok oden."',
    borderColor: '#2ecc71'
  },
  {
    id: 'polaroid_michelin',
    title: 'Bintang Terukir di Dinding Kayu',
    guestName: 'Inspektur Masaru',
    dateText: 'Showa 53 - Malam Salju',
    icon: '🏆',
    desc: '"Kesederhanaan yang mencapai puncak kesempurnaan rasa. Layak mendapat kehormatan tertinggi."',
    borderColor: '#ffd700'
  }
]

export function calculateKaisekiScore(plate, plateCondiments, plateSate) {
  let score = 50

  // 1. Variasi Warna & Bahan
  const uniqueItems = new Set(plate)
  if (uniqueItems.size >= 3) score += 20
  if (uniqueItems.size >= 4) score += 10

  // 2. Sentuhan Kondimen Aksen
  if (plateCondiments.length >= 1) score += 10

  // 3. Sentuhan Sate Bakar Arang
  if (plateSate && plateSate.length > 0) score += 10

  return Math.min(100, score)
}

