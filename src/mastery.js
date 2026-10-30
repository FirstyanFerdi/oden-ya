// Pohon Keahlian Koki & Buku Silsilah Pusaka Showa (Chef Mastery Skill Tree)
// 4 Cabang Keahlian: Pisau Emas (Itamae), Batin & Empati (Kokoro), Api & Arang (Homura), Bisnis (Akiudo).

export const MASTERY_SKILLS = [
  // Cabang 1: Pisau Emas (Itamae)
  {
    id: 'itamae_1',
    branch: 'itamae',
    name: 'Goresan Pisau Tajam',
    icon: '🔪',
    cost: 1,
    desc: 'Hasil potongan pisau prep menghasilkan +1 stok bahan ekstra.',
    effect: 'prep_bonus'
  },
  {
    id: 'itamae_2',
    branch: 'itamae',
    name: 'Sentuhan Tenma Master',
    icon: '✨',
    cost: 2,
    desc: 'Bahan berpola berlian matang 50% lebih cepat di dalam kuah kaldu.',
    effect: 'fast_simmer'
  },

  // Cabang 2: Batin & Empati (Kokoro)
  {
    id: 'kokoro_1',
    branch: 'kokoro',
    name: 'Mata Batin Empati',
    icon: '👁️',
    cost: 1,
    desc: 'Melihat suasana hati tamu seketika saat duduk di kursi.',
    effect: 'mood_vision'
  },
  {
    id: 'kokoro_2',
    branch: 'kokoro',
    name: 'Resonansi Jiwa Katarsis',
    icon: '💖',
    cost: 2,
    desc: 'Peluang katarsis emosional naik +40% dan tip air mata berlipat.',
    effect: 'catharsis_boost'
  },

  // Cabang 3: Api & Arang (Homura)
  {
    id: 'homura_1',
    branch: 'homura',
    name: 'Napas Arang Binchotan',
    icon: '🔥',
    cost: 1,
    desc: 'Tungku panggangan sate tidak pernah gosong sebelum detik ke-32.',
    effect: 'grill_forgiveness'
  },
  {
    id: 'homura_2',
    branch: 'homura',
    name: 'Bara Api Emas Abadi',
    icon: '⚡',
    cost: 2,
    desc: 'Suhu kompor tidak terpengaruh oleh cuaca dingin salju ekstrem.',
    effect: 'cold_immunity'
  },

  // Cabang 4: Bisnis & Relasi (Akiudo)
  {
    id: 'akiudo_1',
    branch: 'akiudo',
    name: 'Tawar-Menawar Grosir',
    icon: '🪙',
    cost: 1,
    desc: 'Seluruh belanja bahan baku di pasar diskon permanen 20%.',
    effect: 'market_discount'
  },
  {
    id: 'akiudo_2',
    branch: 'akiudo',
    name: 'Magnet Tamu Berkelimpahan',
    icon: '🏮',
    cost: 2,
    desc: 'Tamu VIP dan pelanggan boros datang 2x lebih sering ke kedai.',
    effect: 'vip_magnet'
  }
]

export function canUnlockSkill(skillId, unlockedSkills, masteryPoints) {
  const sk = MASTERY_SKILLS.find(s => s.id === skillId)
  if (!sk) return false
  if (unlockedSkills.includes(skillId)) return false
  if (masteryPoints < sk.cost) return false

  // Cek prasyarat tier 2
  if (sk.id.endsWith('_2')) {
    const tier1Id = sk.branch + '_1'
    if (!unlockedSkills.includes(tier1Id)) return false
  }
  return true
}

