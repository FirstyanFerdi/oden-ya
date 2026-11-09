// Sistem Sumpah Senja & Perjanjian Roh Kelaparan (The Twilight Pacts & Gaki's Gamble)
// Menghadirkan mekanisme risk-and-reward ekstrem, taruhan koki, dan entitas mistis Showa.

export const TWILIGHT_PACTS = {
  boiling_hell: {
    id: 'boiling_hell',
    name: 'Sumpah Kuali Mendidih Neraka',
    title: 'Boiling Hell Contract',
    icon: '🔥🍲',
    auraColor: '#e74c3c',
    desc: 'Suhu kompor bergolak liar pada batas maksimum dan bahan matang 2.5x lebih cepat. Dilarang ada 1 bahan pun yang terlalu matang (overcooked / lembek)!',
    rule: 'Kompor terkunci pada panas maksimal & perebusan 2.5x lebih cepat. Jika ada 1 bahan melepuh, perjanjian gagal!',
    rewardDesc: 'Pendapatan hari itu dikalikan x3.5 + Jackpot Tunai ¥15.000 + Reputasi +25.',
    failPenaltyDesc: 'Kuali meletup! Denda ¥6.000 dan reputasi anjlok -15.',
    moneyReward: 15000,
    repReward: 25,
    revenueMult: 3.5,
    failMoneyPenalty: 6000,
    failRepPenalty: 15
  },
  silent_storm: {
    id: 'silent_storm',
    name: 'Sumpah Pelayanan Tanpa Nafas',
    title: 'Silent Storm Itamae',
    icon: '⚡🤫',
    auraColor: '#9b59b6',
    desc: 'Tamu sangat tidak sabaran (-40% durasi kesabaran). Wajib mempertahankan rantai Combo pelayanan tanpa boleh putus sama sekali setelah melayani tamu pertama!',
    rule: 'Kesabaran tamu berkurang 40% lebih cepat. Kombo tidak boleh reset ke 0!',
    rewardDesc: 'Buka Bumbu Pusaka "Shoyu Hitam Abadi 50 Tahun" (+50% Tip Permanen) + Hadiah Tunai ¥8.000 + Reputasi +20.',
    failPenaltyDesc: 'Denda kegagalan mental koki: Reputasi -10.',
    moneyReward: 8000,
    repReward: 20,
    failRepPenalty: 10
  },
  cursed_stool: {
    id: 'cursed_stool',
    name: 'Sumpah Kursi Keramat Roh Kelaparan',
    title: 'The Cursed Stool (Gaki\'s Demand)',
    icon: '👻🪑',
    auraColor: '#8e44ad',
    desc: 'Kursi nomor 1 diduduki oleh Roh Kelaparan (Gaki). Ia menuntut sepiring oden setiap 40 detik. Jika telat, ia akan menyedot habis kaldu kuali!',
    rule: 'Beri makan Gaki di Kursi 1 minimal 3 kali tanpa membiarkan timer laparnya habis!',
    rewardDesc: 'Dihadiahi Koin Emas Roh (Spiritual Koban) + Peti Pusaka Bayangan (¥12.000 & Pusaka Misterius) + Reputasi +30.',
    failPenaltyDesc: 'Kaldu dihisap kering: Seluruh sekat panci kehilangan kaldu & reputasi -12.',
    moneyReward: 12000,
    repReward: 30,
    targetDemands: 3,
    failRepPenalty: 12
  }
}

export function createInitialPactState() {
  return {
    activePact: null,          // 'boiling_hell' | 'silent_storm' | 'cursed_stool' | null
    pactDay: 0,
    status: 'none',            // 'none' | 'active' | 'completed' | 'failed'
    boilingOvercookedCount: 0,
    silentComboBroken: false,
    firstServeDone: false,
    gakiActive: false,
    gakiTimer: 40,
    gakiMaxTimer: 40,
    gakiDemandsMet: 0,
    gakiDemandsTarget: 3,
    gakiCurrentDemand: 'daikon',
    gakiAngered: false,
    spiritualTokens: 0,
    unlockedShoyu50yr: false,
    unlockedShadowRelic: false,
    lastPactResult: null,
    history: []
  }
}

export function signTwilightPact(pactState, pactId, g) {
  if (!pactState || !TWILIGHT_PACTS[pactId]) return { success: false, msg: 'Sumpah tidak valid!' }
  if (pactState.activePact && pactState.status === 'active') {
    return { success: false, msg: 'Anda sudah memiliki sumpah yang sedang berjalan hari ini!' }
  }

  const pact = TWILIGHT_PACTS[pactId]
  pactState.activePact = pactId
  pactState.status = 'active'
  pactState.pactDay = g.day || 1
  pactState.boilingOvercookedCount = 0
  pactState.silentComboBroken = false
  pactState.firstServeDone = false

  if (pactId === 'boiling_hell') {
    g.stoveHeat = 1.0
  }

  if (pactId === 'cursed_stool') {
    pactState.gakiActive = true
    pactState.gakiTimer = 40
    pactState.gakiMaxTimer = 40
    pactState.gakiDemandsMet = 0
    pactState.gakiDemandsTarget = 3
    pactState.gakiAngered = false
    const possibleDemands = ['daikon', 'egg', 'chikuwa', 'gyusuji', 'kinchaku', 'atsuage']
    const available = possibleDemands.filter(id => g.owned?.includes(id))
    pactState.gakiCurrentDemand = available.length ? available[Math.floor(Math.random() * available.length)] : 'daikon'
  }

  g.floats.push({
    s: `🔥 SUMPAH DITANDATANGANI: ${pact.name}!`,
    x: 160,
    y: 50,
    t: 0.01,
    c: pact.auraColor
  })

  return { success: true, msg: `Sumpah "${pact.name}" berhasil diikat! Penuhi syaratnya sebelum fajar!` }
}

export function cancelTwilightPact(pactState, g) {
  if (!pactState || !pactState.activePact) return false
  const penalty = 1000
  if (g.money < penalty) return false

  g.money -= penalty
  g.floats.push({
    s: '🕯️ Sumpah Senja Dibatalkan (Denda Penalti ¥1.000)',
    x: 160,
    y: 60,
    t: 0.01,
    c: '#bdc3c7'
  })

  pactState.activePact = null
  pactState.status = 'none'
  pactState.gakiActive = false
  return true
}

export function feedGaki(pactState, itemId, g) {
  if (!pactState || pactState.activePact !== 'cursed_stool' || pactState.status !== 'active') {
    return { success: false, msg: 'Roh Gaki tidak sedang menuntut sajian saat ini!' }
  }
  if (!itemId || itemId !== pactState.gakiCurrentDemand) {
    return { success: false, msg: `Roh Gaki menuntut "${pactState.gakiCurrentDemand}", bukan bahan ini!` }
  }

  // Cek apakah pemain memiliki bahan di stok atau di sekat panci
  let hasItem = false
  if ((g.stock[itemId] || 0) > 0) {
    g.stock[itemId]--
    hasItem = true
  } else {
    // Cari di sekat panci
    if (Array.isArray(g.potSlots)) {
      for (let c = 0; c < g.potSlots.length; c++) {
        if (!Array.isArray(g.potSlots[c])) continue
        const idx = g.potSlots[c].findIndex(it => it && it.id === itemId)
        if (idx !== -1) {
          g.potSlots[c].splice(idx, 1)
          hasItem = true
          break
        }
      }
    }
  }

  if (!hasItem) {
    return { success: false, msg: `Anda tidak memiliki stok "${itemId}" untuk menyuap Gaki!` }
  }

  pactState.gakiDemandsMet++
  pactState.gakiTimer = 40

  const possibleDemands = ['daikon', 'egg', 'chikuwa', 'gyusuji', 'kinchaku', 'atsuage']
  const available = possibleDemands.filter(id => g.owned?.includes(id))
  pactState.gakiCurrentDemand = available.length ? available[Math.floor(Math.random() * available.length)] : 'daikon'

  g.floats.push({
    s: `👻 GAKI MENELAN LAHAP! (${pactState.gakiDemandsMet}/${pactState.gakiDemandsTarget})`,
    x: 100,
    y: 65,
    t: 0.01,
    c: '#a29bfe'
  })

  return {
    success: true,
    msg: `Roh Gaki kenyang! Permintaan terpenuhi (${pactState.gakiDemandsMet}/${pactState.gakiDemandsTarget}).`
  }
}

export function updatePactLoop(pactState, dt, g) {
  if (!pactState || pactState.status !== 'active' || !pactState.activePact) return

  // Update Roh Kelaparan (Gaki) jika aktif
  if (pactState.activePact === 'cursed_stool' && pactState.gakiActive) {
    pactState.gakiTimer = Math.max(0, pactState.gakiTimer - dt)
    if (pactState.gakiTimer <= 0 && !pactState.gakiAngered) {
      pactState.gakiAngered = true
      pactState.status = 'failed'
      g.stoveHeat = 0.2
      if (g.masterVat) {
        g.masterVat.scumLevel = Math.min(100, g.masterVat.scumLevel + 40)
      }
      g.floats.push({
        s: '👻 GAKI MENYEDOT HABIS KUAH KALDU! Sumpah Gagal!',
        x: 100,
        y: 65,
        t: 0.01,
        c: '#8e44ad'
      })
    }
  }
}

export function resolveDayEndPact(pactState, g) {
  if (!pactState || !pactState.activePact || pactState.status === 'none') return null
  const pact = TWILIGHT_PACTS[pactState.activePact]
  if (!pact) return null

  let result = {
    pactId: pact.id,
    pactName: pact.name,
    success: false,
    moneyDelta: 0,
    repDelta: 0,
    specialBonus: ''
  }

  if (pact.id === 'boiling_hell') {
    if (pactState.status === 'active' && pactState.boilingOvercookedCount === 0) {
      pactState.status = 'completed'
      result.success = true
      result.moneyDelta = pact.moneyReward
      result.repDelta = pact.repReward
      const revBonus = Math.round((g.dayStats?.revenue || 0) * (pact.revenueMult - 1))
      result.moneyDelta += revBonus
      result.specialBonus = `Pendapatan Berlipat x${pact.revenueMult} (+¥${revBonus.toLocaleString()})!`
      g.money += result.moneyDelta
      g.rep += result.repDelta
    } else {
      pactState.status = 'failed'
      result.success = false
      result.moneyDelta = -pact.failMoneyPenalty
      result.repDelta = -pact.failRepPenalty
      result.specialBonus = 'Kuali meletup akibat bahan terlalu lembek/melepuh!'
      g.money = Math.max(0, g.money - pact.failMoneyPenalty)
      g.rep = Math.max(0, g.rep - pact.failRepPenalty)
    }
  } else if (pact.id === 'silent_storm') {
    if (pactState.status === 'active' && !pactState.silentComboBroken && (g.dayStats?.served || 0) >= 3) {
      pactState.status = 'completed'
      result.success = true
      result.moneyDelta = pact.moneyReward
      result.repDelta = pact.repReward
      pactState.unlockedShoyu50yr = true
      result.specialBonus = 'Membuka Pusaka Bumbu: Shoyu Hitam Abadi 50 Tahun (+50% Tip Permanen)!'
      g.money += result.moneyDelta
      g.rep += result.repDelta
    } else {
      pactState.status = 'failed'
      result.success = false
      result.repDelta = -pact.failRepPenalty
      result.specialBonus = 'Rantai kombo putus di tengah pelayanan hening!'
      g.rep = Math.max(0, g.rep - pact.failRepPenalty)
    }
  } else if (pact.id === 'cursed_stool') {
    if (pactState.status === 'active' && pactState.gakiDemandsMet >= pact.targetDemands) {
      pactState.status = 'completed'
      result.success = true
      result.moneyDelta = pact.moneyReward
      result.repDelta = pact.repReward
      pactState.spiritualTokens += 2
      pactState.unlockedShadowRelic = true
      result.specialBonus = 'Roh Gaki terpuaskan! Menerima +2 Koin Emas Roh & Peti Pusaka Bayangan!'
      g.money += result.moneyDelta
      g.rep += result.repDelta
    } else {
      pactState.status = 'failed'
      result.success = false
      result.repDelta = -pact.failRepPenalty
      result.specialBonus = 'Gaki kelaparan menyedot habis sari kaldu kuali!'
      g.rep = Math.max(0, g.rep - pact.failRepPenalty)
    }
  }

  pactState.lastPactResult = result
  pactState.history.push({
    day: g.day,
    pactId: pact.id,
    success: result.success,
    moneyDelta: result.moneyDelta,
    repDelta: result.repDelta
  })

  // Bersihkan sumpah aktif untuk hari berikutnya
  pactState.activePact = null
  pactState.status = 'none'
  pactState.gakiActive = false

  return result
}
