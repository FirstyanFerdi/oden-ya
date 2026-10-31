// Sistem Tingkat Kesulitan Adaptif (Dynamic Rush Hour & Zen Concentration)
// Menyesuaikan intensitas permainan secara langsung berdasarkan performa & combo pemain.
import * as Audio from './audio.js'

export function createInitialArashiState() {
  return {
    meter: 0,              // 0 - 100
    active: false,         // Mode Arashi Rush aktif
    duration: 0,           // Sisa durasi Arashi Rush (detik)
    maxDuration: 35,       // Durasi standar rush wave
    zenTimer: 0,           // Sisa waktu Zen Focus (detik)
    zenActive: false,      // Apakah Zen Focus (bullet-time) sedang aktif
    zenTriggeredThisWave: false
  }
}

export function updateArashi(g, dt) {
  if (!g.arashi) {
    g.arashi = createInitialArashiState()
  }
  const ar = g.arashi

  // Hitung mundur Zen Focus State
  if (ar.zenActive) {
    ar.zenTimer -= dt
    if (ar.zenTimer <= 0) {
      ar.zenActive = false
      ar.zenTimer = 0
    }
  }

  // Hitung mundur Arashi Rush Wave
  if (ar.active) {
    ar.duration -= dt
    ar.meter = Math.max(0, (ar.duration / ar.maxDuration) * 100)
    if (ar.duration <= 0) {
      ar.active = false
      ar.duration = 0
      ar.meter = 0
      ar.zenActive = false
      ar.zenTriggeredThisWave = false
    }
  } else {
    // Alami penurunan perlahan jika tidak ada aksi
    if (ar.meter > 0) {
      ar.meter = Math.max(0, ar.meter - dt * 2.5)
    }
  }
}

export function addArashiProgress(g, amount) {
  if (!g.arashi) g.arashi = createInitialArashiState()
  const ar = g.arashi

  if (!ar.active) {
    ar.meter = Math.min(100, ar.meter + amount)
    if (ar.meter >= 100) {
      startArashiRush(g)
    }
  } else {
    // Sedang aktif: cek pemicu Zen Focus
    if (!ar.zenTriggeredThisWave && g.combo >= 6) {
      triggerZenFocus(g)
    }
  }
}

export function startArashiRush(g) {
  if (!g.arashi) g.arashi = createInitialArashiState()
  const ar = g.arashi
  ar.active = true
  ar.duration = ar.maxDuration
  ar.meter = 100
  ar.zenTriggeredThisWave = false
  Audio.playArashiRushFanfare()

  g.floats.push({
    s: '⚡ ARASHI RUSH HOUR AKTIF! (Tip x3.5) ⚡',
    x: 160,
    y: 40,
    t: 0.01,
    c: '#ff7675'
  })
}

export function triggerZenFocus(g) {
  if (!g.arashi) g.arashi = createInitialArashiState()
  const ar = g.arashi
  ar.zenActive = true
  ar.zenTimer = 9.0 // 9 detik waktu pelan & fokus
  ar.zenTriggeredThisWave = true
  Audio.playZenFocusBeat()

  g.floats.push({
    s: '🧘 MATA BATIN ZEN FOCUS! (Waktu Melambat) 🧘',
    x: 160,
    y: 55,
    t: 0.01,
    c: '#ffeaa7'
  })
}

export function onArashiServe(g, isPerfect = true) {
  if (!g.arashi) g.arashi = createInitialArashiState()
  if (isPerfect) {
    const gain = g.arashi.active ? 10 : 16
    addArashiProgress(g, gain)
  } else {
    // Kesalahan menyajikan makanan
    if (g.arashi.active) {
      g.arashi.duration = Math.max(0, g.arashi.duration - 6)
    } else {
      g.arashi.meter = Math.max(0, g.arashi.meter - 25)
    }
    g.arashi.zenActive = false
  }
}

// Cek apakah pesanan multi-tahap dapat dibentuk saat Arashi aktif
export function createMultiCourseDemand(g) {
  if (!g.arashi?.active && g.rep < 50) return null
  // 45% peluang pesanan multi-tahap
  if (Math.random() > 0.45) return null

  const bonusTypes = ['sate', 'sake']
  const bonus = bonusTypes[Math.floor(Math.random() * bonusTypes.length)]
  if (bonus === 'sate') {
    const sates = ['yakitori', 'tsukune', 'shiitake']
    const sateId = sates[Math.floor(Math.random() * sates.length)]
    return {
      type: 'sate',
      id: sateId,
      name: sateId === 'yakitori' ? 'Yakitori Ayam' : sateId === 'tsukune' ? 'Tsukune Daging' : 'Jamur Shiitake',
      icon: '🍢',
      fulfilled: false
    }
  } else {
    const temps = [35, 45, 50]
    const temp = temps[Math.floor(Math.random() * temps.length)]
    return {
      type: 'sake',
      targetTemp: temp,
      name: `Atsukan Hangat ${temp}°C`,
      icon: '🍶',
      fulfilled: false
    }
  }
}

