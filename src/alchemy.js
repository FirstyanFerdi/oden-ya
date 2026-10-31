// Sistem Laboratorium Kaldu Kustom (Master Broth Alchemy Lab)
// Meracik formula kuah dashi legendaris buatan pemain sendiri dari 5 parameter rasa alami.

export function createInitialAlchemyState() {
  return {
    params: {
      umami: 50, // Ekstrak Kombu & Katsuobushi
      amami: 50, // Manis Lembut Mirin & Lobak
      shio: 50,  // Asin Segar Garam Samudra
      kaori: 50, // Aroma Wangi Yuzu & Kayu Cedar
      koku: 50   // Ketebalan Tekstur Kolagen Daging
    },
    customName: 'Dashi Bintang Showa',
    patented: false,
    harmonyScore: 78,
    activeInPot: false
  }
}

export function adjustTasteParam(state, param, delta) {
  if (!state || !state.params || state.patented) return
  if (state.params[param] !== undefined) {
    state.params[param] = Math.max(10, Math.min(100, state.params[param] + delta))
    state.harmonyScore = calculateHarmony(state.params)
  }
}

export function calculateHarmony(params) {
  const { umami, amami, shio, kaori, koku } = params

  // Rumus sinergi rasa tradisional Jepang:
  // Umami & Koku harus selaras; Shio dan Amami harus seimbang.
  const diffShioAmami = Math.abs(shio - amami)
  const diffUmamiKoku = Math.abs(umami - koku)
  const aromaBalance = kaori >= 60 ? 15 : 8

  const base = 50 + (umami * 0.25) + (koku * 0.15) + aromaBalance
  const penalty = (diffShioAmami * 0.35) + (diffUmamiKoku * 0.25)
  return Math.max(30, Math.min(100, Math.round(base - penalty)))
}

export function patentCustomBroth(state, name, g) {
  if (!state) return { success: false, msg: 'Status kaldu tidak valid' }
  const patentCost = 3000
  if (g.money < patentCost) {
    return { success: false, msg: 'Uang kas tidak cukup untuk biaya pendaftaran paten (¥3.000)!' }
  }
  if (state.harmonyScore < 80) {
    return { success: false, msg: 'Skor harmoni kaldu minimal 80 untuk mendapatkan sertifikat paten!' }
  }

  g.money -= patentCost
  state.customName = name || 'Dashi Mahakarya Showa'
  state.patented = true
  state.activeInPot = true
  g.rep += 20

  g.floats.push({
    s: `📜 PATEN KALDU RESMI: "${state.customName}" (Skor ${state.harmonyScore}%)!`,
    x: 160,
    y: 50,
    t: 0.01,
    c: '#ffd700'
  })

  return { success: true, msg: 'Paten kaldu berhasil didaftarkan ke Asosiasi Kuliner Jepang!' }
}

export function toggleActiveInPot(state) {
  if (!state || !state.patented) return false
  state.activeInPot = !state.activeInPot
  return state.activeInPot
}

