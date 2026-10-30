// Pesanan Telepon Putar & Kotak Bento Antar Sepeda (Rotary Phone & Bicycle Delivery)
// Telepon vintage di meja kedai berdering, pemain mengemas bento bertermometer dan mengirim staf bersepeda.

export const DELIVERY_CLIENTS = [
  {
    id: 'police_box',
    name: 'Pos Polisi Koban Stasiun',
    icon: '👮‍♂️',
    desc: 'Opsir patroli malam yang kedinginan butuh penghangat perut',
    district: 'stasiun',
    rewardRep: 6,
    basePay: 280,
    requiredItems: ['daikon', 'egg', 'chikuwa']
  },
  {
    id: 'hospital',
    name: 'Rumah Sakit Showa Pusat',
    icon: '🏥',
    desc: 'Perawat jaga malam shift subuh',
    district: 'kuil',
    rewardRep: 8,
    basePay: 340,
    requiredItems: ['gyusuji', 'kinchaku', 'konnyaku']
  },
  {
    id: 'radio_station',
    name: 'Studio Siaran Radio Malam',
    icon: '📻',
    desc: 'Penyiar radio dan kru rekaman musik',
    district: 'pertokoan',
    rewardRep: 10,
    basePay: 420,
    requiredItems: ['tako', 'atsuage', 'daikon']
  }
]

export function generatePhoneOrder(day) {
  const client = DELIVERY_CLIENTS[Math.random() * DELIVERY_CLIENTS.length | 0]
  return {
    id: 'order_' + Date.now(),
    client,
    packedItems: [],
    packedSate: null,
    temperature: 100, // Derajat Celsius (100 -> 0)
    status: 'pending', // 'pending' | 'packed' | 'delivering' | 'delivered' | 'expired'
    deliveryTimer: 0,
    targetDeliveryTime: 20 // detik perjalanan sepeda
  }
}

export function packItemToBento(order, itemId, stock) {
  if (!order || order.status !== 'pending') return false
  if (order.packedItems.length >= 3) return false
  if ((stock[itemId] || 0) <= 0) return false

  stock[itemId]--
  order.packedItems.push(itemId)
  if (order.packedItems.length === 3) {
    order.status = 'packed'
  }
  return true
}

export function updateDelivery(order, dt, staff) {
  if (!order) return
  // Suhu bento turun perlahan
  if (order.status === 'packed' || order.status === 'delivering') {
    const coolSpeed = staff?.kenji ? 2.2 : 3.5
    order.temperature = Math.max(20, order.temperature - dt * coolSpeed)
  }

  // Perjalanan sepeda
  if (order.status === 'delivering') {
    order.deliveryTimer += dt
    if (order.deliveryTimer >= order.targetDeliveryTime) {
      order.status = 'delivered'
    }
  }
}

export function calculateDeliveryPayout(order) {
  if (!order || order.status !== 'delivered') return {pay: 0, tip: 0, rep: 0}
  const base = order.client.basePay
  const warmthRatio = Math.max(0, (order.temperature - 30) / 70) // 0 to 1
  const tip = Math.round(base * 0.5 * warmthRatio)
  const rep = order.client.rewardRep + (warmthRatio > 0.7 ? 3 : 0)
  return {
    total: base + tip,
    tip,
    rep,
    isHot: order.temperature >= 65
  }
}

