// Sistem Racik Biang Kaldu Induk & Tong Fermentasi (Master Dashi Vat & Aging)
// Kuali besar di dapur Showa yang bisa diracik dengan rasio bahan, diendapkan bertahun, dan disaring.

export const DASHI_INGREDIENTS = [
  {
    id: 'katsuobushi',
    name: 'Katsuobushi Grade A',
    icon: '🐟',
    desc: 'Serpihan Cakalang Asap Premium: Mempercepat kedatangan tamu langka (+30% spawn)',
    cost: 80,
    aromaBonus: 25,
    patienceBonus: 5,
    goldBonus: 10
  },
  {
    id: 'niboshi',
    name: 'Niboshi Teri Bakar',
    icon: '🎣',
    desc: 'Ikan Teri Kering Panggang: Rasa gurih dalam (+25% batas kesabaran antrean tamu)',
    cost: 65,
    aromaBonus: 10,
    patienceBonus: 25,
    goldBonus: 5
  },
  {
    id: 'mirin_sake',
    name: 'Mirin & Gula Tebu',
    icon: '🍶',
    desc: 'Sake Manis & Gula Tebu Okinawa: Kilau kuah emas (+20% durasi & multiplier Fever Mode)',
    cost: 95,
    aromaBonus: 15,
    patienceBonus: 10,
    goldBonus: 30
  },
  {
    id: 'shoyu_vintage',
    name: 'Kecap Shoyu Vintage 10th',
    icon: '🏺',
    desc: 'Kecap Fermentasi Guci Kayu: Melipatgandakan nilai jual kaldu (+25% harga kuah)',
    cost: 110,
    aromaBonus: 20,
    patienceBonus: 15,
    goldBonus: 20
  }
]

export function createMasterVat() {
  return {
    ageDays: 1,
    clarity: 100, // 0 - 100%
    scumLevel: 0, // Kotoran kaldu (0 - 100)
    ingredients: {
      katsuobushi: 1,
      niboshi: 1,
      mirin_sake: 1,
      shoyu_vintage: 1
    },
    totalBatchesBrewed: 1,
    status: 'fresh' // 'fresh' | 'matured' | 'legendary' | 'spoiled'
  }
}

export function getVatTier(ageDays, scumLevel) {
  if (scumLevel >= 80) {
    return {
      tier: 'spoiled',
      name: '⚠️ Kaldu Keruh & Berbusa',
      color: '#7f8c8d',
      desc: 'Kotoran arang terlalu banyak! Segera saring busa sebelum merusak rasa!',
      priceMult: 0.6,
      satBonus: -0.2
    }
  }
  if (ageDays >= 7) {
    return {
      tier: 'legendary',
      name: '👑 Biang Kaldu Pusaka 7 Hari',
      color: '#ffd700',
      desc: 'Rasa kaldu legendaris yang menggetarkan lidah! Harga sajian oden x2.2 lipat!',
      priceMult: 2.2,
      satBonus: 0.35
    }
  }
  if (ageDays >= 3) {
    return {
      tier: 'matured',
      name: '⭐ Biang Kaldu Emas 3 Hari',
      color: '#f39c12',
      desc: 'Umami terfermentasi sempurna! Harga sajian x1.45 lipat dan kepuasan +20%.',
      priceMult: 1.45,
      satBonus: 0.2
    }
  }
  return {
    tier: 'fresh',
    name: '🌱 Kaldu Segar Hari Ini',
    color: '#2ecc71',
    desc: 'Kaldu segar bersih gurih dengan cita rasa Showa otentik.',
    priceMult: 1.0,
    satBonus: 0.05
  }
}

export function skimVat(vat) {
  if (!vat) return
  vat.scumLevel = Math.max(0, vat.scumLevel - 45)
  vat.clarity = Math.min(100, vat.clarity + 30)
  if (vat.scumLevel < 80 && vat.status === 'spoiled') {
    vat.status = vat.ageDays >= 7 ? 'legendary' : vat.ageDays >= 3 ? 'matured' : 'fresh'
  }
}

export function addIngredientToVat(vat, ingredientId) {
  if (!vat) return false
  vat.ingredients = vat.ingredients || {}
  vat.ingredients[ingredientId] = (vat.ingredients[ingredientId] || 0) + 1
  vat.clarity = Math.min(100, vat.clarity + 10)
  return true
}

export function advanceVatDay(vat) {
  if (!vat) return
  vat.ageDays++
  vat.scumLevel = Math.min(100, vat.scumLevel + 25)
  const tier = getVatTier(vat.ageDays, vat.scumLevel)
  vat.status = tier.tier
}

