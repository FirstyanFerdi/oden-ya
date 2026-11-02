// Sistem Ekspedisi Kapal Selam Palung Laut & Bahan Legendaris Punah (Deep Abyssal Foraging)
// Riset laut dalam Showa menggunakan kapal selam Shinkai 2000 (深海2000)

import * as Audio from './audio.js'

export const ABYSSAL_ITEMS_DATA = {
  abyssal_squid: {
    id: 'abyssal_squid',
    name: 'Capit Cumi Abisal Neon',
    kanji: '深海光烏賊',
    icon: '🦑',
    badgeColor: '#00d2d3',
    glowColor: 'rgba(0, 210, 211, 0.45)',
    price: 850,
    comp: 1, // Sekat Olahan Laut
    desc: 'Tentakel cumi raksasa purba dari zona senja laut yang memancarkan cahaya biru neon di dalam kuah kaldu.',
    perkText: 'Kuah dan piring berpendar neon mistis. Tip malam (20:00-05:00) berlipat ganda (+100% / +¥400)!'
  },
  starlight_konnyaku: {
    id: 'starlight_konnyaku',
    name: 'Konnyaku Kristal Bintang',
    kanji: '星屑蒟蒻',
    icon: '✨',
    badgeColor: '#a29bfe',
    glowColor: 'rgba(162, 155, 254, 0.45)',
    price: 950,
    comp: 0, // Sekat Sayur / Konnyaku
    desc: 'Konnyaku sebening kristal kaca dari endapan lelehan meteorit purba di palung batipelagik sedalam 3.000 meter.',
    perkText: 'Menyerap 300% sari rasa kaldu kuali, meningkatkan kepuasan tamu dan mendongkrak omset hidangan (+50%)!'
  },
  millennium_takenoko: {
    id: 'millennium_takenoko',
    name: 'Rebung Emas 1.000 Tahun',
    kanji: '千年金筍',
    icon: '🎋',
    badgeColor: '#ffeaa7',
    glowColor: 'rgba(255, 234, 167, 0.45)',
    price: 1100,
    comp: 0, // Sekat Sayur
    desc: 'Rebung bambu emas purba yang terawetkan di celah palung vulkanik bawah laut Yakushima selama seribu tahun.',
    perkText: 'Aroma wangi kayu Hinoki purba menyegarkan kedai. Menambah kesabaran seluruh tamu di kedai +12 detik!'
  },
  ryujin_roe: {
    id: 'ryujin_roe',
    name: 'Telur Naga Laut Purba',
    kanji: '竜神の神卵',
    icon: '🐉',
    badgeColor: '#ff7675',
    glowColor: 'rgba(255, 118, 117, 0.45)',
    price: 1500,
    comp: 1, // Sekat Olahan Laut
    desc: 'Telur emas mutiara legendaris dari sarang Palung Mariana 10.000m tempat bersemayamnya sang Dewa Laut Ryujin.',
    perkText: 'Sajian kramat istana samudra! Memberikan reputasi instan +15, bonus flat +¥1.500, dan membuka Grimoire Legendaris.'
  }
}

export const ABYSSAL_ZONES = [
  {
    id: 'twilight',
    name: 'Palung Izu-Ogasawara (Zona Senja Samudra)',
    kanji: '伊豆黄昏海溝',
    depthMeter: '200m - 1.000m',
    depthValue: 1000,
    cost: 3500,
    durationDays: 1,
    targetItem: 'abyssal_squid',
    minYield: 3,
    maxYield: 5,
    icon: '🦑',
    themeColor: '#00d2d3',
    riskLevel: 'Rendah (Arus Tenang)',
    desc: 'Zona transisi di mana sinar matahari terakhir meredup. Kawanan cumi-cumi bercahaya berenang di kegelapan dingin.',
    flavor: 'Lampu sorot Shinkai 2000 menangkap siluet tentakel neon yang meliuk anggun di balik partikel salju laut.'
  },
  {
    id: 'bathyal',
    name: 'Palung Kristal Bintang (Zona Batipelagik)',
    kanji: '星屑深海底',
    depthMeter: '1.000m - 3.000m',
    depthValue: 3000,
    cost: 6000,
    durationDays: 2,
    targetItem: 'starlight_konnyaku',
    minYield: 3,
    maxYield: 5,
    icon: '✨',
    themeColor: '#a29bfe',
    riskLevel: 'Sedang (Tekanan Hidrostatik 300 atm)',
    desc: 'Dasar laut pekat dengan endapan mineral meteorit prasejarah yang membeku membentuk batuan konnyaku kristal transparan.',
    flavor: 'Sonar mendeteksi kubah kristal bercahaya lembut di dasar palung vulkanik dingin tak bersuara.'
  },
  {
    id: 'abyssal',
    name: 'Palung Purba Hutan Yakushima (Zona Abisopelagik)',
    kanji: '屋久島古代海溝',
    depthMeter: '3.000m - 6.000m',
    depthValue: 6000,
    cost: 10000,
    durationDays: 2,
    targetItem: 'millennium_takenoko',
    minYield: 2,
    maxYield: 4,
    icon: '🎋',
    themeColor: '#ffeaa7',
    riskLevel: 'Tinggi (Palung Sesar Vulkanik Aktif)',
    desc: 'Lembah terjal di dasar kerak samudra di mana kayu dan rebung purba terfosilisasi dalam cairan belerang emas murni.',
    flavor: 'Lengan mekanik titanium kapal selam memotong perlahan rebung keemasan purba dari dinding palung.'
  },
  {
    id: 'hadal',
    name: 'Palung Palung Hadal Mariana (Zona Terdalam Bumi)',
    kanji: '最深マリアナ海溝',
    depthMeter: '6.000m - 10.920m',
    depthValue: 10920,
    cost: 18000,
    durationDays: 3,
    targetItem: 'ryujin_roe',
    minYield: 2,
    maxYield: 3,
    icon: '🐉',
    themeColor: '#ff7675',
    riskLevel: 'Ekstrem (Tekanan Maut 1.100 atm)',
    desc: 'Titik terdalam samudra bumi yang abadi dalam kegelapan mutlak, tempat peristirahatan telur naga laut purba Ryujin.',
    flavor: 'Kaca akrilik kapal selam berderit menahan tekanan raksasa. Cahaya keemasan telur naga menyinari kabin gelap.'
  }
]

export function createInitialAbyssalState() {
  return {
    unlocked: true,
    currentExpedition: null, // { zoneId, daysLeft, totalDays, status: 'diving' | 'returned', catchResult: null, logs: [] }
    discoveredItems: {
      abyssal_squid: 0,
      starlight_konnyaku: 0,
      millennium_takenoko: 0,
      ryujin_roe: 0
    },
    grimoireUnlocked: false, // Terbuka bila semua 4 bahan berhasil dipanen minimal 1x
    grimoireBonusClaimed: false,
    totalDives: 0,
    totalCatchesCount: 0,
    diveHistory: []
  }
}

export function launchExpedition(abyssalState, g, zoneId) {
  if (!abyssalState) return { success: false, msg: 'State kapal selam tidak valid.' }
  if (abyssalState.currentExpedition) {
    return { success: false, msg: 'Kapal selam Shinkai 2000 sedang dalam misi penyelaman aktif!' }
  }

  const zone = ABYSSAL_ZONES.find(z => z.id === zoneId)
  if (!zone) return { success: false, msg: 'Zona palung tidak ditemukan.' }

  if (g.money < zone.cost) {
    return { success: false, msg: `Dana kas tidak cukup! Ekspedisi ke ${zone.name} membutuhkan ¥${zone.cost.toLocaleString()}.` }
  }

  // Potong biaya ekspedisi
  g.money -= zone.cost
  abyssalState.totalDives++

  const initialLog = [
    `[Hari ke-${g.day}] Shinkai 2000 melepaskan diri dari dok dan meluncur menuju ${zone.name} (${zone.depthMeter}).`,
    `Sonar hidrofon memancarkan frekuensi 1.800 Hz memindai jurang laut dingin.`
  ]

  abyssalState.currentExpedition = {
    zoneId: zone.id,
    zoneName: zone.name,
    targetItem: zone.targetItem,
    depthMeter: zone.depthMeter,
    daysLeft: zone.durationDays,
    totalDays: zone.durationDays,
    status: 'diving',
    catchResult: null,
    logs: initialLog
  }

  // Audio & Visual
  Audio.playSubmarineEngine()
  setTimeout(() => Audio.playSonarPing(), 400)

  g.floats.push({
    s: `🌊 SHINKAI 2000 MELUNCUR! Menyelam ke ${zone.depthMeter} (-¥${zone.cost.toLocaleString()})`,
    x: 160,
    y: 50,
    t: 0.01,
    c: zone.themeColor
  })

  return { success: true, msg: `Penyelaman Shinkai 2000 ke ${zone.name} berhasil diluncurkan! Estimasi kembali: ${zone.durationDays} hari.` }
}

export function advanceExpeditionDay(abyssalState, g) {
  if (!abyssalState || !abyssalState.currentExpedition) return null
  const exp = abyssalState.currentExpedition

  if (exp.status === 'diving') {
    exp.daysLeft--

    if (exp.daysLeft <= 0) {
      // Penyelaman selesai! Menentukan hasil panen bahan langka
      const zone = ABYSSAL_ZONES.find(z => z.id === exp.zoneId)
      const yieldQty = Math.floor(Math.random() * (zone.maxYield - zone.minYield + 1)) + zone.minYield
      const itemData = ABYSSAL_ITEMS_DATA[exp.targetItem]

      // Peluang bonus tambahan mineral purba (25% chance)
      const hasBonus = Math.random() < 0.25
      const bonusYield = hasBonus ? 1 : 0

      exp.status = 'returned'
      exp.catchResult = {
        itemId: exp.targetItem,
        itemName: itemData.name,
        quantity: yieldQty + bonusYield,
        hasBonus,
        zoneName: zone.name
      }

      exp.logs.push(`[Hari ke-${g.day}] SUKSES! Lengan robotik berhasil mengumpulkan ${yieldQty + bonusYield}x ${itemData.name}!`)
      exp.logs.push(`Kapal selam Shinkai 2000 telah naik ke permukaan dan berlabuh di dermaga kedai. Hasil tangkapan siap diklaim!`)

      Audio.playAbyssalDiscovery()
      setTimeout(() => Audio.playBubbleAscend(), 300)

      g.floats.push({
        s: `⚓ SHINKAI 2000 BERLABUH! Tangkapan ${itemData.name} siap diklaim!`,
        x: 160,
        y: 45,
        t: 0.01,
        c: '#00d2d3'
      })

      return exp.catchResult
    } else {
      // Masih menyelam di kedalaman
      const midLogs = [
        `[Hari ke-${g.day}] Kapal selam menembus lapisan termoklin dingin. Lampu sorot menyapu formasi batu palung purba.`,
        `[Hari ke-${g.day}] Tekanan hidrostatik stabil. Detektor sonar merekam sinyal gelombang unik organisme prasejarah.`,
        `[Hari ke-${g.day}] Menavigasi celah tebing jurang samudra. Sisa waktu penyelaman: ${exp.daysLeft} hari.`
      ]
      exp.logs.push(midLogs[Math.floor(Math.random() * midLogs.length)])
    }
  }

  return null
}

export function claimExpeditionCatch(abyssalState, g) {
  if (!abyssalState || !abyssalState.currentExpedition) {
    return { success: false, msg: 'Tidak ada ekspedisi yang sedang berjalan.' }
  }

  const exp = abyssalState.currentExpedition
  if (exp.status !== 'returned' || !exp.catchResult) {
    return { success: false, msg: 'Kapal selam masih dalam perjalanan penyelaman!' }
  }

  const catchRes = exp.catchResult
  const itemId = catchRes.itemId
  const qty = catchRes.quantity

  // Masukkan bahan ke inventaris stok kedai
  g.stock[itemId] = (g.stock[itemId] || 0) + qty

  // Catat penemuan di arsip
  abyssalState.discoveredItems[itemId] = (abyssalState.discoveredItems[itemId] || 0) + qty
  abyssalState.totalCatchesCount += qty

  abyssalState.diveHistory.unshift({
    day: g.day,
    zoneId: exp.zoneId,
    zoneName: exp.zoneName,
    itemId,
    itemName: catchRes.itemName,
    quantity: qty
  })

  if (abyssalState.diveHistory.length > 20) {
    abyssalState.diveHistory.pop()
  }

  // Cek apakah Grimoire Terlarang terbuka
  const grimoireStatus = checkGrimoireProgress(abyssalState)
  let grimoireJustUnlocked = false

  if (grimoireStatus.unlocked && !abyssalState.grimoireUnlocked) {
    abyssalState.grimoireUnlocked = true
    grimoireJustUnlocked = true
    g.rep += 50
    Audio.playFeverSound()
    setTimeout(() => Audio.playFateShine(), 200)

    g.floats.push({
      s: '📜 PUSTAKA MAHAKARYA SAMUDRA TERBUKA! (Reputasi +50 & Buff Permanen +15%)',
      x: 160,
      y: 55,
      t: 0.01,
      c: '#ffd700'
    })
  } else {
    Audio.playBubbleAscend()
    setTimeout(() => Audio.playBioluminescentHum(), 250)

    g.floats.push({
      s: `📦 TANGKAPAN DITERIMA: +${qty}x ${catchRes.itemName} masuk ke persediaan!`,
      x: 160,
      y: 60,
      t: 0.01,
      c: '#2ecc71'
    })
  }

  // Reset ekspedisi aktif
  abyssalState.currentExpedition = null

  return {
    success: true,
    catchResult: catchRes,
    grimoireJustUnlocked,
    msg: `Berhasil membongkar muatan! +${qty}x ${catchRes.itemName} kini tersedia di stok panci oden.`
  }
}

export function checkGrimoireProgress(abyssalState) {
  if (!abyssalState) return { unlocked: false, progress: 0, total: 4, missing: [] }
  const keys = Object.keys(ABYSSAL_ITEMS_DATA)
  const missing = []
  let count = 0

  keys.forEach(k => {
    if ((abyssalState.discoveredItems[k] || 0) > 0) {
      count++
    } else {
      missing.push(ABYSSAL_ITEMS_DATA[k].name)
    }
  })

  return {
    unlocked: count === keys.length,
    progress: count,
    total: keys.length,
    missing
  }
}

