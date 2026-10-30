// Duel Kuliner Terbuka Melawan Rival Yamada-ya (Street Cart Cook-Off Turf War)
// Pertarungan 3 babak di hadapan juri warga distrik demi memperebutkan supremasi jalanan.

export function createCookOffSession() {
  return {
    round: 1, // 1: Aroma Clash, 2: Speed Grilling, 3: Final Plating Harmony
    playerScore: 0,
    rivalScore: 0,
    roundData: {
      round1AromaClicks: 0,
      round1Timer: 6.0,
      round2SateCount: 0,
      round2Timer: 8.0,
      round3HarmonyScore: 0
    },
    log: [
      '🏮 Wasit Jalanan: "DUEL KULINER RESMI DIMULAI!"',
      '👉 Babak 1: Adu Harum Kaldu (Aroma Clash)! Klik kuali secepat mungkin!'
    ],
    finished: false,
    winner: null // 'player' | 'yamada'
  }
}

export function updateCookOff(session, dt) {
  if (!session || session.finished) return
  const rd = session.roundData

  if (session.round === 1) {
    rd.round1Timer -= dt
    if (rd.round1Timer <= 0) {
      // Selesai babak 1
      const pR1 = Math.min(100, rd.round1AromaClicks * 5)
      const rivalR1 = 55 + Math.floor(Math.random() * 35)
      session.playerScore += pR1
      session.rivalScore += rivalR1
      session.log.push(`🏁 Babak 1 Selesai: Anda (${pR1} Pts) vs Yamada-ya (${rivalR1} Pts)`)
      session.round = 2
      session.log.push('👉 Babak 2: Adu Kecepatan Panggangan Sate! Balik tusukan sate!')
    }
  } else if (session.round === 2) {
    rd.round2Timer -= dt
    if (rd.round2Timer <= 0) {
      // Selesai babak 2
      const pR2 = Math.min(100, rd.round2SateCount * 12)
      const rivalR2 = 60 + Math.floor(Math.random() * 30)
      session.playerScore += pR2
      session.rivalScore += rivalR2
      session.log.push(`🏁 Babak 2 Selesai: Anda (${pR2} Pts) vs Yamada-ya (${rivalR2} Pts)`)
      session.round = 3
      session.log.push('👉 Babak 3: Penjurian Harmoni Rasa & Presentasi Final!')
    }
  } else if (session.round === 3) {
    // Babak 3 otomatis dihitung dari keahlian pemain
    const pR3 = 75 + Math.floor(Math.random() * 25)
    const rivalR3 = 70 + Math.floor(Math.random() * 25)
    session.playerScore += pR3
    session.rivalScore += rivalR3
    session.finished = true
    session.winner = session.playerScore >= session.rivalScore ? 'player' : 'yamada'

    if (session.winner === 'player') {
      session.log.push('🎉 SAH! TIGA JURI WARGA MEMILIH KEDAI ANDA SEBAGAI RAJA ODEN DISTRIK!')
    } else {
      session.log.push('❌ Yamada-ya unggul tipis dalam duel kali ini!')
    }
  }
}

export function clickCookOffAction(session) {
  if (!session || session.finished) return
  if (session.round === 1) {
    session.roundData.round1AromaClicks++
  } else if (session.round === 2) {
    session.roundData.round2SateCount++
  }
}

