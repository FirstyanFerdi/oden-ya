// Sistem Warisan Dinasti Showa & Restoran Flagship Ginza (Prestige & New Game+)
// Membuka babak permainan tingkat tinggi dengan manajemen murid dan ruang jamuan privat.

export const ZASHIKI_VIP_GUESTS = [
  {
    id: 'minister_kato',
    name: 'Menteri Kebudayaan Kato',
    title: 'Pejabat Tinggi Showa',
    icon: '🎖️',
    dialogue: 'Aroma kaldu ini mengingatkan saya pada masa muda sebelum perang. Keanggunan yang langka!',
    favoriteOden: ['daikon', 'gyusuji'],
    favSake: 'koshu',
    budgetMultiplier: 4.5,
    satBonus: 0.35
  },
  {
    id: 'director_otomo',
    name: 'Sutradara Otomo',
    title: 'Sineas Layar Perak Showa',
    icon: '🎬',
    dialogue: 'Setiap potongan bahan di piringmu memiliki mise-en-scène yang puitis. Layak masuk film layar lebar!',
    favoriteOden: ['tako', 'egg', 'kinchaku'],
    favSake: 'ginjo',
    budgetMultiplier: 4.0,
    satBonus: 0.3
  },
  {
    id: 'zaibatsu_tanaka',
    name: 'Tuan Tanaka (Zaibatsu)',
    title: 'Taipan Finansial Tokyo',
    icon: '🎩',
    dialogue: 'Di Ginza, uang tidak bisa membeli ketulusan. Tapi hidanganmu menyentuh nurani terdalam saya.',
    favoriteOden: ['matsuba_crab', 'imperial_daikon', 'gyusuji'],
    favSake: 'koshu',
    budgetMultiplier: 6.0,
    satBonus: 0.4
  }
]

export function createInitialDynastyState() {
  return {
    dynastyLevel: 0,
    apprentice: null, // 'kenji' | 'aoi'
    apprenticeEarningsTotal: 0,
    lastDailyEarning: 0,
    goldenDashiActive: false,
    zashikiUnlocked: false,
    activeZashikiGuest: null,
    totalPrestiges: 0
  }
}

export function canPrestige(g) {
  if (!g) return false
  return (g.michelinStars >= 3 || g.money >= 60000 || g.rep >= 85)
}

export function executePrestige(g, apprenticeId = 'kenji') {
  if (!g.dynasty) g.dynasty = createInitialDynastyState()

  g.dynasty.dynastyLevel++
  g.dynasty.totalPrestiges++
  g.dynasty.apprentice = apprenticeId
  g.dynasty.goldenDashiActive = true
  g.dynasty.zashikiUnlocked = true

  // Buka lokasi Ginza
  if (!g.unlockedLocations.includes('ginza')) {
    g.unlockedLocations.push('ginza')
  }
  g.currentLocation = 'ginza'

  // Tambahkan bonus modal awal dinasti
  g.money += 15000
  g.rep = Math.max(g.rep, 80)

  g.floats.push({
    s: `👑 DINASTI SHOWA TINGKAT ${g.dynasty.dynastyLevel} DIBANGUN! (Murid: ${apprenticeId === 'kenji' ? 'Kenji' : 'Aoi'})`,
    x: 160,
    y: 50,
    t: 0.01,
    c: '#f1c40f'
  })

  return true
}

export function calculateApprenticeDailyIncome(g) {
  if (!g.dynasty?.apprentice) return 0
  const base = g.dynasty.apprentice === 'kenji' ? 1800 : 2200
  const bonus = Math.floor(Math.random() * 800) + (g.dynasty.dynastyLevel * 500)
  const total = base + bonus
  g.dynasty.lastDailyEarning = total
  g.dynasty.apprenticeEarningsTotal += total
  g.money += total
  return total
}

export function spawnZashikiGuest(g) {
  if (!g.dynasty?.zashikiUnlocked) return null
  // 35% peluang kemunculan tamu bangsawan di Ginza
  if (g.currentLocation !== 'ginza' || Math.random() > 0.35) return null

  const guest = ZASHIKI_VIP_GUESTS[Math.floor(Math.random() * ZASHIKI_VIP_GUESTS.length)]
  g.dynasty.activeZashikiGuest = guest
  return guest
}

