// Turnamen Akbar Kuliner Kanto vs Kansai (The Grand Showa Culinary Grand Prix)
// Kompetisi puncak 3 babak knockout melawan Master Koki Ryuji dari Kansai demi memperebutkan Piala Bergilir Kaisar.

export function createGrandPrixSession() {
  return {
    round: 1, // 1: Dashi Blind Tasting, 2: Speed Kaiseki Plating, 3: Final Master Duel
    playerScore: 0,
    rivalScore: 0,
    timer: 15.0,
    round1Data: {
      kombu: 50,
      katsuo: 50,
      shoyu: 50,
      targetKombu: 70,
      targetKatsuo: 80,
      targetShoyu: 40,
      submitted: false
    },
    round2Data: {
      placedItems: [],
      targetItems: ['daikon', 'egg', 'matsuba_crab'],
      completed: false
    },
    round3Data: {
      potHeatClicks: 0,
      rivalClicks: 0,
      targetClicks: 25
    },
    log: [
      '🏆 Dewan Juri Kekaisaran: "SELAMAT DATANG DI GRAND PRIX KULINER NASIONAL SHOWA!"',
      '👉 Babak 1: Ujian Rasa Dashi Buta (Blind Tasting)! Seimbangkan takaran Kombu, Katsuobushi, dan Shoyu!'
    ],
    finished: false,
    winner: null // 'player' | 'ryuji'
  }
}

export function updateGrandPrix(session, dt) {
  if (!session || session.finished) return

  session.timer -= dt

  if (session.round === 1) {
    if (session.timer <= 0 && !session.round1Data.submitted) {
      submitDashiTasting(session)
    }
  } else if (session.round === 2) {
    if (session.timer <= 0) {
      // Waktu habis babak 2
      const matched = session.round2Data.placedItems.filter(x => session.round2Data.targetItems.includes(x)).length
      const pScore = Math.min(100, matched * 34)
      const rScore = 75 + Math.floor(Math.random() * 20)
      session.playerScore += pScore
      session.rivalScore += rScore
      session.log.push(`🏁 Babak 2 Selesai: Plating Anda (${pScore} Pts) vs Ryuji (${rScore} Pts)`)
      session.round = 3
      session.timer = 12.0
      session.log.push('👉 Babak 3: Duel Pamungkas Kuali Api! Klik kuali secepat mungkin untuk menyempurnakan Kaldu Imperial!')
    }
  } else if (session.round === 3) {
    // Simulasi klik koki rival Ryuji
    session.round3Data.rivalClicks += dt * (2.0 + Math.random() * 1.2)
    if (session.timer <= 0 || session.round3Data.potHeatClicks >= session.round3Data.targetClicks) {
      const pR3 = Math.min(100, Math.floor((session.round3Data.potHeatClicks / session.round3Data.targetClicks) * 100))
      const rR3 = Math.min(100, Math.floor((session.round3Data.rivalClicks / session.round3Data.targetClicks) * 100))
      session.playerScore += pR3
      session.rivalScore += rR3
      session.finished = true
      session.winner = session.playerScore >= session.rivalScore ? 'player' : 'ryuji'

      if (session.winner === 'player') {
        session.log.push('🎉 DEWAN JURI MENETAPKAN: ANDA ADALAH MASTER ITAMAE NASIONAL TERBAIK JEPANG!')
      } else {
        session.log.push('❌ Chef Ryuji dari Kansai mempertahankan gelarnya dengan keunggulan tipis!')
      }
    }
  }
}

export function adjustDashiRatio(session, ingredient, delta) {
  if (!session || session.round !== 1 || session.round1Data.submitted) return
  const r1 = session.round1Data
  if (ingredient === 'kombu') r1.kombu = Math.max(0, Math.min(100, r1.kombu + delta))
  if (ingredient === 'katsuo') r1.katsuo = Math.max(0, Math.min(100, r1.katsuo + delta))
  if (ingredient === 'shoyu') r1.shoyu = Math.max(0, Math.min(100, r1.shoyu + delta))
}

export function submitDashiTasting(session) {
  if (!session || session.round !== 1 || session.round1Data.submitted) return
  const r1 = session.round1Data
  r1.submitted = true

  const diffKombu = Math.abs(r1.kombu - r1.targetKombu)
  const diffKatsuo = Math.abs(r1.katsuo - r1.targetKatsuo)
  const diffShoyu = Math.abs(r1.shoyu - r1.targetShoyu)
  const totalDiff = diffKombu + diffKatsuo + diffShoyu

  const pScore = Math.max(20, 100 - Math.floor(totalDiff * 0.8))
  const rScore = 78 + Math.floor(Math.random() * 15)

  session.playerScore += pScore
  session.rivalScore += rScore
  session.log.push(`🏁 Babak 1 Selesai: Dashi Anda (${pScore} Pts) vs Dashi Ryuji (${rScore} Pts)`)
  session.round = 2
  session.timer = 15.0
  session.log.push('👉 Babak 2: Adu Cepat Kaiseki Plating! Susun bahan piring kehormatan!')
}

export function addPlatingItem(session, itemId) {
  if (!session || session.round !== 2) return
  if (!session.round2Data.placedItems.includes(itemId)) {
    session.round2Data.placedItems.push(itemId)
    if (session.round2Data.placedItems.length >= 3) {
      session.timer = Math.min(session.timer, 1.0) // Percepat ke evaluasi
    }
  }
}

export function clickGrandPrixStir(session) {
  if (!session || session.round !== 3 || session.finished) return
  session.round3Data.potHeatClicks++
}

