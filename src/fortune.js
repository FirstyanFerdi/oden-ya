// Sistem Ramalan Nasib Pelanggan Showa (Omikuji Fortune Telling)
// Mengocok tabung bambu dan memprediksi masa depan pelanggan kedai

export const FORTUNES = [
  {
    tier: 'daikichi',
    kanji: '大吉',
    title: 'Keberuntungan Luar Biasa (Daikichi)',
    badgeColor: '#ffd700',
    message: 'Awan gelap malam ini tersingkap sinar rembulan emas. Perjuangan kerasmu segera berbuah manis tak terduga!',
    advice: 'Percayalah pada langkahmu dan nikmati berkah yang datang bersama orang-orang tercinta.',
    rewardType: 'money',
    rewardAmount: 260,
    repBonus: 5,
    rewardText: 'Tamu bersorak bahagia! Uang Tip Tambahan Langsung: +¥260 & Reputasi +5!'
  },
  {
    tier: 'chukichi',
    kanji: '中吉',
    title: 'Berkah Bertahap & Ketenangan (Chukichi)',
    badgeColor: '#2ecc71',
    message: 'Air sungai mengalir perlahan namun pasti menuju samudera luas. Jangan tergesa-gesa memetik bunga sebelum mekar.',
    advice: 'Rawat ketenangan batinmu dengan kuah hangat dan istirahat yang cukup malam ini.',
    rewardType: 'affinity',
    affinityBonus: 3,
    repBonus: 3,
    rewardText: 'Hati tamu terasa hangat dan damai! Kedekatan Karakter: +3 & Reputasi +3!'
  },
  {
    tier: 'kyo',
    kanji: '凶',
    title: 'Ujian Hidup & Peringatan Waspada (Kyo)',
    badgeColor: '#e74c3c',
    message: 'Hujan badai malam ini mengguncang ranting rapuh. Rintangan tak terduga mungkin menghadang di persimpangan jalan.',
    advice: 'Pemilik kedai memberi petuah bijak: "Akar pohon terkuat tumbuh dari tanah yang diuji badai. Kedai ini selalu ada untukmu."',
    rewardType: 'loyalty',
    repBonus: 4,
    rewardText: 'Tamu terharu oleh ketulusan nasihatmu! Mereka berjanji menjadi pelanggan setia seumur hidup (+30% tip selamanya)!'
  }
]

export function drawOmikuji() {
  const rand = Math.random()
  if (rand < 0.35) return FORTUNES[0] // Daikichi
  if (rand < 0.75) return FORTUNES[1] // Chukichi
  return FORTUNES[2] // Kyo
}

