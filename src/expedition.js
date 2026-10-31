// Sistem Ekspedisi Kereta Api Restorasi Showa (The SL Ginga Gastronomic Journey)
// Membawa kedai berjalan melintasi 4 provinsi legendaris Jepang dengan kereta uap antik.

export const TRAIN_ROUTES = {
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo Central (Ibu Kota)',
    icon: '🗼',
    title: 'Pusat Kehidupan Showa',
    ticketCost: 0,
    temp: '16°C',
    weatherDesc: 'Malam gerimis kota tua dengan lentera jalanan.',
    exclusiveItems: [],
    priceMult: 1.0,
    tipMult: 1.0,
    unlocked: true
  },
  hokkaido: {
    id: 'hokkaido',
    name: 'Otaru Salju Abadi (Hokkaido)',
    icon: '❄️',
    title: 'Jalur Negeri Salju Utara',
    ticketCost: 2500,
    temp: '-15°C',
    weatherDesc: 'Badai salju beku ekstrem. Jaga suhu kompor dengan arang!',
    exclusiveItems: [
      { id: 'king_crab', n: 'Capit Kepiting Raja', p: 700, c: '#e74c3c', cost: 350 },
      { id: 'hokkaido_butter', n: 'Mentega Susu Otaru', p: 120, c: '#f1c40f', cost: 50, isCondiment: true }
    ],
    specialRule: 'Kompor mendingin 2x lebih cepat karena hawa beku.',
    priceMult: 1.4,
    tipMult: 1.3,
    unlocked: false
  },
  kyoto: {
    id: 'kyoto',
    name: 'Arashiyama Kuil Suci (Kyoto)',
    icon: '⛩️',
    title: 'Jalur Meditasi & Tradisi Kuno',
    ticketCost: 3200,
    temp: '12°C',
    weatherDesc: 'Kabut hening di antara rumpun bambu dan kuil tua.',
    exclusiveItems: [
      { id: 'yuba_silk', n: 'Kembang Tahu Sutra', p: 260, c: '#fffde7', cost: 110 },
      { id: 'takenoko_bamboo', n: 'Rebung Rebus Bambu', p: 200, c: '#c8d6e5', cost: 80 }
    ],
    specialRule: 'Etika suci kuil: Peziarah mengutamakan sajian vegetarian bernilai Kaiseki tinggi.',
    priceMult: 1.5,
    tipMult: 1.4,
    unlocked: false
  },
  osaka: {
    id: 'osaka',
    name: 'Dotonbori Gemerlap (Osaka)',
    icon: '🐙',
    title: 'Jalur Pasar Malam & Humor Rakyat',
    ticketCost: 4000,
    temp: '18°C',
    weatherDesc: 'Lampu neon kanal dan warga ceria yang menyukai tempo cepat.',
    exclusiveItems: [
      { id: 'doteyaki_beef', n: 'Doteyaki Urat Miso Manis', p: 340, c: '#d35400', cost: 160 },
      { id: 'beni_shoga', n: 'Acar Jahe Merah Pedas', p: 70, c: '#ff4757', cost: 30, isCondiment: true }
    ],
    specialRule: 'Aturan sakral Osaka: Dilarang mencelup saus 2x! Kecepatan saji melipatgandakan tip.',
    priceMult: 1.6,
    tipMult: 1.6,
    unlocked: false
  },
  hakata: {
    id: 'hakata',
    name: 'Pesisir Teluk Yatai (Hakata)',
    icon: '🍜',
    title: 'Jalur Tenda Kuliner Pesisir Selat',
    ticketCost: 5000,
    temp: '20°C',
    weatherDesc: 'Angin laut malam dan riuh pesta sake jalanan hingga subuh.',
    exclusiveItems: [
      { id: 'mentaiko', n: 'Telur Ikan Mentaiko Pedas', p: 320, c: '#ff6b6b', cost: 140 },
      { id: 'tonkotsu_broth_item', n: 'Ekstrak Rebusan Gurih', p: 280, c: '#f7f1e3', cost: 120 }
    ],
    specialRule: 'Tenda yatai buka tanpa henti. Kepuasan alkohol dan aroma arang melimpah.',
    priceMult: 1.75,
    tipMult: 1.8,
    unlocked: false
  }
}

export function createInitialExpeditionState() {
  return {
    currentRoute: 'tokyo',
    unlockedRoutes: ['tokyo'],
    totalMilesTraveled: 0
  }
}

export function travelToRoute(expState, targetRouteId, g) {
  if (!expState) return false
  const route = TRAIN_ROUTES[targetRouteId]
  if (!route) return false

  const cost = route.ticketCost
  if (g.money < cost) return false

  g.money -= cost
  expState.currentRoute = targetRouteId
  if (!expState.unlockedRoutes.includes(targetRouteId)) {
    expState.unlockedRoutes.push(targetRouteId)
  }
  expState.totalMilesTraveled += 250

  // Buka bahan eksklusif ke inventaris pemain
  if (route.exclusiveItems) {
    route.exclusiveItems.forEach(it => {
      if (!g.owned.includes(it.id)) {
        g.owned.push(it.id)
        g.stock[it.id] = 5
      }
    })
  }

  g.floats.push({
    s: `🚂 KERETA SL GINGA TIBA DI: ${route.name}!`,
    x: 160,
    y: 45,
    t: 0.01,
    c: '#54a0ff'
  })

  return true
}

export function getCurrentRouteInfo(expState) {
  const rId = expState?.currentRoute || 'tokyo'
  return TRAIN_ROUTES[rId] || TRAIN_ROUTES.tokyo
}

