// Siklus 4 Musim Dinamis & Fluktuasi Pasar Komoditas Spekulatif (Seasonal Economy & Market News)
// Musim berganti tiap 7 hari permainan: Semi (Haru), Panas (Natsu), Gugur (Aki), Dingin (Fuyu).

export const SEASONS = [
  {
    id: 'spring',
    name: 'Musim Semi (Haru)',
    kanji: '春',
    icon: '🌸',
    color: '#ffb8d2',
    desc: 'Bunga sakura bermekaran. Tamu mendambakan oden manis berkuah lembut.',
    bonusSat: 0.15,
    specialItem: {
      id: 'takenoko',
      name: 'Rebung Bambu Muda',
      icon: '🎋',
      basePrice: 130,
      sellPrice: 320,
      desc: 'Rebung musim semi renyah segar, menyerap kuah kaldu seketika.'
    }
  },
  {
    id: 'summer',
    name: 'Musim Panas (Natsu)',
    kanji: '夏',
    icon: '🍧',
    color: '#00cec9',
    desc: 'Malam festival hangat & gerimis. Tamu mudah haus dan menyukai Ocha dingin & Kakigori.',
    bonusSat: 0.1,
    specialItem: {
      id: 'kakigori',
      name: 'Es Serut Sirup Melon',
      icon: '🍧',
      basePrice: 90,
      sellPrice: 260,
      desc: 'Penyegar dahaga malam musim panas era Showa.'
    }
  },
  {
    id: 'autumn',
    name: 'Musim Gugur (Aki)',
    kanji: '秋',
    icon: '🍁',
    color: '#e17055',
    desc: 'Hawa sejuk dedaunan maple merah. Nafsu makan tamu melonjak tinggi (+30% porsi pesanan).',
    bonusSat: 0.2,
    specialItem: {
      id: 'matsutake',
      name: 'Jamur Matsutake Liar',
      icon: '🍄',
      basePrice: 180,
      sellPrice: 480,
      desc: 'Jamur hutan langka dengan aroma semerbak yang sangat mahal.'
    }
  },
  {
    id: 'winter',
    name: 'Musim Dingin (Fuyu)',
    kanji: '冬',
    icon: '❄️',
    color: '#74b9ff',
    desc: 'Salju lebat & badai dingin. Tamu berkerumun demi kehangatan; harga sajian oden naik +35%!',
    bonusSat: 0.25,
    specialItem: {
      id: 'kani_claw',
      name: 'Capit Kepiting Salju',
      icon: '🦀',
      basePrice: 220,
      sellPrice: 580,
      desc: 'Daging kepiting manis beku dari pelabuhan Otaru Hokkaido.'
    }
  }
]

export const MARKET_HEADLINES = [
  {
    headline: '📰 Nelayan Teluk Tokyo Panen Raya Ikan Cakalang!',
    targetItem: 'katsuobushi',
    mult: 0.65,
    type: 'drop',
    desc: 'Pasokan melimpah! Harga Katsuobushi anjlok murah hari ini.'
  },
  {
    headline: '📰 Badai Laut Utara Hantam Kapal Penangkap Gurita!',
    targetItem: 'tako',
    mult: 1.85,
    type: 'spike',
    desc: 'Pasokan langka! Harga Gurita melonjak tinggi di pasar!'
  },
  {
    headline: '📰 Festival Daging Sapi Matsusaka Digelar di Pasar Pusat!',
    targetItem: 'gyusuji',
    mult: 0.7,
    type: 'drop',
    desc: 'Harga Urat Sapi diskon besar-besaran, saat tepat menimbun stok!'
  },
  {
    headline: '📰 Panen Raya Lobak Daikon Musim Dingin Berkualitas Emas!',
    targetItem: 'daikon',
    mult: 0.75,
    type: 'drop',
    desc: 'Lobak melimpah ruah dan sangat manis di gudang grosir.'
  },
  {
    headline: '📰 Permintaan Telur Melonjak Tinggi Menjelang Perayaan Kota!',
    targetItem: 'egg',
    mult: 1.6,
    type: 'spike',
    desc: 'Harga Telur naik tajam karena diborong toko kue.'
  }
]

export function getSeasonForDay(day) {
  const index = Math.floor((Math.max(1, day) - 1) / 7) % SEASONS.length
  return SEASONS[index]
}

export function generateDailyMarketNews(day) {
  const headline = MARKET_HEADLINES[(day * 3 + 1) % MARKET_HEADLINES.length]
  return headline
}

