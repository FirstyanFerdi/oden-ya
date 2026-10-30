// Intrik Jalanan: Klan Yakuza, Inspektur Sanitasi, & Gerobak Saingan Yamada-ya
// Menghadirkan dinamika persaingan jalanan malam dan peristiwa sosial era Showa.

export const STREET_FACTIONS = {
  yakuza: {
    name: 'Klan Yakuza Kurogane',
    leader: 'Oyabun Ryuzo',
    icon: '🐉',
    desc: 'Penguasa malam jalanan stasiun. Dilayani dengan hormat memberi perlindungan preman.',
    status: 'neutral' // 'neutral' | 'allied' | 'displeased'
  },
  sanitation: {
    name: 'Badan Sanitasi Hokenjo Tokyo',
    inspector: 'Inspektur Kato',
    icon: '📋',
    desc: 'Pengawas kebersihan kuali dan kompor. Sertifikat bintang 5 membebaskan pajak kedai!',
    certified: false
  },
  rival: {
    name: 'Gerobak Oden Yamada-ya',
    icon: '🏮',
    desc: 'Gerobak saingan di seberang jalan yang memotong harga untuk merebut tamu Anda.',
    active: false,
    crowdPull: 0.5 // 0.0 - 1.0
  }
}

export function evaluateSanitationScore(potSlots, stoveHeat, grillSlots) {
  let score = 70
  // Cek kuali tidak kosong melompong
  const totalItems = potSlots.reduce((acc, comp) => acc + comp.length, 0)
  if (totalItems >= 6) score += 15
  // Cek suhu kompor stabil
  if (stoveHeat >= 0.6 && stoveHeat <= 0.9) score += 15
  // Cek tidak ada sate gosong
  const hasBurntSate = grillSlots.some(s => s.state === 'burnt')
  if (hasBurntSate) score -= 30

  return {
    score: Math.max(0, Math.min(100, score)),
    passed: score >= 85
  }
}

export function updateRivalStall(dt, G) {
  if (!G.rivalStall || !G.rivalStall.active) return
  // Gerobak saingan mencoba menarik perhatian tamu
  const r = G.rivalStall
  // Daya tarik pemain: asap sate + lampion level + musik radio
  const playerAroma = G.grillSlots.filter(s => s.id !== null).length * 0.25
  const playerLanterns = (G.lanternLevel || 0) * 0.15
  const playerPower = 0.4 + playerAroma + playerLanterns

  r.crowdPull = Math.max(0.1, Math.min(0.9, 0.7 - playerPower * 0.35))
}

