// Sistem Insiden Darurat & Peristiwa Acak Tak Terduga (The Midnight Anomalies & Sudden Street Dramas)
// Menguji ketangkasan situasional koki Showa dengan 4 bencana & fenomena jalanan tak terduga.

import * as Audio from './audio.js'

export const STREET_ANOMALIES = {
  dekotora_convoy: {
    id: 'dekotora_convoy',
    name: 'Konvoi Truk Dekotora Showa',
    title: 'Neon Midnight Convoy',
    icon: '🚛✨',
    badgeColor: '#e67e22',
    desc: 'Klakson angin menggelegar! 4 supir truk tronton Showa kelaparan menyerbu kedai secara serentak menuntut porsi jumbo dalam 90 detik!',
    rule: 'Layani minimal 3 supir truk Dekotora porsi besar sebelum waktu habis.',
    duration: 90,
    targetServes: 3,
    rewardMoney: 12000,
    rewardRep: 25,
    failMoney: 0,
    failRep: 10,
    rewardDesc: 'Traktiran seisi kedai dari bos supir: Uang Tunai ¥12.000 + Reputasi +25.',
    failDesc: 'Supir mengumpat kelaparan karena terlambat: Reputasi -10.'
  },
  district_blackout: {
    id: 'district_blackout',
    name: 'Ledakan Gardu Trafo Distrik',
    title: 'Substation Blackout (Audio Cooking)',
    icon: '⚡🌑',
    badgeColor: '#34495e',
    desc: 'Gardu listrik distrik meledak! Kedai gelap gulita. Masaklah hanya dengan pendaran bara kompor dan isyarat audio!',
    rule: 'Masak dalam gelap gulita dan layani minimal 2 tamu. Bisa nyalakan lilin darurat.',
    duration: 45,
    targetServes: 2,
    rewardMoney: 8000,
    rewardRep: 20,
    failMoney: 0,
    failRep: 8,
    rewardDesc: 'Gelar "Koki Telinga Emas" Showa: Uang Tunai ¥8.000 + Reputasi +20.',
    failDesc: 'Tamu tersandung dalam kegelapan: Reputasi -8.'
  },
  film_crew: {
    id: 'film_crew',
    name: 'Kru Film Sinema Menyamar',
    title: 'Guerilla Showa Film Crew',
    icon: '🎬🎥',
    badgeColor: '#9b59b6',
    desc: 'Sutradara film era 1970-an tiba-tiba syuting gerilya di depan kedai! Sajikan piring dengan skor Kaiseki tinggi (≥75 pts) di depan lensa 35mm!',
    rule: 'Sajikan minimal 2 piring berestetika Kaiseki tinggi (≥75 pts) dalam sorotan kamera.',
    duration: 60,
    targetServes: 2,
    rewardMoney: 10000,
    rewardRep: 50,
    failMoney: 0,
    failRep: 5,
    rewardDesc: 'Liputan Viral Sinema Showa: Uang Honor ¥10.000 + Reputasi Melonjak +50!',
    failDesc: 'Sutradara kecewa "CUT!": Reputasi -5.'
  },
  volcanic_ashfall: {
    id: 'volcanic_ashfall',
    name: 'Hujan Abu Vulkanik Gunung Fuji',
    title: 'Volcanic Ashfall & Otoshi-buta',
    icon: '🌋🪵',
    badgeColor: '#7f8c8d',
    desc: 'Butiran abu vulkanik turun dari langit! Pasang penutup kayu kuali (Otoshi-buta) saat angin abu menebal agar kaldu tidak tercemar!',
    rule: 'Buka-tutup kuali Otoshi-buta dengan timing cermat. Cegah kaldu tercemar abu lebih dari 2 kali.',
    duration: 50,
    maxContaminationsAllowed: 2,
    rewardMoney: 9000,
    rewardRep: 20,
    failMoney: 3000,
    failRep: 12,
    rewardDesc: 'Mineral Kaldu Subur & Aromatik: Uang Tunai ¥9.000 + Reputasi +20.',
    failDesc: 'Kaldu tercemar abu vulkanik: Denda kuras ¥3.000 dan Reputasi -12.'
  }
}

export function createInitialAnomalyState() {
  return {
    activeIncident: null,         // null | 'dekotora_convoy' | 'district_blackout' | 'film_crew' | 'volcanic_ashfall'
    incidentTimer: 0,
    incidentMaxTimer: 0,
    status: 'none',               // 'none' | 'active' | 'success' | 'failed'
    triggeredToday: false,
    dayOfTrigger: 0,
    // Dekotora Convoy state
    dekotoraServes: 0,
    dekotoraTarget: 3,
    // District Blackout state
    blackoutServes: 0,
    blackoutTarget: 2,
    candlesLit: false,
    // Film Crew state
    filmCrewServes: 0,
    filmCrewTarget: 2,
    cameraFlashAlpha: 0,
    // Volcanic Ashfall state
    otoshibutaCovered: false,
    ashDensity: 0,
    ashContaminations: 0,
    maxAshAllowed: 2,
    ashGustTimer: 0,
    isAshGusting: false,
    // Unlocks & History
    unlockedGoldenEar: false,
    unlockedCinemaPass: false,
    lastIncidentResult: null,
    history: []
  }
}

export function triggerRandomIncident(anomalyState, g, specificId = null) {
  if (!anomalyState) return { success: false, msg: 'State tidak valid.' }
  if (anomalyState.activeIncident && anomalyState.status === 'active') {
    return { success: false, msg: 'Sedang ada insiden darurat yang berlangsung!' }
  }

  const ids = Object.keys(STREET_ANOMALIES)
  const incidentId = specificId && STREET_ANOMALIES[specificId] ? specificId : ids[Math.floor(Math.random() * ids.length)]
  const data = STREET_ANOMALIES[incidentId]

  anomalyState.activeIncident = incidentId
  anomalyState.status = 'active'
  anomalyState.incidentTimer = data.duration
  anomalyState.incidentMaxTimer = data.duration
  anomalyState.triggeredToday = true
  anomalyState.dayOfTrigger = g.day || 1

  // Reset variabel sub-insiden
  anomalyState.dekotoraServes = 0
  anomalyState.dekotoraTarget = data.targetServes || 3
  anomalyState.blackoutServes = 0
  anomalyState.blackoutTarget = data.targetServes || 2
  anomalyState.candlesLit = false
  anomalyState.filmCrewServes = 0
  anomalyState.filmCrewTarget = data.targetServes || 2
  anomalyState.cameraFlashAlpha = 0
  anomalyState.otoshibutaCovered = false
  anomalyState.ashContaminations = 0
  anomalyState.maxAshAllowed = data.maxContaminationsAllowed || 2
  anomalyState.ashGustTimer = 4
  anomalyState.isAshGusting = false

  // Efek Suara & Aksi Khusus Awal
  if (incidentId === 'dekotora_convoy') {
    Audio.playTruckHorn()
    spawnDekotoraDrivers(g)
  } else if (incidentId === 'district_blackout') {
    Audio.playTransformerExplosion()
    setTimeout(() => Audio.playBlackoutHum(), 250)
  } else if (incidentId === 'film_crew') {
    Audio.playCameraCrank()
    setTimeout(() => Audio.playClapperboard(), 300)
  } else if (incidentId === 'volcanic_ashfall') {
    Audio.playVolcanicRumble()
  }

  g.floats.push({
    s: `🚨 PERISTIWA DARURAT: ${data.name}!`,
    x: 160,
    y: 40,
    t: 0.01,
    c: data.badgeColor
  })

  return { success: true, msg: `Peristiwa darurat "${data.name}" dimulai! Waktu: ${data.duration} detik!` }
}

export function spawnDekotoraDrivers(g) {
  if (!g.cust) return
  // Hitung kursi yang belum terisi
  const usedSeats = g.cust.map(c => c.seat)
  if (g.pacts?.activePact === 'cursed_stool') {
    usedSeats.push(0)
  }
  const maxSeats = g.seats ? (typeof g.seats === 'function' ? g.seats() : g.seats.length || 4) : 4
  const availableSeats = []
  for (let s = 0; s < maxSeats; s++) {
    if (!usedSeats.includes(s)) availableSeats.push(s)
  }

  // Jika kursi penuh, kosongkan 2 kursi tamu biasa yang sedang menunggu
  if (availableSeats.length < 2) {
    for (let i = g.cust.length - 1; i >= 0 && availableSeats.length < 3; i--) {
      if (!g.cust[i].isBoss && !g.cust[i].isMidnightRiddle && !g.cust[i].isDekotora) {
        availableSeats.push(g.cust[i].seat)
        g.cust.splice(i, 1)
      }
    }
  }

  const driverNames = ['Goroh', 'Torakichi', 'Banteng Kanto', 'Ryu Harimau']
  const driverShirts = ['#c0392b', '#2980b9', '#d35400', '#27ae60']

  // Munculkan 3 supir truk Dekotora
  const spawnCount = Math.min(3, availableSeats.length)
  for (let k = 0; k < spawnCount; k++) {
    const seatIdx = availableSeats[k]
    const driver = {
      x: -15 - k * 20,
      y: 140,
      seat: seatIdx,
      st: 'walk',
      charId: null,
      charName: driverNames[k % driverNames.length],
      isDekotora: true,
      mood: 'normal',
      h: '#111111',
      s: driverShirts[k % driverShirts.length],
      w: 8,
      order: ['gyusuji', 'daikon', 'chikuwa', 'egg'].slice(0, 3 + (k % 2)),
      condimentReq: 'karashi',
      wantsSake: true,
      pat: 90,
      max: 90,
      eatT: 0,
      sat: 0,
      bonusPatience: 20,
      orderOpenTime: 0
    }
    g.cust.push(driver)
  }
}

export function updateIncidentLoop(anomalyState, dt, g) {
  if (!anomalyState || anomalyState.status !== 'active' || !anomalyState.activeIncident) return

  anomalyState.incidentTimer = Math.max(0, anomalyState.incidentTimer - dt)

  // Fade camera flash
  if (anomalyState.cameraFlashAlpha > 0) {
    anomalyState.cameraFlashAlpha = Math.max(0, anomalyState.cameraFlashAlpha - dt * 2.5)
  }

  // Khusus Hujan Abu Vulkanik: Siklus Hembusan Angin Abu
  if (anomalyState.activeIncident === 'volcanic_ashfall') {
    anomalyState.ashGustTimer -= dt
    if (anomalyState.ashGustTimer <= 0) {
      anomalyState.isAshGusting = !anomalyState.isAshGusting
      anomalyState.ashGustTimer = anomalyState.isAshGusting ? 4.5 : 5.5

      if (anomalyState.isAshGusting) {
        Audio.playVolcanicRumble()
        g.floats.push({
          s: '🌪️ ANGIN ABU VULKANIK MENEBAL! PASANG TUTUP KUALI!',
          x: 160,
          y: 60,
          t: 0.01,
          c: '#e74c3c'
        })
      }
    }

    // Jika sedang hembusan abu lebat dan kuali tidak tertutup
    if (anomalyState.isAshGusting && !anomalyState.otoshibutaCovered) {
      anomalyState.ashDensity += dt * 0.4
      if (anomalyState.ashDensity >= 1.0) {
        anomalyState.ashDensity = 0
        anomalyState.ashContaminations++
        if (g.masterVat) {
          g.masterVat.scumLevel = Math.min(100, (g.masterVat.scumLevel || 0) + 20)
        }
        Audio.playHellBoilSizzle()
        g.floats.push({
          s: `⚠️ KALDU TERCEMAR ABU! (${anomalyState.ashContaminations}/${anomalyState.maxAshAllowed})`,
          x: 160,
          y: 75,
          t: 0.01,
          c: '#ff7675'
        })
      }
    }
  }

  // Waktu habis -> Evaluasi Otomatis
  if (anomalyState.incidentTimer <= 0) {
    resolveIncident(anomalyState, g)
  }
}

export function onIncidentServe(anomalyState, g, serveData) {
  if (!anomalyState || anomalyState.status !== 'active' || !anomalyState.activeIncident) return

  const incidentId = anomalyState.activeIncident
  const { customer, kaisekiScore, sat } = serveData

  if (incidentId === 'dekotora_convoy') {
    if (customer && customer.isDekotora) {
      anomalyState.dekotoraServes++
      g.floats.push({
        s: `🚛 Supir Puas! (${anomalyState.dekotoraServes}/${anomalyState.dekotoraTarget})`,
        x: customer.x || 160,
        y: (customer.y || 100) - 45,
        t: 0.01,
        c: '#e67e22'
      })
      if (anomalyState.dekotoraServes >= anomalyState.dekotoraTarget) {
        resolveIncident(anomalyState, g)
      }
    }
  } else if (incidentId === 'district_blackout') {
    anomalyState.blackoutServes++
    g.floats.push({
      s: `🎧 Masak Audio Sukses! (${anomalyState.blackoutServes}/${anomalyState.blackoutTarget})`,
      x: customer?.x || 160,
      y: (customer?.y || 100) - 45,
      t: 0.01,
      c: '#3498db'
    })
    if (anomalyState.blackoutServes >= anomalyState.blackoutTarget) {
      resolveIncident(anomalyState, g)
    }
  } else if (incidentId === 'film_crew') {
    if ((kaisekiScore && kaisekiScore >= 75) || (sat && sat >= 0.8)) {
      anomalyState.filmCrewServes++
      anomalyState.cameraFlashAlpha = 1.0
      Audio.playCameraCrank()
      g.floats.push({
        s: `📸 TERSOROT KAMERA 35MM! (${anomalyState.filmCrewServes}/${anomalyState.filmCrewTarget})`,
        x: customer?.x || 160,
        y: (customer?.y || 100) - 55,
        t: 0.01,
        c: '#f1c40f'
      })
      if (anomalyState.filmCrewServes >= anomalyState.filmCrewTarget) {
        resolveIncident(anomalyState, g)
      }
    }
  }
}

export function toggleOtoshiButa(anomalyState, g) {
  if (!anomalyState) return false
  anomalyState.otoshibutaCovered = !anomalyState.otoshibutaCovered
  Audio.playOtoshiButaWood()

  g.floats.push({
    s: anomalyState.otoshibutaCovered ? '🪵 Tutup Kuali Otoshi-buta Dipasang (Kaldu Aman!)' : '🪵 Tutup Kuali Dibuka',
    x: 160,
    y: 80,
    t: 0.01,
    c: anomalyState.otoshibutaCovered ? '#2ecc71' : '#f39c12'
  })

  return anomalyState.otoshibutaCovered
}

export function lightEmergencyCandle(anomalyState, g) {
  if (!anomalyState || anomalyState.activeIncident !== 'district_blackout') return false
  if (anomalyState.candlesLit) return true
  anomalyState.candlesLit = true

  g.floats.push({
    s: '🕯️ Lilin Darurat Dinyalakan! Visibilitas Membaik!',
    x: 160,
    y: 80,
    t: 0.01,
    c: '#f1c40f'
  })

  return true
}

export function resolveIncident(anomalyState, g) {
  if (!anomalyState || !anomalyState.activeIncident || anomalyState.status !== 'active') return null

  const data = STREET_ANOMALIES[anomalyState.activeIncident]
  if (!data) return null

  let isSuccess = false
  if (data.id === 'dekotora_convoy') {
    isSuccess = anomalyState.dekotoraServes >= anomalyState.dekotoraTarget
  } else if (data.id === 'district_blackout') {
    isSuccess = anomalyState.blackoutServes >= anomalyState.blackoutTarget
  } else if (data.id === 'film_crew') {
    isSuccess = anomalyState.filmCrewServes >= anomalyState.filmCrewTarget
  } else if (data.id === 'volcanic_ashfall') {
    isSuccess = anomalyState.ashContaminations <= anomalyState.maxAshAllowed
  }

  const result = {
    incidentId: data.id,
    incidentName: data.name,
    success: isSuccess,
    moneyDelta: isSuccess ? data.rewardMoney : (data.failMoney ? -data.failMoney : 0),
    repDelta: isSuccess ? data.rewardRep : -data.failRep,
    message: isSuccess ? data.rewardDesc : data.failDesc
  }

  if (isSuccess) {
    g.money += result.moneyDelta
    g.rep += result.repDelta
    Audio.playPactRewardChime()
    if (data.id === 'district_blackout') anomalyState.unlockedGoldenEar = true
    if (data.id === 'film_crew') anomalyState.unlockedCinemaPass = true

    g.floats.push({
      s: `🎉 INSIDEN SELESAI: ${data.name} Sukses! (+¥${result.moneyDelta.toLocaleString()})`,
      x: 160,
      y: 45,
      t: 0.01,
      c: '#2ecc71'
    })
  } else {
    if (result.moneyDelta < 0) {
      g.money = Math.max(0, g.money + result.moneyDelta)
    }
    g.rep = Math.max(0, g.rep + result.repDelta)
    Audio.playHellBoilSizzle()

    g.floats.push({
      s: `⚠️ INSIDEN GAGAL: ${data.name} (${result.message})`,
      x: 160,
      y: 45,
      t: 0.01,
      c: '#e74c3c'
    })
  }

  anomalyState.status = isSuccess ? 'success' : 'failed'
  anomalyState.lastIncidentResult = result
  anomalyState.history.push({
    day: g.day,
    id: data.id,
    success: isSuccess,
    moneyDelta: result.moneyDelta,
    repDelta: result.repDelta
  })

  // Matikan status darurat
  anomalyState.activeIncident = null
  anomalyState.incidentTimer = 0
  anomalyState.isAshGusting = false
  anomalyState.otoshibutaCovered = false

  return result
}

