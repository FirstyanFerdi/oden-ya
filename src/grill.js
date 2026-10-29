// Sub-Stasiun Panggangan Sate Yakitori & Arang Binchotan (Kushiyaki Sub-Station)
// Manajemen panggangan waktu nyata: Balik Sate, Oles Saus Tare, Asap Harum

export const GRILL_ITEMS = [
  {
    id: 'yakitori',
    name: 'Yakitori Negima',
    icon: '🍢',
    desc: 'Paha Ayam Segar + Daun Bawang Manis',
    marketPrice: 35,
    sellPrice: 120,
    color: '#e67e22',
    stickColor: '#f39c12'
  },
  {
    id: 'tsukune',
    name: 'Tsukune Tare',
    icon: '🍡',
    desc: 'Bakso Ayam Cincang Saus Manis Gurih',
    marketPrice: 45,
    sellPrice: 150,
    color: '#d35400',
    stickColor: '#e74c3c'
  },
  {
    id: 'shiitake',
    name: 'Shiitake Butter',
    icon: '🍄',
    desc: 'Jamur Payung Panggang Mentega Shoyu',
    marketPrice: 30,
    sellPrice: 110,
    color: '#795548',
    stickColor: '#8d6e63'
  }
]

export function createGrillSlots() {
  return [
    {id: null, timer: 0, flipped: false, glazed: false, state: 'empty'},
    {id: null, timer: 0, flipped: false, glazed: false, state: 'empty'},
    {id: null, timer: 0, flipped: false, glazed: false, state: 'empty'}
  ]
}

export function getGrillState(timer, flipped, glazed) {
  if (timer < 5) {
    return {state: 'raw', label: 'Mentah (Sisi 1)', color: '#bdc3c7', action: null}
  }
  if (!flipped && timer >= 5 && timer < 11) {
    return {state: 'flip_ready', label: '👉 Butuh Dibalik!', color: '#f1c40f', action: 'flip'}
  }
  if (flipped && !glazed && timer >= 11 && timer < 18) {
    return {state: 'glaze_ready', label: '🍯 Oles Saus Tare!', color: '#e67e22', action: 'glaze'}
  }
  if (flipped && glazed && timer >= 14 && timer <= 25) {
    return {state: 'perfect', label: '⭐ Karamel Emas!', color: '#ffd700', action: 'take', bonus: 100}
  }
  if (timer > 25) {
    return {state: 'burnt', label: '🔥 Gosong!', color: '#7f8c8d', action: 'discard'}
  }
  return {state: 'grilling', label: 'Sedang Memanggang...', color: '#e67e22', action: null}
}

