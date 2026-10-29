// Audio Synthesizer Prosedural (Web Audio API)
// 100% Offline, Procedural Multi-Genre Cassette Radio & ASMR Soundscape

let ctx = null
let masterGain = null
let rainNode = null
let rainGain = null
let vinylNode = null
let vinylGain = null
let musicInterval = null
let isMuted = false
let currentCassette = 'jazz' // 'jazz', 'citypop', 'shamisen', 'lofi'

export function initAudio() {
  if (ctx) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    ctx = new AudioContext()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.5
    masterGain.connect(ctx.destination)
    startRainSound()
    startVinylCrackle()
    startCassetteMusic()
  } catch (e) {
    console.warn('Web Audio not supported', e)
  }
}

export function resumeAudio() {
  if (!ctx) initAudio()
  if (ctx && ctx.state === 'suspended') {
    ctx.resume()
  }
}

export function toggleMute() {
  resumeAudio()
  isMuted = !isMuted
  if (masterGain) {
    masterGain.gain.setValueAtTime(isMuted ? 0 : 0.48, ctx ? ctx.currentTime : 0)
  }
  return isMuted
}

export function getMuteState() {
  return isMuted
}

export function setCassetteGenre(genre) {
  currentCassette = genre
  playCassetteClick()
  if (musicInterval) clearInterval(musicInterval)
  startCassetteMusic()
}

export function getCassetteGenre() {
  return currentCassette
}

// Suara Hujan Sintetis (Filtered Pink/White Noise)
function startRainSound() {
  if (!ctx) return
  const bufferSize = 2 * ctx.sampleRate
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.96900 * b2 + white * 0.1538520
    b3 = 0.86650 * b3 + white * 0.3104856
    b4 = 0.55000 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.0168980
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04
    b6 = white * 0.115926
  }

  rainNode = ctx.createBufferSource()
  rainNode.buffer = noiseBuffer
  rainNode.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1100

  rainGain = ctx.createGain()
  rainGain.gain.value = 0.16

  rainNode.connect(filter)
  filter.connect(rainGain)
  rainGain.connect(masterGain)
  rainNode.start()
}

// Efek Kresek Kaset Pita / Vinyl Crackle
function startVinylCrackle() {
  if (!ctx) return
  const bufferSize = ctx.sampleRate
  const crackleBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = crackleBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() < 0.002 ? (Math.random() * 2 - 1) * 0.2 : 0
  }
  vinylNode = ctx.createBufferSource()
  vinylNode.buffer = crackleBuffer
  vinylNode.loop = true

  vinylGain = ctx.createGain()
  vinylGain.gain.value = 0.05

  vinylNode.connect(vinylGain)
  vinylGain.connect(masterGain)
  vinylNode.start()
}

// Nada Sintesis Tunggal
function playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.15, pitchDrop = 0) {
  if (!ctx || isMuted) return
  resumeAudio()
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    if (pitchDrop) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + pitchDrop), ctx.currentTime + duration)
    }
    gain.gain.setValueAtTime(gainVal, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {}
}

// SFX: Klik Tombol Radio Kaset
export function playCassetteClick() {
  if (!ctx || isMuted) return
  playTone(220, 'square', 0.04, 0.2, -80)
  setTimeout(() => playTone(330, 'square', 0.06, 0.18, -100), 50)
}

// SFX: Lonceng Tirai Kedai
export function playChime() {
  if (!ctx || isMuted) return
  const notes = [659.25, 783.99, 987.77]
  notes.forEach((f, idx) => {
    setTimeout(() => playTone(f, 'sine', 0.6, 0.08), idx * 100)
  })
}

// SFX: Sajikan Makanan
export function playServeSound(stars = 3) {
  if (!ctx || isMuted) return
  const base = stars >= 3 ? [523.25, 659.25, 783.99, 1046.50] : [440, 554.37, 659.25]
  base.forEach((f, idx) => {
    setTimeout(() => playTone(f, 'triangle', 0.4, 0.12), idx * 75)
  })
}

// SFX: Koin / Saldo Kas
export function playCoinSound() {
  if (!ctx || isMuted) return
  playTone(987.77, 'sine', 0.12, 0.15)
  setTimeout(() => playTone(1318.51, 'sine', 0.25, 0.15), 80)
}

// SFX: Plop Masuk Panci / Piring
export function playPlopSound() {
  if (!ctx || isMuted) return
  playTone(340, 'sine', 0.14, 0.2, -190)
}

// SFX: Suara Meong Kucing Kuro
export function playMeow() {
  if (!ctx || isMuted) return
  resumeAudio()
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    const now = ctx.currentTime
    osc.frequency.setValueAtTime(400, now)
    osc.frequency.linearRampToValueAtTime(750, now + 0.15)
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.4)
    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start()
    osc.stop(now + 0.45)
  } catch (e) {}
}

// SFX: Pelanggan Kecewa
export function playUpsetSound() {
  if (!ctx || isMuted) return
  playTone(280, 'sawtooth', 0.35, 0.1, -120)
}

// SFX: Gelembung Kuah Kaldu Mendidih
export function playBubbleSound() {
  if (!ctx || isMuted) return
  const freq = 380 + Math.random() * 200
  playTone(freq, 'sine', 0.08, 0.04, 100)
}

// SFX: Sizzling Rebusan Emas Panci
export function playSizzleSound() {
  if (!ctx || isMuted) return
  playTone(550, 'triangle', 0.2, 0.08, 120)
  setTimeout(() => playTone(880, 'sine', 0.3, 0.09), 80)
}

// SFX: Bel Pintu Pasar Pagi
export function playMarketBell() {
  if (!ctx || isMuted) return
  playTone(880, 'sine', 0.5, 0.12)
  setTimeout(() => playTone(1108, 'sine', 0.6, 0.1), 120)
}

// SFX: Pemicu FEVER MODE (Triumphant Brass Synth)
export function playFeverSound() {
  if (!ctx || isMuted) return
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]
  notes.forEach((f, idx) => {
    setTimeout(() => playTone(f, 'sawtooth', 0.4, 0.14), idx * 80)
  })
}

// SFX: Kombo Pelayanan Cepat (Nada Naik Bertingkat)
export function playComboChime(count = 1) {
  if (!ctx || isMuted) return
  const baseFreq = 500 + Math.min(6, count) * 80
  playTone(baseFreq, 'triangle', 0.25, 0.15)
  setTimeout(() => playTone(baseFreq * 1.25, 'sine', 0.3, 0.12), 60)
}

// SFX: Tuang Sake Hangat (Liquid Pouring)
export function playSakePour() {
  if (!ctx || isMuted) return
  playTone(600 + Math.random() * 80, 'sine', 0.08, 0.06, -60)
}

// SFX: Tuang Sake Sempurna (Perfect Pour Sparkle)
export function playSakeSuccess() {
  if (!ctx || isMuted) return
  playTone(1046.50, 'sine', 0.3, 0.15)
  setTimeout(() => playTone(1318.51, 'sine', 0.35, 0.15), 90)
  setTimeout(() => playTone(1567.98, 'triangle', 0.5, 0.18), 180)
}

// SFX: Peringatan Bos Tamu VIP Datang (Dramatic Heavy Gong)
export function playBossAlert() {
  if (!ctx || isMuted) return
  playTone(130, 'sawtooth', 1.2, 0.25, -50)
  setTimeout(() => playTone(164.81, 'sawtooth', 1.0, 0.2), 150)
}

// SFX: Desis Panggangan Sate Arang Binchotan
export function playGrillSizzle() {
  if (!ctx || isMuted) return
  playTone(720 + Math.random() * 120, 'triangle', 0.18, 0.08, 80)
}

// SFX: Olesan Kuas Saus Tare Manis Gurih
export function playGlazeSound() {
  if (!ctx || isMuted) return
  playTone(480, 'sine', 0.2, 0.12, 140)
  setTimeout(() => playTone(680, 'triangle', 0.25, 0.1), 70)
}

// SFX: Ketokan Palu Juru Lelang Tsukiji (Auction Gavel Bang)
export function playGavelBang() {
  if (!ctx || isMuted) return
  playTone(180, 'sawtooth', 0.25, 0.28, -80)
  setTimeout(() => playTone(220, 'triangle', 0.15, 0.18), 30)
}

// SFX: Kocokan Bambu Ramalan Omikuji
export function playOmikujiShake() {
  if (!ctx || isMuted) return
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      playTone(600 + Math.random() * 200, 'square', 0.05, 0.06)
    }, i * 60)
  }
}

// SFX: Gelegar Petir Malam Topan Badai
export function playThunderClap() {
  if (!ctx || isMuted) return
  playTone(90, 'sawtooth', 1.5, 0.35, -40)
  setTimeout(() => playTone(60, 'triangle', 1.8, 0.3), 120)
}

// SFX: Desis Nyala Korek Lilin Saat Mati Lampu
export function playCandleLight() {
  if (!ctx || isMuted) return
  playTone(800, 'triangle', 0.08, 0.09, 300)
  setTimeout(() => playTone(540, 'sine', 0.4, 0.08), 50)
}

// Musik Kaset Prosedural Beragam Genre
function startCassetteMusic() {
  if (!ctx) return

  // Genre 1: Rainy Night Jazz (Piano Akord Melankolis)
  const jazzChords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ]

  // Genre 2: Showa City Pop (Synth 80s Ceria Santai)
  const cityPopChords = [
    [293.66, 369.99, 440.00, 554.37], // Dmaj7
    [246.94, 293.66, 369.99, 440.00], // Bm7
    [196.00, 246.94, 293.66, 369.99], // Gmaj7
    [220.00, 277.18, 329.63, 392.00]  // A7
  ]

  // Genre 3: Traditional Shamisen (Skala Tradisional Jepang In-sen)
  const shamisenNotes = [
    [293.66, 311.13, 392.00], // D, Eb, G
    [440.00, 466.16, 587.33], // A, Bb, D
    [392.00, 440.00, 587.33], // G, A, D
    [311.13, 392.00, 466.16]  // Eb, G, Bb
  ]

  // Genre 4: Cozy Lo-Fi Beats (Akord Hangat & Santai)
  const lofiChords = [
    [349.23, 440.00, 523.25, 659.25], // Fmaj7
    [329.63, 392.00, 493.88, 587.33], // Em7
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [261.63, 329.63, 392.00, 523.25]  // Cadd9
  ]

  let step = 0
  const intervalTime = currentCassette === 'citypop' ? 3200 : currentCassette === 'shamisen' ? 3800 : 4400

  musicInterval = setInterval(() => {
    if (!ctx || isMuted || ctx.state !== 'running') return
    let chordSet = jazzChords
    let wave = 'sine'

    if (currentCassette === 'citypop') {
      chordSet = cityPopChords
      wave = 'sawtooth'
    } else if (currentCassette === 'shamisen') {
      chordSet = shamisenNotes
      wave = 'triangle'
    } else if (currentCassette === 'lofi') {
      chordSet = lofiChords
      wave = 'sine'
    }

    const chord = chordSet[step % chordSet.length]
    chord.forEach((freq, i) => {
      setTimeout(() => {
        const gain = currentCassette === 'citypop' ? 0.018 : currentCassette === 'shamisen' ? 0.035 : 0.025
        playTone(freq * 0.5, 'sine', 1.8, gain)
        playTone(freq, wave, 1.4, gain)
      }, i * (currentCassette === 'citypop' ? 45 : 75))
    })
    step++
  }, intervalTime)
}
