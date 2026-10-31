// Sistem Garis Hidup Dinamis Pelanggan & Malam Reuni (Life Scrapbook & Grand Reunion)
// Pelanggan reguler bertumbuh, menua, dan merayakan pencapaian hidup bersama koki.

export const LIFE_MILESTONES = {
  gimin: [
    { level: 1, title: 'Pegawai Lembur Lelah', icon: '💼', story: 'Setiap malam pulang dengan bahu lesu dan tas kerja kusam.' },
    { level: 2, title: 'Promosi Kepala Divisi', icon: '👔', story: 'Kerja kerasnya diakui kantor! Sekarang mengenakan setelan jas baru.' },
    { level: 3, title: 'Perayaan Makan Malam Keluarga', icon: '👨‍👩‍👧', story: 'Membawa istri dan putrinya makan malam di kedai untuk merayakan kelulusan putrinya!' }
  ],
  hana: [
    { level: 1, title: 'Siswi Desa Perantau', icon: '🎒', story: 'Gemetar menghadapi ujian masuk dan kesepian di kota metropolitan.' },
    { level: 2, title: 'Mahasiswi Kedokteran Unggulan', icon: '📚', story: 'Lolos ujian dengan beasiswa penuh! Rajin belajar ditemani sepiring oden hangat.' },
    { level: 3, title: 'Dokter Muda Penuh Syukur', icon: '🩺', story: 'Mengenakan jas putih dokter dan mentraktir koki sebagai wujud terima kasih masa sulitnya.' }
  ],
  kenzo: [
    { level: 1, title: 'Penyelidik Malam Tanpa Nama', icon: '🕵️', story: 'Menyelidiki berkas dingin di bawah cahaya temaram lampu jalanan.' },
    { level: 2, title: 'Titik Terang Kasus Kota Tua', icon: '🔍', story: 'Secangkir ocha di kedai Anda membantunya merangkai petunjuk kriminal utama.' },
    { level: 3, title: 'Piagam Bintang Emas Kepolisian', icon: '🎖️', story: 'Menerima penghargaan tertinggi kepolisian Tokyo atas integritas dan dedikasinya.' }
  ],
  sumi: [
    { level: 1, title: 'Penghuni Kenangan Kota Tua', icon: '👵', story: 'Duduk terdiam menatap rintik hujan, mengenang masa mudanya di era Showa.' },
    { level: 2, title: 'Surat Manis dari Cucu Tercinta', icon: '💌', story: 'Matanya berbinar membaca surat kabar bahagia dari cucunya di perantauan.' },
    { level: 3, title: 'Warisan Resep Dashi Leluhur', icon: '📜', story: 'Mewariskan catatan rempah turun-temurun keluarganya kepada koki kedai tercinta.' }
  ]
}

export function createInitialLifeArcState() {
  return {
    progress: {
      gimin: 1,
      hana: 1,
      kenzo: 1,
      sumi: 1
    },
    reunionHeld: false,
    reunionActive: false
  }
}

export function advanceCharacterArc(arcState, charId, g) {
  if (!arcState || !arcState.progress[charId]) return
  const currentLvl = arcState.progress[charId]
  if (currentLvl < 3) {
    arcState.progress[charId]++
    const milestone = LIFE_MILESTONES[charId][arcState.progress[charId] - 1]
    g.floats.push({
      s: `📖 JEJAK HIDUP ${charId.toUpperCase()}: ${milestone.title}!`,
      x: 160,
      y: 55,
      t: 0.01,
      c: '#ffd700'
    })
  }
}

export function canTriggerReunion(arcState) {
  if (!arcState || arcState.reunionHeld) return false
  const p = arcState.progress
  // Minimal 3 karakter mencapai level 2 atau lebih
  const matureCount = Object.values(p).filter(lvl => lvl >= 2).length
  return matureCount >= 3
}

export function triggerGrandReunion(arcState, g) {
  if (!canTriggerReunion(arcState)) return false
  arcState.reunionHeld = true
  arcState.reunionActive = true
  g.rep += 30
  g.money += 5000

  // Tambahkan foto polaroid reuni jika fungsi tersedia
  if (g.polaroids && !g.polaroids.includes('polaroid_reunion')) {
    g.polaroids.push('polaroid_reunion')
  }

  g.floats.push({
    s: '🎉 MALAM REUNI AKBAR SHOWA DIMULAI! (Semua Tamu Bersulang!)',
    x: 160,
    y: 50,
    t: 0.01,
    c: '#ff7675'
  })

  return true
}

