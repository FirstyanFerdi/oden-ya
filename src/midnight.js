// Modus Rahasia Tengah Malam: Shinya Shokudo (Midnight Diner 02:00 - 05:00)
// Tamu nokturnal misterius memesan menggunakan teka-teki puitis (*Poetic Riddles*).

export const MIDNIGHT_GUESTS = [
  {
    id: 'kenzo',
    name: 'Detektif Kenzo',
    title: 'Penyelidik Swasta Kota Bawah',
    icon: '🕵️‍♂️',
    avatar: '🕵️‍♂️',
    hair: '#2c3e50',
    shirt: '#34495e',
    riddle: '"Beri aku kepedihan samudra dalam yang diselimuti kabut ladang musim semi dengan sengatan panas penyadar pikiran."',
    hint: 'Sate Gurita (Tako) + Lobak (Daikon) + Mustard Karashi',
    requiredItems: ['tako', 'daikon'],
    requiredCondiment: 'karashi',
    rewardMoney: 3800,
    rewardRep: 15,
    storyReveal: 'Dokumen rahasia sindikat pelabuhan berhasil terungkap berkat kehangatan semangkuk odenmu.',
    polaroidId: 'polaroid_detective'
  },
  {
    id: 'eiji',
    name: 'Mangaka Eiji',
    title: 'Penulis Komik Kejar Tenggat Subuh',
    icon: '🖋️',
    avatar: '🖋️',
    hair: '#1e272c',
    shirt: '#e67e22',
    riddle: '"Bakar semangat begadangku dengan urat baja pantang menyerah dan olahan laut gurih berongga."',
    hint: 'Urat Sapi (Gyusuji) + Chikuwa + Kaldu Spicy/Karashi',
    requiredItems: ['gyusuji', 'chikuwa'],
    requiredCondiment: 'karashi',
    rewardMoney: 3200,
    rewardRep: 12,
    storyReveal: 'Goresan bab terakhir komiknya terpilih menjadi serial utama majalah mingguan Showa!',
    polaroidId: 'polaroid_mangaka'
  },
  {
    id: 'sayuri',
    name: 'Nona Sayuri',
    title: 'Aktris Film Noir Menyamar',
    icon: '🎬',
    avatar: '🎬',
    hair: '#8e44ad',
    shirt: '#2c3e50',
    riddle: '"Aku merindukan kehangatan pelukan rumah yang lembut bersahaja ditemani secangkir ketenangan jiwa."',
    hint: 'Telur Rebus (Egg) + Mochi Kinchaku + Teh Ocha Hangat',
    requiredItems: ['egg', 'kinchaku'],
    requiredCondiment: 'ocha',
    rewardMoney: 4500,
    rewardRep: 20,
    storyReveal: 'Ia melepas kacamata hitamnya dan tersenyum tulus tanpa beban ketenaran semu panggung bioskop.',
    polaroidId: 'polaroid_actress'
  },
  {
    id: 'goro',
    name: 'Pak Goro',
    title: 'Pengembara Berhati Hangat',
    icon: '🌧️',
    avatar: '🌧️',
    hair: '#7f8c8d',
    shirt: '#95a5a6',
    riddle: '"Hanya semangkuk kesederhanaan tanah yang meresap kaldu murni dengan taburan kesegaran hijau."',
    hint: 'Lobak (Daikon) + Tahu Goreng (Atsuage) + Daun Bawang (Scallion)',
    requiredItems: ['daikon', 'atsuage'],
    requiredCondiment: 'scallion',
    rewardMoney: 2600,
    rewardRep: 18,
    storyReveal: 'Ia menitikkan air mata dan memutuskan pulang ke kampung halaman menemui putrinya.',
    polaroidId: 'polaroid_wanderer'
  }
]

export function getMidnightGuest(day) {
  const guest = MIDNIGHT_GUESTS[day % MIDNIGHT_GUESTS.length]
  return guest
}

export function evaluateMidnightRiddle(guest, plate, plateCondiments) {
  if (!guest) return {success: false, message: 'Tidak ada pesanan misterius.'}
  
  // Periksa apakah semua bahan yang dibutuhkan ada di piring
  const itemsMatch = guest.requiredItems.every(reqId => plate.includes(reqId))
  const condimentMatch = guest.requiredCondiment ? plateCondiments.includes(guest.requiredCondiment) : true

  if (itemsMatch && condimentMatch) {
    return {
      success: true,
      message: `✨ TEBAKAN TEKA-TEKI SEMPURNA! ${guest.storyReveal}`,
      rewardMoney: guest.rewardMoney,
      rewardRep: guest.rewardRep,
      polaroidId: guest.polaroidId
    }
  }

  return {
    success: false,
    message: '"Bukan rasa ini yang batin saya cari di malam yang sunyi ini..."'
  }
}

