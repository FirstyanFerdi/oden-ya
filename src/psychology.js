// Sistem Mood Psikologi & Resonansi Katarsis Tamu (Guest Psychology & Catharsis)
// Tamu memiliki kondisi batin yang bereaksi terhadap sapaan koki, kaldu, dan musik radio.

export const GUEST_MOODS = [
  {
    id: 'heartbroken',
    icon: '💔',
    name: 'Patah Hati',
    desc: 'Hati hancur tersakiti, butuh kelembutan & melodi syahdu',
    favGenre: 'jazz',
    favBroth: 'kombu',
    preferredGreeting: 'empathy',
    reactionText: '"Terima kasih... baru kali ini ada yang mengerti lukaku."'
  },
  {
    id: 'burnout',
    icon: '💼',
    name: 'Kelelahan Lembur',
    desc: 'Pekerja kantor lelah berat setelah lembur tanpa henti',
    favGenre: 'citypop',
    favBroth: 'spicy',
    preferredGreeting: 'cheer',
    reactionText: '"Energi semangatmu menular! Rasanya bebanku terangkat."'
  },
  {
    id: 'nostalgic',
    icon: '🌧️',
    name: 'Rindu Masa Kecil',
    desc: 'Teringat kenangan hangat rumah masa kanak-kanak era Showa',
    favGenre: 'enka',
    favBroth: 'miso',
    preferredGreeting: 'respect',
    reactionText: '"Aroma kuah dan lagu ini... persis masakan mendiang ibuku."'
  },
  {
    id: 'hotheaded',
    icon: '💢',
    name: 'Tegang & Emosional',
    desc: 'Pikiran kalut penuh amarah, butuh ketenangan batin',
    favGenre: 'folk',
    favBroth: 'kombu',
    preferredGreeting: 'calm',
    reactionText: '"Napasmu yang tenang membuat kepalaku kembali jernih."'
  }
]

export const GREETINGS = [
  {
    id: 'empathy',
    label: '❤️ Sapaan Lembut Penuh Empati',
    text: '"Malam yang dingin ya kawan? Duduklah dulu, jangan simpan lukamu sendirian."'
  },
  {
    id: 'cheer',
    label: '⚡ Sapaan Kobaran Semangat',
    text: '"Kerja kerasmu seharian ini luar biasa! Istirahatlah sejenak, malam ini giliran kami memanjakanmu!"'
  },
  {
    id: 'respect',
    label: '🏮 Sapaan Hangat Nostalgia',
    text: '"Selamat datang di kedai tua kami. Semoga semangkuk kuah hangat ini mengobati rasa rindumu."'
  },
  {
    id: 'calm',
    label: '🧘 Sapaan Ketenangan Pikiran',
    text: '"Tarik napas dalam-dalam kawan... lupakan hiruk pikuk jalanan, nikmati malam ini perlahan."'
  }
]

export const HEIRLOOMS = [
  {
    id: 'pocket_watch',
    name: 'Jam Saku Showa 1972',
    icon: '⏱️',
    desc: 'Pemberian dari pekerja lembur yang terselamatkan. Waktu Fever Mode +5 detik!',
    passive: 'fever_extender'
  },
  {
    id: 'silver_hairpin',
    name: 'Tusuk Konde Perak',
    icon: '🥢',
    desc: 'Hadiah dari gadis yang pulih dari patah hati. Reputasi kedai naik +25% permanen!',
    passive: 'rep_boost'
  },
  {
    id: 'vintage_coin',
    name: 'Koin Kuno 100 Yen Perak',
    icon: '🪙',
    desc: 'Jimat keberuntungan masa lampau. Belanja bahan di pasar diskon 15%!',
    passive: 'market_discount'
  },
  {
    id: 'poet_pen',
    name: 'Pena Tinta Emas Pujangga',
    icon: '🖋️',
    desc: 'Pena milik sastrawan pengelana. Setiap dialog cerita tamu memberi bonus uang +¥200!',
    passive: 'story_bonus'
  }
]

export function assignGuestMood() {
  return GUEST_MOODS[Math.random() * GUEST_MOODS.length | 0]
}

export function evaluateGreeting(guest, greetingId, currentCassette, activeBroth) {
  if (!guest || !guest.mood) return {success: false, score: 0}
  const m = guest.mood
  let resonanceScore = 0

  if (greetingId === m.preferredGreeting) resonanceScore += 40
  if (currentCassette === m.favGenre) resonanceScore += 35
  if (activeBroth === m.favBroth) resonanceScore += 25

  const isCatharsis = resonanceScore >= 70
  return {
    isCatharsis,
    score: resonanceScore,
    reactionText: isCatharsis ? m.reactionText : '"Terima kasih atas sapaannya."'
  }
}

