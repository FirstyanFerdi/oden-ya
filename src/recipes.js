// Sistem Resep Rahasia & Fusion Cooking (Recipe Dex)

export const FUSION_RECIPES = [
  {
    id: 'emperor_stew',
    name: 'Rebusan Daging Kaisar',
    subtitle: 'Kombinasi Lobak Emas + Urat Sapi',
    items: ['daikon', 'gyusuji'],
    bonusPrice: 180,
    icon: '👑',
    desc: 'Lobak empuk yang meresap kaldu gurih dari urat sapi rebusan lama. Menu para kaisar.',
    lore: 'Dimasak dengan kesabaran tinggi hingga urat sapi meleleh di lidah bersama manisnya lobak.'
  },
  {
    id: 'golden_moon',
    name: 'Mochi Bulan Purnama',
    subtitle: 'Kombinasi Telur + Mochi Kinchaku',
    items: ['egg', 'kinchaku'],
    bonusPrice: 150,
    icon: '🌕',
    desc: 'Kuning telur rebus berpadu dengan kekenyalan mochi hangat di dalam kantong tahu.',
    lore: 'Simbol kemakmuran dan reuni keluarga di malam musim gugur.'
  },
  {
    id: 'dragon_chikuwa',
    name: 'Chikuwa Api Naga Laut',
    subtitle: 'Chikuwa + Mustard Karashi + Daun Bawang',
    items: ['chikuwa'],
    condiments: ['karashi', 'scallion'],
    bonusPrice: 140,
    icon: '🐉',
    desc: 'Kue ikan kenyal yang dibalut mustard pedas menyengat dan harum daun bawang.',
    lore: 'Menu favorit buruh pelabuhan untuk mengusir hawa dingin angin laut malam hari.'
  },
  {
    id: 'tako_miso',
    name: 'Sate Gurita Miso Glasir',
    subtitle: 'Sate Gurita + Kaldu Miso',
    items: ['tako'],
    broth: 'miso',
    bonusPrice: 200,
    icon: '🐙',
    desc: 'Tentakel gurita kenyal yang terkaramelisasi lembut di dalam kuah miso manis kental.',
    lore: 'Cita rasa gurih laut yang berpadu dengan kehangatan fermentasi kedai tua.'
  },
  {
    id: 'zen_tofu',
    name: 'Tahu Sutra Samudra',
    subtitle: 'Tahu Goreng + Konnyaku',
    items: ['atsuage', 'konnyaku'],
    bonusPrice: 130,
    icon: '☯️',
    desc: 'Perpaduan tahu goreng lembut dengan tekstur kenyal konnyaku yang kaya serat.',
    lore: 'Hidangan vegetarian para biksu kuil tua yang menyehatkan tubuh dan menenangkan batin.'
  },
  {
    id: 'grand_legend',
    name: 'Piring Legendaris Oden Showa',
    subtitle: 'Set Lengkap: Lobak + Telur + Chikuwa + Urat Sapi',
    items: ['daikon', 'egg', 'chikuwa', 'gyusuji'],
    bonusPrice: 350,
    icon: '⭐',
    desc: 'Empat pilar oden klasik yang disajikan dalam satu mangkok kuah keemasan sempurna.',
    lore: 'Menu tertinggi kedai oden yang menghidupkan kembali kejayaan era Showa.'
  }
]

// Cek apakah piring saji memenuhi resep rahasia
export function checkRecipeDiscovery(plateItems, plateCondiments, activeBroth, unlockedList = []) {
  for (const recipe of FUSION_RECIPES) {
    // Cek bahan dasar
    const hasItems = recipe.items.every(id => plateItems.includes(id))
    if (!hasItems) continue

    // Cek kondimen jika disyaratkan
    if (recipe.condiments) {
      const hasConds = recipe.condiments.every(cid => plateCondiments.includes(cid))
      if (!hasConds) continue
    }

    // Cek kaldu jika disyaratkan
    if (recipe.broth && activeBroth !== recipe.broth) continue

    // Menemukan resep!
    const isNew = !unlockedList.includes(recipe.id)
    return {recipe, isNew}
  }
  return null
}
