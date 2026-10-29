import {useEffect, useRef, useState} from 'react'
import {draw} from './render.js'
import * as Gm from './game.js'
import {ITEMS, CONDIMENTS, EQ, LV, LVREP, W, H, eqCost, COMPARTMENTS, getSimmerState, STAFF, GRILL_ITEMS, AUCTION_ITEMS, FORTUNES, getGrillState} from './game.js'
import {CHARACTERS} from './characters.js'
import {BROTHS, NORENS, BOWLS, ORNAMENTS} from './decorations.js'
import {FUSION_RECIPES} from './recipes.js'
import {LOCATIONS} from './locations.js'
import * as Audio from './audio.js'

const item = id => ITEMS.find(x => x.id === id)
const condiment = id => CONDIMENTS.find(x => x.id === id)

const Chip = ({id}) => {
  const i = item(id)
  return <span className="chip" style={{background: i.c}}>{i.n}</span>
}

const CondimentChip = ({id}) => {
  const c = condiment(id)
  return <span className="cond-chip">{c.icon} {c.n}</span>
}

export default function App() {
  const cv = useRef()
  const [, setFrame] = useState(0)
  const [shopOpen, setShopOpen] = useState(false)
  const [journalOpen, setJournalOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [marketOpen, setMarketOpen] = useState(false)
  const [decorOpen, setDecorOpen] = useState(false)
  const [radioOpen, setRadioOpen] = useState(false)
  const [recipeOpen, setRecipeOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [grillOpen, setGrillOpen] = useState(false)
  const [auctionOpen, setAuctionOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(Audio.getMuteState())
  const [shopTab, setShopTab] = useState('items') // 'items', 'eq', 'staff'
  const [sakePouring, setSakePouring] = useState(false)

  useEffect(() => {
    const ctx = cv.current.getContext('2d')
    ctx.imageSmoothingEnabled = false
    let last = performance.now(), raf

    const loop = n => {
      const dt = Math.min(0.05, (n - last) / 1000)
      last = n
      Gm.update(dt)
      if (sakePouring) {
        Gm.updateSakePour(true, dt)
      }
      draw(ctx)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const iv = setInterval(() => setFrame(x => x + 1), 120)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(iv)
    }
  }, [sakePouring])

  const g = Gm.G
  const lv = Gm.level()
  const next = LVREP[lv + 1]

  const onClickCanvas = e => {
    if (g.demo) {
      Gm.reset(false)
      return
    }
    const r = cv.current.getBoundingClientRect()
    Gm.click((e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H)
  }

  const toggleSound = () => {
    const muted = Audio.toggleMute()
    setIsMuted(muted)
  }

  const order = g.target
  const activeChar = order?.charId ? CHARACTERS[order.charId] : null
  const currentBroth = BROTHS.find(b => b.id === g.activeBroth)
  const currentLocationData = LOCATIONS.find(l => l.id === g.currentLocation) || LOCATIONS[0]

  const weatherLabel = {
    gerimis: '🌧️ Gerimis Hangat',
    hujan_deras: '⛈️ Hujan Deras',
    angin_malam: '🍃 Angin Malam',
    topan: '🌀 Malam Topan Badai! (Tip 2x)',
    salju: `❄️ Salju Pertama (${Math.round((g.stoveHeat || 0.7) * 100)}% Api)`
  }[g.weather] || '🌧️ Hujan'

  const closeAllModals = () => {
    setShopOpen(false)
    setJournalOpen(false)
    setCatOpen(false)
    setMarketOpen(false)
    setDecorOpen(false)
    setRadioOpen(false)
    setRecipeOpen(false)
    setMapOpen(false)
    setGrillOpen(false)
    setAuctionOpen(false)
  }

  return (
    <div className="stage" onClick={() => Audio.resumeAudio()}>
      <canvas ref={cv} width={W} height={H} onClick={onClickCanvas} />

      {/* Top HUD */}
      <div className="hud">
        <div className="box highlight">¥{g.money.toLocaleString()}</div>
        <div className="box">
          Hari {g.day} • {g.hour.toString().padStart(2, '0')}:{Math.floor(g.minute).toString().padStart(2, '0')}
        </div>
        <div className="box">{g.isFestival ? '🎆 Malam Festival!' : weatherLabel}</div>
        <div className="box" title={`Lokasi Kedai: ${currentLocationData.name}`}>
          {currentLocationData.icon} {currentLocationData.name.split(' ')[0]}
        </div>
        <div className="box" title={`Kaldu Aktif: ${currentBroth?.name}`}>
          {currentBroth?.icon} {currentBroth?.name.split(' ')[0]}
        </div>

        {/* Bintang Michelin */}
        {g.michelinStars > 0 && (
          <div className="box michelin-badge" title="Sertifikasi Bintang Michelin">
            🏆 Michelin {'★'.repeat(g.michelinStars)}
          </div>
        )}

        {/* Indikator Kombo & FEVER MODE */}
        {g.feverActive && (
          <div className="box fever-badge">
            ⚡ FEVER MODE (3x Uang)! {Math.ceil(g.feverTimer)}s
          </div>
        )}
        {!g.feverActive && g.combo > 1 && (
          <div className="box combo-badge">
            🔥 COMBO x{g.combo}!
          </div>
        )}

        {/* Tombol Aksi Tanggap Bencana & Darurat */}
        {g.isBlackout && (
          <button className="btn candle-btn" onClick={Gm.toggleCandle}>
            {g.candleLit ? '🕯️ Tiup Lilin' : '🕯️ Nyalakan Lilin Meja'}
          </button>
        )}
        {g.tarpLoose && (
          <button className="btn tarp-btn" onClick={Gm.fixTarp}>
            🛠️ Kencangkan Terpal!
          </button>
        )}
        {g.weather === 'salju' && g.stoveHeat < 0.5 && (
          <button className="btn stove-btn" onClick={Gm.stokeStove}>
            🔥 Tambah Arang Kompor
          </button>
        )}

        <div className="box">Reputasi ★{Math.floor(g.rep)}{next ? `/${next}` : ''} ({LV[lv]})</div>
        
        <button className="btn sound-btn" onClick={() => { closeAllModals(); setRadioOpen(true) }} title="Pemutar Kaset Radio">
          📻 {g.cassette.toUpperCase()}
        </button>
        <button className="btn sound-btn" onClick={toggleSound} title="Bisu / Nyalakan Suara">
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Banner Demo */}
      {g.demo && (
        <div className="demo box">
          DEMO OTOMATIS: {Math.ceil(30 - g.demoT)} dtk (Klik layar untuk bermain)
          <div className="prog" style={{width: `${g.demoT / 30 * 100}%`}} />
        </div>
      )}

      {/* Petunjuk Luar */}
      {g.scene === 'out' && !g.demo && !g.dayClosed && (
        <div className="hint">― Klik kedai untuk masuk & melayani tamu ―</div>
      )}

      {/* Bar Tombol Bawah */}
      {!g.demo && (
        <div className="bar">
          {g.scene === 'in' && (
            <button className="btn" onClick={() => Gm.leaveShop()}>
              🚪 Keluar
            </button>
          )}
          <button className="btn" onClick={() => { closeAllModals(); setMarketOpen(true) }}>
            🛒 Pasar
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setMapOpen(true) }}>
            🗺️ Peta ({currentLocationData.icon})
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setRecipeOpen(true) }}>
            📖 Resep ({g.unlockedRecipes.length}/{FUSION_RECIPES.length})
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setDecorOpen(true) }}>
            🏮 Dekor
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setShopOpen(true) }}>
            🏪 Toko & Staf
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setJournalOpen(true) }}>
            📓 Jurnal
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setGrillOpen(true) }}>
            🍢 Sate ({g.grillSlots ? g.grillSlots.filter(s => s.id).length : 0}/3)
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setAuctionOpen(true); if (!g.auctionSession) Gm.startAuction() }}>
            🐟 Lelang Tsukiji
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setCatOpen(true) }}>
            🐱 Kuro {g.cat.friendship > 0 ? `(♥${g.cat.friendship})` : ''}
          </button>
        </div>
      )}

      {/* Panel Pesanan & Memasak Panci Oden (Zoom In pada Tamu) */}
      {order && !g.demo && g.zoom > 0.6 && (
        <div className="panel box">
          <div className="panel-header">
            <span className="guest-badge">
              {order.isInspector
                ? `🏆 ${order.inspectorData?.avatar} ${order.inspectorData?.name} (${order.inspectorData?.title})`
                : order.isBoss
                ? `⚠️ ${order.bossData?.avatar} ${order.bossData?.name} (${order.bossData?.title})`
                : activeChar
                ? `${activeChar.avatar} ${activeChar.name} (${activeChar.title})`
                : '👤 Tamu Berteduh'}
            </span>
            <span className="patience-label">
              Kesabaran: {Math.max(0, Math.ceil(order.pat))} dtk
            </span>
          </div>

          <div className="row">
            <strong>Pesanan:</strong> {order.order.map(i => <Chip key={i} id={i} />)}
            {order.condimentReq && (
              <span className="cond-request">
                + Bumbu: <CondimentChip id={order.condimentReq} />
              </span>
            )}
            {order.wantsSake && (
              <button className="btn micro-sake-btn" onClick={() => Gm.startSakeMinigame(order)}>
                🍶 Tamu Ingin Sake Hangat! (Klik untuk Minigame)
              </button>
            )}
            {order.wantsFortune && (
              <button className="btn fortune-order-btn" onClick={() => Gm.startOmikuji(order)}>
                🎴 Ramalkan Nasib Tamu (Omikuji)
              </button>
            )}
          </div>

          <div className="row plate-row">
            <strong>Piring Saji:</strong>
            {g.plate.map((id, idx) => {
              const simmer = g.plateItemsSimmer[idx]
              return (
                <span key={idx} className="plate-item-badge">
                  <Chip id={id} />
                  <span className={`simmer-tag ${simmer?.state}`}>{simmer?.label}</span>
                </span>
              )
            })}
            {g.plateCondiments.map(cid => <CondimentChip key={cid} id={cid} />)}
            {g.plateSate && g.plateSate.map((s, idx) => (
              <span key={idx} className="chip sate-chip">
                {s.icon} {s.name} (+¥{s.sellPrice})
              </span>
            ))}
            {!g.plate.length && !g.plateSate?.length && <span className="empty-hint">(Pilih bahan dari 4 sekat panci di bawah)</span>}
          </div>

          <div className="row section-title">Panci Oden 4 Sekat (Klik bahan yang sudah matang untuk disajikan):</div>
          
          {/* 4 Kompartemen Panci Interaktif */}
          <div className="pot-compartments-grid">
            {COMPARTMENTS.map((comp, cIdx) => {
              const itemsInComp = g.potSlots[cIdx] || []
              return (
                <div key={comp.id} className="comp-card">
                  <div className="comp-title">{comp.name}</div>
                  <div className="comp-items-list">
                    {itemsInComp.map((itObj, itemIdx) => {
                      const itData = item(itObj.id)
                      const simmer = getSimmerState(itObj.simmer)
                      return (
                        <button
                          key={itemIdx}
                          className={`btn simmer-item-btn ${simmer.state}`}
                          onClick={() => Gm.takeFromPot(cIdx, itemIdx)}
                          title={`Kematangan: ${simmer.label} (${Math.floor(itObj.simmer)} dtk)`}
                        >
                          <span className="dot" style={{background: itData.c}} />
                          {itData.n}
                          <span className="simmer-pill">{simmer.state === 'emas' ? '⭐ Emas' : simmer.label.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                    {!itemsInComp.length && <span className="empty-comp">Sekat ini kosong</span>}
                  </div>
                  <div className="restock-row">
                    {comp.allowed.filter(aid => g.owned.includes(aid)).map(aid => (
                      <button
                        key={aid}
                        className="btn micro-btn"
                        disabled={(g.stock[aid] || 0) <= 0 || itemsInComp.length >= 6}
                        onClick={() => Gm.addToPot(cIdx, aid)}
                      >
                        + Rebus {item(aid).n} ({g.stock[aid] || 0})
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="row section-title">Bumbu & Minuman Pelengkap:</div>
          <div className="row condiments-row">
            {CONDIMENTS.map(c => {
              const active = g.plateCondiments.includes(c.id)
              return (
                <button
                  key={c.id}
                  className={`btn cond-btn ${active ? 'active' : ''}`}
                  onClick={() => Gm.toggleCondiment(c.id)}
                >
                  {c.icon} {c.n} <span className="price">+¥{c.p}</span> {active ? '✓' : ''}
                </button>
              )
            })}
          </div>

          <div className="row actions-row">
            <button className="btn" onClick={Gm.undoPlate}>↩ Batal 1</button>
            <button className="btn" onClick={Gm.closeOrder}>Tutup</button>
            <button className="btn serve-btn" disabled={!g.plate.length} onClick={Gm.serve}>
              🍲 Sajikan ke Tamu!
            </button>
          </div>
        </div>
      )}

      {/* Minigame Tuang Sake Hangat (Atsukan Pouring) */}
      {g.sakeMinigame.active && (
        <div className="modal-overlay">
          <div className="sake-modal box">
            <div className="modal-title">🍶 Minigame Tuang Sake Hangat</div>
            <p className="sake-desc">
              Tahan tombol untuk menuang sake ke botol keramik Tokkuri. Lepas tepat saat cairan berada di <strong>Zona Hijau (70% - 88%)</strong>!
            </p>
            <div className="bottle-container">
              <div className="bottle-fill" style={{height: `${g.sakeMinigame.level}%`}} />
              <div className="target-zone" />
              <div className="level-indicator">{Math.floor(g.sakeMinigame.level)}%</div>
            </div>
            
            {!g.sakeMinigame.result ? (
              <button
                className="btn pour-btn"
                onMouseDown={() => setSakePouring(true)}
                onMouseUp={() => { setSakePouring(false); Gm.finishSakePour() }}
                onTouchStart={() => setSakePouring(true)}
                onTouchEnd={() => { setSakePouring(false); Gm.finishSakePour() }}
              >
                {sakePouring ? 'Sedang Menuang... (Lepas saat Pas!)' : '👉 Tahan untuk Menuang Sake'}
              </button>
            ) : (
              <div className="sake-result">
                <h3>{g.sakeMinigame.result}</h3>
                <button className="btn" onClick={() => { g.sakeMinigame.active = false; setFrame(f => f + 1) }}>
                  Kembali ke Meja
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pop-up Dialog Curhat Cerita dengan Pilihan Respon Nasihat */}
      {g.activeDialogue && (
        <div className="dialogue-modal box">
          <div className="dialogue-header">
            <span className="avatar-big">{g.activeDialogue.char.avatar}</span>
            <div>
              <div className="char-name">{g.activeDialogue.char.name} ({g.activeDialogue.char.title})</div>
              <div className="story-title">Bab {g.activeDialogue.story.chapter}: {g.activeDialogue.story.title}</div>
            </div>
          </div>
          <div className="dialogue-body">
            "{g.activeDialogue.story.dialogue}"
          </div>

          {!g.activeDialogue.chosen && g.activeDialogue.story.choices && (
            <div className="choices-container">
              <div className="choices-title">Pilih Nasihat / Respon Anda:</div>
              {g.activeDialogue.story.choices.map((ch, cIdx) => (
                <button key={cIdx} className="btn choice-btn" onClick={() => Gm.chooseDialogueOption(cIdx)}>
                  👉 {ch.text}
                </button>
              ))}
            </div>
          )}

          {g.activeDialogue.chosen && (
            <div className="choice-outcome">
              <div className="outcome-text">💬 "{g.activeDialogue.chosen.response}"</div>
              <div className="dialogue-reward">
                🎁 Dampak Hubungan: <strong>{g.activeDialogue.chosen.reward}</strong>
              </div>
              <button className="btn full-width" onClick={() => { g.activeDialogue = null; setFrame(f => f + 1) }}>
                Simpan Kenangan & Lanjutkan
              </button>
            </div>
          )}
        </div>
      )}

      {/* Layar Laporan Penutupan Harian (Jam 02:00 Pagi) */}
      {g.dayClosed && (
        <div className="modal-overlay">
          <div className="box summary-modal">
            <h2>🌙 Kedai Oden Selesai Tutup Hari Ini</h2>
            <p className="summary-subtitle">Jam menunjukkan pukul 02:00 dini hari. Hujan mulai reda di gang kota.</p>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-num">{g.dayStats.served}</div>
                <div className="stat-lbl">Tamu Terlayani</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">¥{g.dayStats.revenue.toLocaleString()}</div>
                <div className="stat-lbl">Penjualan Makanan</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">¥{g.dayStats.tips.toLocaleString()}</div>
                <div className="stat-lbl">Uang Tip Tamu</div>
              </div>
              <div className="stat-card highlight">
                <div className="stat-num">¥{g.money.toLocaleString()}</div>
                <div className="stat-lbl">Total Kas Sekarang</div>
              </div>
            </div>
            <button className="btn next-day-btn" onClick={Gm.startNewDay}>
              ☀️ Mulai Hari ke-{g.day + 1}
            </button>
          </div>
        </div>
      )}

      {/* Modal Buku Resep Rahasia (Recipe Dex) */}
      {recipeOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setRecipeOpen(false)}>
          <div className="recipe-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📖 Buku Resep Rahasia & Fusion Dex</div>
            <p className="recipe-subtitle">
              Eksperimen menyajikan kombinasi bahan & bumbu tertentu untuk membuka menu legendaris!
            </p>
            <div className="recipe-grid">
              {FUSION_RECIPES.map(rec => {
                const isUnlocked = g.unlockedRecipes.includes(rec.id)
                return (
                  <div key={rec.id} className={`box recipe-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                    <div className="rec-icon">{isUnlocked ? rec.icon : '❓'}</div>
                    <div className="rec-details">
                      <div className="rec-name">{isUnlocked ? rec.name : '??? Resep Tersembunyi ???'}</div>
                      <div className="rec-sub">{isUnlocked ? rec.subtitle : 'Belum ditemukan racikannya'}</div>
                      {isUnlocked && <div className="rec-desc">{rec.desc}</div>}
                      {isUnlocked && <div className="rec-bonus">Bonus Harga: +¥{rec.bonusPrice}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="btn close-btn" onClick={() => setRecipeOpen(false)}>Tutup Buku Resep</button>
          </div>
        </div>
      )}

      {/* Modal Peta Kota & Pindah Lokasi */}
      {mapOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setMapOpen(false)}>
          <div className="map-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🗺️ Peta Kota & Lokasi Gerobak Oden</div>
            <p className="map-subtitle">Tingkatkan reputasi kedaimu untuk membuka distrik baru yang lebih ramai & menguntungkan!</p>
            <div className="locations-grid">
              {LOCATIONS.map(loc => {
                const isUnlocked = g.unlockedLocations.includes(loc.id) || g.rep >= loc.repReq
                const isCurrent = g.currentLocation === loc.id
                return (
                  <div key={loc.id} className={`box location-card ${isCurrent ? 'current' : ''}`}>
                    <div className="loc-head">
                      <span className="loc-icon">{loc.icon}</span>
                      <div>
                        <strong>{loc.name}</strong> ({loc.title})
                        <div className="loc-req">
                          {isUnlocked ? '✅ Terbuka' : `🔒 Butuh Reputasi ★${loc.repReq}`}
                        </div>
                      </div>
                    </div>
                    <div className="loc-desc">{loc.bonusDesc}</div>
                    <div className="loc-multipliers">
                      Pengali Harga: {loc.priceMultiplier}x • Tip: {loc.tipMultiplier}x
                    </div>
                    <button
                      className="btn"
                      disabled={!isUnlocked || isCurrent}
                      onClick={() => Gm.travelToLocation(loc.id)}
                    >
                      {isCurrent ? '📍 Lokasimu Saat Ini' : isUnlocked ? 'Pindah ke Sini' : `Terkunci (★${loc.repReq})`}
                    </button>
                  </div>
                )
              })}
            </div>
            <button className="btn close-btn" onClick={() => setMapOpen(false)}>Tutup Peta</button>
          </div>
        </div>
      )}

      {/* Modal Pasar Pagi & Manajemen Stok Panci */}
      {marketOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setMarketOpen(false)}>
          <div className="market-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🛒 Pasar Grosir Kota Tua & Dapur Oden</div>
            
            <div className="market-section-title">Pilih Racikan Kaldu Dashi Hari Ini:</div>
            <div className="broth-selector-grid">
              {BROTHS.map(b => (
                <div
                  key={b.id}
                  className={`box broth-card ${g.activeBroth === b.id ? 'active' : ''}`}
                  onClick={() => Gm.setBroth(b.id)}
                >
                  <div className="broth-head">{b.icon} {b.name} {g.activeBroth === b.id ? '✓ (Aktif)' : ''}</div>
                  <div className="broth-desc">{b.desc}</div>
                  <div className="broth-bonus">{b.bonus}</div>
                </div>
              ))}
            </div>

            <div className="market-section-title">Beli Pasokan Bahan Mentah dari Pasar (Isi per 5 porsi):</div>
            <div className="stock-market-grid">
              {g.owned.map(id => {
                const it = item(id)
                const price = g.marketPrices[id] || 40
                const cost5 = price * 5
                const currentStock = g.stock[id] || 0
                return (
                  <div key={id} className="box stock-card">
                    <div className="stock-title">
                      <Chip id={id} /> <span>Stok: <strong>{currentStock} porsi</strong></span>
                    </div>
                    <div className="stock-price">Harga Pasar: ¥{price}/porsi (Total ¥{cost5})</div>
                    <button
                      className="btn"
                      disabled={g.money < cost5}
                      onClick={() => Gm.buyStock(id, 5)}
                    >
                      Beli 5 Porsi (¥{cost5})
                    </button>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setMarketOpen(false)}>Selesai Belanja</button>
          </div>
        </div>
      )}

      {/* Modal Kustomisasi & Dekorasi Kedai */}
      {decorOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setDecorOpen(false)}>
          <div className="decor-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🏮 Kustomisasi Tampilan Kedai</div>
            
            <div className="decor-section-title">Tirai Noren Depan:</div>
            <div className="decor-grid">
              {NORENS.map(n => {
                const own = g.ownedNorens.includes(n.id)
                const active = g.noren === n.id
                return (
                  <div key={n.id} className={`box decor-card ${active ? 'active' : ''}`}>
                    <div className="decor-name" style={{color: n.color}}>■ {n.name}</div>
                    <div className="decor-desc">{n.desc}</div>
                    <button
                      className="btn"
                      disabled={!own && g.money < n.cost}
                      onClick={() => own ? Gm.equipDecoration('noren', n.id) : Gm.buyDecoration('noren', n)}
                    >
                      {active ? '✓ Terpasang' : own ? 'Pasang' : `Beli (¥${n.cost})`}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="decor-section-title">Pajangan Meja Tamu:</div>
            <div className="decor-grid">
              {ORNAMENTS.map(o => {
                const own = g.ownedOrnaments.includes(o.id)
                const active = g.ornament === o.id
                return (
                  <div key={o.id} className={`box decor-card ${active ? 'active' : ''}`}>
                    <div className="decor-name">{o.icon} {o.name}</div>
                    <div className="decor-desc">{o.desc}</div>
                    <button
                      className="btn"
                      disabled={!own && g.money < o.cost}
                      onClick={() => own ? Gm.equipDecoration('ornament', o.id) : Gm.buyDecoration('ornament', o)}
                    >
                      {active ? '✓ Terpasang' : own ? 'Pajang di Meja' : `Beli (¥${o.cost})`}
                    </button>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setDecorOpen(false)}>Tutup</button>
          </div>
        </div>
      )}

      {/* Modal Pemutar Kaset Radio Lo-Fi */}
      {radioOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setRadioOpen(false)}>
          <div className="radio-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📻 Pemutar Kaset Radio Antik</div>
            <p className="radio-subtitle">Pilih kaset pita untuk diputar di kedai. Musik yang cocok membuat tamu betah!</p>
            <div className="tapes-grid">
              {[
                {id: 'jazz', name: 'Rainy Night Jazz', icon: '🎷', desc: 'Piano melankolis & akord jazz malam hujan (Favorit Pak Gimin)'},
                {id: 'citypop', name: 'Showa City Pop', icon: '🌃', desc: 'Synthesizer 80-an yang ceria dan santai (Favorit Kenzo)'},
                {id: 'shamisen', name: 'Old Temple Shamisen', icon: '🪕', desc: 'Petikan dawai kuil tradisional Jepang (Favorit Nenek Sumi)'},
                {id: 'lofi', name: 'Cozy Lo-Fi Beats', icon: '☕', desc: 'Ketukan santai penghilang stres ujian (Favorit Hana)'}
              ].map(t => {
                const active = g.cassette === t.id
                return (
                  <div
                    key={t.id}
                    className={`box tape-card ${active ? 'playing' : ''}`}
                    onClick={() => Gm.changeCassette(t.id)}
                  >
                    <div className="tape-header">{t.icon} {t.name} {active ? '▶ SEDANG DIPUTAR' : ''}</div>
                    <div className="tape-desc">{t.desc}</div>
                  </div>
                )
              })}
            </div>
            <button className="btn close-btn" onClick={() => setRadioOpen(false)}>Tutup Radio</button>
          </div>
        </div>
      )}

      {/* Modal Toko Peningkatan & Staf */}
      {shopOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setShopOpen(false)}>
          <div className="shop box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🏪 Toko Kedai & Rekrut Staf</div>
            
            <div className="shop-tabs-row">
              <button className={`btn tab-btn ${shopTab === 'items' ? 'active' : ''}`} onClick={() => setShopTab('items')}>
                Bahan Oden
              </button>
              <button className={`btn tab-btn ${shopTab === 'eq' ? 'active' : ''}`} onClick={() => setShopTab('eq')}>
                Peralatan Kedai
              </button>
              <button className={`btn tab-btn ${shopTab === 'staff' ? 'active' : ''}`} onClick={() => setShopTab('staff')}>
                👥 Rekrut Asisten
              </button>
            </div>

            {shopTab === 'items' && (
              <div className="shop-grid">
                {ITEMS.filter(i => i.cost).map(i => {
                  const own = g.owned.includes(i.id)
                  const ok = g.rep >= i.rep
                  return (
                    <div className="box shop-item" key={i.id}>
                      <div className="item-title"><Chip id={i.id} /> • Harga: ¥{i.p}</div>
                      <div className="item-req">
                        {own ? '✅ Sudah Terbuka' : ok ? 'Tersedia untuk dibuka' : `🔒 Butuh Reputasi ★${i.rep}`}
                      </div>
                      <button
                        className="btn"
                        disabled={own || !ok || g.money < i.cost}
                        onClick={() => Gm.buy('item', i.id)}
                      >
                        {own ? 'Sudah Ada' : `Buka Menu (¥${i.cost})`}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {shopTab === 'eq' && (
              <div className="shop-grid">
                {EQ.map(e => {
                  const mx = g[e.id] >= e.max
                  const cost = eqCost(g, e)
                  return (
                    <div className="box shop-item" key={e.id}>
                      <div className="item-title">{e.n} (Lv {g[e.id]}/{e.max})</div>
                      <div className="item-desc">{e.d}</div>
                      <button
                        className="btn"
                        disabled={mx || g.money < cost}
                        onClick={() => Gm.buy('eq', e.id)}
                      >
                        {mx ? 'MAKSIMAL' : `Tingkatkan (¥${cost})`}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {shopTab === 'staff' && (
              <div className="shop-grid">
                {STAFF.map(s => {
                  const hired = g.staff[s.id]
                  return (
                    <div className="box shop-item" key={s.id}>
                      <div className="item-title">{s.icon} {s.name}</div>
                      <div className="item-desc">{s.desc}</div>
                      <button
                        className="btn"
                        disabled={hired || g.money < s.cost}
                        onClick={() => Gm.hireStaff(s.id)}
                      >
                        {hired ? '✅ Sudah Direkrut' : `Pekerjakan (¥${s.cost})`}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <button className="btn close-btn" onClick={() => setShopOpen(false)}>Tutup Toko</button>
          </div>
        </div>
      )}

      {/* Modal Jurnal Kenangan */}
      {journalOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setJournalOpen(false)}>
          <div className="journal-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📖 Jurnal & Kisah Pelanggan Setia</div>
            <p className="journal-subtitle">
              Sajikan pesanan favorit dengan kematangan pas & bumbu yang tepat untuk membuka bab cerita dan pilihan nasihat.
            </p>
            <div className="journal-list">
              {Object.values(CHARACTERS).map(char => {
                const unlockedCount = g.storiesUnlocked[char.id] || 0
                const affinity = g.charAffinity[char.id] || 0
                return (
                  <div className="box char-card" key={char.id}>
                    <div className="char-head">
                      <span className="char-avatar">{char.avatar}</span>
                      <div>
                        <strong>{char.name}</strong> <span className="char-role">({char.title})</span>
                        <div className="char-fav">
                          Menu Favorit: {char.favItems.map(fid => item(fid)?.n).join(', ')} + {condiment(char.favCondiment)?.n} • Selera Musik: {char.favMusic.toUpperCase()}
                        </div>
                      </div>
                      <span className="chapter-badge">Kedekatan: ♥{affinity} • Bab: {unlockedCount}/{char.stories.length}</span>
                    </div>

                    <div className="stories-container">
                      {char.stories.map((st, idx) => {
                        const isUnlocked = idx < unlockedCount
                        return (
                          <div key={st.chapter} className={`story-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
                            <strong>Bab {st.chapter}: {isUnlocked ? st.title : '???'}</strong>
                            {isUnlocked ? (
                              <p className="story-snippet">"{st.dialogue}"</p>
                            ) : (
                              <p className="locked-hint">Sajikan oden dengan kepuasan bintang 3 untuk membuka kisah ini.</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="btn close-btn" onClick={() => setJournalOpen(false)}>Tutup Jurnal</button>
          </div>
        </div>
      )}

      {/* Modal Kucing Kuro */}
      {catOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setCatOpen(false)}>
          <div className="cat-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🐱 Kuro si Kucing Berteduh</div>
            <div className="cat-profile">
              <div className="cat-big-icon">🐈‍⬛</div>
              <p>
                Kucing jalanan berbulu hitam legam yang sering berteduh di kolong terpal kedaimu saat malam hujan.
              </p>
              <div className="friendship-bar">
                Tingkat Hubungan: {'♥'.repeat(g.cat.friendship) || 'Belum Akrab'}{' '}
                ({g.cat.friendship}/10)
              </div>
              <p className="cat-bonus">
                {g.cat.friendship >= 3
                  ? '✨ Kuro sudah jinak! Ia duduk di dekat meja dan menarik pelanggan langganan lebih sering.'
                  : 'Beri makan potongan oden agar Kuro merasa aman dan berteman denganmu.'}
              </p>
            </div>
            <div className="cat-actions">
              <button
                className="btn"
                disabled={g.cat.fedToday || g.money < 50}
                onClick={Gm.feedCat}
              >
                {g.cat.fedToday ? '✅ Sudah Diberi Makan Hari Ini' : '🐟 Beri Potongan Oden (¥50)'}
              </button>
              <button className="btn" onClick={Gm.petCat}>
                👋 Belai Kuro
              </button>
            </div>
            <button className="btn close-btn" onClick={() => setCatOpen(false)}>Tutup</button>
          </div>
        </div>
      )}

      {/* Modal Sub-Stasiun Panggangan Sate Yakitori */}
      {grillOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setGrillOpen(false)}>
          <div className="grill-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🍢 Panggangan Sate Arang Binchotan</div>
            <p className="grill-subtitle">
              Panggang tusukan sate di atas bara arang panas. Balik di saat tepat, olesi saus tare gurih manis, dan sajikan ke piring tamu!
            </p>

            <div className="grill-slots-grid">
              {g.grillSlots && g.grillSlots.map((slot, sIdx) => {
                const st = getGrillState(slot.timer, slot.flipped, slot.glazed)
                return (
                  <div key={sIdx} className={`box grill-slot-card ${st.state}`}>
                    <div className="slot-head">
                      <strong>Slot {sIdx + 1}: {slot.id ? `${slot.icon} ${slot.name}` : 'Kosong'}</strong>
                      {slot.id && <span className="slot-timer">{Math.floor(slot.timer)}s</span>}
                    </div>

                    {slot.id ? (
                      <div className="slot-body">
                        <div className="slot-status" style={{color: st.color}}>
                          {st.label}
                        </div>
                        <div className="slot-meta">
                          <span>{slot.flipped ? '✓ Sisi 2' : 'Sisi 1'}</span>
                          <span>{slot.glazed ? '🍯 Saus Tare' : 'Belum Oles'}</span>
                        </div>
                        <div className="slot-actions">
                          {st.action === 'flip' && (
                            <button className="btn flip-btn" onClick={() => Gm.flipSate(sIdx)}>
                              🔄 Balik Sate
                            </button>
                          )}
                          {st.action === 'glaze' && (
                            <button className="btn glaze-btn" onClick={() => Gm.glazeSate(sIdx)}>
                              🍯 Oles Saus Tare
                            </button>
                          )}
                          {st.action === 'take' && (
                            <button className="btn take-btn" onClick={() => Gm.takeSateToPlate(sIdx)}>
                              🍽️ Ambil ke Piring Saji
                            </button>
                          )}
                          {st.action === 'discard' && (
                            <button className="btn discard-btn" onClick={() => Gm.discardSate(sIdx)}>
                              🗑️ Buang Sate Gosong
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="slot-pick">
                        <div className="pick-title">Pilih Tusuk Sate untuk Dipanggang:</div>
                        <div className="sate-picker-list">
                          {GRILL_ITEMS.map(it => {
                            const stockCount = g.sateStock[it.id] || 0
                            return (
                              <button
                                key={it.id}
                                className="btn sate-pick-btn"
                                disabled={stockCount <= 0}
                                onClick={() => Gm.putOnGrill(sIdx, it.id)}
                              >
                                {it.icon} {it.name} (Stok: {stockCount})
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="market-section-title">Beli Pasokan Sate Mentah dari Pasar (Isi per 5 tusuk):</div>
            <div className="sate-market-grid">
              {GRILL_ITEMS.map(it => {
                const cost5 = it.marketPrice * 5
                const currentStock = g.sateStock[it.id] || 0
                return (
                  <div key={it.id} className="box sate-market-card">
                    <div>
                      <strong>{it.icon} {it.name}</strong> • Stok: <strong>{currentStock}</strong>
                      <div className="item-desc">{it.desc}</div>
                    </div>
                    <button
                      className="btn"
                      disabled={g.money < cost5}
                      onClick={() => Gm.buySateStock(it.id, 5)}
                    >
                      Beli 5 Tusuk (¥{cost5})
                    </button>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setGrillOpen(false)}>Selesai Memanggang</button>
          </div>
        </div>
      )}

      {/* Modal Minigame Lelang Subuh Pasar Ikan Tsukiji */}
      {auctionOpen && !g.demo && (
        <div className="modal-overlay" onClick={() => setAuctionOpen(false)}>
          <div className="auction-modal box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">🐟 Lelang Subuh Pasar Ikan Tsukiji</div>
            <p className="auction-subtitle">
              Pasang tawaran harga lelang melawan pedagang kota untuk mengamankan bahan langka grade S-Tier!
            </p>

            {g.auctionSession ? (
              <div className="auction-content">
                <div className="box auction-item-card">
                  <div className="auc-icon">{g.auctionSession.item.icon}</div>
                  <div className="auc-info">
                    <h3>{g.auctionSession.item.name}</h3>
                    <p className="auc-desc">{g.auctionSession.item.desc}</p>
                    <div className="auc-buff">⭐ Efek Khusus: {g.auctionSession.item.boostDesc} ({g.auctionSession.item.servings} porsi)</div>
                  </div>
                </div>

                <div className="auction-status-bar">
                  <div className="box current-bid-box">
                    <span className="bid-label">Tawaran Tertinggi:</span>
                    <strong className="bid-amount">¥{g.auctionSession.currentBid.toLocaleString()}</strong>
                    <span className="bidder-name">Oleh: {g.auctionSession.highestBidder}</span>
                  </div>
                  
                  {!g.auctionSession.finished && (
                    <div className="box countdown-box">
                      <span className="countdown-lbl">Hitungan Palu Juru Lelang:</span>
                      <div className="countdown-bar">
                        <div
                          className="countdown-fill"
                          style={{width: `${Math.max(0, Math.min(100, (g.auctionSession.countdown / 3.8) * 100))}%`}}
                        />
                      </div>
                      <span className="hammer-indicator">
                        {g.auctionSession.hammerCount === 0 && 'Menunggu tawaran...'}
                        {g.auctionSession.hammerCount === 1 && '🔨 Tawaran PERTAMA!'}
                        {g.auctionSession.hammerCount === 2 && '🔨🔨 Tawaran KEDUA!'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Log Jalannya Lelang */}
                <div className="auction-log box">
                  {g.auctionSession.log.map((entry, idx) => (
                    <div key={idx} className="log-line">{entry}</div>
                  ))}
                </div>

                {/* Tombol Tawaran */}
                {!g.auctionSession.finished ? (
                  <div className="bid-actions-row">
                    <button className="btn bid-btn" onClick={() => Gm.placeAuctionBid(50)}>
                      +¥50
                    </button>
                    <button className="btn bid-btn" onClick={() => Gm.placeAuctionBid(100)}>
                      +¥100
                    </button>
                    <button className="btn bid-btn highlight" onClick={() => Gm.placeAuctionBid(200)}>
                      ⚡ +¥200 (Tawaran Kuat!)
                    </button>
                  </div>
                ) : (
                  <div className="auction-winner-box box">
                    <h3>
                      {g.auctionSession.winner === 'Kedai Oden (Anda)'
                        ? '🎉 ANDA MEMENANGKAN LELANG INI!'
                        : `Lelang Ditutup! Dimenangkan oleh ${g.auctionSession.winner}`}
                    </h3>
                    <button className="btn" onClick={() => Gm.startAuction()}>
                      Mulai Sesi Lelang Baru
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-auction box">
                <p>Sesi lelang belum dimulai hari ini.</p>
                <button className="btn" onClick={() => Gm.startAuction()}>
                  Buka Lelang Subuh Sekarang
                </button>
              </div>
            )}

            <button className="btn close-btn" onClick={() => setAuctionOpen(false)}>Kembali ke Kedai</button>
          </div>
        </div>
      )}

      {/* Modal Ramalan Nasib Pelanggan Showa (Omikuji) */}
      {g.activeFortune && (
        <div className="modal-overlay">
          <div className="fortune-modal box">
            <div className="omikuji-bamboo-head">
              <span className="bamboo-icon">🎋</span>
              <h2>Bilah Ramalan Nasib Omikuji</h2>
            </div>
            
            <div className="fortune-card box" style={{borderColor: g.activeFortune.result.badgeColor}}>
              <div className="kanji-display" style={{color: g.activeFortune.result.badgeColor}}>
                {g.activeFortune.result.kanji}
              </div>
              <h3 className="fortune-title">{g.activeFortune.result.title}</h3>
              <p className="fortune-poem">"{g.activeFortune.result.message}"</p>
              <div className="fortune-advice">
                <strong>Petuah Pemilik Kedai:</strong>
                <p>{g.activeFortune.result.advice}</p>
              </div>
              <div className="fortune-reward-badge">
                🎁 {g.activeFortune.result.rewardText}
              </div>
            </div>

            <button className="btn full-width" onClick={Gm.closeOmikuji}>
              Simpan Ramalan & Lanjutkan Melayani
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
