import {P} from './palette.js'
import {CHARACTERS, checkStoryTrigger, SPECIAL_ENCOUNTERS} from './characters.js'
import {BROTHS, NORENS, BOWLS, ORNAMENTS} from './decorations.js'
import {FUSION_RECIPES, checkRecipeDiscovery} from './recipes.js'
import {LOCATIONS} from './locations.js'
import {GRILL_ITEMS, createGrillSlots, getGrillState} from './grill.js'
import {AUCTION_ITEMS, createAuctionSession, BOT_BIDDERS} from './auction.js'
import {FORTUNES, drawOmikuji} from './fortune.js'
import {DASHI_INGREDIENTS, createMasterVat, getVatTier, skimVat, addIngredientToVat, advanceVatDay} from './dashi.js'
import {GUEST_MOODS, GREETINGS, HEIRLOOMS, assignGuestMood, evaluateGreeting} from './psychology.js'
import {KNIFE_TECHNIQUES, createKnifePrepSession, updateKnifePrepSession, strikeKnife} from './knifeprep.js'
import {DELIVERY_CLIENTS, generatePhoneOrder, packItemToBento, updateDelivery, calculateDeliveryPayout} from './delivery.js'
import {STREET_FACTIONS, evaluateSanitationScore, updateRivalStall} from './intrigue.js'
import {SEASONS, MARKET_HEADLINES, getSeasonForDay, generateDailyMarketNews} from './seasons.js'
import {MIDNIGHT_GUESTS, getMidnightGuest, evaluateMidnightRiddle} from './midnight.js'
import {createCookOffSession, updateCookOff, clickCookOffAction} from './cookoff.js'
import {MASTERY_SKILLS, canUnlockSkill} from './mastery.js'
import {POLAROID_ALBUM, calculateKaisekiScore} from './kaiseki.js'
import {createInitialArashiState, updateArashi, addArashiProgress, startArashiRush, triggerZenFocus, onArashiServe, createMultiCourseDemand} from './arashi.js'
import {ZASHIKI_VIP_GUESTS, createInitialDynastyState, canPrestige, executePrestige, calculateApprenticeDailyIncome, spawnZashikiGuest} from './dynasty.js'
import {createGrandPrixSession, updateGrandPrix, adjustDashiRatio, submitDashiTasting, addPlatingItem, clickGrandPrixStir} from './grandprix.js'
import {FERMENTATION_RECIPES, createInitialFermentationCellar, advanceCellarDays, startFermenting, harvestVat, evaluateSakePairing} from './fermentation.js'
import {FACTION_INFO, FACTION_DILEMMAS, createInitialFactionState, adjustFactionRep, triggerRandomDilemma, resolveDilemma} from './factions.js'
import * as Audio from './audio.js'

export {
  GRILL_ITEMS, AUCTION_ITEMS, FORTUNES, getGrillState,
  DASHI_INGREDIENTS, getVatTier, GUEST_MOODS, GREETINGS, HEIRLOOMS,
  KNIFE_TECHNIQUES, DELIVERY_CLIENTS, STREET_FACTIONS,
  SEASONS, MARKET_HEADLINES, MIDNIGHT_GUESTS, MASTERY_SKILLS, POLAROID_ALBUM, calculateKaisekiScore,
  ZASHIKI_VIP_GUESTS, FERMENTATION_RECIPES, FACTION_INFO, FACTION_DILEMMAS, canPrestige,
  adjustDashiRatio, submitDashiTasting, addPlatingItem, clickGrandPrixStir
}

export const W = 320, H = 180, PX = 60, PY = 62

// Daftar Bahan Oden
export const ITEMS = [
  {id: 'daikon', n: 'Lobak', p: 100, c: '#e8dcc0', cost: 0, rep: 0, comp: 0},
  {id: 'egg', n: 'Telur', p: 120, c: '#fff1c8', cost: 0, rep: 0, comp: 3},
  {id: 'konnyaku', n: 'Konnyaku', p: 80, c: '#6b6f7a', cost: 0, rep: 0, comp: 0},
  {id: 'chikuwa', n: 'Chikuwa', p: 100, c: '#d9a05b', cost: 0, rep: 0, comp: 1},
  {id: 'gyusuji', n: 'Urat Sapi', p: 220, c: '#a8503a', cost: 300, rep: 5, comp: 2},
  {id: 'kinchaku', n: 'Mochi Kinchaku', p: 180, c: '#c98a3c', cost: 400, rep: 12, comp: 3},
  {id: 'atsuage', n: 'Tahu Goreng', p: 200, c: '#d4a548', cost: 500, rep: 22, comp: 3},
  {id: 'tako', n: 'Sate Gurita', p: 300, c: '#c4567a', cost: 800, rep: 38, comp: 1},
  {id: 'imperial_daikon', n: 'Lobak Istana Kyoto', p: 450, c: '#f5ecd5', cost: 1200, rep: 70, comp: 0},
  {id: 'matsuba_crab', n: 'Kepiting Matsuba', p: 600, c: '#e74c3c', cost: 1500, rep: 80, comp: 1},
  {id: 'tamago_selai', n: 'Telur Selai Emas', p: 450, c: '#f39c12', cost: 1000, rep: 75, comp: 3}
]

// 4 Sekat Kompartemen Panci
export const COMPARTMENTS = [
  {id: 0, name: 'Sekat Sayur (Lobak, Konnyaku, Lobak Istana)', allowed: ['daikon', 'konnyaku', 'imperial_daikon']},
  {id: 1, name: 'Sekat Olahan Laut (Chikuwa, Gurita, Kepiting)', allowed: ['chikuwa', 'tako', 'matsuba_crab']},
  {id: 2, name: 'Sekat Daging (Urat Sapi)', allowed: ['gyusuji']},
  {id: 3, name: 'Sekat Telur, Mochi & Tahu (Termasuk Telur Selai)', allowed: ['egg', 'kinchaku', 'atsuage', 'tamago_selai']}
]

// Kondimen & Minuman
export const CONDIMENTS = [
  {id: 'karashi', n: 'Mustard Karashi', icon: '🟡', p: 30, desc: 'Rasa pedas menyengat'},
  {id: 'scallion', n: 'Daun Bawang', icon: '🟢', p: 20, desc: 'Aroma segar penambah selera'},
  {id: 'ocha', n: 'Teh Ocha Hangat', icon: '🍵', p: 50, desc: 'Menghangatkan tubuh di kala hujan'}
]

export const LV = ['Gerobak Kaki Lima', 'Kedai Kecil', 'Kedai Ramai', 'Kedai Legendaris']
export const LVREP = [0, 15, 40, 80]

export const EQ = [
  {id: 'stool', n: 'Tambah Kursi', base: 400, max: 3, d: '+1 Kursi Duduk Tamu'},
  {id: 'lantern', n: 'Lentera Besar', base: 500, max: 3, d: 'Pelanggan datang lebih cepat'},
  {id: 'pot', n: 'Panci Tembaga', base: 800, max: 3, d: 'Pendapatan +10% & kuah meresap cepat'},
  {id: 'radio', n: 'Radio Antik', base: 600, max: 2, d: 'Pelanggan lebih sabar (+5 dtk)'}
]

export const STAFF = [
  {
    id: 'kenji',
    name: 'Kenji (Anak Magang)',
    icon: '🧑‍🍳',
    cost: 800,
    desc: 'Otomatis mengisi ulang bahan mentah dari stok ke sekat panci jika kosong.'
  },
  {
    id: 'aoi',
    name: 'Nona Aoi (Penyanyi Jalanan)',
    icon: '🎸',
    cost: 1200,
    desc: 'Petikan gitarnya membuat tamu rileks; kesabaran tamu berkurang 30% lebih lambat.'
  }
]

export const eqCost = (g, e) => e.base * (1 + g[e.id])

const SX = [100, 135, 170, 205, 240, 275]
const HAIR = ['#2b1b17', '#5a3a22', '#d9d9e8', '#7a2b3a', '#222a55']
const SHIRT = ['#3f7fbf', '#c9453a', '#58a55c', '#b38ad6', '#e0a43a', '#ddd']
const rnd = a => a[Math.random() * a.length | 0]

const SAVE_KEY = 'oden_ya_save_v4'

export function createInitialPot() {
  return [
    [{id: 'daikon', simmer: 20}, {id: 'konnyaku', simmer: 15}],
    [{id: 'chikuwa', simmer: 18}],
    [],
    [{id: 'egg', simmer: 22}]
  ]
}

export function newGame(demo = false) {
  const loaded = !demo ? loadSavedGame() : null
  if (loaded) return loaded

  return {
    scene: 'out',
    t: 0,
    money: demo ? 0 : 600,
    rep: 0,
    served: 0,
    day: 1,
    hour: 17,
    minute: 0,
    timeSpeed: 1,
    weather: 'gerimis',
    isFestival: false,
    dayClosed: false,
    dayStats: {served: 0, revenue: 0, tips: 0},
    pop: {},
    owned: ['daikon', 'egg', 'konnyaku', 'chikuwa'],
    // Stok Pasar
    stock: {
      daikon: 10, egg: 10, konnyaku: 10, chikuwa: 10,
      gyusuji: 0, kinchaku: 0, atsuage: 0, tako: 0
    },
    marketPrices: generateMarketPrices(),
    potSlots: createInitialPot(),
    // Kombo & FEVER MODE
    combo: 0,
    feverActive: false,
    feverTimer: 0,
    // Resep Rahasia Terbuka
    unlockedRecipes: [],
    // Peta Lokasi
    currentLocation: 'stasiun',
    unlockedLocations: ['stasiun'],
    // Staf Pembantu
    staff: {kenji: false, aoi: false},
    kenjiTimer: 0,
    // Minigame Tuang Sake
    sakeMinigame: {active: false, level: 0, pouring: false, targetGuest: null, result: null},
    // Kaldu & Dekorasi
    activeBroth: 'kombu',
    noren: 'merah',
    bowl: 'tanah',
    ornament: 'none',
    ownedNorens: ['merah'],
    ownedBowls: ['tanah'],
    ownedOrnaments: ['none'],
    cassette: 'jazz',
    stool: 0,
    lantern: 0,
    pot: 0,
    radio: 0,
    cust: [],
    floats: [],
    rain: Array.from({length: 90}, () => ({x: Math.random() * W, y: Math.random() * H, s: 120 + Math.random() * 80})),
    steam: [],
    rip: [],
    zoom: 0,
    zt: 0,
    target: null,
    plate: [],
    plateItemsSimmer: [],
    plateCondiments: [],
    spawnT: 2,
    demo,
    demoT: 0,
    dT: 0,
    activeDialogue: null,
    storiesUnlocked: {},
    charAffinity: {},
    cat: {friendship: 0, fedToday: false, meowT: 0},
    bubbleTimer: 0,
    karmaGenerous: false,
    // Sub-Stasiun Panggangan Sate Yakitori
    grillSlots: createGrillSlots(),
    sateStock: {yakitori: 6, tsukune: 4, shiitake: 5},
    plateSate: [],
    grillSmoke: [],
    // Lelang Subuh Tsukiji & Bahan S-Tier
    auctionSession: null,
    sTierBoosts: {hokkaido_tako: false, wagyu_tendon: false, ancient_kombu: false},
    // Bintang Michelin
    michelinStars: 0,
    // Ramalan Nasib Omikuji
    activeFortune: null,
    // Cuaca Ekstrem & Insiden
    isBlackout: false,
    candleLit: false,
    tarpLoose: false,
    stoveHeat: 0.7,
    snowParticles: Array.from({length: 60}, () => ({x: Math.random() * W, y: Math.random() * H, s: 20 + Math.random() * 30})),
    // Fase 5: Biang Kaldu Master & Fermentasi
    masterVat: createMasterVat(),
    // Pisau Dapur Presisi Siang Hari
    knifePrepSession: null,
    masterPrepStock: {daikon: 0, kinchaku: 0, yakitori: 0},
    // Pesanan Telepon & Antar Sepeda
    activePhoneOrder: null,
    phoneRingTimer: 35,
    // Barang Pusaka Leluhur & Resonansi Mood
    heirlooms: [],
    // Intrik Jalanan & Saingan
    rivalStall: {active: true, crowdPull: 0.3},
    sanitationCertified: false,
    // Fase 6: Siklus 4 Musim & Berita Pasar
    season: getSeasonForDay(1),
    marketNews: generateDailyMarketNews(1),
    // Shinya Shokudo (Mode Tengah Malam 02:00 - 05:00)
    midnightMode: false,
    shinyaPrompt: false,
    // Duel Kuliner Terbuka vs Yamada-ya
    cookOffSession: null,
    districtMonopoly: 0,
    // Pohon Keahlian Master & Pusaka
    masteryPoints: 2,
    masteryProgress: 0,
    unlockedSkills: [],
    // Album Foto Polaroid Showa
    polaroids: ['polaroid_salaryman'],
    // Fase 7: Arashi Rush & Zen Focus
    arashi: createInitialArashiState(),
    // Warisan Dinasti Showa & Restoran Flagship Ginza
    dynasty: createInitialDynastyState(),
    // Turnamen Akbar Grand Prix Kanto vs Kansai
    grandPrixSession: null,
    grandPrixTrophy: false,
    // Gudang Fermentasi Bawah Tanah
    fermentation: createInitialFermentationCellar(),
    // Segitiga Pengaruh Faksi Distrik
    factions: createInitialFactionState()
  }
}

function generateMarketPrices(day = 1) {
  const base = {
    daikon: 35, egg: 45, konnyaku: 30, chikuwa: 40,
    gyusuji: 90, kinchaku: 75, atsuage: 70, tako: 120,
    imperial_daikon: 200, matsuba_crab: 260, tamago_selai: 180
  }
  const news = generateDailyMarketNews(day)
  const result = {}
  for (const k in base) {
    let factor = 0.8 + Math.random() * 0.4
    if (news && news.targetItem === k) {
      factor *= news.mult
    }
    result[k] = Math.round(base[k] * factor)
  }
  return result
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    data.scene = 'out'
    data.cust = []
    data.floats = []
    data.steam = []
    data.rip = []
    data.zoom = 0
    data.zt = 0
    data.target = null
    data.plate = []
    data.plateItemsSimmer = []
    data.plateCondiments = []
    data.activeDialogue = null
    data.sakeMinigame = {active: false, level: 0, pouring: false, targetGuest: null, result: null}
    data.feverActive = false
    data.feverTimer = 0
    data.combo = 0
    data.bubbleTimer = 0
    data.t = Number.isFinite(data.t) ? data.t : 0
    data.money = Number.isFinite(data.money) ? data.money : 600
    data.rep = Number.isFinite(data.rep) ? data.rep : 0
    data.served = Number.isFinite(data.served) ? data.served : 0
    data.day = Number.isFinite(data.day) ? data.day : 1
    data.hour = Number.isFinite(data.hour) ? data.hour : 17
    data.minute = Number.isFinite(data.minute) ? data.minute : 0
    data.timeSpeed = Number.isFinite(data.timeSpeed) ? data.timeSpeed : 1
    data.dayStats = data.dayStats || {served: 0, revenue: 0, tips: 0}
    data.rain = Array.from({length: 90}, () => ({x: Math.random() * W, y: Math.random() * H, s: 120 + Math.random() * 80}))
    if (!data.potSlots || !data.potSlots.length) data.potSlots = createInitialPot()
    if (!data.stock) data.stock = {daikon: 10, egg: 10, konnyaku: 10, chikuwa: 10, gyusuji: 0, kinchaku: 0, atsuage: 0, tako: 0}
    if (!data.marketPrices) data.marketPrices = generateMarketPrices()
    if (!data.cat) data.cat = {friendship: 0, fedToday: false, meowT: 0}
    if (!data.unlockedRecipes) data.unlockedRecipes = []
    if (!data.currentLocation) data.currentLocation = 'stasiun'
    if (!data.unlockedLocations) data.unlockedLocations = ['stasiun']
    if (!data.staff) data.staff = {kenji: false, aoi: false}
    data.grillSlots = data.grillSlots && data.grillSlots.length === 3 ? data.grillSlots : createGrillSlots()
    data.sateStock = data.sateStock || {yakitori: 6, tsukune: 4, shiitake: 5}
    data.plateSate = []
    data.grillSmoke = []
    data.auctionSession = null
    data.sTierBoosts = data.sTierBoosts || {hokkaido_tako: false, wagyu_tendon: false, ancient_kombu: false}
    data.michelinStars = Number.isFinite(data.michelinStars) ? data.michelinStars : 0
    data.activeFortune = null
    data.isBlackout = false
    data.candleLit = false
    data.tarpLoose = false
    data.stoveHeat = 0.7
    data.snowParticles = Array.from({length: 60}, () => ({x: Math.random() * W, y: Math.random() * H, s: 20 + Math.random() * 30}))
    data.masterVat = data.masterVat || createMasterVat()
    data.knifePrepSession = null
    data.masterPrepStock = data.masterPrepStock || {daikon: 0, kinchaku: 0, yakitori: 0}
    data.activePhoneOrder = null
    data.phoneRingTimer = 35
    data.heirlooms = data.heirlooms || []
    data.rivalStall = data.rivalStall || {active: true, crowdPull: 0.3}
    data.sanitationCertified = !!data.sanitationCertified
    data.season = getSeasonForDay(data.day || 1)
    data.marketNews = generateDailyMarketNews(data.day || 1)
    data.midnightMode = false
    data.shinyaPrompt = false
    data.cookOffSession = null
    data.districtMonopoly = Number.isFinite(data.districtMonopoly) ? data.districtMonopoly : 0
    data.masteryPoints = Number.isFinite(data.masteryPoints) ? data.masteryPoints : 2
    data.masteryProgress = Number.isFinite(data.masteryProgress) ? data.masteryProgress : 0
    data.unlockedSkills = data.unlockedSkills || []
    data.polaroids = data.polaroids || ['polaroid_salaryman']
    data.arashi = data.arashi || createInitialArashiState()
    data.arashi.zenActive = false
    data.dynasty = data.dynasty || createInitialDynastyState()
    data.grandPrixSession = null
    data.grandPrixTrophy = !!data.grandPrixTrophy
    data.fermentation = data.fermentation || createInitialFermentationCellar()
    data.factions = data.factions || createInitialFactionState()
    return data
  } catch (e) {
    return null
  }
}

export function saveGame() {
  if (G.demo) return
  try {
    const dataToSave = {
      money: G.money,
      rep: G.rep,
      served: G.served,
      day: G.day,
      hour: G.hour,
      minute: G.minute,
      weather: G.weather,
      isFestival: G.isFestival,
      pop: G.pop,
      owned: G.owned,
      stock: G.stock,
      marketPrices: G.marketPrices,
      potSlots: G.potSlots,
      activeBroth: G.activeBroth,
      noren: G.noren,
      bowl: G.bowl,
      ornament: G.ornament,
      ownedNorens: G.ownedNorens,
      ownedBowls: G.ownedBowls,
      ownedOrnaments: G.ownedOrnaments,
      cassette: G.cassette,
      stool: G.stool,
      lantern: G.lantern,
      pot: G.pot,
      radio: G.radio,
      storiesUnlocked: G.storiesUnlocked,
      charAffinity: G.charAffinity,
      cat: G.cat,
      karmaGenerous: G.karmaGenerous,
      unlockedRecipes: G.unlockedRecipes,
      currentLocation: G.currentLocation,
      unlockedLocations: G.unlockedLocations,
      staff: G.staff,
      grillSlots: G.grillSlots,
      sateStock: G.sateStock,
      sTierBoosts: G.sTierBoosts,
      michelinStars: G.michelinStars,
      masterVat: G.masterVat,
      masterPrepStock: G.masterPrepStock,
      heirlooms: G.heirlooms,
      sanitationCertified: G.sanitationCertified,
      masteryPoints: G.masteryPoints,
      masteryProgress: G.masteryProgress,
      unlockedSkills: G.unlockedSkills,
      polaroids: G.polaroids,
      districtMonopoly: G.districtMonopoly,
      arashi: G.arashi,
      dynasty: G.dynasty,
      grandPrixTrophy: G.grandPrixTrophy,
      fermentation: G.fermentation,
      factions: G.factions
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave))
  } catch (e) {}
}

export let G = newGame()

export const reset = (demo = false) => {
  if (demo) {
    G = newGame(true)
  } else {
    try { localStorage.removeItem(SAVE_KEY) } catch (e) {}
    G = newGame(false)
  }
}

export const seats = () => 3 + G.stool
export const level = () => {
  let l = 0
  LVREP.forEach((v, i) => { if (G.rep >= v) l = i })
  return l
}

export const enter = () => {
  Audio.resumeAudio()
  Audio.playChime()
  G.scene = 'in'
  G.spawnT = 1
}

export const leaveShop = () => {
  Audio.resumeAudio()
  G.scene = 'out'
  G.cust = []
  G.zt = 0
  G.target = null
  G.plate = []
  G.plateItemsSimmer = []
  G.plateCondiments = []
}

// Mulai Hari Baru
export const startNewDay = () => {
  G.day++
  G.hour = 17
  G.minute = 0
  G.dayClosed = false
  G.dayStats = {served: 0, revenue: 0, tips: 0}
  G.cat.fedToday = false
  G.season = getSeasonForDay(G.day)
  G.marketNews = generateDailyMarketNews(G.day)
  G.marketPrices = generateMarketPrices(G.day)

  // Reset Status Fase 6
  G.midnightMode = false
  G.shinyaPrompt = false
  G.cookOffSession = null
  if (G.districtMonopoly > 0) {
    G.districtMonopoly--
    G.floats.push({x: 140, y: 30, t: 0, s: `👑 Monopoli Distrik Aktif (${G.districtMonopoly} hari tersisa)`, c: '#ffd700'})
  }

  // Cek buka lokasi baru
  LOCATIONS.forEach(loc => {
    if (G.rep >= loc.repReq && !G.unlockedLocations.includes(loc.id)) {
      G.unlockedLocations.push(loc.id)
      G.floats.push({x: 150, y: 50, t: 0, s: `🗺️ Lokasi Baru: ${loc.name}!`, c: '#f1c40f'})
    }
  })

  // Festival Kembang Api tiap Hari ke-5
  G.isFestival = G.day % 5 === 0

  const weathers = ['gerimis', 'hujan_deras', 'angin_malam', 'topan', 'salju']
  G.weather = weathers[Math.random() * weathers.length | 0]

  // Insiden & Cuaca Ekstrem
  G.isBlackout = (G.weather === 'topan' || G.weather === 'hujan_deras') && Math.random() < 0.35
  G.candleLit = false
  G.tarpLoose = G.weather === 'topan' && Math.random() < 0.5
  G.stoveHeat = 0.7
  G.plateSate = []
  G.auctionSession = null
  G.activeFortune = null

  // Majukan Umur Biang Kaldu Master
  if (G.masterVat) {
    advanceVatDay(G.masterVat)
    const vt = getVatTier(G.masterVat.ageDays, G.masterVat.scumLevel)
    if (vt.tier === 'legendary') {
      G.floats.push({x: 140, y: 40, t: 0, s: '👑 Biang Kaldu Pusaka 7 Hari Aktif!', c: '#ffd700'})
    } else if (vt.tier === 'matured') {
      G.floats.push({x: 140, y: 40, t: 0, s: '⭐ Biang Kaldu Emas 3 Hari Siap!', c: '#f39c12'})
    }
  }

  // Majukan Proses Fermentasi Bawah Tanah
  if (G.fermentation) {
    advanceCellarDays(G.fermentation)
    const readyVats = G.fermentation.vats.filter(v => v.status === 'ready')
    if (readyVats.length > 0) {
      G.floats.push({x: 140, y: 45, t: 0, s: `🏺 ${readyVats.length} Gentong Fermentasi Bawah Tanah Siap Dipanen!`, c: '#2ecc71'})
    }
  }

  // Dividen Harian Murid Dinasti Ginza
  if (G.dynasty && G.dynasty.apprentice) {
    const appInc = calculateApprenticeDailyIncome(G)
    G.floats.push({x: 140, y: 35, t: 0, s: `🪙 Dividen Murid Kedai Lama: +¥${appInc}!`, c: '#ffd700'})
  }

  // Pemicu Dilema Faksi Distrik Setiap 3 Hari
  if (G.factions && G.day % 3 === 0 && !G.factions.activeDilemma) {
    triggerRandomDilemma(G.factions)
  }

  // Reset Arashi & Zen Focus
  if (G.arashi) {
    G.arashi.active = false
    G.arashi.zenActive = false
    G.arashi.meter = 0
  }

  // Reset Gerobak Saingan & Telepon Pesanan
  G.rivalStall = { active: Math.random() < 0.65, crowdPull: 0.3 }
  G.phoneRingTimer = 25 + Math.random() * 25
  G.activePhoneOrder = null

  if (G.weather === 'topan') {
    Audio.playThunderClap()
    G.floats.push({x: 140, y: 50, t: 0, s: '🌀 Malam Topan Badai! Tip Tamu x2!', c: '#ff4757'})
  } else if (G.weather === 'salju') {
    G.floats.push({x: 140, y: 50, t: 0, s: '❄️ Salju Pertama... Jaga Api Kompor!', c: '#74b9ff'})
  }

  if (G.isBlackout) {
    G.floats.push({x: 140, y: 70, t: 0, s: '⚡ Listrik Kota Padam! Nyalakan Lilin!', c: '#f39c12'})
  }

  G.cust = []
  G.target = null
  G.plate = []
  G.plateItemsSimmer = []
  G.plateCondiments = []
  G.combo = 0
  G.feverActive = false
  G.scene = 'out'
  saveGame()
}

// Ganti Kaset Radio
export const changeCassette = genre => {
  G.cassette = genre
  Audio.setCassetteGenre(genre)
  saveGame()
}

// Ganti Kaldu Dashi
export const setBroth = brothId => {
  G.activeBroth = brothId
  Audio.playPlopSound()
  saveGame()
}

// Pindah Lokasi di Peta
export const travelToLocation = locId => {
  if (G.unlockedLocations.includes(locId)) {
    G.currentLocation = locId
    Audio.playChime()
    G.floats.push({x: 140, y: 60, t: 0, s: 'Pindah Lokasi Kedai!', c: '#2ecc71'})
    saveGame()
  }
}

// Rekrut Staf
export const hireStaff = staffId => {
  const s = STAFF.find(x => x.id === staffId)
  if (s && G.money >= s.cost && !G.staff[staffId]) {
    G.money -= s.cost
    G.staff[staffId] = true
    Audio.playCoinSound()
    G.floats.push({x: 140, y: 70, t: 0, s: `${s.name} Bergabung!`, c: '#ffd700'})
    saveGame()
  }
}

// Kustomisasi Dekorasi
export const equipDecoration = (type, id) => {
  if (type === 'noren') G.noren = id
  if (type === 'bowl') G.bowl = id
  if (type === 'ornament') G.ornament = id
  Audio.playCoinSound()
  saveGame()
}

export const buyDecoration = (type, itemObj) => {
  if (G.money >= itemObj.cost) {
    G.money -= itemObj.cost
    if (type === 'noren' && !G.ownedNorens.includes(itemObj.id)) G.ownedNorens.push(itemObj.id)
    if (type === 'bowl' && !G.ownedBowls.includes(itemObj.id)) G.ownedBowls.push(itemObj.id)
    if (type === 'ornament' && !G.ownedOrnaments.includes(itemObj.id)) G.ownedOrnaments.push(itemObj.id)
    equipDecoration(type, itemObj.id)
    saveGame()
  }
}

// Beli Stok Bahan di Pasar
export function buyStock(itemId, quantity = 5) {
  const pricePerUnit = G.marketPrices[itemId] || 40
  const discountMult = G.heirlooms?.includes('vintage_coin') ? 0.85 : 1.0
  const totalCost = Math.round(pricePerUnit * quantity * discountMult)
  if (G.money >= totalCost) {
    G.money -= totalCost
    G.stock[itemId] = (G.stock[itemId] || 0) + quantity
    Audio.playMarketBell()
    saveGame()
    return true
  }
  return false
}

// Masukkan Bahan ke Sekat Panci
export function addToPot(compIdx, itemId) {
  if ((G.stock[itemId] || 0) <= 0) return false
  const comp = G.potSlots[compIdx]
  if (comp.length >= 6) return false

  G.stock[itemId]--
  comp.push({id: itemId, simmer: 0})
  Audio.playPlopSound()
  saveGame()
  return true
}

export function getSimmerState(seconds) {
  if (seconds < 5) return {state: 'mentah', label: 'Mentah (Keras)', mult: 0.6, color: '#bdc3c7'}
  if (seconds <= 18) return {state: 'pas', label: 'Matang Pas', mult: 1.0, color: '#2ecc71'}
  if (seconds <= 40) return {state: 'emas', label: '⭐ Rebusan Emas!', mult: 1.5, color: '#f1c40f'}
  return {state: 'lembek', label: 'Terlalu Lembek', mult: 0.75, color: '#e67e22'}
}

export function takeFromPot(compIdx, itemIndex) {
  if (!G.target || G.plate.length >= 4) return
  const comp = G.potSlots[compIdx]
  if (!comp || !comp[itemIndex]) return

  const itemInPot = comp.splice(itemIndex, 1)[0]
  const simmerInfo = getSimmerState(itemInPot.simmer)

  G.plate.push(itemInPot.id)
  G.plateItemsSimmer.push(simmerInfo)

  if (simmerInfo.state === 'emas') {
    Audio.playSizzleSound()
    G.floats.push({x: 100, y: 70, t: 0, s: '✨ Kuah Emas!', c: '#ffd700'})
  } else {
    Audio.playPlopSound()
  }
}

// Minigame Tuang Sake Hangat (Atsukan)
export function startSakeMinigame(guest) {
  G.sakeMinigame = {
    active: true,
    level: 0,
    pouring: false,
    targetGuest: guest,
    result: null
  }
}

export function updateSakePour(isPouring, dt) {
  if (!G.sakeMinigame.active) return
  if (isPouring) {
    G.sakeMinigame.level = Math.min(100, G.sakeMinigame.level + dt * 45)
    Audio.playSakePour()
  }
}

export function finishSakePour() {
  if (!G.sakeMinigame.active) return
  const lvl = G.sakeMinigame.level
  let tipBonus = 0
  let msg = ''

  if (lvl >= 70 && lvl <= 88) {
    // PERFECT POUR!
    tipBonus = 180
    msg = '⭐ TUANGAN SEMPURNA! (+¥180)'
    Audio.playSakeSuccess()
  } else if (lvl >= 50 && lvl < 70) {
    tipBonus = 60
    msg = 'Lumayan Hangat (+¥60)'
    Audio.playCoinSound()
  } else {
    msg = 'Tumpah / Kurang! (+¥0)'
    Audio.playUpsetSound()
  }

  G.money += tipBonus
  G.sakeMinigame.result = msg
  G.floats.push({x: 150, y: 80, t: 0, s: msg, c: '#ffd700'})
  saveGame()
}

// --- SUB-STASIUN PANGGANGAN SATE YAKITORI ---
export function putOnGrill(slotIdx, sateId) {
  if (!G.grillSlots || !G.grillSlots[slotIdx]) return false
  if ((G.sateStock[sateId] || 0) <= 0) return false
  if (G.grillSlots[slotIdx].id !== null) return false

  const item = GRILL_ITEMS.find(x => x.id === sateId)
  if (!item) return false

  G.sateStock[sateId]--
  G.grillSlots[slotIdx] = {
    id: sateId,
    name: item.name,
    icon: item.icon,
    color: item.color,
    timer: 0,
    flipped: false,
    glazed: false,
    state: 'raw'
  }
  Audio.playGrillSizzle()
  saveGame()
  return true
}

export function flipSate(slotIdx) {
  const slot = G.grillSlots[slotIdx]
  if (!slot || slot.id === null) return
  if (slot.timer >= 5 && !slot.flipped) {
    slot.flipped = true
    Audio.playGrillSizzle()
    G.floats.push({x: 180 + slotIdx * 18, y: 70, t: 0, s: 'Dibolak-balik!', c: '#f1c40f'})
    saveGame()
  }
}

export function glazeSate(slotIdx) {
  const slot = G.grillSlots[slotIdx]
  if (!slot || slot.id === null) return
  if (slot.flipped && !slot.glazed && slot.timer >= 10) {
    slot.glazed = true
    Audio.playGlazeSound()
    G.floats.push({x: 180 + slotIdx * 18, y: 70, t: 0, s: '🍯 Saus Tare!', c: '#e67e22'})
    saveGame()
  }
}

export function takeSateToPlate(slotIdx) {
  if (!G.target) return
  const slot = G.grillSlots[slotIdx]
  if (!slot || slot.id === null) return
  const st = getGrillState(slot.timer, slot.flipped, slot.glazed)
  if (st.state === 'burnt') {
    discardSate(slotIdx)
    return
  }
  G.plateSate = G.plateSate || []
  if (G.plateSate.length >= 2) return

  const item = GRILL_ITEMS.find(x => x.id === slot.id)
  G.plateSate.push({
    ...slot,
    info: st,
    sellPrice: item.sellPrice + (st.bonus || 0)
  })

  G.grillSlots[slotIdx] = {id: null, timer: 0, flipped: false, glazed: false, state: 'empty'}
  Audio.playPlopSound()
  G.floats.push({x: 180 + slotIdx * 18, y: 70, t: 0, s: `+${item.name}`, c: '#2ecc71'})
  saveGame()
}

export function discardSate(slotIdx) {
  G.grillSlots[slotIdx] = {id: null, timer: 0, flipped: false, glazed: false, state: 'empty'}
  Audio.playPlopSound()
  G.floats.push({x: 180 + slotIdx * 18, y: 70, t: 0, s: 'Dibuang', c: '#7f8c8d'})
  saveGame()
}

export function buySateStock(itemId, qty = 5) {
  const item = GRILL_ITEMS.find(x => x.id === itemId)
  if (!item) return false
  const totalCost = item.marketPrice * qty
  if (G.money >= totalCost) {
    G.money -= totalCost
    G.sateStock[itemId] = (G.sateStock[itemId] || 0) + qty
    Audio.playMarketBell()
    saveGame()
    return true
  }
  return false
}

// --- MINIGAME LELANG SUBUH PASAR TSUKIJI ---
export function startAuction() {
  G.auctionSession = createAuctionSession(G.day)
  Audio.playMarketBell()
}

export function placeAuctionBid(amount) {
  if (!G.auctionSession || G.auctionSession.finished) return
  const s = G.auctionSession
  const newBid = s.currentBid + amount
  if (G.money < newBid) {
    G.floats.push({x: 160, y: 80, t: 0, s: 'Uang Kas Kurang!', c: '#ff4757'})
    return
  }
  s.currentBid = newBid
  s.highestBidder = 'Kedai Oden (Anda)'
  s.countdown = 3.8
  s.hammerCount = 0
  s.log.push(`👉 Anda menaikkan tawaran ke ¥${newBid}!`)
  Audio.playGavelBang()
}

export function updateAuction(dt) {
  if (!G.auctionSession || G.auctionSession.finished) return
  const s = G.auctionSession
  s.countdown -= dt

  // Bot Bidding Reaction
  if (s.countdown < 2.5 && s.highestBidder === 'Kedai Oden (Anda)') {
    const kuroda = BOT_BIDDERS[0]
    const tanaka = BOT_BIDDERS[1]
    const maxKuroda = s.item.basePrice * kuroda.maxMult
    const maxTanaka = s.item.basePrice * tanaka.maxMult

    if (Math.random() < 0.05 && s.currentBid < maxKuroda) {
      s.currentBid += 50
      s.highestBidder = kuroda.name
      s.countdown = 3.6
      s.hammerCount = 0
      s.log.push(`👨‍🍳 ${kuroda.name} menaikkan tawaran ke ¥${s.currentBid}!`)
      Audio.playGavelBang()
    } else if (Math.random() < 0.04 && s.currentBid < maxTanaka) {
      s.currentBid += 50
      s.highestBidder = tanaka.name
      s.countdown = 3.4
      s.hammerCount = 0
      s.log.push(`💼 ${tanaka.name} menaikkan tawaran ke ¥${s.currentBid}!`)
      Audio.playGavelBang()
    }
  }

  // Hammer countdown
  if (s.countdown <= 2.8 && s.hammerCount === 0) {
    s.hammerCount = 1
    s.log.push(`🔨 Juru Lelang: "Tawaran ¥${s.currentBid} untuk pertama kalinya!"`)
    Audio.playGavelBang()
  } else if (s.countdown <= 1.4 && s.hammerCount === 1) {
    s.hammerCount = 2
    s.log.push(`🔨 Juru Lelang: "Tawaran ¥${s.currentBid} untuk kedua kalinya!"`)
    Audio.playGavelBang()
  } else if (s.countdown <= 0) {
    s.finished = true
    s.winner = s.highestBidder
    Audio.playGavelBang()

    if (s.winner === 'Kedai Oden (Anda)') {
      G.money -= s.currentBid
      G.sTierBoosts[s.item.id] = true
      G.stock[s.item.targetItem] = (G.stock[s.item.targetItem] || 0) + s.item.servings
      Audio.playFeverSound()
      s.log.push(`🎉 SAH! Anda memenangkan lelang ${s.item.name}! (+${s.item.servings} porsi S-Tier)`)
      G.floats.push({x: 160, y: 70, t: 0, s: `🏆 Menang Lelang ${s.item.name}!`, c: '#ffd700'})
      saveGame()
    } else {
      Audio.playUpsetSound()
      s.log.push(`❌ SAH! Lelang dimenangkan oleh ${s.winner}.`)
    }
  }
}

// --- RAMALAN NASIB OMIKUJI ---
export function startOmikuji(guest) {
  if (!guest || G.activeFortune) return
  Audio.playOmikujiShake()
  const fortune = drawOmikuji()
  G.activeFortune = {
    guest,
    result: fortune
  }
  if (fortune.rewardType === 'money') {
    G.money += fortune.rewardAmount
    G.rep += fortune.repBonus
  } else if (fortune.rewardType === 'affinity') {
    if (guest.charId) {
      G.charAffinity[guest.charId] = (G.charAffinity[guest.charId] || 0) + fortune.affinityBonus
    }
    G.rep += fortune.repBonus
  } else if (fortune.rewardType === 'loyalty') {
    G.rep += fortune.repBonus
  }
  Audio.playChime()
  saveGame()
}

export function closeOmikuji() {
  G.activeFortune = null
  saveGame()
}

// --- FASE 5: PSIKOLOGI & SAPAAN EMPATI TAMU ---
export function greetCustomer(greetingId) {
  if (!G.target || !G.target.mood || G.target.greetingChosen) return
  const c = G.target
  c.greetingChosen = greetingId
  const result = evaluateGreeting(c, greetingId, G.cassette, G.activeBroth)

  if (result.isCatharsis) {
    c.catharsis = true
    Audio.playTearsOfJoy()
    G.floats.push({x: c.x, y: c.y - 45, t: 0, s: '✨ KATARSIS EMOSIONAL! ✨', c: '#ff6f91'})
    G.floats.push({x: c.x, y: c.y - 60, t: -0.3, s: result.reactionText, c: '#ffd700'})
    c.pat = Math.min(c.max, c.pat + 20)

    // Peluang mendapatkan barang pusaka berharga
    const unownedHeirlooms = HEIRLOOMS.filter(h => !G.heirlooms.includes(h.id))
    if (unownedHeirlooms.length && Math.random() < 0.45) {
      const awarded = unownedHeirlooms[Math.random() * unownedHeirlooms.length | 0]
      G.heirlooms.push(awarded.id)
      Audio.playFeverSound()
      G.floats.push({x: 160, y: 70, t: 0, s: `🎁 PUSAKA DIDAPAT: ${awarded.name}!`, c: '#ffd700'})
    }
  } else {
    Audio.playCoinSound()
    G.floats.push({x: c.x, y: c.y - 45, t: 0, s: result.reactionText, c: '#bdc3c7'})
  }
  saveGame()
}

// --- FASE 5: BIANG KALDU MASTER & KUALI FERMENTASI ---
export function brewVatIngredient(ingredientId) {
  const ing = DASHI_INGREDIENTS.find(i => i.id === ingredientId)
  if (!ing || G.money < ing.cost) return false
  G.money -= ing.cost
  addIngredientToVat(G.masterVat, ingredientId)
  Audio.playBubblingVat()
  Audio.playCoinSound()
  G.floats.push({x: 150, y: 60, t: 0, s: `+${ing.name} ke Kuali!`, c: '#ffd700'})
  saveGame()
  return true
}

export function filterVatScum() {
  skimVat(G.masterVat)
  Audio.playPlopSound()
  G.floats.push({x: 150, y: 60, t: 0, s: 'Busa Kaldu Disaring Bersih!', c: '#2ecc71'})
  saveGame()
}

// --- FASE 5: PISAU DAPUR PRESISI SIANG HARI ---
export function startKnifePrep(techId) {
  G.knifePrepSession = createKnifePrepSession(techId)
  Audio.playKnifeChop()
}

export function chopKnife() {
  if (!G.knifePrepSession || G.knifePrepSession.finished) return null
  const strikeRes = strikeKnife(G.knifePrepSession)
  Audio.playKnifeChop()
  if (strikeRes === 'perfect') {
    G.floats.push({x: 160, y: 80, t: 0, s: '⭐ POTONGAN BERLIAN!', c: '#ffd700'})
  } else if (strikeRes === 'good') {
    G.floats.push({x: 160, y: 80, t: 0, s: 'Matang Pas!', c: '#2ecc71'})
  } else {
    G.floats.push({x: 160, y: 80, t: 0, s: 'Meleset', c: '#7f8c8d'})
  }

  if (G.knifePrepSession.finished) {
    const s = G.knifePrepSession
    if (s.finalGrade === 'masterwork') {
      const target = s.technique.targetItem
      G.masterPrepStock[target] = (G.masterPrepStock[target] || 0) + s.technique.yieldAmount
      Audio.playFeverSound()
      G.floats.push({x: 160, y: 60, t: 0, s: `🏆 PREP SEMPURNA! +${s.technique.yieldAmount} Bahan Masterwork`, c: '#ffd700'})
    } else if (s.finalGrade === 'good') {
      const target = s.technique.targetItem
      G.masterPrepStock[target] = (G.masterPrepStock[target] || 0) + 1
      Audio.playCoinSound()
      G.floats.push({x: 160, y: 60, t: 0, s: `✨ PREP BAGUS! +1 Bahan Masterwork`, c: '#2ecc71'})
    } else {
      Audio.playUpsetSound()
      G.floats.push({x: 160, y: 60, t: 0, s: 'Potongan Kurang Rapi', c: '#e74c3c'})
    }
    saveGame()
  }
  return strikeRes
}

export function closeKnifePrep() {
  G.knifePrepSession = null
}

// --- FASE 5: PESANAN TELEPON PUTAR & ANTAR BENTO ---
export function answerPhone() {
  if (!G.activePhoneOrder) {
    G.activePhoneOrder = generatePhoneOrder(G.day)
    Audio.playPhoneRing()
    G.floats.push({x: 160, y: 60, t: 0, s: `☎️ Pesanan dari ${G.activePhoneOrder.client.name}!`, c: '#ffd700'})
    saveGame()
  }
}

export function packBento(itemId) {
  if (!G.activePhoneOrder) return false
  const ok = packItemToBento(G.activePhoneOrder, itemId, G.stock)
  if (ok) {
    Audio.playPlopSound()
    saveGame()
  }
  return ok
}

export function dispatchBento() {
  if (!G.activePhoneOrder || G.activePhoneOrder.status !== 'packed') return
  G.activePhoneOrder.status = 'delivering'
  Audio.playBicycleBell()
  G.floats.push({x: 160, y: 60, t: 0, s: '🚴 Berangkat Antar Bento Hangat!', c: '#3498db'})
  saveGame()
}

export function claimDeliveryReward() {
  if (!G.activePhoneOrder || G.activePhoneOrder.status !== 'delivered') return
  const payout = calculateDeliveryPayout(G.activePhoneOrder)
  G.money += payout.total
  G.rep += payout.rep
  Audio.playCoinSound()
  if (payout.isHot) Audio.playFeverSound()
  G.floats.push({x: 160, y: 60, t: 0, s: `💰 Diterima +¥${payout.total} & Rep +${payout.rep}!`, c: '#ffd700'})
  G.activePhoneOrder = null
  saveGame()
}

export function dismissDelivery() {
  G.activePhoneOrder = null
  saveGame()
}

// --- FASE 6: SHINYA SHOKUDO, DUEL COOK-OFF, MASTERY TREE, & POLAROID ---
export function openShinyaShokudo() {
  G.shinyaPrompt = false
  G.midnightMode = true
  G.dayClosed = false
  Audio.playMidnightBell()
  G.floats.push({x: 140, y: 50, t: 0, s: '🏮 SHINYA SHOKUDO DIMULAI (02:00 - 05:00)!', c: '#9b59b6'})

  const mg = getMidnightGuest(G.day)
  G.cust.push({
    x: -12,
    y: 140,
    seat: 1,
    st: 'walk',
    charId: null,
    charName: mg.name,
    isMidnightRiddle: true,
    midnightData: mg,
    h: mg.hair,
    s: mg.shirt,
    w: 4,
    order: [...mg.requiredItems],
    condimentReq: mg.requiredCondiment,
    pat: 50,
    max: 50,
    eatT: 0,
    sat: 0,
    bonusPatience: 25,
    orderOpenTime: 0
  })
  saveGame()
}

export function closeDayDirectly() {
  G.shinyaPrompt = false
  G.midnightMode = false
  G.dayClosed = true
  saveGame()
}

export function startCookOff() {
  G.cookOffSession = createCookOffSession()
  Audio.playCookOffTaiko()
}

export function performCookOffAction() {
  if (!G.cookOffSession) return
  clickCookOffAction(G.cookOffSession)
  Audio.playGrillSizzle()
  if (G.cookOffSession.finished && G.cookOffSession.winner === 'player') {
    G.money += 3500
    G.rep += 25
    G.districtMonopoly = 3
    G.rivalStall.active = false
    Audio.playFeverSound()
    G.floats.push({x: 160, y: 60, t: 0, s: '👑 MENANG DUEL! +¥3500 & Monopoli Distrik!', c: '#ffd700'})
    saveGame()
  }
}

export function closeCookOff() {
  G.cookOffSession = null
  saveGame()
}

export function unlockMasterySkill(skillId) {
  if (canUnlockSkill(skillId, G.unlockedSkills, G.masteryPoints)) {
    const sk = MASTERY_SKILLS.find(s => s.id === skillId)
    G.masteryPoints -= sk.cost
    G.unlockedSkills.push(skillId)
    Audio.playSkillUnlock()
    G.floats.push({x: 160, y: 60, t: 0, s: `📜 Keahlian Terbuka: ${sk.name}!`, c: '#ffd700'})
    saveGame()
    return true
  }
  return false
}

export function unlockPolaroid(polaroidId) {
  if (!polaroidId) return
  if (!G.polaroids) G.polaroids = []
  if (!G.polaroids.includes(polaroidId)) {
    G.polaroids.push(polaroidId)
    Audio.playCameraShutter()
    G.floats.push({x: 160, y: 50, t: 0, s: '📷 Foto Polaroid Kenangan Tersimpan!', c: '#ffd700'})
    saveGame()
  }
}

// --- CUACA EKSTREM & INSIDEN MALAM ---
export function toggleCandle() {
  G.candleLit = !G.candleLit
  if (G.candleLit) Audio.playCandleLight()
  saveGame()
}

export function fixTarp() {
  if (G.tarpLoose) {
    G.tarpLoose = false
    Audio.playPlopSound()
    G.floats.push({x: 160, y: 60, t: 0, s: 'Terpal Dikencangkan! Aman!', c: '#2ecc71'})
    saveGame()
  }
}

export function stokeStove() {
  G.stoveHeat = Math.min(1.0, (G.stoveHeat || 0.7) + 0.3)
  Audio.playGrillSizzle()
  G.floats.push({x: PX, y: 50, t: 0, s: '🔥 Api Kompor Membara!', c: '#ff7675'})
  saveGame()
}

// Munculkan Tamu
function spawn() {
  if (G.dayClosed) return
  const used = G.cust.map(c => c.seat)
  const free = [...Array(seats()).keys()].filter(i => !used.includes(i))
  if (!free.length) return

  // Peluang Tamu VIP / Bos / Inspektur Michelin
  const isMidnight = G.hour === 23 || G.hour === 0 || G.hour === 1
  let specialData = null

  // Tamu Bangsawan Ruang VIP Zashiki jika di Ginza
  const zashikiGuest = spawnZashikiGuest(G)
  if (zashikiGuest) {
    specialData = {
      id: zashikiGuest.id,
      name: zashikiGuest.name,
      isZashiki: true,
      zashikiData: zashikiGuest,
      hair: '#ffffff',
      shirt: '#d4af37',
      patience: 32
    }
    Audio.playPrestigeFanfare()
    G.floats.push({x: 140, y: 50, t: 0, s: `🏛️ TAMU BANGSAWAN GINZA: ${zashikiGuest.name}!`, c: '#f1c40f'})
  } else if (Math.random() < 0.12 && G.rep >= 35) {
    // Inspektur Michelin Menyamar
    specialData = SPECIAL_ENCOUNTERS.inspector
    G.floats.push({x: 140, y: 50, t: 0, s: '🕵️‍♂️ Tamu Misterius Mengamati Kedai...', c: '#a29bfe'})
  } else if (!G.sanitationCertified && Math.random() < 0.15 && G.rep >= 20) {
    specialData = SPECIAL_ENCOUNTERS.sanitation
    G.floats.push({x: 140, y: 50, t: 0, s: '📋 Inspeksi Higienis Hokenjo Datang!', c: '#3498db'})
  } else if (isMidnight && Math.random() < 0.25) {
    specialData = Math.random() < 0.5 ? SPECIAL_ENCOUNTERS.ryu : SPECIAL_ENCOUNTERS.vivienne
    Audio.playBossAlert()
    G.floats.push({x: 140, y: 50, t: 0, s: `⚠️ TAMU VIP: ${specialData.name}!`, c: '#ff4757'})
  } else if (Math.random() < 0.08 && !G.karmaGenerous) {
    specialData = SPECIAL_ENCOUNTERS.pengembara
  } else if (Math.random() < (0.4 + (G.cat.friendship >= 3 ? 0.2 : 0))) {
    const charKeys = Object.keys(CHARACTERS)
    specialData = CHARACTERS[rnd(charKeys)]
  }

  // Bonus Kesabaran
  let bonusPatience = G.radio * 5
  if (G.ornament === 'krisan') bonusPatience += 5
  if (specialData && specialData.favMusic === G.cassette) bonusPatience += 6

  // Efek Staf Nona Aoi (Penyanyi)
  if (G.staff.aoi) bonusPatience += 8

  G.cust.push({
    x: -12,
    y: 140,
    seat: free[0],
    st: 'walk',
    charId: specialData ? specialData.id : null,
    charName: specialData ? specialData.name : 'Tamu Berteduh',
    isBoss: specialData?.isBoss || false,
    bossData: specialData?.isBoss ? specialData : null,
    isZashiki: specialData?.isZashiki || false,
    zashikiData: specialData?.zashikiData || null,
    isInspector: specialData?.isInspector || false,
    inspectorData: specialData?.isInspector ? specialData : null,
    isSanitation: specialData?.isSanitation || false,
    sanitationData: specialData?.isSanitation ? specialData : null,
    mood: assignGuestMood(),
    greetingChosen: null,
    catharsis: false,
    wantsFortune: Math.random() < 0.35,
    h: specialData ? specialData.hair : rnd(HAIR),
    s: specialData ? specialData.shirt : rnd(SHIRT),
    w: Math.random() * 9,
    order: [],
    condimentReq: null,
    wantsSake: Math.random() < 0.25,
    pat: 0,
    max: 0,
    eatT: 0,
    sat: 0,
    bonusPatience,
    orderOpenTime: 0
  })

  Audio.playChime()
}

export function openOrder(c) {
  if (!c || c.st !== 'wait' || G.target) return
  Audio.resumeAudio()
  G.target = c
  G.plate = []
  G.plateItemsSimmer = []
  G.plateCondiments = []
  G.plateSate = []
  c.orderOpenTime = G.t
  G.zt = 1
}

export const closeOrder = () => {
  G.target = null
  G.zt = 0
  G.plate = []
  G.plateItemsSimmer = []
  G.plateCondiments = []
  G.plateSate = []
}

export const undoPlate = () => {
  if (G.plate.length) {
    const removedId = G.plate.pop()
    G.plateItemsSimmer.pop()
    G.stock[removedId] = (G.stock[removedId] || 0) + 1
    Audio.playPlopSound()
  }
}

export function toggleCondiment(id) {
  if (!G.target) return
  const idx = G.plateCondiments.indexOf(id)
  if (idx >= 0) {
    G.plateCondiments.splice(idx, 1)
  } else {
    G.plateCondiments.push(id)
    Audio.playPlopSound()
  }
}

// Sajikan Pesanan ke Tamu
export function serve() {
  const c = G.target
  if (!c || !G.plate.length) return

  const m = c.order.filter(i => G.plate.includes(i)).length
  const ex = Math.max(0, G.plate.length - c.order.length)

  // Pengali Simmer Panci
  const simmerMultipliers = G.plateItemsSimmer.map(s => s.mult)
  const avgSimmerMult = simmerMultipliers.reduce((a, b) => a + b, 0) / (simmerMultipliers.length || 1)

  // Cek Resep Rahasia (Fusion Cooking Discovery!)
  const fusionResult = checkRecipeDiscovery(G.plate, G.plateCondiments, G.activeBroth, G.unlockedRecipes)
  let fusionBonus = 0
  if (fusionResult) {
    fusionBonus = fusionResult.recipe.bonusPrice
    if (fusionResult.isNew) {
      G.unlockedRecipes.push(fusionResult.recipe.id)
      Audio.playFeverSound()
      G.floats.push({x: c.x, y: c.y - 50, t: 0, s: `🎉 RESEP BARU: ${fusionResult.recipe.name}!`, c: '#f1c40f'})
    }
  }

  // Bonus Kondimen
  let condimentBonus = 0
  if (c.condimentReq) {
    if (G.plateCondiments.includes(c.condimentReq)) condimentBonus = 0.25
    else condimentBonus = -0.1
  }

  // Bonus Kaldu
  let brothBonus = 0
  if (G.activeBroth === 'kombu') brothBonus = 0.1
  if (G.activeBroth === 'spicy' && c.order.some(id => id === 'gyusuji' || id === 'tako')) brothBonus = 0.25
  if (G.activeBroth === 'miso' && G.weather === 'hujan_deras') brothBonus = 0.2

  // S-Tier Tsukiji Boosts
  const sTierSatBonus = G.sTierBoosts?.ancient_kombu ? 0.3 : 0
  const takoMult = G.sTierBoosts?.hokkaido_tako ? 2.5 : 1.0
  const wagyuMult = G.sTierBoosts?.wagyu_tendon ? 3.0 : 1.0

  // Master Dashi Vat Buffs
  const vt = getVatTier(G.masterVat?.ageDays || 1, G.masterVat?.scumLevel || 0)
  const vatSatBonus = vt.satBonus
  const vatPriceMult = vt.priceMult

  // Katarsis Mood & Sanitasi Bebas Pajak
  const catharsisSatBonus = c.catharsis ? (G.unlockedSkills.includes('kokoro_2') ? 0.4 : 0.25) : 0
  const catharsisMultiplier = c.catharsis ? (G.unlockedSkills.includes('kokoro_2') ? 1.8 : 1.5) : 1.0
  const sanitationMultiplier = G.sanitationCertified ? 1.15 : 1.0
  const winterMultiplier = G.season?.id === 'winter' ? 1.35 : 1.0

  // Penilaian Harmoni Estetika Kaiseki
  const kaisekiScore = calculateKaisekiScore(G.plate, G.plateCondiments, G.plateSate)
  const kaisekiMultiplier = kaisekiScore >= 80 ? 1.25 : 1.0
  if (kaisekiScore >= 80) {
    G.floats.push({x: c.x, y: c.y - 65, t: 0, s: `🍱 Kaiseki ${kaisekiScore} Pts! (+25% Nilai)`, c: '#ffd700'})
  }

  const baseSat = (m / c.order.length) - (ex * 0.12) + ((c.pat / c.max) * 0.2) + condimentBonus + brothBonus + sTierSatBonus + vatSatBonus + catharsisSatBonus + (G.season?.bonusSat || 0)
  const sat = Math.max(0, Math.min(1, baseSat * avgSimmerMult))

  // Pengali Lokasi
  const locData = LOCATIONS.find(l => l.id === G.currentLocation) || LOCATIONS[0]
  const basePrice = G.plate.reduce((a, i) => {
    let p = ITEMS.find(x => x.id === i).p
    if (i === 'tako') p = Math.round(p * takoMult)
    if (i === 'gyusuji') p = Math.round(p * wagyuMult)
    return a + p
  }, 0) + fusionBonus

  // Porsi Sate Bakar di Piring
  let sateTotal = 0
  if (G.plateSate && G.plateSate.length) {
    G.plateSate.forEach(s => {
      sateTotal += s.sellPrice
    })
  }

  const condimentPrice = G.plateCondiments.reduce((a, i) => a + (CONDIMENTS.find(x => x.id === i)?.p || 0), 0)
  const totalPrice = (basePrice + condimentPrice + sateTotal) * locData.priceMultiplier

  const manekiBonus = G.ornament === 'manekineko' ? 1.15 : 1.0
  const feverMultiplier = G.feverActive ? 3.0 : 1.0

  // Bintang Michelin Multiplier
  const michelinMultiplier = G.michelinStars === 1 ? 1.2 : G.michelinStars === 2 ? 1.45 : G.michelinStars === 3 ? 1.8 : 1.0

  // Multiplier Dinasti Emas (Golden Dashi Heritage)
  const dynastyMultiplier = G.dynasty?.goldenDashiActive ? 1.25 : 1.0

  let gain = Math.round(totalPrice * (0.6 + 0.6 * sat) * (1 + 0.1 * G.pot) * manekiBonus * feverMultiplier * michelinMultiplier * vatPriceMult * catharsisMultiplier * sanitationMultiplier * winterMultiplier * kaisekiMultiplier * dynastyMultiplier)
  let tip = sat > 0.85 ? Math.round(gain * 0.25 * locData.tipMultiplier) : 0

  // Efek Arashi Rush Hour (Tip Multiplier x3.5)
  if (G.arashi?.active) {
    tip = Math.round(tip * 3.5)
  }

  // Evaluasi Harmoni Makanan & Sake (Food-Sake Pairing Matrix)
  if (c.servedSake) {
    const pairRes = evaluateSakePairing(G.plate, c.servedSake)
    if (pairRes.match) {
      tip = Math.round(tip * pairRes.tipMultiplier)
      Audio.playEuphoriaChime()
      G.floats.push({x: c.x, y: c.y - 80, t: 0, s: `✨ GOURMET EUPHORIA! ${pairRes.note}`, c: '#ffd700'})
    }
  }

  // Cuaca Ekstrem
  if (G.weather === 'topan') tip = Math.round(tip * 2.0)
  if (G.isBlackout && G.candleLit) tip = Math.round(tip * 1.35)

  // Hadiah Tamu Bangsawan Ruang VIP Zashiki (Ginza Flagship)
  if (c.isZashiki && c.zashikiData && sat >= 0.75) {
    gain = Math.round(gain * c.zashikiData.budgetMultiplier)
    tip = Math.round(tip * c.zashikiData.budgetMultiplier)
    G.rep += 8
    Audio.playPrestigeFanfare()
    G.floats.push({x: c.x, y: c.y - 70, t: 0, s: `🏛️ JAMUAN BANGSAWAN GINZA: +¥${gain + tip}!`, c: '#f1c40f'})
  }

  // Hadiah Tamu Teka-Teki Tengah Malam (Shinya Shokudo)
  if (c.isMidnightRiddle && c.midnightData) {
    const riddleRes = evaluateMidnightRiddle(c.midnightData, G.plate, G.plateCondiments)
    if (riddleRes.success) {
      gain += riddleRes.rewardMoney
      tip += 1500
      G.rep += riddleRes.rewardRep
      unlockPolaroid(riddleRes.polaroidId)
      Audio.playFeverSound()
      G.floats.push({x: c.x, y: c.y - 50, t: 0, s: riddleRes.message, c: '#ffd700'})
    } else {
      G.floats.push({x: c.x, y: c.y - 50, t: 0, s: riddleRes.message, c: '#e74c3c'})
    }
  }

  // Peluang Foto Polaroid Otomatis saat Harmoni Tinggi
  if (kaisekiScore >= 85 && Math.random() < 0.35) {
    unlockPolaroid('polaroid_kuro')
  }

  // Hadiah Bos VIP
  if (c.isBoss && sat >= 0.75) {
    gain += c.bossData.rewardMoney
    tip += 1000
    G.rep += c.bossData.rewardRep
    Audio.playFeverSound()
    G.floats.push({x: c.x, y: c.y - 50, t: 0, s: `💼 KOPER HADIAH VIP: +¥${c.bossData.rewardMoney}!`, c: '#ffd700'})
  }

  // Hadiah Inspektur Michelin Menyamar
  if (c.isInspector && sat >= 0.8) {
    G.michelinStars = Math.min(3, (G.michelinStars || 0) + 1)
    gain += c.inspectorData.rewardMoney
    tip += 2000
    G.rep += c.inspectorData.rewardRep
    Audio.playFeverSound()
    G.floats.push({x: c.x, y: c.y - 50, t: 0, s: `🏆 INSPEKSI LULUS! Bintang Michelin ${'★'.repeat(G.michelinStars)}!`, c: '#ffd700'})
  }

  // Hadiah Inspektur Sanitasi Hokenjo
  if (c.isSanitation && sat >= 0.75) {
    G.sanitationCertified = true
    gain += c.sanitationData.rewardMoney
    tip += 1500
    G.rep += c.sanitationData.rewardRep
    Audio.playFeverSound()
    G.floats.push({x: c.x, y: c.y - 50, t: 0, s: '📋 SERTIFIKAT HIGIENIS BINTANG 5 LULUS! (Bebas Pajak)', c: '#2ecc71'})
  }

  // Hitung Kombo Pelayanan Cepat (< 8 dtk dan sat > 0.7)
  const serveSpeed = G.t - c.orderOpenTime
  if (serveSpeed < 9 && sat >= 0.7) {
    G.combo++
    Audio.playComboChime(G.combo)
    G.floats.push({x: c.x, y: c.y - 20, t: 0, s: `🔥 COMBO x${G.combo}!`, c: '#ff9f43'})

    // FEVER MODE TRIGGER! (Combo >= 4)
    if (G.combo >= 4 && !G.feverActive) {
      G.feverActive = true
      G.feverTimer = G.heirlooms.includes('pocket_watch') ? 22 : 16
      Audio.playFeverSound()
      G.floats.push({x: 140, y: 50, t: 0, s: '⚡ FEVER MODE AKTIF! (Uang x3)', c: '#ffd700'})
    }
  } else if (sat < 0.5) {
    G.combo = 0
  }

  G.money += (gain + tip)
  G.served++
  G.dayStats = G.dayStats || {served: 0, revenue: 0, tips: 0}
  G.dayStats.served++
  G.dayStats.revenue += gain
  G.dayStats.tips += tip

  // Progres Poin Keahlian Master (Setiap 4 tamu terlayani dengan baik)
  if (sat >= 0.6) {
    G.masteryProgress = (G.masteryProgress || 0) + 1
    if (G.masteryProgress >= 4) {
      G.masteryProgress = 0
      G.masteryPoints = (G.masteryPoints || 0) + 1
      Audio.playSkillUnlock()
      G.floats.push({x: 150, y: 35, t: 0, s: '📜 +1 Poin Keahlian Master!', c: '#ffd700'})
    }
  }

  const grandPrixRepBonus = G.grandPrixTrophy ? 1.5 : 1.0
  const repMult = (G.heirlooms.includes('silver_hairpin') ? 1.25 : 1.0) * grandPrixRepBonus
  G.rep = Math.max(0, G.rep + (sat > 0.7 ? 2.5 : sat > 0.4 ? 0.5 : -1) * repMult)
  onArashiServe(G, sat >= 0.65)
  G.plate.forEach(i => G.pop[i] = (G.pop[i] || 0) + 1)

  const stars = sat > 0.85 ? 3 : sat > 0.55 ? 2 : 1
  Audio.playServeSound(stars)
  Audio.playCoinSound()

  G.floats.push(
    {x: c.x, y: c.y - 30, t: 0, s: '+¥' + (gain + tip), c: P.gold},
    {x: c.x, y: c.y - 40, t: -0.25, s: '♥'.repeat(stars), c: '#ff6f91'}
  )

  // Pemicu Cerita
  if (c.charId && CHARACTERS[c.charId]) {
    const story = checkStoryTrigger(c.charId, G.storiesUnlocked, sat)
    if (story) {
      G.activeDialogue = {
        char: CHARACTERS[c.charId],
        story,
        chosen: null
      }
      G.storiesUnlocked[c.charId] = (G.storiesUnlocked[c.charId] || 0) + 1
      const storyMoney = G.heirlooms.includes('poet_pen') ? 200 : 0
      G.money += storyMoney
      G.rep += 3
      if (storyMoney > 0) {
        G.floats.push({x: c.x, y: c.y - 70, t: 0, s: '🖋️ Pena Pujangga: +¥200!', c: '#ffd700'})
      }
    }
  }

  c.st = 'eat'
  c.eatT = Math.max(2, 5 - G.pot)
  c.sat = sat
  closeOrder()
  saveGame()
}

// Respon Dialog
export function chooseDialogueOption(optionIndex) {
  if (!G.activeDialogue || !G.activeDialogue.story.choices) return
  const opt = G.activeDialogue.story.choices[optionIndex]
  if (!opt) return

  G.activeDialogue.chosen = opt
  if (opt.affinity) {
    const charId = G.activeDialogue.char.id
    G.charAffinity[charId] = (G.charAffinity[charId] || 0) + opt.affinity
  }
  Audio.playCoinSound()
  saveGame()
}

export function buy(kind, id) {
  Audio.resumeAudio()
  if (kind === 'item') {
    const it = ITEMS.find(x => x.id === id)
    if (G.money >= it.cost && G.rep >= it.rep && !G.owned.includes(id)) {
      G.money -= it.cost
      G.owned.push(id)
      G.stock[id] = 5
      Audio.playCoinSound()
      saveGame()
    }
  } else {
    const e = EQ.find(x => x.id === id)
    const c = eqCost(G, e)
    if (G.money >= c && G[id] < e.max) {
      G.money -= c
      G[id]++
      Audio.playCoinSound()
      saveGame()
    }
  }
}

export function feedCat() {
  if (G.cat.fedToday) return false
  if (G.money < 50) return false
  G.money -= 50
  G.cat.fedToday = true
  G.cat.friendship = Math.min(10, G.cat.friendship + 1)
  G.rep += 2
  Audio.playMeow()
  G.floats.push({x: 50, y: 130, t: 0, s: 'Purr~ ♥', c: '#ff6f91'})
  saveGame()
  return true
}

export function petCat() {
  Audio.playMeow()
  G.floats.push({x: 50, y: 130, t: 0, s: 'Meoong~', c: '#f3e3b8'})
}

// Loop Update Per Frame
export function update(dt) {
  const g = G
  const validDt = Number.isFinite(dt) ? Math.min(0.05, Math.max(0, dt)) : 0.016
  g.t = (Number.isFinite(g.t) ? g.t : 0) + validDt

  // Update FEVER MODE Timer
  if (g.feverActive) {
    g.feverTimer -= validDt
    if (g.feverTimer <= 0) {
      g.feverActive = false
      g.combo = 0
    }
  }

  // Update Staf Kenji (Auto Restock Panci jika kosong)
  if (g.staff.kenji) {
    g.kenjiTimer = (g.kenjiTimer || 0) + validDt
    if (g.kenjiTimer > 3.5) {
      g.kenjiTimer = 0
      g.potSlots.forEach((comp, idx) => {
        if (comp.length < 2) {
          const compData = COMPARTMENTS[idx]
          const availableStockItem = compData.allowed.find(aid => (g.stock[aid] || 0) > 0)
          if (availableStockItem) addToPot(idx, availableStockItem)
        }
      })
    }
  }

  // Rebus Bahan di Panci
  g.potSlots.forEach(comp => {
    comp.forEach(item => {
      item.simmer = (Number.isFinite(item.simmer) ? item.simmer : 0) + validDt
    })
  })

  // Gelembung Kuah
  g.bubbleTimer = (Number.isFinite(g.bubbleTimer) ? g.bubbleTimer : 0) + validDt
  if (g.bubbleTimer > 2.5) {
    g.bubbleTimer = 0
    if (g.scene === 'in') Audio.playBubbleSound()
  }

  // Waktu Kedai (17:00 s/d 02:00)
  if (!g.demo && !g.dayClosed) {
    if (!Number.isFinite(g.minute)) g.minute = 0
    if (!Number.isFinite(g.hour)) g.hour = 17
    if (!Number.isFinite(g.timeSpeed)) g.timeSpeed = 1

    g.minute += validDt * 4 * g.timeSpeed
    if (g.minute >= 60) {
      g.minute = 0
      g.hour++
      if (g.hour >= 24) g.hour = 0
      if (g.hour === 2 && !g.midnightMode && !g.shinyaPrompt) {
        g.shinyaPrompt = true
        saveGame()
      } else if (g.hour === 5 && g.midnightMode) {
        g.midnightMode = false
        g.dayClosed = true
        saveGame()
      }
    }
  }

  // Hujan & Cuaca
  const rainSpeedMult = g.weather === 'hujan_deras' ? 1.5 : 1
  g.rain.forEach(r => {
    r.y += r.s * validDt * rainSpeedMult
    r.x -= r.s * 0.15 * validDt
    if (r.y > H) {
      r.y = -4
      r.x = Math.random() * (W + 40)
      if (Math.random() < 0.3) {
        g.rip.push({x: 40 + Math.random() * 240, y: 150 + Math.random() * 25, t: 0})
      }
    }
  })
  g.rip = g.rip.filter(r => (r.t += validDt) < 0.8)

  // Uap Panci
  if (Math.random() < validDt * 10) {
    g.steam.push({
      x: g.scene === 'in' ? PX + (Math.random() * 20 - 10) : 150 + Math.random() * 60,
      y: g.scene === 'in' ? PY - 6 : 100,
      t: 0,
      d: Math.random() * 6
    })
  }
  g.steam = g.steam.filter(s => {
    s.t += validDt
    s.y -= 14 * validDt
    return s.t < 2.2
  })

  // Update Sub-Stasiun Panggangan Sate Yakitori
  if (g.grillSlots) {
    g.grillSlots.forEach((slot, sIdx) => {
      if (slot.id !== null) {
        slot.timer += validDt
        if (Math.random() < validDt * 8) {
          g.grillSmoke.push({
            x: 180 + sIdx * 18 + (Math.random() * 4 - 2),
            y: 54,
            t: 0
          })
        }
      }
    })
  }
  g.grillSmoke = (g.grillSmoke || []).filter(s => {
    s.t += validDt
    s.y -= 10 * validDt
    return s.t < 1.6
  })

  // Aroma asap sate menenangkan kesabaran antrean tamu
  if (g.grillSlots && g.grillSlots.some(s => s.id !== null)) {
    g.cust.forEach(c => {
      if (c.st === 'wait') {
        c.pat = Math.min(c.max, c.pat + validDt * 0.12)
      }
    })
  }

  // Update Sesi Lelang Subuh Tsukiji jika aktif
  if (g.auctionSession && !g.auctionSession.finished) {
    updateAuction(validDt)
  }

  // Update Duel Kuliner Cook-Off vs Yamada-ya
  if (g.cookOffSession && !g.cookOffSession.finished) {
    updateCookOff(g.cookOffSession, validDt)
  }

  // Update Fase 7: Arashi Rush & Zen Focus
  if (g.arashi) {
    updateArashi(g, validDt)
  }

  // Update Fase 7: Turnamen Akbar Grand Prix Kanto vs Kansai
  if (g.grandPrixSession && !g.grandPrixSession.finished) {
    updateGrandPrix(g.grandPrixSession, validDt)
    if (g.grandPrixSession.finished && g.grandPrixSession.winner === 'player' && !g.grandPrixTrophy) {
      g.grandPrixTrophy = true
      g.money += 20000
      g.rep += 25
      Audio.playGrandPrixGong()
      Audio.playPrestigeFanfare()
      g.floats.push({x: 160, y: 50, t: 0, s: '🏆 PIALA BERGILIR KAISAR DIMENANGKAN! +¥20,000!', c: '#ffd700'})
      if (!g.owned.includes('imperial_daikon')) g.owned.push('imperial_daikon')
      if (!g.owned.includes('matsuba_crab')) g.owned.push('matsuba_crab')
      g.stock.imperial_daikon = (g.stock.imperial_daikon || 0) + 5
      g.stock.matsuba_crab = (g.stock.matsuba_crab || 0) + 5
      saveGame()
    }
  }

  // Update Partikel Salju & Suhu Kompor saat Salju
  if (g.weather === 'salju' && g.snowParticles) {
    g.snowParticles.forEach(p => {
      p.y += p.s * validDt * 0.8
      p.x += Math.sin(g.t * 2 + p.y * 0.05) * 12 * validDt
      if (p.y > H) {
        p.y = -2
        p.x = Math.random() * W
      }
    })
    g.stoveHeat = Math.max(0.2, (g.stoveHeat || 0.7) - validDt * 0.015)
  }

  // Update Fase 5: Minigame Pisau Dapur Presisi jika aktif
  if (g.knifePrepSession && !g.knifePrepSession.finished) {
    updateKnifePrepSession(g.knifePrepSession, validDt)
  }

  // Update Fase 5: Pesanan Telepon & Pengantaran Sepeda Bento
  if (g.activePhoneOrder) {
    updateDelivery(g.activePhoneOrder, validDt, g.staff)
  }

  // Timer Dering Telepon Otomatis
  if (!g.activePhoneOrder && !g.dayClosed && g.scene === 'in') {
    g.phoneRingTimer = (g.phoneRingTimer || 35) - validDt
    if (g.phoneRingTimer <= 0) {
      g.phoneRingTimer = 40 + Math.random() * 35
      Audio.playPhoneRing()
      g.floats.push({x: 140, y: 35, t: 0, s: '☎️ Kringgg! Telepon Meja Berdering!', c: '#ffd700'})
    }
  }

  // Update Gerobak Saingan Yamada-ya
  updateRivalStall(validDt, g)

  g.floats = g.floats.filter(f => (f.t += validDt) < 1.4)
  g.zoom += (g.zt - g.zoom) * Math.min(1, validDt * 7)

  // Demo
  if (g.demo) {
    g.demoT += validDt
    if (g.demoT >= 30) { reset(false); return }
    if (g.scene === 'out' && g.demoT > 3) enter()
    if (g.scene === 'in') {
      if (!g.target && g.zoom < 0.15) {
        const c = g.cust.find(c => c.st === 'wait')
        if (c) { openOrder(c); g.dT = 0 }
      } else if (g.target && g.zoom > 0.8) {
        g.dT += validDt
        if (g.dT > 0.6) {
          g.dT = 0
          if (g.plate.length < g.target.order.length) {
            g.plate.push(g.target.order[g.plate.length])
            g.plateItemsSimmer.push({state: 'pas', mult: 1.0})
          } else {
            serve()
          }
        }
      }
    }
  }

  if (g.scene !== 'in') return

  // Spawn Tamu
  g.spawnT -= validDt
  if (g.spawnT <= 0 && !g.dayClosed) {
    spawn()
    let rate = g.demo ? 3 : Math.max(3, 9 - g.lantern * 1.5 - level())
    if (g.isFestival || g.feverActive) rate *= 0.5
    g.spawnT = rate * (0.7 + Math.random() * 0.6)
  }

  // Update Tamu
  g.cust.forEach(c => {
    c.w += validDt * 8
    const sx = SX[c.seat], sp = 42 * validDt

    if (c.st === 'walk') {
      if (Math.abs(c.x - sx) > 1 && c.y >= 139) {
        c.x += Math.sign(sx - c.x) * sp
      } else {
        c.y -= sp
        if (c.y <= 118) {
          c.y = 118
          c.st = 'wait'
          c.max = c.pat = (c.bossData ? c.bossData.patience : 22) + (c.bonusPatience || 0)

          const pool = g.owned.slice()
          const char = c.charId ? CHARACTERS[c.charId] : null
          const n = 1 + (Math.random() * Math.min(3, 1 + level() + 1) | 0)
          c.order = []

          if (c.zashikiData) {
            c.order = c.zashikiData.favoriteOden.slice()
          } else if (c.bossData) {
            c.order = c.bossData.favItems.slice()
            c.condimentReq = c.bossData.favCondiment
          } else if (char && Math.random() < 0.8) {
            char.favItems.forEach(fi => {
              if (g.owned.includes(fi) && !c.order.includes(fi)) c.order.push(fi)
            })
            if (Math.random() < 0.7) c.condimentReq = char.favCondiment
          }

          while (c.order.length < n && pool.length) {
            c.order.push(pool.splice(Math.random() * pool.length | 0, 1)[0])
          }

          if (!c.condimentReq && Math.random() < 0.4) {
            c.condimentReq = rnd(['karashi', 'scallion', 'ocha'])
          }
        }
      }
    } else if (c.st === 'wait') {
      if (c !== g.target) {
        // Staf Aoi memperlambat pengurangan kesabaran
        const decayRate = g.staff.aoi ? 0.7 : 1.0
        let rushDecay = 1.0
        if (g.arashi?.active) {
          rushDecay = g.arashi.zenActive ? 0.45 : 1.25
        }
        c.pat -= validDt * decayRate * rushDecay
      }
      if (c.pat <= 0) {
        c.st = 'leave'
        g.rep = Math.max(0, g.rep - (c.bossData ? 5 : 1))
        g.combo = 0 // Rusak kombo jika tamu kabur!
        Audio.playUpsetSound()
        g.floats.push({x: c.x, y: c.y - 30, t: 0, s: 'Kecewa!', c: '#ff4040'})
        if (g.target === c) closeOrder()
      }
    } else if (c.st === 'eat') {
      c.eatT -= validDt
      if (c.eatT <= 0) c.st = 'leave'
    } else if (c.st === 'leave') {
      if (c.y < 140) c.y += sp
      else c.x += sp
      c.gone = c.x > 335
    }
  })

  g.cust = g.cust.filter(c => !c.gone)
}

export function click(x, y) {
  const g = G
  Audio.resumeAudio()

  if (g.scene === 'out') {
    if (x > 35 && x < 65 && y > 135 && y < 155) {
      petCat()
      return
    }
    if (x > 60 && x < 260 && y > 40 && y < 140) {
      enter()
      return
    }
    return
  }

  if (g.zoom > 0.5) return

  const c = g.cust.find(c => c.st === 'wait' && Math.abs(c.x - x) < 10 && y > c.y - 24 && y < c.y + 4)
  if (c) openOrder(c)
}

// --- FASE 7: HELPER FUNCTIONS & AKSI PEMAIN ---
export function triggerPrestige(apprenticeId = 'kenji') {
  if (!canPrestige(G)) return false
  const ok = executePrestige(G, apprenticeId)
  if (ok) {
    Audio.playPrestigeFanfare()
    saveGame()
  }
  return ok
}

export function startGrandPrix() {
  if (G.grandPrixSession && !G.grandPrixSession.finished) return
  G.grandPrixSession = createGrandPrixSession()
  Audio.playGrandPrixGong()
  saveGame()
}

export function startCellarFerment(vatIndex) {
  if (!G.fermentation) G.fermentation = createInitialFermentationCellar()
  const ok = startFermenting(G.fermentation, vatIndex, G)
  if (ok) {
    Audio.playBubblingVat()
    saveGame()
  }
  return ok
}

export function harvestCellarVat(vatIndex) {
  if (!G.fermentation) return null
  const recipe = harvestVat(G.fermentation, vatIndex)
  if (recipe) {
    Audio.playFeverSound()
    G.floats.push({x: 160, y: 50, t: 0, s: `🏺 Berhasil Memanen: ${recipe.yieldName}!`, c: '#ffd700'})
    saveGame()
  }
  return recipe
}

export function chooseFactionOption(choiceIndex) {
  if (!G.factions || !G.factions.activeDilemma) return null
  const res = resolveDilemma(G.factions, choiceIndex, G)
  if (res && res.success) {
    Audio.playCoinSound()
    G.floats.push({x: 160, y: 60, t: 0, s: '⚖️ Relasi Faksi Diperbarui!', c: '#a29bfe'})
    saveGame()
  }
  return res
}

export function serveSakeBottle(sakeType = 'atsukan') {
  if (!G.target) return false
  if (sakeType === 'koshu') {
    if ((G.fermentation?.inventory?.vintage_koshu || 0) <= 0) return false
    G.fermentation.inventory.vintage_koshu--
  }
  G.target.servedSake = sakeType
  Audio.playSakePour()
  G.floats.push({x: G.target.x, y: G.target.y - 45, t: 0, s: `🍶 Sajian Sake: ${sakeType === 'koshu' ? 'Koshu Vintage 1975' : sakeType === 'ginjo' ? 'Junmai Ginjo' : 'Atsukan Hangat'}!`, c: '#ffd700'})
  saveGame()
  return true
}
