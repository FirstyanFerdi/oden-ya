import {P} from './palette.js'
import {G, W, H, PX, PY, ITEMS, CONDIMENTS, seats, level} from './game.js'
import {NORENS, BROTHS} from './decorations.js'
import {LOCATIONS} from './locations.js'

const SX = [100, 135, 170, 205, 240, 275]

export function draw(ctx) {
  const R = (x, y, w, h, c) => {
    ctx.fillStyle = c
    ctx.fillRect(x | 0, y | 0, w | 0, h | 0)
  }

  const T = (s, x, y, c, z = 10) => {
    ctx.font = z + 'px "DotGothic16","MS Gothic",monospace'
    ctx.textBaseline = 'top'
    ctx.fillStyle = c
    ctx.fillText(s, x | 0, y | 0)
  }

  // Pendaran Cahaya Aman (Robust Glow)
  const glow = (x, y, r, a) => {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(r) || r <= 0) return
    const safeA = Math.max(0, Math.min(1, Number.isFinite(a) ? a : 0))
    if (safeA <= 0) return
    try {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${P.glow},${safeA})`)
      g.addColorStop(1, `rgba(${P.glow},0)`)
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    } catch (e) {}
  }

  const fl = (i) => {
    const time = Number.isFinite(G.t) ? G.t : 0
    const val = 0.85 + 0.15 * Math.sin(time * 7 + i * 2.1) + (Math.sin(time * 23 + i) > 0.9 ? -0.1 : 0)
    return Number.isFinite(val) && val > 0 ? val : 0.85
  }

  const lantern = (x, y, i, big) => {
    const h = big ? 18 : 14, w = big ? 12 : 10
    glow(x + w / 2, y + h / 2, 34 * fl(i), 0.5 * fl(i))
    R(x + w / 2 - 1, y - 4, 2, 4, '#000')
    R(x, y, w, h, P.lantern)
    R(x + 1, y + 1, w - 2, h - 2, P.lanternL)
    for (let k = 3; k < h; k += 4) R(x, y + k, w, 1, P.lantern)
    R(x + 2, y - 1, w - 4, 2, '#111')
    R(x + 2, y + h - 1, w - 4, 2, '#111')
    T('OD', x + 2, y + 3, '#6b1010', 5)
  }

  // Gambar Kucing Hitam (Kuro)
  function drawCat(x, y, inside = false) {
    const tailWag = Math.sin(G.t * 5) * 2 | 0
    const blink = Math.sin(G.t * 2) > 0.92
    if (!inside) {
      R(x - 8, y + 2, 20, 6, '#b5835a')
      R(x - 7, y + 3, 18, 5, '#8c5d3b')
    }
    R(x, y - 3, 7, 6, '#18151e')
    R(x - 2, y - 8, 7, 5, '#18151e')
    R(x - 3, y - 10, 2, 2, '#18151e')
    R(x + 3, y - 10, 2, 2, '#18151e')
    if (!blink) {
      R(x - 1, y - 7, 1, 1, '#ffeaa7')
      R(x + 2, y - 7, 1, 1, '#ffeaa7')
    }
    R(x + 7, y - 2 + tailWag, 2, 3, '#18151e')
  }

  const z = G.zoom
  ctx.save()
  ctx.clearRect(0, 0, W, H)

  if (G.scene === 'in') {
    const s = 1 + 1.7 * z
    ctx.translate(W / 2, H / 2)
    ctx.scale(s, s)
    ctx.translate(-(W / 2 + (PX - W / 2) * z), -(H / 2 + (PY + 8 - H / 2) * z))
    room(R, T, glow, fl, drawCat)
  } else {
    outside(R, T, glow, fl, lantern, drawCat)
  }

  ctx.restore()

  // Hujan & Partikel Lingkungan (Sesuai Lokasi Peta)
  const rainAlpha = G.weather === 'hujan_deras' ? 0.8 : G.weather === 'angin_malam' ? 0.35 : 0.55
  ctx.fillStyle = P.rain
  ctx.globalAlpha = rainAlpha
  G.rain.forEach(r => ctx.fillRect(r.x | 0, r.y | 0, 1, G.weather === 'hujan_deras' ? 6 : 4))
  ctx.globalAlpha = 1

  // Partikel Kelopak Sakura di Lokasi Sakura
  if (G.currentLocation === 'sakura') {
    ctx.fillStyle = '#ffb8d2'
    for (let k = 0; k < 15; k++) {
      const sx = ((G.t * 30 + k * 28) % (W + 20)) - 10
      const sy = ((G.t * 18 + k * 22) % (H + 20)) - 10
      R(sx, sy, 2, 2, '#ffb8d2')
    }
  }

  // Efek Petir saat Hujan Deras atau Topan Badai
  if ((G.weather === 'hujan_deras' || G.weather === 'topan') && Math.sin(G.t * 0.4) > 0.985) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.fillRect(0, 0, W, H)
  }

  // Partikel Hujan Salju Halus (Cuaca Salju Pertama)
  if (G.weather === 'salju' && G.snowParticles) {
    ctx.fillStyle = '#ffffff'
    G.snowParticles.forEach(p => {
      ctx.fillRect(p.x | 0, p.y | 0, 2, 2)
    })
  }

  // Angin Menderu saat Topan Badai
  if (G.weather === 'topan') {
    ctx.fillStyle = '#dff9fb'
    ctx.globalAlpha = 0.45
    for (let k = 0; k < 25; k++) {
      const tx = ((G.t * 260 + k * 28) % (W + 60)) - 30
      const ty = ((G.t * 180 + k * 19) % (H + 40)) - 20
      R(tx, ty, 8, 1, '#dff9fb')
    }
    ctx.globalAlpha = 1.0
  }

  // Kembang Api saat Malam Festival
  if (G.isFestival && G.scene === 'out') {
    const fPhase = (G.t * 1.5) % 3
    if (fPhase < 0.8) {
      const fx = 80 + Math.sin(G.t * 3) * 60, fy = 25 + Math.cos(G.t * 2) * 15
      glow(fx, fy, 24 * (1 - fPhase / 0.8), 0.5)
      for (let k = 0; k < 8; k++) {
        const rad = k * Math.PI / 4
        const dist = fPhase * 25
        R(fx + Math.cos(rad) * dist, fy + Math.sin(rad) * dist, 2, 2, ['#ff7675', '#fdcb6e', '#55efc4', '#a29bfe'][k % 4])
      }
    }
  }

  // EFEK VISUAL FEVER MODE (Border Emas Berkilau & Partikel Emas)
  if (G.feverActive) {
    const pulse = 0.5 + 0.5 * Math.sin(G.t * 12)
    R(0, 0, W, 3, `rgba(241, 196, 15, ${pulse})`)
    R(0, H - 3, W, 3, `rgba(241, 196, 15, ${pulse})`)
    R(0, 0, 3, H, `rgba(241, 196, 15, ${pulse})`)
    R(W - 3, 0, 3, H, `rgba(241, 196, 15, ${pulse})`)
    // Partikel Koin Emas Mengapung
    for (let k = 0; k < 6; k++) {
      const gx = (G.t * 50 + k * 55) % W
      const gy = H - 20 - ((G.t * 40 + k * 30) % 60)
      R(gx, gy, 3, 3, '#ffd700')
    }
  }

  // Efek Gelap Gulita saat Mati Lampu (Blackout Incident)
  if (G.isBlackout && G.scene === 'in') {
    if (!G.candleLit) {
      ctx.fillStyle = 'rgba(5, 7, 24, 0.88)'
      ctx.fillRect(0, 0, W, H)
    } else {
      ctx.fillStyle = 'rgba(5, 7, 24, 0.62)'
      ctx.fillRect(0, 0, W, H)
      glow(140, 62, 70, 0.75) // Pendar lilin hangat
      R(139, 60, 3, 6, '#f39c12')
      R(140, 58, 1, 2, '#fff')
    }
  }

  if (G.scene === 'in' && z > 0.4) {
    ctx.fillStyle = `rgba(0,0,0,${z * 0.35})`
    ctx.fillRect(0, 0, W, H)
  }
  ctx.fillStyle = 'rgba(8,10,30,.12)'
  ctx.fillRect(0, 0, W, H)

  // Chibi Pelanggan
  function chibi(c, x, y) {
    const sit = c.st === 'wait' || c.st === 'eat', walk = !sit
    const b = walk ? Math.floor(c.w) % 2 : 0
    const yy = sit ? y - 6 : y
    const sk = '#f0c8a0'

    R(x - 3, yy - 16, 6, 6, sk)
    R(x - 3, yy - 18, 6, 3, c.h)
    R(x - 3, yy - 15, 1, 4, c.h)
    R(x + 2, yy - 15, 1, 4, c.h)
    R(x - 2, yy - 13, 1, 1, '#000')
    R(x + 1, yy - 13, 1, 1, '#000')

    R(x - 3, yy - 10, 6, 6, c.s)

    // Aksesori Karakter Unik & Bos VIP
    if (c.charId === 'gimin') {
      R(x - 1, yy - 8, 2, 4, '#c0392b') // Dasi merah
    } else if (c.charId === 'hana') {
      R(x + 2, yy - 17, 2, 2, '#e74c3c') // Pita rambut merah
    } else if (c.charId === 'kenzo') {
      R(x - 4, yy - 19, 8, 2, '#2c3e50') // Topi fedora
    } else if (c.charId === 'pengembara') {
      R(x - 3, yy - 19, 6, 3, '#7f8c8d') // Topi bambu
    } else if (c.charId === 'ryu') {
      // Bos Yakuza Ryu: Jas Hitam & Mantel Putih Mewah di Pundak
      R(x - 5, yy - 11, 2, 7, '#ffffff')
      R(x + 3, yy - 11, 2, 7, '#ffffff')
      R(x - 1, yy - 14, 1, 2, '#c0392b') // Bekas luka di wajah
    } else if (c.charId === 'vivienne') {
      // Kritikus Michelin Vivienne: Topi pita anggun
      R(x - 4, yy - 19, 8, 2, '#8c7ae6')
      R(x + 1, yy - 18, 2, 2, '#f5f6fa')
    } else if (c.charId === 'inspector') {
      // Inspektur Michelin Samaran: Jas Abu-abu & Kacamata Hitam Misterius
      R(x - 3, yy - 14, 6, 2, '#2c3e50')
      R(x - 1, yy - 14, 2, 1, '#74b9ff')
    }

    if (walk) {
      R(x - 3, yy - 4 + b, 2, 4 - b, '#222')
      R(x + 1, yy - 4 + (1 - b), 2, 4 - (1 - b), '#222')
    } else {
      R(x - 3, yy - 4, 6, 3, '#222')
    }

    if (c.st === 'eat') {
      const u = Math.sin(G.t * 9) > 0
      R(x + 2, yy - (u ? 13 : 9), 2, 4, sk)
      R(x + 1, yy - (u ? 14 : 10), 2, 2, '#d9a05b')
    }
  }

  function room(R, T, glow, fl, drawCat) {
    R(0, 0, W, H, P.wall)
    R(0, 0, W, 56, P.wall2)
    for (let x = 0; x < W; x += 16) R(x, 10, 1, 46, P.wall)
    for (let i = 0; i < 5; i++) {
      R(150 + i * 30, 16, 18, 24, '#1a1a30')
      R(152 + i * 30, 18, 14, 20, i % 2 ? '#2a3a6a' : '#243055')
      R(152 + i * 30, 18 + ((G.t * 6 + i * 3) % 20 | 0), 14, 1, '#fff3')
    }

    R(0, 56, W, H - 56, P.floorA)
    for (let y = 56; y < H; y += 8) {
      for (let x = ((y / 8) % 2) * 8 - 8; x < W; x += 16) R(x, y, 8, 8, P.floorB)
    }

    R(100, 8, 6, 12, P.lantern)
    glow(103, 14, 36 * fl(0), 0.45)
    for (let i = 0; i < 3 + level(); i++) lanternSmall(i)

    // Meja Kedai
    R(0, 66, W, 14, P.wood)
    R(0, 66, W, 3, P.woodL)
    R(0, 80, W, 3, '#2a170f')

    // Rak Barang Pusaka (Heirloom Showcase)
    if (G.heirlooms && G.heirlooms.length) {
      R(8, 14, 48, 2, P.wood)
      G.heirlooms.forEach((hid, hidx) => {
        const hx = 10 + hidx * 11
        if (hid === 'pocket_watch') R(hx, 8, 5, 5, '#f1c40f')
        else if (hid === 'silver_hairpin') R(hx, 7, 2, 7, '#bdc3c7')
        else if (hid === 'vintage_coin') R(hx, 8, 4, 4, '#e0e0e0')
        else if (hid === 'poet_pen') R(hx, 7, 2, 7, '#9b59b6')
      })
    }

    // Kuali Besar Biang Kaldu Induk (Master Dashi Vat)
    const vx = 8, vy = 50
    R(vx, vy, 20, 18, '#5d4037')
    R(vx + 1, vy + 2, 18, 14, '#3e2723')
    const vatColor = G.masterVat ? (G.masterVat.ageDays >= 7 ? '#ffd700' : G.masterVat.ageDays >= 3 ? '#f39c12' : '#e67e22') : '#e67e22'
    R(vx + 2, vy + 3, 16, 12, vatColor)
    if (Math.sin(G.t * 5) > 0) {
      R(vx + 4, vy + 5, 3, 3, '#fff')
      R(vx + 10, vy + 7, 2, 2, '#fff')
    }

    // Telepon Putar Antik Showa (Rotary Telephone)
    const phoneJitter = (G.phoneRingTimer <= 2) ? (Math.sin(G.t * 30) * 1.5 | 0) : 0
    const tx = 148 + phoneJitter, ty = 57
    R(tx, ty, 8, 8, '#1e272e')
    R(tx + 1, ty + 1, 6, 6, '#2f3640')
    R(tx + 2, ty + 2, 4, 4, '#dcdde1')
    R(tx - 1, ty - 2, 10, 2, '#1e272e')
    if (G.activePhoneOrder) {
      T('☎️', tx - 2, ty - 8, '#ffd700', 7)
    }

    // Pajangan Meja
    if (G.ornament === 'manekineko') {
      R(135, 58, 6, 8, '#ffffff')
      R(136, 59, 1, 1, '#e74c3c')
      R(139, 57, 2, 3, '#f1c40f')
    } else if (G.ornament === 'krisan') {
      R(135, 60, 5, 6, '#2980b9')
      R(136, 56, 3, 4, '#27ae60')
      R(135, 54, 5, 3, '#f1c40f')
    }

    // Panci Oden 4 Sekat
    const potColor = G.pot > 0 ? '#b87333' : '#4b4f5a'
    const potRim = G.pot > 0 ? '#d48a4c' : '#8d93a2'
    R(PX - 26, 52, 52, 16, potColor)
    R(PX - 24, 54, 48, 12, '#1c1f27')
    R(PX - 26, 52, 52, 2, potRim)

    const brothColor = BROTHS.find(b => b.id === G.activeBroth)?.color || '#c28a3c'
    R(PX - 24, 54, 48, 12, G.feverActive ? '#ffd700aa' : brothColor + '99')

    // Sekat Pemisah
    R(PX, 54, 1, 12, '#8d93a2')
    R(PX - 24, 60, 48, 1, '#8d93a2')

    // Render Bahan di Panci
    G.potSlots.forEach((comp, cIdx) => {
      const cx = cIdx % 2 === 0 ? PX - 20 : PX + 4
      const cy = cIdx < 2 ? 55 : 61
      comp.forEach((itemObj, iIdx) => {
        const it = ITEMS.find(x => x.id === itemObj.id)
        if (it && iIdx < 3) {
          const ix = cx + iIdx * 6, iy = cy
          R(ix, iy, 5, 4, it.c)

          if (itemObj.simmer >= 18 && itemObj.simmer <= 40 && Math.sin(G.t * 10 + cIdx) > 0.4) {
            R(ix + 1, iy + 1, 2, 2, '#fff')
          }
        }
      })
    })

    const boilShift = Math.sin(G.t * 8) > 0 ? 1 : 0
    R(PX - 24, 54 + boilShift, 48, 2, '#ffffff44')

    // Sub-Stasiun Panggangan Sate Yakitori (Shichirin Grill)
    const gx = 180, gy = 53
    R(gx, gy, 46, 14, '#c0392b')
    R(gx + 2, gy + 2, 42, 10, '#1c1f27')
    const coalGlow = 0.5 + 0.5 * Math.sin(G.t * 6)
    R(gx + 4, gy + 3, 38, 8, `rgba(231, 76, 60, ${coalGlow})`)
    R(gx + 8, gy + 5, 30, 4, `rgba(243, 156, 18, ${coalGlow})`)
    for (let k = gx + 5; k < gx + 42; k += 4) {
      R(k, gy + 1, 1, 12, '#7f8c8d')
    }

    // 3 Slot Sate di Panggangan
    if (G.grillSlots) {
      G.grillSlots.forEach((slot, sIdx) => {
        const sx = gx + 5 + sIdx * 13, sy = gy + 3
        if (slot.id !== null) {
          R(sx + 3, sy - 2, 1, 12, '#d35400')
          const sColor = slot.state === 'burnt' ? '#2d3436' : (slot.color || '#e67e22')
          R(sx + 1, sy + 1, 5, 6, sColor)
          if (slot.glazed) {
            R(sx + 2, sy + 2, 3, 4, '#8e44ad')
          }
          if (slot.timer >= 14 && slot.timer <= 25 && Math.sin(G.t * 12 + sIdx) > 0.3) {
            R(sx + 2, sy + 2, 2, 2, '#ffd700')
          }
        }
      })
    }

    // Asap Harum Panggangan Sate
    if (G.grillSmoke) {
      G.grillSmoke.forEach(sm => {
        ctx.globalAlpha = 0.45 * (1 - sm.t / 1.6)
        R(sm.x, sm.y, 2, 2, '#ecf0f1')
        ctx.globalAlpha = 1
      })
    }

    // Plakat Emas Michelin di Dinding Kedai
    if (G.michelinStars > 0) {
      R(270, 16, 22, 15, '#ffd700')
      R(271, 17, 20, 13, '#c0392b')
      T('★'.repeat(G.michelinStars), 272, 18, '#ffd700', 8)
    }

    // Koki Pemilik Kedai
    R(100, 36, 12, 20, '#e9e1d0')
    R(100, 36, 12, 6, '#c9453a')
    R(100, 42, 12, 2, '#000')
    R(103, 25, 6, 6, '#f0c8a0')
    R(102, 23, 8, 3, '#eee')
    R(103, 31, 6, 5, '#eee')
    R(110, 40 + (Math.sin(G.t * 4) * 2 | 0), 2, 10, P.woodL)

    // Staf Kenji (Anak Magang di Dapur)
    if (G.staff.kenji) {
      R(82, 38, 10, 18, '#3498db')
      R(83, 44, 8, 10, '#ecf0f1') // Apron putih
      R(84, 30, 6, 6, '#f0c8a0')
      R(83, 28, 8, 3, '#2c3e50')
    }

    // Kursi
    for (let i = 0; i < seats(); i++) {
      R(SX[i] - 6, 110, 12, 3, '#6e4528')
      R(SX[i] - 1, 113, 2, 9, '#2a170f')
    }

    // Kucing Kuro jika jinak
    if (G.cat.friendship >= 3) {
      drawCat(290, 108, true)
    }

    // Pelanggan
    const cs = [...G.cust].sort((a, b) => a.y - b.y)
    cs.forEach(c => chibi(c, c.x, c.y))

    // Balon Pesanan Pelanggan
    cs.forEach(c => {
      if (c.st === 'wait') {
        const n = c.order.length
        const extraIcon = c.condimentReq ? 8 : 0
        const bossIcon = c.isBoss ? 8 : 0
        const bw = n * 8 + extraIcon + bossIcon + 4
        const bx = c.x - bw / 2, by = c.y - 34

        R(bx - 1, by - 1, bw + 2, 10, c.isBoss ? '#c0392b' : '#000')
        R(bx, by, bw, 8, '#fff')
        R(c.x - 1, by + 8, 2, 2, '#fff')

        c.order.forEach((id, k) => {
          R(bx + 2 + k * 8, by + 2, 6, 4, ITEMS.find(x => x.id === id).c)
        })

        if (c.condimentReq) {
          const condColor = c.condimentReq === 'karashi' ? '#f1c40f' : c.condimentReq === 'scallion' ? '#2ecc71' : '#1abc9c'
          R(bx + 2 + n * 8, by + 2, 5, 4, condColor)
        }

        if (c.isBoss) {
          R(bx + 2 + n * 8 + extraIcon, by + 2, 5, 4, '#e74c3c')
        }

        if (c.mood) {
          T(c.mood.icon, bx - 6, by - 4, '#fff', 7)
        }
        if (c.catharsis) {
          T('✨', c.x - 3, c.y - 40, '#ffd700', 8)
        }

        R(c.x - 8, c.y - 26, 16, 2, '#000')
        const patRatio = Math.max(0, c.pat / c.max)
        R(c.x - 8, c.y - 26, 16 * patRatio, 2, c.isBoss ? '#e74c3c' : patRatio > 0.35 ? '#6fd16f' : '#ff5050')
      }
    })

    // Uap Panci
    G.steam.forEach(s => {
      ctx.globalAlpha = 0.5 * (1 - s.t / 2.2)
      R(s.x + Math.sin(s.t * 3 + s.d) * 4, s.y, 3, 3, G.feverActive ? '#ffd700' : P.steam)
      ctx.globalAlpha = 1
    })

    // Teks Mengapung
    G.floats.forEach(f => {
      if (f.t > 0) T(f.s, f.x - 10, f.y - f.t * 18, f.c, 10)
    })

    if (G.scene === 'in') {
      R(0, H - 30, 22, 30, '#000')
      glow(10, H - 14, 40, 0.25)
    }

    function lanternSmall(i) {
      const x = 140 + i * 45
      R(x, 56, 0, 0, '#000')
      glow(x + 4, 30, 22 * fl(i + 1), 0.35)
      R(x, 22, 8, 10, P.lantern)
      R(x + 1, 23, 6, 8, P.lanternL)
    }
  }
}

function outside(R, T, glow, fl, lantern, drawCat) {
  // Latar Belakang Kota Sesuai Lokasi Terpilih
  const loc = LOCATIONS.find(l => l.id === G.currentLocation) || LOCATIONS[0]
  R(0, 0, W, H, loc.bgColor)

  for (let i = 0; i < 9; i++) {
    const x = i * 38 - 6, h = 30 + (i * 37 % 25)
    R(x, 50 - h / 2, 34, h + 40, P.night2)
    for (let k = 0; k < 3; k++) {
      if ((i + k) % 2) R(x + 6 + k * 9, 56 - h / 2 + k * 3, 5, 5, (i + k) % 3 ? '#e6b45a' : '#6a8ac8')
    }
  }

  // Neon Sign Tambahan jika di Distrik Shinjuku
  if (G.currentLocation === 'shinjuku') {
    glow(50, 30, 20, 0.3)
    R(42, 24, 16, 8, '#e84393')
    T('NEON', 44, 25, '#fff', 6)
    glow(270, 28, 22, 0.3)
    R(262, 22, 16, 8, '#00cec9')
    T('BAR', 265, 23, '#fff', 6)
  }

  R(0, 125, W, H - 125, P.street)
  R(0, 125, W, 2, '#2b3358')

  // Struktur Kedai Oden
  R(62, 44, 196, 84, P.wall)
  R(56, 36, 208, 12, '#161022')
  for (let x = 56; x < 264; x += 8) R(x, 44, 6, 3, '#2a1d3a')
  R(56, 36, 208, 2, '#4a3a66')

  R(62, 48, 196, 4, P.wall2)
  R(100, 92, 120, 34, '#2a170f')
  R(104, 96, 112, 26, P.amber)
  R(104, 96, 112, 26, '#ffb34777')

  for (let i = 0; i < 4; i++) {
    const x = 116 + i * 26
    R(x, 106, 8, 6, '#2b1b17')
    R(x - 1, 111, 10, 11, ['#3f7fbf', '#c9453a', '#58a55c', '#e0a43a'][i])
  }

  R(100, 92, 120, 2, '#000')
  R(100, 124, 120, 3, P.wood)

  // Tirai Noren
  const norenColor = NORENS.find(n => n.id === G.noren)?.color || '#7a1d1d'
  R(96, 64, 128, 26, norenColor)
  const windGust = G.weather === 'topan' ? (Math.sin(G.t * 18) * 3 | 0) : 0
  for (let x = 96; x < 224; x += 16) {
    R(x + 15, 64, 1, 26, '#180a0a')
    R(x + (Math.sin(G.t * 2 + x) * 1.2 | 0) + windGust, 82, 15, 8, norenColor)
  }

  // Lapisan Salju Putih di Atap & Jalan saat Salju
  if (G.weather === 'salju') {
    R(56, 35, 208, 2, '#ffffff')
    R(0, 124, W, 2, '#ffffffaa')
    R(100, 91, 120, 2, '#ffffffcc')
  }

  // Tanda Terpal Lepas saat Topan Badai
  if (G.weather === 'topan' && G.tarpLoose) {
    R(210 + (Math.sin(G.t * 25) * 4 | 0), 32, 24, 6, '#e74c3c')
    T('⚠️ TERPAL BOCOR!', 190, 22, '#ff4757', 8)
  }

  // Spanduk 'ODEN'
  R(120, 66, 80, 12, '#f3e3b8')
  T('ODEN', 144, 67, '#7a1d1d', 11)

  R(70, 52, 4, 74, '#2a170f')
  R(246, 52, 4, 74, '#2a170f')

  // Lampion
  lantern(74, 52, 1, true)
  lantern(236, 52, 2, true)
  if (level() > 0) lantern(150, 52, 3)
  if (level() > 1) lantern(30, 60, 4)

  // Lampu Jalan
  R(18, 50, 3, 76, '#222a44')
  R(14, 46, 11, 5, '#222a44')
  glow(20, 54, 56 * fl(5), 0.35)
  R(16, 51, 7, 3, '#ffe9a8')

  // Staf Nona Aoi (Penyanyi Jalanan dengan Gitar di Luar)
  if (G.staff.aoi) {
    R(34, 130, 8, 16, '#9b59b6')
    R(35, 123, 6, 6, '#f0c8a0')
    R(33, 121, 9, 3, '#34495e')
    R(42, 133, 5, 8, '#d35400') // Gitar kayu
  }

  // Gerobak Saingan Yamada-ya di Seberang Jalan
  if (G.rivalStall && G.rivalStall.active) {
    const rx = 265, ry = 98
    R(rx, ry, 45, 24, '#2c3e50')
    R(rx - 2, ry - 6, 49, 6, '#2980b9')
    T('YAMADA', rx + 6, ry - 5, '#ffffff', 5)
    R(rx + 4, ry + 6, 36, 12, '#e67e22')
    const rivalLight = Math.sin(G.t * 8) > 0.1 ? '#e74c3c' : '#c0392b'
    R(rx - 2, ry + 2, 4, 6, rivalLight)
  }

  // Sepeda Onthel Pengantar Bento Kenji Melintas di Jalan
  if (G.activePhoneOrder?.status === 'delivering') {
    const bx = ((G.t * 55) % (W + 60)) - 30
    R(bx, 142, 12, 3, '#2c3e50')
    R(bx + 4, 134, 6, 8, '#3498db')
    R(bx - 4, 136, 5, 5, '#e67e22') // Bento box kayu
    R(bx - 3, 144, 4, 4, '#7f8c8d') // Roda belakang
    R(bx + 10, 144, 4, 4, '#7f8c8d') // Roda depan
  }

  // Kucing Kuro di luar
  drawCat(48, 142, false)

  // Pantulan Aspal
  const refl = (x, w, a) => {
    for (let k = 0; k < 7; k++) {
      ctx2(R, x + Math.sin(G.t * 3 + k) * 2, 128 + k * 4, w - k, 2, a - k * 0.03)
    }
  }
  function ctx2(R, x, y, w, h, a) {
    R(x, y, w, h, `rgba(${P.glow},${Math.max(0, a)})`)
  }

  R(40, 150, 240, 14, P.wet)
  refl(74, 10, 0.5)
  refl(236, 10, 0.5)
  refl(150, 24, 0.3)
  refl(16, 7, 0.4)

  G.rip.forEach(r => {
    const k = r.t / 0.8, w = 4 + k * 10
    R(r.x - w / 2, r.y, w, 1, `rgba(160,190,230,${1 - k})`)
  })

  G.steam.forEach(s => {
    R(s.x + Math.sin(s.t * 3 + s.d) * 5, s.y - (s.t * 10), 4, 3, G.feverActive ? '#ffd70088' : '#e8eefc66')
  })
}
