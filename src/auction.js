// Minigame Lelang Subuh Pasar Ikan Tsukiji (Tsukiji Morning Fish Auction)
// Bidding war melawan Chef Kuroda & Tuan Tanaka untuk bahan langka S-Tier

export const AUCTION_ITEMS = [
  {
    id: 'hokkaido_tako',
    name: 'Gurita Raksasa Hokkaido Grade A',
    icon: '🐙',
    desc: 'Daging gurita tebal kenyal beraroma laut utara. Meningkatkan harga pesanan gurita 2.5x lipat!',
    basePrice: 380,
    targetItem: 'tako',
    boostDesc: 'Pengali Harga Gurita x2.5',
    servings: 10
  },
  {
    id: 'wagyu_tendon',
    name: 'Urat Sapi Wagyu A5 Matsusaka',
    icon: '🥩',
    desc: 'Marbling lemak daging sapi terlezat di Jepang. Pengali harga pesanan urat sapi melonjak 3.0x lipat!',
    basePrice: 550,
    targetItem: 'gyusuji',
    boostDesc: 'Pengali Harga Daging Sapi x3.0',
    servings: 10
  },
  {
    id: 'ancient_kombu',
    name: 'Kombu Liar Pulau Rishiri 10 Tahun',
    icon: '🌿',
    desc: 'Rumput laut fermentasi dekade langka. Menjadikan aroma kaldu dashi sangat harum, kepuasan tamu +30%!',
    basePrice: 420,
    targetItem: 'kombu',
    boostDesc: 'Kepuasan Kaldu Dashi +30%',
    servings: 10
  }
]

export const BOT_BIDDERS = [
  {name: 'Chef Kuroda (Resto Ginza)', avatar: '👨‍🍳', aggression: 0.85, maxMult: 2.2},
  {name: 'Tuan Tanaka (Pedagang Pasar)', avatar: '💼', aggression: 0.55, maxMult: 1.6}
]

export function createAuctionSession(day) {
  const item = AUCTION_ITEMS[(day - 1) % AUCTION_ITEMS.length]
  return {
    item,
    currentBid: item.basePrice,
    highestBidder: 'Tuan Tanaka (Pedagang Pasar)',
    countdown: 4.5,
    hammerCount: 0,
    finished: false,
    winner: null,
    log: [`Juru lelang membuka tawaran untuk ${item.name} seharga ¥${item.basePrice}!`]
  }
}

