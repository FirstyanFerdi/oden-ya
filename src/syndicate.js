// Sistem Pasar Gelap Sindikat Jam 03:30 & Pusaka Terkutuk (The Midnight Syndicate & Cursed Relics)
// Transaksi peralatan terlarang berdaya tinggi dengan risiko pengawasan polisi Koban.

export const SYNDICATE_ITEMS = {
  binchotan_100: {
    id: 'binchotan_100',
    name: 'Arang Hitam Kuno 100 Tahun',
    icon: '🔥🏺',
    cost: 6000,
    heatGain: 25,
    desc: 'Arang keramat dari pohon cedar kuil purba. Menjaga kompor panas abadi tanpa resiko beku salju.',
    benefit: 'Suhu kompor tidak pernah turun & sate yakitori tidak akan pernah gosong.'
  },
  masamune_blade: {
    id: 'masamune_blade',
    name: 'Pisau Pusaka Masamune',
    icon: '🗡️✨',
    cost: 9000,
    heatGain: 35,
    desc: 'Bilah baja tempaan maestro samurai. Setiap irisan bahan langsung mencapai kualitas Emas.',
    benefit: 'Semua bahan oden yang dipotong otomatis bernilai rebusan Emas (+50% harga).'
  },
  ocean_salt_pot: {
    id: 'ocean_salt_pot',
    name: 'Kendi Garam Samudra Purba',
    icon: '🧂🌊',
    cost: 5000,
    heatGain: 20,
    desc: 'Kristal garam purba dari palung laut terdalam yang meredam emosi dan dendam.',
    benefit: 'Tamu yang marah atau rewel seketika dipulihkan kesabarannya menjadi 100% penuh.'
  }
}

export function createInitialSyndicateState() {
  return {
    heatLevel: 0, // 0 - 100
    ownedRelics: [],
    hiddenUnderTatami: false,
    raidAlert: false
  }
}

export function buySyndicateRelic(state, relicId, g) {
  if (!state) return { success: false, msg: 'Status sindikat tidak valid' }
  const item = SYNDICATE_ITEMS[relicId]
  if (!item) return { success: false, msg: 'Pusaka tidak ditemukan' }
  if (state.ownedRelics.includes(relicId)) {
    return { success: false, msg: 'Anda sudah memiliki pusaka terlarang ini!' }
  }
  if (g.money < item.cost) {
    return { success: false, msg: 'Uang kas tidak cukup untuk transaksi pasar gelap!' }
  }

  g.money -= item.cost
  state.ownedRelics.push(relicId)
  state.heatLevel = Math.min(100, state.heatLevel + item.heatGain)

  g.floats.push({
    s: `🐉 PUSAKA TERLARANG DIDAPAT: ${item.name}! (Heat +${item.heatGain})`,
    x: 160,
    y: 50,
    t: 0.01,
    c: '#e74c3c'
  })

  // Cek apakah memicu razia koban
  if (state.heatLevel >= 75) {
    state.raidAlert = true
  }

  return { success: true, msg: `Transaksi berhasil! ${item.benefit}` }
}

export function hideContraband(state, g) {
  if (!state) return false
  const fee = 500
  if (g.money < fee) return false

  g.money -= fee
  state.heatLevel = Math.max(0, state.heatLevel - 35)
  state.hiddenUnderTatami = true
  state.raidAlert = false

  g.floats.push({
    s: '🤫 Barang Terlarang Disembunyikan di Bawah Tatami! (Heat -35)',
    x: 160,
    y: 60,
    t: 0.01,
    c: '#2ecc71'
  })

  return true
}

export function updateSyndicateHeat(state, dt, g = null) {
  if (!state) return
  // Panas kecurigaan polisi Koban mendingin perlahan seiring waktu
  if (state.heatLevel > 0) {
    const decayMult = (g?.soul?.archetype === 'tycoon') ? 1.3 : 1.0
    state.heatLevel = Math.max(0, state.heatLevel - dt * 0.4 * decayMult)
  }
}

