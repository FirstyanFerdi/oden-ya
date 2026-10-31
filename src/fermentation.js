// Sistem Gudang Fermentasi Bawah Tanah & Sommelier Sake Pairing
// Mematangkan bahan berharga tinggi melalui proses fermentasi hari ke hari dan memadukan sake yang harmonis.

export const FERMENTATION_RECIPES = {
  shoyu_egg: {
    id: 'shoyu_egg',
    name: 'Telur Marinasi Shoyu 3 Hari',
    desc: 'Kuning telur kental bagai selai emas dengan rempah mirin & shoyu Showa.',
    daysRequired: 3,
    cost: 300,
    yieldItem: 'tamago_selai',
    yieldName: 'Telur Selai Emas',
    yieldIcon: '🥚✨',
    sellValue: 450
  },
  aged_karashi: {
    id: 'aged_karashi',
    name: 'Aged Karashi Miso 2 Hari',
    desc: 'Mustard pedas fermentasi daun perilla & pasta kedelai antik.',
    daysRequired: 2,
    cost: 200,
    yieldItem: 'aged_karashi_cond',
    yieldName: 'Karashi Miso Antik',
    yieldIcon: '🌶️🏺',
    sellValue: 320
  },
  koshu_cask: {
    id: 'koshu_cask',
    name: 'Sake Tua Vintage Koshu 1975',
    desc: 'Fermentasi sake dalam gentong kayu cedar selama 4 hari penuh.',
    daysRequired: 4,
    cost: 600,
    yieldItem: 'vintage_koshu',
    yieldName: 'Botol Koshu Vintage 1975',
    yieldIcon: '🍶🏆',
    sellValue: 900
  }
}

export function createInitialFermentationCellar() {
  return {
    vats: [
      { id: 'vat_1', recipeId: 'shoyu_egg', currentDays: 0, status: 'empty' }, // 'empty', 'fermenting', 'ready'
      { id: 'vat_2', recipeId: 'aged_karashi', currentDays: 0, status: 'empty' },
      { id: 'vat_3', recipeId: 'koshu_cask', currentDays: 0, status: 'empty' }
    ],
    inventory: {
      tamago_selai: 1,
      aged_karashi_cond: 2,
      vintage_koshu: 1
    }
  }
}

export function advanceCellarDays(cellar) {
  if (!cellar || !cellar.vats) return
  cellar.vats.forEach(vat => {
    if (vat.status === 'fermenting') {
      vat.currentDays++
      const recipe = FERMENTATION_RECIPES[vat.recipeId]
      if (recipe && vat.currentDays >= recipe.daysRequired) {
        vat.status = 'ready'
      }
    }
  })
}

export function startFermenting(cellar, vatIndex, g) {
  if (!cellar || !cellar.vats[vatIndex]) return false
  const vat = cellar.vats[vatIndex]
  if (vat.status !== 'empty') return false

  const recipe = FERMENTATION_RECIPES[vat.recipeId]
  if (!recipe || g.money < recipe.cost) return false

  g.money -= recipe.cost
  vat.currentDays = 0
  vat.status = 'fermenting'
  return true
}

export function harvestVat(cellar, vatIndex) {
  if (!cellar || !cellar.vats[vatIndex]) return null
  const vat = cellar.vats[vatIndex]
  if (vat.status !== 'ready') return null

  const recipe = FERMENTATION_RECIPES[vat.recipeId]
  if (!recipe) return null

  if (!cellar.inventory[recipe.yieldItem]) {
    cellar.inventory[recipe.yieldItem] = 0
  }
  cellar.inventory[recipe.yieldItem] += 2 // Panen 2 porsi

  vat.status = 'empty'
  vat.currentDays = 0
  return recipe
}

// Matriks Harmoni Pasangan Makanan & Sake (Food-Sake Pairing Matrix)
export function evaluateSakePairing(plateItems, sakeType) {
  // Profil rasa bahan
  const richItems = ['gyusuji', 'tako', 'matsuba_crab']
  const lightItems = ['daikon', 'imperial_daikon', 'konnyaku']
  const savoryItems = ['egg', 'chikuwa', 'atsuage', 'kinchaku']

  const hasRich = plateItems.some(id => richItems.includes(id))
  const hasLight = plateItems.some(id => lightItems.includes(id))
  const hasSavory = plateItems.some(id => savoryItems.includes(id))

  let isMatch = false
  let note = ''

  if (sakeType === 'koshu' && hasRich) {
    isMatch = true
    note = 'Harmoni Mewah! Gurihnya daging lumer menyatu dengan kedalaman Koshu Vintage!'
  } else if (sakeType === 'ginjo' && hasLight) {
    isMatch = true
    note = 'Kesegaran Alami! Kuah bening lobak berpadu sempurna dengan aroma bunga Junmai Ginjo!'
  } else if (sakeType === 'atsukan' && hasSavory) {
    isMatch = true
    note = 'Kenyamanan Nostalgia! Kehangatan Atsukan melengkapi kelembutan kue tahu & telur!'
  }

  return {
    match: isMatch,
    tipMultiplier: isMatch ? 2.5 : 1.0,
    note
  }
}

