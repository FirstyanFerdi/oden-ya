// Sistem Segitiga Pengaruh Faksi Distrik (District Triad Politics)
// Mengelola relasi dinamis antara Polisi Koban, Mafia Yakuza, dan Asosiasi Pedagang Shoutengai.

export const FACTION_INFO = {
  police: {
    id: 'police',
    name: 'Koban (Inspektur Kenzo)',
    title: 'Penjaga Ketertiban Distrik',
    icon: '👮‍♂️',
    desc: 'Menuntut kepatuhan sanitasi dan jam malam yang tertib.',
    perk: 'Patroli Koban: Bebas razia sanitasi & kedai 100% aman dari pencurian.'
  },
  yakuza: {
    id: 'yakuza',
    name: 'Klan Gumi (Oyabun Ryuzo)',
    title: 'Penguasa Malam Kurogane',
    icon: '🐉',
    desc: 'Menghargai penghormatan, hidangan daging terbaik, dan sake vintage langka.',
    perk: 'Jalur Gelap Tsukiji: Diskon 40% bahan lelang & rival Yamada-ya takut mengganggu.'
  },
  shoutengai: {
    id: 'shoutengai',
    name: 'Shoutengai (Madam Yoshiko)',
    title: 'Ketua Asosiasi Pedagang Pasar',
    icon: '🏮',
    desc: 'Menjaga solidaritas para pedagang kaki lima dan festival musim panas.',
    perk: 'Festival Matsuri Rakyat: Pengunjung harian melonjak 250% di akhir pekan.'
  }
}

export const FACTION_DILEMMAS = [
  {
    id: 'dilemma_night_curfew',
    title: 'Jam Malam & Tamu Bertato',
    desc: 'Inspektur Kenzo sedang berpatroli, sementara anak buah Ryuzo memesan sake di sudut meja.',
    choices: [
      {
        text: 'Minta anak buah Ryuzo segera pulang demi aturan polisi.',
        effects: { police: 15, yakuza: -15, shoutengai: 5 },
        log: 'Polisi mengapresiasi ketaatan Anda, namun Klan Gumi memandang dingin.'
      },
      {
        text: 'Sajikan sake vintage terbaik secara diam-diam untuk Ryuzo.',
        effects: { yakuza: 18, police: -12, shoutengai: 0 },
        log: 'Oyabun Ryuzo terkesan dengan kesetiaan Anda; mereka meninggalkan tip tebal.'
      }
    ]
  },
  {
    id: 'dilemma_matsuri_fund',
    title: 'Sumbangan Lampion Festival Pasar',
    desc: 'Madam Yoshiko datang membawa kotak amal untuk memasang lampion festival pasar.',
    choices: [
      {
        text: 'Donasikan 1.000 Yen untuk kas festival pasar.',
        cost: 1000,
        effects: { shoutengai: 25, police: 5, yakuza: 0 },
        log: 'Warga pasar bersorak! Nama kedai Anda terpampang di lampion utama gerbang pasar.'
      },
      {
        text: 'Tolak dengan halus karena kas sedang diprioritaskan untuk belanja bahan.',
        cost: 0,
        effects: { shoutengai: -15, police: 0, yakuza: 0 },
        log: 'Madam Yoshiko menghela napas maklum, namun warga pasar sedikit kecewa.'
      }
    ]
  },
  {
    id: 'dilemma_black_market_kombu',
    title: 'Tawaran Kombu Kuno Selundupan',
    desc: 'Seorang pedagang gelap kiriman Ryuzo menawarkan kombu Hokkaido kualitas tertinggi dengan harga miring.',
    choices: [
      {
        text: 'Beli kombu selundupan seharga 500 Yen.',
        cost: 500,
        effects: { yakuza: 15, police: -15, shoutengai: -5 },
        log: 'Kaldu Anda semakin kaya dengan kombu langka, namun Koban mulai mencurigai pasokan Anda.'
      },
      {
        text: 'Tolak tawaran dan laporkan jalur aman ke Inspektur Kenzo.',
        cost: 0,
        effects: { police: 20, yakuza: -20, shoutengai: 10 },
        log: 'Inspektur Kenzo memberi Anda piagam kehormatan pedagang teladan!'
      }
    ]
  }
]

export function createInitialFactionState() {
  return {
    rep: {
      police: 50,
      yakuza: 50,
      shoutengai: 50
    },
    activeDilemma: null
  }
}

export function adjustFactionRep(factionState, factionId, delta) {
  if (!factionState || !factionState.rep) return
  factionState.rep[factionId] = Math.max(0, Math.min(100, (factionState.rep[factionId] || 50) + delta))
}

export function triggerRandomDilemma(factionState) {
  if (!factionState || factionState.activeDilemma) return null
  const dilemma = FACTION_DILEMMAS[Math.floor(Math.random() * FACTION_DILEMMAS.length)]
  factionState.activeDilemma = dilemma
  return dilemma
}

export function resolveDilemma(factionState, choiceIndex, g) {
  if (!factionState || !factionState.activeDilemma) return null
  const dilemma = factionState.activeDilemma
  const choice = dilemma.choices[choiceIndex]
  if (!choice) return null

  if (choice.cost && g.money < choice.cost) {
    return { success: false, msg: 'Uang Anda tidak mencukupi untuk pilihan ini!' }
  }

  if (choice.cost) {
    g.money -= choice.cost
  }

  for (const fId in choice.effects) {
    adjustFactionRep(factionState, fId, choice.effects[fId])
  }

  factionState.activeDilemma = null
  return { success: true, log: choice.log }
}

