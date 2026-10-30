// Minigame Mengiris Pisau Dapur Presisi (Master Knife Prep Minigame)
// Teknik mengiris lobak berlian, mengikat tali kinchaku, dan menusuk sate dengan timing presisi.

export const KNIFE_TECHNIQUES = [
  {
    id: 'daikon_diamond',
    name: 'Keratan Berlian Lobak (Diamond Scoring)',
    targetItem: 'daikon',
    icon: '✨',
    desc: 'Iris pola silang wajik di permukaan Daikon agar kaldu meresap 2x lebih cepat!',
    baseStockCost: 2,
    yieldAmount: 2
  },
  {
    id: 'kinchaku_knot',
    name: 'Ikatan Tali Kanpyo (Kinchaku Tie)',
    targetItem: 'kinchaku',
    icon: '🎀',
    desc: 'Ikat kantong tahu isi mochi dengan ikatan kencang pada sweet spot timing bar!',
    baseStockCost: 2,
    yieldAmount: 2
  },
  {
    id: 'yakitori_spiral',
    name: 'Tusukan Spiral Koki (Spiral Skewer)',
    targetItem: 'yakitori',
    icon: '🍢',
    desc: 'Tusuk daging ayam & daun bawang dengan sudut spiral agar matang merata!',
    baseStockCost: 2,
    yieldAmount: 2
  }
]

export function createKnifePrepSession(techId) {
  const tech = KNIFE_TECHNIQUES.find(t => t.id === techId) || KNIFE_TECHNIQUES[0]
  return {
    technique: tech,
    cursor: 0, // 0 - 100 bar
    speed: 65, // cursor speed
    direction: 1,
    targetZoneStart: 42,
    targetZoneEnd: 58,
    perfectZoneStart: 48,
    perfectZoneEnd: 52,
    strikesRemaining: 3,
    scoreHistory: [],
    finished: false,
    finalGrade: null // 'masterwork' | 'good' | 'imperfect'
  }
}

export function updateKnifePrepSession(session, dt) {
  if (!session || session.finished) return
  session.cursor += session.direction * session.speed * dt
  if (session.cursor >= 100) {
    session.cursor = 100
    session.direction = -1
  } else if (session.cursor <= 0) {
    session.cursor = 0
    session.direction = 1
  }
}

export function strikeKnife(session) {
  if (!session || session.finished) return null
  const pos = session.cursor
  let result = 'imperfect'

  if (pos >= session.perfectZoneStart && pos <= session.perfectZoneEnd) {
    result = 'perfect'
  } else if (pos >= session.targetZoneStart && pos <= session.targetZoneEnd) {
    result = 'good'
  }

  session.scoreHistory.push(result)
  session.strikesRemaining--

  if (session.strikesRemaining <= 0) {
    session.finished = true
    const perfectCount = session.scoreHistory.filter(s => s === 'perfect').length
    const goodCount = session.scoreHistory.filter(s => s === 'good').length

    if (perfectCount >= 2) {
      session.finalGrade = 'masterwork'
    } else if (perfectCount + goodCount >= 2) {
      session.finalGrade = 'good'
    } else {
      session.finalGrade = 'imperfect'
    }
  }

  return result
}

