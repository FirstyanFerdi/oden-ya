// Arena Perjudian Gelap: "Chou-Han Lorong Belakang" (The Midnight Speakeasy & Bakuto Dice Den)
// Minigame judi dadu tradisional Showa di balik pintu geser lorong belakang kedai.

import * as Audio from './audio.js'

export const DICE_BET_LEVELS = [500, 1000, 2500, 5000, 10000]

export function createInitialSpeakeasyState() {
  return {
    unlocked: true,
    lastDice: [3, 4],
    lastSum: 7,
    lastResult: 'han',           // 'chou' (genap) | 'han' (ganjil)
    rolling: false,
    currentBet: 1000,
    currentChoice: null,         // 'chou' | 'han'
    lastWinAmount: 0,
    lastOutcome: null,           // 'win' | 'lose' | 'jackpot' | null
    winStreak: 0,
    bestStreak: 0,
    totalWon: 0,
    totalLost: 0,
    jackpotPool: 25000,
    unlockedImperialScroll: false, // Relik resep dashi kaisar hilang (+20% harga kaldu permanen)
    history: []
  }
}

export function playChouHan(speakeasyState, g, choice, betAmount) {
  if (!speakeasyState) return { success: false, msg: 'State Speakeasy tidak valid.' }
  if (choice !== 'chou' && choice !== 'han') {
    return { success: false, msg: 'Pilihlah Chou (Genap) atau Han (Ganjil)!' }
  }

  const bet = Math.max(500, betAmount || speakeasyState.currentBet || 1000)
  if (g.money < bet) {
    return { success: false, msg: `Uang kas Anda tidak cukup untuk taruhan ¥${bet.toLocaleString()}!` }
  }

  // Potong uang taruhan
  g.money -= bet
  speakeasyState.currentBet = bet
  speakeasyState.currentChoice = choice
  speakeasyState.rolling = true

  // Kocok 2 Dadu Arang Bambu
  const d1 = Math.floor(Math.random() * 6) + 1
  const d2 = Math.floor(Math.random() * 6) + 1
  const sum = d1 + d2
  const outcomeType = sum % 2 === 0 ? 'chou' : 'han'
  const isDoubleDragon = (d1 === d2) && (d1 === 1 || d1 === 6)

  speakeasyState.lastDice = [d1, d2]
  speakeasyState.lastSum = sum
  speakeasyState.lastResult = outcomeType

  // Efek Audio Guncangan & Hantaman Mangkuk
  Audio.playDiceShake()
  setTimeout(() => Audio.playCupSlam(), 300)

  let winAmount = 0
  let outcome = 'lose'
  let msg = ''

  if (isDoubleDragon) {
    // JACKPOT NAGA KEMBAR!
    outcome = 'jackpot'
    winAmount = bet * 2 + speakeasyState.jackpotPool
    g.money += winAmount
    speakeasyState.totalWon += winAmount
    speakeasyState.winStreak++
    speakeasyState.unlockedImperialScroll = true
    speakeasyState.jackpotPool = 25000 // Reset jackpot pool

    setTimeout(() => {
      Audio.playDiceWin()
      Audio.playFeverSound()
    }, 400)

    msg = `🐉 JACKPOT NAGA KEMBAR (${d1}-${d2})! Menang ¥${winAmount.toLocaleString()} & Buka Gulungan Dashi Kaisar!`
    g.floats.push({
      s: msg,
      x: 160,
      y: 60,
      t: 0.01,
      c: '#ffd700'
    })
  } else if (choice === outcomeType) {
    // MENANG BIASA
    outcome = 'win'
    winAmount = bet * 2
    g.money += winAmount
    speakeasyState.totalWon += winAmount
    speakeasyState.winStreak++
    if (speakeasyState.winStreak > speakeasyState.bestStreak) {
      speakeasyState.bestStreak = speakeasyState.winStreak
    }

    setTimeout(() => Audio.playDiceWin(), 400)

    const streakBonusText = speakeasyState.winStreak >= 3 ? ` (Streak x${speakeasyState.winStreak}!)` : ''
    msg = `🎉 TEBAKAN TEPAT! Dadu ${d1}+${d2}=${sum} (${outcomeType.toUpperCase()})! Menang ¥${winAmount.toLocaleString()}${streakBonusText}!`
    g.floats.push({
      s: msg,
      x: 160,
      y: 65,
      t: 0.01,
      c: '#2ecc71'
    })
  } else {
    // KALAH
    outcome = 'lose'
    winAmount = 0
    speakeasyState.totalLost += bet
    speakeasyState.winStreak = 0
    speakeasyState.jackpotPool += Math.floor(bet * 0.25) // Tambah ke brankas jackpot

    setTimeout(() => Audio.playDiceLose(), 400)

    msg = `💀 BANDAR MENYAPU MEJA! Dadu ${d1}+${d2}=${sum} (${outcomeType.toUpperCase()}). Taruhan ¥${bet.toLocaleString()} melayang!`
    g.floats.push({
      s: msg,
      x: 160,
      y: 65,
      t: 0.01,
      c: '#e74c3c'
    })
  }

  speakeasyState.rolling = false
  speakeasyState.lastWinAmount = winAmount
  speakeasyState.lastOutcome = outcome
  speakeasyState.history.unshift({
    day: g.day,
    choice,
    dice: [d1, d2],
    sum,
    outcomeType,
    outcome,
    bet,
    winAmount
  })

  if (speakeasyState.history.length > 20) {
    speakeasyState.history.pop()
  }

  return {
    success: true,
    outcome,
    dice: [d1, d2],
    sum,
    outcomeType,
    winAmount,
    msg
  }
}

