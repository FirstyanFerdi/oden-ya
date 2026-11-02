// Sistem Pohon Takdir Musiman & Horoskop Bintang Showa (The Celestial Ema & Hanafuda Fate Matrix)
// Mengatur pengubah acak harian (run modifier) yang mendalam setiap fajar baru.

import * as Audio from './audio.js'

export const HANAFUDA_CARDS = {
  matsu: {
    id: 'matsu',
    name: 'Matsu ni Tsuru (Pinus & Bangau)',
    month: 'Januari (Mutsumi-zuki)',
    element: 'Cahaya / Kemakmuran',
    icon: '🌲🕊️',
    badgeColor: '#27ae60',
    title: 'Keberuntungan Kaisar (Emperor\'s Fortune)',
    desc: 'Seluruh tamu membawa anggaran belanja +60% lebih tinggi dan peluang tamu bangsawan Zashiki VIP melonjak +50%.',
    guestBudgetMult: 1.6,
    zashikiBonusRate: 0.5,
    visualAtmosphere: 'gold_leaves',
    blessing: 'Kemakmuran melimpah bagi itamae yang tekun.'
  },
  sakura: {
    id: 'sakura',
    name: 'Sakura ni Maku (Bunga Sakura & Tirai Pesta)',
    month: 'Maret (Yayoi)',
    element: 'Bunga / Pesta Musim Semi',
    icon: '🌸🍶',
    badgeColor: '#fd79a8',
    title: 'Mabuk Musim Semi (Hanami Euphoria)',
    desc: 'Tamu memesan sake 2x lebih banyak, kesabaran berkurang 50% lebih lambat, dan tip pasangan sake (pairing) berlipat ganda (+100%).',
    sakeOrderChanceMult: 2.0,
    patienceDecayMult: 0.5,
    pairingTipBonusMult: 2.0,
    visualAtmosphere: 'cherry_petals',
    blessing: 'Aroma sake dan kelopak mekar menghangatkan kalbu.'
  },
  tsuki: {
    id: 'tsuki',
    name: 'Tsuki ni Susuki (Bulan Merah & Rumput Ilalang)',
    month: 'Agustus (Hazuki)',
    element: 'Bulan / Mistis Suci',
    icon: '🌕🌾',
    badgeColor: '#e74c3c',
    title: 'Gerhana Bulan Darah (Blood Moon Harvest)',
    desc: 'Kuah kaldu mengeluarkan pendar keemasan mistis! Seluruh bahan rebusan emas bernilai +50%, dan fusi resep baru memberikan bonus ¥1.000.',
    goldenBoilBonusMult: 1.5,
    fusionSellBonus: 1000,
    visualAtmosphere: 'blood_moon',
    blessing: 'Bulan perak menerangi sari kaldu tersembunyi.'
  },
  ame: {
    id: 'ame',
    name: 'Ame ni Ono no Michikaze (Pujangga Hujan & Katak)',
    month: 'November (Shimotsuki)',
    element: 'Hujan / Melankolis Pujangga',
    icon: '🌧️🐸',
    badgeColor: '#3498db',
    title: 'Malam Pujangga Hujan (The Poet\'s Rain)',
    desc: 'Hujan syahdu bertabur melodi: cerita dialog curhat pelanggan memberikan hadiah uang 3x lipat (+¥600) dan pengelana membawa hadiah artefak.',
    storyRewardMult: 3.0,
    wandererChanceBoost: 0.35,
    visualAtmosphere: 'poet_mist',
    blessing: 'Setiap tetes air hujan menyimpan bait sajak kenangan.'
  },
  kiku: {
    id: 'kiku',
    name: 'Kiku ni Sakazuki (Krisan & Cawan Arak Emas)',
    month: 'September (Nagatsuki)',
    element: 'Panjang Umur / Harmoni',
    icon: '🌼🏆',
    badgeColor: '#f1c40f',
    title: 'Jamuan Panjang Umur (Chrysanthemum Banquet)',
    desc: 'Setiap hidangan dengan skor harmoni Kaiseki ≥80 pts memberikan reputasi tambahan +5 dan FEVER mode melipatgandakan omset x4.0!',
    kaisekiBonusRep: 5,
    feverMultBonus: 4.0,
    visualAtmosphere: 'golden_sparkles',
    blessing: 'Kelopak krisan lambang kejayaan sang juru masak agung.'
  },
  momiji: {
    id: 'momiji',
    name: 'Momiji ni Shika (Maple Musim Gugur & Rusa)',
    month: 'Oktober (Kannazuki)',
    element: 'Musim Gugur / Niaga',
    icon: '🍁🦌',
    badgeColor: '#d35400',
    title: 'Angin Niaga Keemasan (Golden Autumn Commerce)',
    desc: 'Diskon belanja pasar grosir pagi sebesar 35% dan penjualan sate bakar Yakitori berlipat ganda (x2.0)!',
    marketDiscount: 0.35,
    yakitoriPriceMult: 2.0,
    visualAtmosphere: 'maple_leaves',
    blessing: 'Daun merah meliuk menyambut peti uang yang bergemerincing.'
  }
}

export function createInitialFateState() {
  return {
    activeCard: 'matsu',         // Kartu Hanafuda aktif hari ini
    dayDrawn: 1,
    drawnToday: false,
    rerollCount: 0,
    maxRerolls: 1,
    emaWishes: [],               // Doa kayu Ema yang digantung pemain
    unlockedCelestialPerk: false,
    fateHistory: []
  }
}

export function drawDailyFateCard(fateState, g, forcedId = null) {
  if (!fateState) return null

  const keys = Object.keys(HANAFUDA_CARDS)
  const cardId = forcedId && HANAFUDA_CARDS[forcedId] ? forcedId : keys[Math.floor(Math.random() * keys.length)]
  const card = HANAFUDA_CARDS[cardId]

  fateState.activeCard = cardId
  fateState.dayDrawn = g.day || 1
  fateState.drawnToday = true

  Audio.playHanafudaSnap()
  setTimeout(() => Audio.playFateShine(), 150)

  g.floats.push({
    s: `🎴 TAKDIR HANAFUDA: ${card.name}!`,
    x: 160,
    y: 50,
    t: 0.01,
    c: card.badgeColor
  })

  fateState.fateHistory.push({
    day: g.day,
    cardId: card.id,
    name: card.name
  })

  return card
}

export function rerollFateCard(fateState, g) {
  if (!fateState) return { success: false, msg: 'State tidak valid.' }
  const cost = 1500
  if (g.money < cost) {
    return { success: false, msg: `Uang tidak cukup untuk ritual pengocokan ulang (Butuh ¥${cost.toLocaleString()})!` }
  }

  g.money -= cost
  fateState.rerollCount++

  const keys = Object.keys(HANAFUDA_CARDS).filter(k => k !== fateState.activeCard)
  const newCardId = keys[Math.floor(Math.random() * keys.length)]
  const newCard = HANAFUDA_CARDS[newCardId]

  fateState.activeCard = newCardId

  Audio.playHanafudaSnap()
  setTimeout(() => Audio.playFateShine(), 150)

  g.floats.push({
    s: `🎴 TAKDIR DIKOCOK ULANG: ${newCard.name}! (-¥1.500)`,
    x: 160,
    y: 55,
    t: 0.01,
    c: newCard.badgeColor
  })

  return { success: true, card: newCard, msg: `Takdir hari ini berubah menjadi "${newCard.name}"!` }
}

export function hangCelestialEma(fateState, g, wishText) {
  if (!fateState) return false
  const cost = 2000
  if (g.money < cost) return false

  g.money -= cost
  g.rep += 15
  fateState.unlockedCelestialPerk = true

  fateState.emaWishes.push({
    day: g.day,
    text: wishText || 'Semoga kedai selalu diberkahi kehangatan di tengah hujan Showa.',
    timestamp: Date.now()
  })

  Audio.playFateShine()
  g.floats.push({
    s: '🎋 PAPAN EMA DIGANTUNG! Doa Terkabul (Reputasi +15)',
    x: 160,
    y: 65,
    t: 0.01,
    c: '#f1c40f'
  })

  return true
}

export function getActiveFateCard(fateState) {
  if (!fateState || !fateState.activeCard) return HANAFUDA_CARDS.matsu
  return HANAFUDA_CARDS[fateState.activeCard] || HANAFUDA_CARDS.matsu
}

