// Sistem Mesin Deteksi Jiwa Koki (Player Culinary Soul & Archetype Engine)
// Menganalisis metrik bermain koki dan mengadaptasi ekosistem permainan sesuai gaya main.

export const SOUL_ARCHETYPES = {
  speed: {
    id: 'speed',
    name: 'Itamae Kilat (Speed Artisan)',
    icon: '⚡',
    title: 'Koki Refleks Badai',
    auraColor: '#00d2d3',
    desc: 'Melayani tamu dengan kecepatan kilat dan kombo beruntun tanpa henti.',
    perkDesc: 'Gelombang Komuter Kereta: Tamu datang +30% lebih cepat, kombo tip bertambah +25%.',
    reqMetric: 'serveSpeed'
  },
  zen: {
    id: 'zen',
    name: 'Wabi-Sabi Purist (Zen Perfectionist)',
    icon: '🌸',
    title: 'Pujangga Harmoni Kaiseki',
    auraColor: '#ffd700',
    desc: 'Menata piring dengan estetika dewa, rebusan emas sempurna, dan pairing sake akurat.',
    perkDesc: 'Penikmat Agung: Tamu bangsawan & kritikus seni muncul +50%, reputasi bertambah +40%.',
    reqMetric: 'kaisekiScore'
  },
  tycoon: {
    id: 'tycoon',
    name: 'Saudagar Showa (Market Tycoon)',
    icon: '🪙',
    title: 'Raja Finansial Tsukiji',
    auraColor: '#ff9f43',
    desc: 'Menguasai bursa lelang pasar, fermentasi gudang bawah tanah, dan dividen murid.',
    perkDesc: 'Naluri Saudagar: Diskon belanja bahan 25%, pengawasan heat polisi sindikat 30% lebih lambat.',
    reqMetric: 'wealthAccumulation'
  }
}

export function createInitialSoulState() {
  return {
    archetype: 'speed',
    level: 1,
    exp: 0,
    metrics: {
      fastServes: 0,
      highKaisekiCount: 0,
      marketTrades: 0,
      totalCoinsEarned: 0
    },
    unlockedArchetypes: ['speed']
  }
}

export function updateSoulMetrics(g, type, value = 1) {
  if (!g.soul) g.soul = createInitialSoulState()
  const m = g.soul.metrics

  if (type === 'fastServe') m.fastServes += value
  if (type === 'highKaiseki') m.highKaisekiCount += value
  if (type === 'marketTrade') m.marketTrades += value
  if (type === 'coins') m.totalCoinsEarned += value

  // Evaluasi Pergeseran Jiwa Koki
  evaluateSoulArchetype(g)
}

export function evaluateSoulArchetype(g) {
  if (!g.soul) return
  const m = g.soul.metrics

  let target = 'speed'
  if (m.highKaisekiCount > m.fastServes && m.highKaisekiCount >= m.marketTrades) {
    target = 'zen'
  } else if (m.marketTrades > m.fastServes && m.totalCoinsEarned > 30000) {
    target = 'tycoon'
  }

  if (g.soul.archetype !== target) {
    g.soul.archetype = target
    if (!g.soul.unlockedArchetypes.includes(target)) {
      g.soul.unlockedArchetypes.push(target)
    }
    const arch = SOUL_ARCHETYPES[target]
    g.floats.push({
      s: `✨ JIWA KOKI BERKEMBANG: ${arch.name}!`,
      x: 160,
      y: 50,
      t: 0.01,
      c: arch.auraColor
    })
  }
}

export function getSoulPerks(soulState) {
  const archId = soulState?.archetype || 'speed'
  return SOUL_ARCHETYPES[archId]
}

