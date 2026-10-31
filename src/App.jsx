import {useEffect, useRef, useState} from 'react'
import {draw} from './render.js'
import * as Gm from './game.js'
import {
  ITEMS, CONDIMENTS, EQ, LV, LVREP, W, H, eqCost, COMPARTMENTS, getSimmerState,
  STAFF, GRILL_ITEMS, AUCTION_ITEMS, FORTUNES, getGrillState,
  DASHI_INGREDIENTS, getVatTier, GUEST_MOODS, GREETINGS, HEIRLOOMS,
  KNIFE_TECHNIQUES, DELIVERY_CLIENTS,
  SEASONS, MARKET_HEADLINES, MIDNIGHT_GUESTS, MASTERY_SKILLS, POLAROID_ALBUM, calculateKaisekiScore,
  FERMENTATION_RECIPES, FACTION_INFO, FACTION_DILEMMAS, canPrestige, ZASHIKI_VIP_GUESTS
} from './game.js'
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
  const [dashiOpen, setDashiOpen] = useState(false)
  const [knifeOpen, setKnifeOpen] = useState(false)
  const [deliveryOpen, setDeliveryOpen] = useState(false)
  const [heirloomOpen, setHeirloomOpen] = useState(false)
  const [seasonOpen, setSeasonOpen] = useState(false)
  const [cookOffOpen, setCookOffOpen] = useState(false)
  const [masteryOpen, setMasteryOpen] = useState(false)
  const [polaroidOpen, setPolaroidOpen] = useState(false)
  const [dynastyOpen, setDynastyOpen] = useState(false)
  const [grandPrixOpen, setGrandPrixOpen] = useState(false)
  const [cellarOpen, setCellarOpen] = useState(false)
  const [factionsOpen, setFactionsOpen] = useState(false)
  const [chosenApprentice, setChosenApprentice] = useState('kenji')
  const [showRiddleHint, setShowRiddleHint] = useState(false)
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
    setDashiOpen(false)
    setKnifeOpen(false)
    setDeliveryOpen(false)
    setHeirloomOpen(false)
    setSeasonOpen(false)
    setCookOffOpen(false)
    setMasteryOpen(false)
    setPolaroidOpen(false)
    setDynastyOpen(false)
    setGrandPrixOpen(false)
    setCellarOpen(false)
    setFactionsOpen(false)
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

        {/* Sertifikat Higienis Sanitasi */}
        {g.sanitationCertified && (
          <div className="box sanitation-badge" title="Sertifikat Higienis Hokenjo Bintang 5: Bebas Pajak (+15%)">
            📋 Higienis ★5
          </div>
        )}

        {/* Musim 4 Rupa Showa */}
        {g.season && (
          <button className="btn season-hud-btn" onClick={() => { closeAllModals(); setSeasonOpen(true) }} title={`Musim: ${g.season.name}`}>
            {g.season.icon} {g.season.name.split(' ')[0]}
          </button>
        )}

        {/* Shinya Shokudo Active Badge */}
        {g.midnightMode && (
          <div className="box midnight-badge" title="Shinya Shokudo: Buka Khusus Tengah Malam (02:00 - 05:00)">
            🏮 Shinya Shokudo ({g.hour}:00)
          </div>
        )}

        {/* Monopoli Distrik Turf War */}
        {g.districtMonopoly > 0 && (
          <div className="box monopoly-badge" title="Monopoli Distrik: Pelanggan Bertambah 100%">
            👑 Monopoli ({g.districtMonopoly}h)
          </div>
        )}

        {/* Biang Kaldu Master HUD Pill */}
        {g.masterVat && (
          <button className="btn vat-hud-btn" onClick={() => { closeAllModals(); setDashiOpen(true) }} title="Biang Kaldu Induk">
            🍲 {getVatTier(g.masterVat.ageDays, g.masterVat.scumLevel).name.split(' ')[0]} ({g.masterVat.ageDays}h)
          </button>
        )}

        {/* Alert Pesanan Telepon Masuk */}
        {g.activePhoneOrder && (
          <button className="btn phone-hud-btn" onClick={() => { closeAllModals(); setDeliveryOpen(true) }}>
            ☎️ Bento Antar!
          </button>
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

        {/* Indikator Arashi Rush & Zen Focus */}
        {g.arashi?.zenActive && (
          <div className="box zen-badge" title="Mata Batin Zen Focus: Waktu Melambat & Presisi Koki!">
            🧘 ZEN FOCUS ({Math.ceil(g.arashi.zenTimer)}s)
          </div>
        )}
        {g.arashi?.active && !g.arashi?.zenActive && (
          <div className="box arashi-badge" title="Arashi Rush Hour: Pesanan Badai & Tips x3.5!">
            ⚡ ARASHI RUSH x3.5 ({Math.ceil(g.arashi.duration)}s)
          </div>
        )}
        {!g.arashi?.active && g.arashi?.meter > 20 && (
          <div className="box arashi-meter-chip" title="Meteran Arashi Rush">
            ⚡ Arashi: {Math.floor(g.arashi.meter)}%
          </div>
        )}
        {g.grandPrixTrophy && (
          <div className="box trophy-badge" title="Piala Bergilir Kaisar Showa: Reputasi +50%">
            🏆 Juara Grand Prix
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
          <button className="btn" onClick={() => { closeAllModals(); setDashiOpen(true) }}>
            🍲 Kuali Master
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setKnifeOpen(true) }}>
            🔪 Pisau Koki
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setDeliveryOpen(true) }}>
            ☎️ Bento {g.activePhoneOrder ? '(!)' : ''}
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setHeirloomOpen(true) }}>
            🏺 Pusaka ({g.heirlooms ? g.heirlooms.length : 0}/4)
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setSeasonOpen(true) }}>
            🍂 Musim ({g.season?.icon})
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setCookOffOpen(true); if (!g.cookOffSession) Gm.startCookOff() }}>
            🔥 Duel Yamada
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setMasteryOpen(true) }}>
            📜 Keahlian ({g.masteryPoints} Pts)
          </button>
          <button className="btn" onClick={() => { closeAllModals(); setPolaroidOpen(true) }}>
            📷 Album ({g.polaroids ? g.polaroids.length : 0})
          </button>
          <button className="btn dynasty-btn" onClick={() => { closeAllModals(); setDynastyOpen(true) }}>
            🏛️ Dinasti {canPrestige(g) ? '(!)' : ''}
          </button>
          <button className="btn grandprix-btn" onClick={() => { closeAllModals(); setGrandPrixOpen(true); if (!g.grandPrixSession) Gm.startGrandPrix() }}>
            🏆 Grand Prix {g.grandPrixTrophy ? '★' : ''}
          </button>
          <button className="btn cellar-btn" onClick={() => { closeAllModals(); setCellarOpen(true) }}>
            🏺 Fermentasi
          </button>
          <button className="btn factions-btn" onClick={() => { closeAllModals(); setFactionsOpen(true) }}>
            ⚖️ Faksi Distrik {g.factions?.activeDilemma ? '(!)' : ''}
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
              {order.isZashiki
                ? `🏛️ ${order.zashikiData?.icon} ${order.zashikiData?.name} (${order.zashikiData?.title})`
                : order.isMidnightRiddle
                ? `🌙 ${order.midnightData?.avatar} ${order.midnightData?.name} (${order.midnightData?.title})`
                : order.isInspector
                ? `🏆 ${order.inspectorData?.avatar} ${order.inspectorData?.name} (${order.inspectorData?.title})`
                : order.isSanitation
                ? `📋 ${order.sanitationData?.avatar} ${order.sanitationData?.name} (${order.sanitationData?.title})`
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

          {/* Tamu Bangsawan Zashiki Ginza */}
          {order.isZashiki && order.zashikiData && (
            <div className="zashiki-card box">
              <div className="zashiki-title">🏛️ Jamuan Kehormatan Ginza: {order.zashikiData.name}</div>
              <div className="zashiki-dialogue">"{order.zashikiData.dialogue}"</div>
              <div className="zashiki-tip-hint">✨ Multiplier Anggaran: x{order.zashikiData.budgetMultiplier} | Sake Favorit: {order.zashikiData.favSake.toUpperCase()}</div>
            </div>
          )}

          {/* Mood Psikologi Tamu & Katarsis */}
          {order.mood && !order.isMidnightRiddle && (
            <div className="mood-box">
              <div className="mood-info">
                <span className="mood-title">{order.mood.icon} Mood: <strong>{order.mood.name}</strong></span>
                <span className="mood-desc">― {order.mood.desc}</span>
              </div>
              {order.catharsis && (
                <div className="catharsis-badge">✨ KATARSIS EMOSIONAL TERCAPAI! (Harga x1.5 & Air Mata Bahagia)</div>
              )}
            </div>
          )}

          {/* Teka-Teki Puitis Shinya Shokudo */}
          {order.isMidnightRiddle && order.midnightData && (
            <div className="midnight-riddle-card box">
              <div className="riddle-title">📜 Teka-Teki Puitis Tengah Malam:</div>
              <div className="riddle-quote">{order.midnightData.riddle}</div>
              {showRiddleHint ? (
                <div className="riddle-hint">💡 Petunjuk Koki: {order.midnightData.hint}</div>
              ) : (
                <button className="btn hint-btn" onClick={() => setShowRiddleHint(true)}>
                  💡 Buka Petunjuk Koki
                </button>
              )}
            </div>
          )}

          {/* Pemilihan Sapaan Koki jika belum disapa */}
          {order.mood && !order.greetingChosen && (
            <div className="greeting-box box">
              <span className="greeting-title">🗣️ Sapa Tamu dengan Empati:</span>
              <div className="greeting-btn-grid">
                {GREETINGS.map(gr => (
                  <button
                    key={gr.id}
                    className="btn greeting-btn"
                    onClick={() => Gm.greetCustomer(gr.id)}
                    title={gr.text}
                  >
                    {gr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {/* Sommelier Sake Pairing Bar */}
          <div className="sake-sommelier-bar box">
            <span className="sake-label">🍶 Pasangan Sake (Sommelier):</span>
            <button
              className={`btn sake-chip-btn ${order.servedSake === 'atsukan' ? 'active' : ''}`}
              onClick={() => Gm.serveSakeBottle('atsukan')}
              title="Atsukan Hangat: Harmoni dengan kue tahu, telur & mochi"
            >
              🍶 Atsukan
            </button>
            <button
              className={`btn sake-chip-btn ${order.servedSake === 'ginjo' ? 'active' : ''}`}
              onClick={() => Gm.serveSakeBottle('ginjo')}
              title="Junmai Ginjo: Segar untuk lobak & kuah bening"
            >
              🍶 Junmai Ginjo
            </button>
            <button
              className={`btn sake-chip-btn ${order.servedSake === 'koshu' ? 'active' : ''}`}
              onClick={() => Gm.serveSakeBottle('koshu')}
              disabled={(g.fermentation?.inventory?.vintage_koshu || 0) <= 0}
              title="Koshu Vintage 1975: Harmoni mewah untuk daging urat sapi & kepiting"
            >
              🍶 Koshu 1975 ({g.fermentation?.inventory?.vintage_koshu || 0})
            </button>
            {order.servedSake && (
              <span className="served-sake-status">✅ Sake Disajikan: <strong>{order.servedSake.toUpperCase()}</strong></span>
            )}
          </div>

          <div className="row plate-row">
            <strong>Piring Saji:</strong>
            {(() => {
              const kScore = calculateKaisekiScore(g.plate, g.plateCondiments, g.plateSate)
              return (
                <span className={`kaiseki-score-badge ${kScore >= 80 ? 'gold' : ''}`} title="Harmoni Estetika Visual Kaiseki">
                  🍱 Kaiseki: {kScore}%
                </span>
              )
            })()}
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

      {/* Modal Biang Kaldu Master & Kuali Fermentasi */}
      {dashiOpen && (
        <div className="modal-overlay" onClick={() => setDashiOpen(false)}>
          <div className="dashi-modal box" onClick={e => e.stopPropagation()}>
            <div className="dashi-header">
              <h2>🍲 Kuali Biang Kaldu Induk (Master Dashi Vat)</h2>
              <p className="dashi-subtitle">Fermentasi kaldu harian Showa untuk menghasilkan umami legendaris.</p>
            </div>

            {g.masterVat && (() => {
              const vt = getVatTier(g.masterVat.ageDays, g.masterVat.scumLevel)
              return (
                <div className="vat-status-card box" style={{borderColor: vt.color}}>
                  <div className="vat-tier-badge" style={{color: vt.color}}>
                    {vt.name}
                  </div>
                  <p className="vat-tier-desc">{vt.desc}</p>

                  <div className="vat-metrics-grid">
                    <div className="vat-metric">
                      <span>Usia Kaldu:</span>
                      <strong>{g.masterVat.ageDays} Hari Berjalan</strong>
                    </div>
                    <div className="vat-metric">
                      <span>Kejernihan:</span>
                      <strong>{g.masterVat.clarity}%</strong>
                    </div>
                    <div className="vat-metric">
                      <span>Tingkat Busa & Kotoran:</span>
                      <strong style={{color: g.masterVat.scumLevel > 60 ? '#e74c3c' : '#2ecc71'}}>
                        {g.masterVat.scumLevel}%
                      </strong>
                    </div>
                  </div>

                  <button className="btn filter-scum-btn" onClick={Gm.filterVatScum}>
                    🥄 Saring Busa & Abu Kaldu (Bersihkan Kuali)
                  </button>
                </div>
              )
            })()}

            <h3 className="section-title">Tambahkan Bahan Racikan Master Kaldu:</h3>
            <div className="dashi-ingredients-grid">
              {DASHI_INGREDIENTS.map(ing => (
                <div key={ing.id} className="box dashi-ing-card">
                  <div className="ing-head">
                    <span className="ing-icon">{ing.icon}</span>
                    <div>
                      <strong>{ing.name}</strong>
                      <div className="ing-cost">Biaya: ¥{ing.cost}</div>
                    </div>
                  </div>
                  <p className="ing-desc">{ing.desc}</p>
                  <button
                    className="btn brew-btn"
                    disabled={g.money < ing.cost}
                    onClick={() => Gm.brewVatIngredient(ing.id)}
                  >
                    + Tuang ke Kuali (¥{ing.cost})
                  </button>
                </div>
              ))}
            </div>

            <button className="btn close-btn" onClick={() => setDashiOpen(false)}>Tutup Dapur Kaldu</button>
          </div>
        </div>
      )}

      {/* Modal Pisau Dapur Presisi Siang Hari */}
      {knifeOpen && (
        <div className="modal-overlay" onClick={() => setKnifeOpen(false)}>
          <div className="knife-modal box" onClick={e => e.stopPropagation()}>
            <div className="knife-header">
              <h2>🔪 Minigame Pisau Dapur Presisi (Master Knife Prep)</h2>
              <p className="knife-subtitle">Iris pola wajik dan ikat simpul presisi agar bahan bernilai Bintang Koki!</p>
            </div>

            <div className="knife-stock-bar box">
              <span>Stok Bahan Masterwork:</span>
              <span className="prep-chip">✨ Lobak Berlian: {g.masterPrepStock?.daikon || 0}</span>
              <span className="prep-chip">🎀 Kinchaku Simpul: {g.masterPrepStock?.kinchaku || 0}</span>
              <span className="prep-chip">🍢 Sate Spiral: {g.masterPrepStock?.yakitori || 0}</span>
            </div>

            {!g.knifePrepSession ? (
              <div className="tech-selection-grid">
                {KNIFE_TECHNIQUES.map(tech => (
                  <div key={tech.id} className="box tech-card">
                    <span className="tech-icon">{tech.icon}</span>
                    <h3>{tech.name}</h3>
                    <p className="tech-desc">{tech.desc}</p>
                    <button
                      className="btn start-prep-btn"
                      disabled={(g.stock[tech.targetItem] || 0) < tech.baseStockCost}
                      onClick={() => Gm.startKnifePrep(tech.id)}
                    >
                      Mulai Iris (Butuh {tech.baseStockCost} {item(tech.targetItem)?.n || tech.targetItem})
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="knife-session-box box">
                <h3>{g.knifePrepSession.technique.name}</h3>
                <p>Klik tombol atau tekan Spasi saat kursor berada di Zona Emas Tengah!</p>

                {/* Timing bar */}
                <div className="knife-timing-bar">
                  <div className="zone-target" style={{left: '42%', width: '16%'}} />
                  <div className="zone-perfect" style={{left: '48%', width: '4%'}} />
                  <div
                    className="knife-cursor"
                    style={{left: `${Math.max(0, Math.min(100, g.knifePrepSession.cursor))}%`}}
                  />
                </div>

                <div className="knife-strike-status">
                  <span>Sisa Tebasan: {'🔪'.repeat(g.knifePrepSession.strikesRemaining)}</span>
                  <div className="strikes-history">
                    {g.knifePrepSession.scoreHistory.map((res, idx) => (
                      <span key={idx} className={`strike-badge ${res}`}>
                        {res === 'perfect' ? '⭐ Sempurna!' : res === 'good' ? 'Pas' : 'Meleset'}
                      </span>
                    ))}
                  </div>
                </div>

                {!g.knifePrepSession.finished ? (
                  <button className="btn chop-btn highlight" onClick={() => Gm.chopKnife()}>
                    ⚔️ TEBAS PISAU SEKARANG!
                  </button>
                ) : (
                  <div className="prep-result-box">
                    <h4>
                      {g.knifePrepSession.finalGrade === 'masterwork'
                        ? '🏆 HASIL: MASTERWORK CUT (Bintang Koki)!'
                        : g.knifePrepSession.finalGrade === 'good'
                        ? '✨ HASIL: KUALITAS BAGUS!'
                        : '❌ HASIL: POTONGAN RUSAK'}
                    </h4>
                    <button className="btn" onClick={Gm.closeKnifePrep}>
                      Selesai & Kembali ke Menu
                    </button>
                  </div>
                )}
              </div>
            )}

            <button className="btn close-btn" onClick={() => setKnifeOpen(false)}>Kembali ke Kedai</button>
          </div>
        </div>
      )}

      {/* Modal Pesanan Telepon Putar & Bento Sepeda */}
      {deliveryOpen && (
        <div className="modal-overlay" onClick={() => setDeliveryOpen(false)}>
          <div className="delivery-modal box" onClick={e => e.stopPropagation()}>
            <div className="delivery-header">
              <h2>☎️ Pesanan Telepon Putar & Bento Antar Sepeda</h2>
              <p className="delivery-subtitle">Kemas paket bento hangat dan kirim melintasi jalanan malam kota Tokyo.</p>
            </div>

            {!g.activePhoneOrder ? (
              <div className="no-order-box box">
                <p>Telepon meja saat ini tenang.</p>
                <button className="btn answer-btn highlight" onClick={Gm.answerPhone}>
                  ☎️ Angkat Telepon Meja (Terima Pesanan Masuk)
                </button>
              </div>
            ) : (
              <div className="delivery-active-box">
                <div className="box client-card">
                  <div className="client-head">
                    <span className="client-icon">{g.activePhoneOrder.client.icon}</span>
                    <div>
                      <h3>{g.activePhoneOrder.client.name}</h3>
                      <p className="client-desc">{g.activePhoneOrder.client.desc}</p>
                    </div>
                  </div>
                  <div className="client-rewards">
                    <span>Bayaran Dasar: <strong>¥{g.activePhoneOrder.client.basePay}</strong></span>
                    <span>Reputasi Distrik: <strong>+{g.activePhoneOrder.client.rewardRep}</strong></span>
                  </div>
                </div>

                {/* Termometer Bento */}
                <div className="bento-temp-card box">
                  <span className="temp-label">
                    🌡️ Suhu Kehangatan Bento: {Math.round(g.activePhoneOrder.temperature)}°C
                    {g.activePhoneOrder.temperature >= 65 ? ' (🔥 Panas Beruap / Tip Maksimal!)' : ' (Mulai Mendingin)'}
                  </span>
                  <div className="temp-bar">
                    <div
                      className="temp-fill"
                      style={{
                        width: `${Math.max(0, Math.min(100, g.activePhoneOrder.temperature))}%`,
                        background: g.activePhoneOrder.temperature >= 65 ? '#ff4757' : g.activePhoneOrder.temperature >= 45 ? '#ffa502' : '#70a1ff'
                      }}
                    />
                  </div>
                </div>

                {/* Slot Bento Box */}
                <div className="bento-box-container box">
                  <h4>🍱 Kotak Bento Kayu (Butuh 3 Oden):</h4>
                  <div className="bento-slots">
                    {[0, 1, 2].map(slotIdx => {
                      const packedId = g.activePhoneOrder.packedItems[slotIdx]
                      return (
                        <div key={slotIdx} className="bento-slot">
                          {packedId ? (
                            <Chip id={packedId} />
                          ) : (
                            <span className="empty-slot">Slot {slotIdx + 1} Kosong</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {g.activePhoneOrder.status === 'pending' && (
                    <div className="pack-options">
                      <span>Pilih dari Stok Gudang untuk Dikemas:</span>
                      <div className="pack-buttons">
                        {g.activePhoneOrder.client.requiredItems.map(reqId => (
                          <button
                            key={reqId}
                            className="btn pack-btn"
                            disabled={(g.stock[reqId] || 0) <= 0}
                            onClick={() => Gm.packBento(reqId)}
                          >
                            + Masukkan {item(reqId)?.n || reqId} (Sisa: {g.stock[reqId] || 0})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol Aksi Pengantaran */}
                <div className="delivery-action-row">
                  {g.activePhoneOrder.status === 'packed' && (
                    <button className="btn dispatch-btn highlight" onClick={Gm.dispatchBento}>
                      🚴 Kirim Antar Sepeda Sekarang (Staf Kenji)!
                    </button>
                  )}
                  {g.activePhoneOrder.status === 'delivering' && (
                    <div className="delivering-status box">
                      <span>🚴 Kenji sedang mengayuh sepeda menerjang malam... ({Math.ceil(20 - g.activePhoneOrder.deliveryTimer)}s)</span>
                    </div>
                  )}
                  {g.activePhoneOrder.status === 'delivered' && (
                    <button className="btn claim-btn highlight" onClick={Gm.claimDeliveryReward}>
                      💰 Klaim Pembayaran Bento + Tip Hangat!
                    </button>
                  )}
                  <button className="btn cancel-btn" onClick={Gm.dismissDelivery}>
                    Batalkan Pesanan
                  </button>
                </div>
              </div>
            )}

            <button className="btn close-btn" onClick={() => setDeliveryOpen(false)}>Kembali ke Kedai</button>
          </div>
        </div>
      )}

      {/* Modal Koleksi Barang Pusaka Bersejarah Showa */}
      {heirloomOpen && (
        <div className="modal-overlay" onClick={() => setHeirloomOpen(false)}>
          <div className="heirloom-modal box" onClick={e => e.stopPropagation()}>
            <div className="heirloom-header">
              <h2>🏺 Koleksi Barang Pusaka Showa ({g.heirlooms ? g.heirlooms.length : 0}/{HEIRLOOMS.length})</h2>
              <p className="heirloom-subtitle">Pemberian penuh haru dari para tamu yang menemukan ketenangan jiwa di kedai Anda.</p>
            </div>

            <div className="heirlooms-grid">
              {HEIRLOOMS.map(item => {
                const isOwned = g.heirlooms && g.heirlooms.includes(item.id)
                return (
                  <div key={item.id} className={`box heirloom-card ${isOwned ? 'owned' : 'locked'}`}>
                    <div className="heirloom-icon">{isOwned ? item.icon : '🔒'}</div>
                    <div className="heirloom-info">
                      <h3>{isOwned ? item.name : 'Pusaka Terkunci'}</h3>
                      <p className="heirloom-desc">{isOwned ? item.desc : 'Tercapai saat tamu mengalami katarsis emosional mendalam.'}</p>
                      {isOwned && <span className="passive-badge">⚡ Efek Pasif Aktif Permanen</span>}
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setHeirloomOpen(false)}>Tutup Lemari Pusaka</button>
          </div>
        </div>
      )}

      {/* Modal Pilihan Jam 02:00 Shinya Shokudo */}
      {g.shinyaPrompt && !g.dayClosed && (
        <div className="modal-overlay">
          <div className="shinya-prompt-modal box">
            <div className="shinya-prompt-header">
              <span className="shinya-icon">🌙</span>
              <h2>Jam 02:00 Dini Hari Telah Tiba...</h2>
            </div>
            <p className="shinya-prompt-desc">
              Lonceng kota berdentang, lampu jalanan mulai redup. Apakah Anda ingin menutup kedai untuk beristirahat, atau menyalakan lampion ungu dan menyambut tamu-tamu malam yang penuh teka-teki?
            </p>
            <div className="shinya-prompt-actions">
              <button className="btn shinya-accept-btn highlight" onClick={Gm.openShinyaShokudo}>
                🏮 Buka Mode Shinya Shokudo (02:00 - 05:00 Dini Hari)
              </button>
              <button className="btn shinya-sleep-btn" onClick={Gm.closeDayDirectly}>
                ☀️ Tutup Kedai & Tidur (Hitung Laba Hari Ini)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Siklus 4 Musim & Berita Pasar Spekulatif */}
      {seasonOpen && (
        <div className="modal-overlay" onClick={() => setSeasonOpen(false)}>
          <div className="season-modal box" onClick={e => e.stopPropagation()}>
            <div className="season-header">
              <h2>🍂 Siklus 4 Musim & Berita Pasar Showa</h2>
              <p className="season-subtitle">Musim berganti tiap 7 hari membawa cita rasa dan fluktuasi harga komoditas pasar.</p>
            </div>

            {/* Banner Berita Pasar Hari Ini */}
            {g.marketNews && (
              <div className="market-news-banner box">
                <span className="news-tag">WARTA PASAR HARI INI:</span>
                <strong className="news-headline">{g.marketNews.headline}</strong>
                <p className="news-desc">{g.marketNews.desc}</p>
              </div>
            )}

            {/* Grid 4 Musim */}
            <div className="seasons-grid">
              {SEASONS.map(s => {
                const isCurrent = g.season?.id === s.id
                return (
                  <div key={s.id} className={`box season-card ${isCurrent ? 'active-season' : ''}`} style={{borderColor: s.color}}>
                    <div className="season-card-head">
                      <span className="season-icon">{s.icon}</span>
                      <div>
                        <h3>{s.name}</h3>
                        <span className="season-kanji" style={{color: s.color}}>{s.kanji}</span>
                      </div>
                      {isCurrent && <span className="active-season-badge">Musim Aktif</span>}
                    </div>
                    <p className="season-desc">{s.desc}</p>
                    <div className="season-special-box box">
                      <span className="special-lbl">Bahan Musiman Eksklusif:</span>
                      <div className="special-item-info">
                        <strong>{s.specialItem.icon} {s.specialItem.name}</strong>
                        <span>Nilai Jual: +¥{s.specialItem.sellPrice}</span>
                      </div>
                      <p className="special-desc">{s.specialItem.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setSeasonOpen(false)}>Tutup Kalender Musim</button>
          </div>
        </div>
      )}

      {/* Modal Duel Kuliner Terbuka vs Yamada-ya (Cook-Off Turf War) */}
      {cookOffOpen && (
        <div className="modal-overlay" onClick={() => setCookOffOpen(false)}>
          <div className="cookoff-modal box" onClick={e => e.stopPropagation()}>
            <div className="cookoff-header">
              <h2>🔥 Duel Kuliner Jalanan: Kedai Oden vs Yamada-ya!</h2>
              <p className="cookoff-subtitle">Pertarungan 3 babak di hadapan juri warga distrik demi supremasi jalanan.</p>
            </div>

            {g.cookOffSession ? (
              <div className="cookoff-arena box">
                {/* Scoreboard */}
                <div className="cookoff-scoreboard box">
                  <div className="team-score player">
                    <span className="team-name">👨‍🍳 Kedai Anda</span>
                    <strong className="score-val">{g.cookOffSession.playerScore} Pts</strong>
                  </div>
                  <span className="vs-badge">VS</span>
                  <div className="team-score rival">
                    <span className="team-name">🏮 Yamada-ya</span>
                    <strong className="score-val">{g.cookOffSession.rivalScore} Pts</strong>
                  </div>
                </div>

                {/* Round Tracker */}
                <div className="round-tracker">
                  <span className="round-badge">
                    {g.cookOffSession.finished
                      ? '🏁 DUEL SELESAI'
                      : `BABAK ${g.cookOffSession.round} DARI 3: ${
                          g.cookOffSession.round === 1
                            ? 'Adu Harum Kaldu'
                            : g.cookOffSession.round === 2
                            ? 'Kecepatan Panggangan Sate'
                            : 'Harmoni Kaiseki Final'
                        }`}
                  </span>
                  {!g.cookOffSession.finished && (
                    <span className="round-timer">
                      Sisa Waktu:{' '}
                      {Math.ceil(
                        g.cookOffSession.round === 1
                          ? g.cookOffSession.roundData.round1Timer
                          : g.cookOffSession.roundData.round2Timer
                      )}
                      s
                    </span>
                  )}
                </div>

                {/* Action Interactive Button */}
                {!g.cookOffSession.finished ? (
                  <div className="cookoff-action-area">
                    {g.cookOffSession.round === 1 && (
                      <button className="btn cookoff-btn aroma highlight" onClick={Gm.performCookOffAction}>
                        💨 KLIK SECEPATNYA: Tiup & Kuatkan Aroma Kaldu! ({g.cookOffSession.roundData.round1AromaClicks}x)
                      </button>
                    )}
                    {g.cookOffSession.round === 2 && (
                      <button className="btn cookoff-btn speed highlight" onClick={Gm.performCookOffAction}>
                        🍢 KLIK SECEPATNYA: Balik Tusukan Sate Yakitori! ({g.cookOffSession.roundData.round2SateCount}x)
                      </button>
                    )}
                    {g.cookOffSession.round === 3 && (
                      <button className="btn cookoff-btn finalize highlight" onClick={Gm.performCookOffAction}>
                        🍱 Tampilkan Harmoni Tata Hidang ke Juri!
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="cookoff-winner-banner box">
                    <h3>
                      {g.cookOffSession.winner === 'player'
                        ? '🎉 ANDA MEMENANGKAN DUEL KULINER DISTRIK!'
                        : '❌ Yamada-ya Memenangkan Duel Kali Ini!'}
                    </h3>
                    <p>
                      {g.cookOffSession.winner === 'player'
                        ? 'Warga distrik berbondong-bondong memenuhi kedai Anda! (Monopoli Distrik 3 Hari)'
                        : 'Jangan menyerah! Latih kembali keahlian koki dan tantang mereka lagi!'}
                    </p>
                    <button className="btn highlight" onClick={Gm.startCookOff}>
                      Mulai Duel Ulang
                    </button>
                  </div>
                )}

                {/* Battle Logs */}
                <div className="cookoff-log box">
                  {g.cookOffSession.log.map((entry, idx) => (
                    <div key={idx} className="log-line">{entry}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-cookoff box">
                <p>Yamada-ya sedang bersiap di gerobak seberang jalan.</p>
                <button className="btn highlight" onClick={Gm.startCookOff}>
                  Tantang Yamada-ya ke Alun-Alun Duel!
                </button>
              </div>
            )}

            <button className="btn close-btn" onClick={() => setCookOffOpen(false)}>Kembali ke Kedai</button>
          </div>
        </div>
      )}

      {/* Modal Pohon Keahlian Koki (Chef Mastery Skill Tree) */}
      {masteryOpen && (
        <div className="modal-overlay" onClick={() => setMasteryOpen(false)}>
          <div className="mastery-modal box" onClick={e => e.stopPropagation()}>
            <div className="mastery-header">
              <h2>📜 Pohon Keahlian Koki & Buku Silsilah Pusaka</h2>
              <p className="mastery-subtitle">
                Tersedia <strong>{g.masteryPoints} Poin Keahlian</strong>. Dapatkan +1 poin setiap 4 tamu terlayani dengan puas.
              </p>
            </div>

            <div className="mastery-grid">
              {['itamae', 'kokoro', 'homura', 'akiudo'].map(branchId => {
                const branchSkills = MASTERY_SKILLS.filter(s => s.branch === branchId)
                const branchName = {
                  itamae: '🔪 Cabang Pisau Emas (Itamae)',
                  kokoro: '💖 Cabang Batin & Empati (Kokoro)',
                  homura: '🔥 Cabang Api & Arang (Homura)',
                  akiudo: '🪙 Cabang Bisnis & Relasi (Akiudo)'
                }[branchId]

                return (
                  <div key={branchId} className="box branch-card">
                    <h3 className="branch-title">{branchName}</h3>
                    <div className="branch-skills-list">
                      {branchSkills.map(sk => {
                        const isUnlocked = g.unlockedSkills?.includes(sk.id)
                        return (
                          <div key={sk.id} className={`box skill-node ${isUnlocked ? 'unlocked' : ''}`}>
                            <div className="skill-head">
                              <span className="skill-icon">{sk.icon}</span>
                              <div>
                                <strong>{sk.name}</strong>
                                <span className="skill-cost">Biaya: {sk.cost} Poin</span>
                              </div>
                            </div>
                            <p className="skill-desc">{sk.desc}</p>
                            {isUnlocked ? (
                              <span className="skill-unlocked-tag">✅ Aktif Permanen</span>
                            ) : (
                              <button
                                className="btn unlock-btn"
                                disabled={g.masteryPoints < sk.cost}
                                onClick={() => Gm.unlockMasterySkill(sk.id)}
                              >
                                Buka ({sk.cost} Pts)
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setMasteryOpen(false)}>Tutup Buku Silsilah</button>
          </div>
        </div>
      )}

      {/* Modal Album Foto Polaroid Nostalgia Showa */}
      {polaroidOpen && (
        <div className="modal-overlay" onClick={() => setPolaroidOpen(false)}>
          <div className="polaroid-modal box" onClick={e => e.stopPropagation()}>
            <div className="polaroid-header">
              <h2>📷 Album Foto Polaroid Kenangan Showa ({g.polaroids ? g.polaroids.length : 0}/{POLAROID_ALBUM.length})</h2>
              <p className="polaroid-subtitle">
                Koleksi jepretan kamera instan dari momen-momen paling menyentuh hati di meja kedai oden Anda.
              </p>
            </div>

            <div className="polaroid-grid">
              {POLAROID_ALBUM.map(photo => {
                const isCollected = g.polaroids?.includes(photo.id)
                return (
                  <div key={photo.id} className={`polaroid-frame ${isCollected ? 'collected' : 'uncollected'}`} style={{borderColor: photo.borderColor}}>
                    <div className="polaroid-photo-area">
                      {isCollected ? (
                        <div className="polaroid-inner-art">
                          <span className="photo-icon">{photo.icon}</span>
                          <span className="photo-date">{photo.dateText}</span>
                        </div>
                      ) : (
                        <div className="photo-locked">🔒 Foto Belum Terbuka</div>
                      )}
                    </div>
                    <div className="polaroid-caption">
                      <h4>{isCollected ? photo.title : '???'}</h4>
                      <span className="polaroid-guest">{isCollected ? photo.guestName : 'Tamu Misteri'}</span>
                      <p className="polaroid-quote">{isCollected ? photo.desc : 'Raih harmoni Kaiseki atau tuntaskan teka-teki Shinya Shokudo untuk membuka foto ini.'}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn close-btn" onClick={() => setPolaroidOpen(false)}>Tutup Album Kenangan</button>
          </div>
        </div>
      )}

      {/* 1. Modal Warisan Dinasti Showa & Restoran Ginza */}
      {dynastyOpen && (
        <div className="modal-overlay" onClick={() => setDynastyOpen(false)}>
          <div className="dynasty-modal box" onClick={e => e.stopPropagation()}>
            <div className="dynasty-header">
              <h2>🏛️ Warisan Dinasti Showa & Restoran Ginza</h2>
              <p className="dynasty-subtitle">
                Buka lembaran sejarah baru, serahkan gerobak lama kepada murid kepala, dan resmikan restoran mewah di Ginza.
              </p>
            </div>

            <div className="dynasty-status-grid">
              <div className="dynasty-card">
                <span className="card-label">Tingkat Dinasti</span>
                <span className="card-val">👑 Level {g.dynasty?.dynastyLevel || 0}</span>
                <span className="card-sub">{g.dynasty?.totalPrestiges || 0} Kali Reinkarnasi Warisan</span>
              </div>
              <div className="dynasty-card">
                <span className="card-label">Kaldu Emas Abadi</span>
                <span className="card-val">{g.dynasty?.goldenDashiActive ? '✨ Aktif' : '🔒 Belum Aktif'}</span>
                <span className="card-sub">+25% Kepuasan Dasar Semua Tamu</span>
              </div>
              <div className="dynasty-card">
                <span className="card-label">Murid Pengelola Gerobak</span>
                <span className="card-val">
                  {g.dynasty?.apprentice === 'kenji' ? '🧑‍🍳 Kenji' : g.dynasty?.apprentice === 'aoi' ? '🎸 Nona Aoi' : 'Belum Ada'}
                </span>
                <span className="card-sub">Total Dividen: ¥{(g.dynasty?.apprenticeEarningsTotal || 0).toLocaleString()}</span>
              </div>
              <div className="dynasty-card">
                <span className="card-label">Ruang Jamuan Zashiki</span>
                <span className="card-val">{g.dynasty?.zashikiUnlocked ? '🏯 Terbuka' : '🔒 Khusus Ginza'}</span>
                <span className="card-sub">Menjamu Tamu Bangsawan & Zaibatsu</span>
              </div>
            </div>

            <div className="dynasty-prestige-section box">
              <h3>👑 Bangun Dinasti Baru (Prestige Reincarnation)</h3>
              <p className="prestige-desc">
                Syarat: Mencapai Bintang Michelin 3 (★★★) atau Reputasi 85 atau modal ¥60.000.
                Anda akan mewariskan gerobak lama kepada murid pilihan dan membuka Restoran Flagship Ginza!
              </p>

              <div className="apprentice-selection">
                <span className="select-label">Pilih Murid Kepala untuk Mengelola Gerobak Lama:</span>
                <div className="apprentice-options">
                  <button
                    className={`btn apprentice-btn ${chosenApprentice === 'kenji' ? 'selected' : ''}`}
                    onClick={() => setChosenApprentice('kenji')}
                  >
                    🧑‍🍳 Kenji (Dividen Stabil & Bahan Otomatis)
                  </button>
                  <button
                    className={`btn apprentice-btn ${chosenApprentice === 'aoi' ? 'selected' : ''}`}
                    onClick={() => setChosenApprentice('aoi')}
                  >
                    🎸 Nona Aoi (Dividen Tinggi dari Fans Musik)
                  </button>
                </div>
              </div>

              {canPrestige(g) ? (
                <button
                  className="btn execute-prestige-btn"
                  onClick={() => {
                    Gm.triggerPrestige(chosenApprentice)
                    setDynastyOpen(false)
                  }}
                >
                  👑 Resmikan Warisan Dinasti & Buka Restoran Ginza (+¥15.000 Modal)
                </button>
              ) : (
                <div className="prestige-locked-hint">
                  🔒 Belum memenuhi syarat prestige. Kumpulkan 3 Bintang Michelin, ¥60.000, atau Reputasi 85!
                </div>
              )}
            </div>

            <button className="btn close-btn" onClick={() => setDynastyOpen(false)}>Tutup Panel Dinasti</button>
          </div>
        </div>
      )}

      {/* 2. Modal Turnamen Akbar Grand Prix Kanto vs Kansai */}
      {grandPrixOpen && (
        <div className="modal-overlay" onClick={() => setGrandPrixOpen(false)}>
          <div className="grandprix-modal box" onClick={e => e.stopPropagation()}>
            <div className="grandprix-header">
              <h2>🏆 The Grand Showa Culinary Grand Prix</h2>
              <p className="grandprix-subtitle">
                Pertarungan akbar 3 babak knockout melawan Master Koki Ryuji dari Kansai demi memperebutkan Piala Bergilir Kaisar!
              </p>
            </div>

            {g.grandPrixSession ? (
              <div className="grandprix-arena box">
                <div className="grandprix-status-bar">
                  <span className="arena-round">
                    {g.grandPrixSession.finished
                      ? '🏁 HASIL AKHIR PERTANDINGAN'
                      : `BABAK ${g.grandPrixSession.round}: ${
                          g.grandPrixSession.round === 1
                            ? 'Ujian Rasa Dashi Buta'
                            : g.grandPrixSession.round === 2
                            ? 'Speed Kaiseki Plating'
                            : 'Duel Kuali Api Ryuji'
                        }`}
                  </span>
                  <span className="arena-score">
                    Skor: Anda ({g.grandPrixSession.playerScore}) vs Ryuji ({g.grandPrixSession.rivalScore})
                  </span>
                  {!g.grandPrixSession.finished && (
                    <span className="arena-timer">⏱️ {Math.max(0, Math.ceil(g.grandPrixSession.timer))}s</span>
                  )}
                </div>

                {/* Konten Tiap Babak */}
                {g.grandPrixSession.round === 1 && !g.grandPrixSession.round1Data.submitted && (
                  <div className="round1-arena">
                    <p className="round-instruction">
                      Seimbangkan ketiga takaran dashi agar mendekati harmoni rahasia dewan juri kekaisaran!
                    </p>
                    <div className="slider-row">
                      <span>🌿 Kombu Hokkaido: {g.grandPrixSession.round1Data.kombu}%</span>
                      <div className="slider-btns">
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'kombu', -10)}>-10</button>
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'kombu', 10)}>+10</button>
                      </div>
                    </div>
                    <div className="slider-row">
                      <span>🐟 Katsuobushi Asap: {g.grandPrixSession.round1Data.katsuo}%</span>
                      <div className="slider-btns">
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'katsuo', -10)}>-10</button>
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'katsuo', 10)}>+10</button>
                      </div>
                    </div>
                    <div className="slider-row">
                      <span>🍶 Shoyu Tradisional: {g.grandPrixSession.round1Data.shoyu}%</span>
                      <div className="slider-btns">
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'shoyu', -10)}>-10</button>
                        <button className="btn" onClick={() => Gm.adjustDashiRatio(g.grandPrixSession, 'shoyu', 10)}>+10</button>
                      </div>
                    </div>
                    <button className="btn submit-r1-btn" onClick={() => Gm.submitDashiTasting(g.grandPrixSession)}>
                      🍲 Sajikan Dashi ke Meja Juri!
                    </button>
                  </div>
                )}

                {g.grandPrixSession.round === 2 && (
                  <div className="round2-arena">
                    <p className="round-instruction">
                      Tata 3 bahan pesanan dewan juri (Lobak, Telur, Kepiting Matsuba) ke atas piring saji secepat mungkin!
                    </p>
                    <div className="target-plating-badges">
                      <span>Target Juri: </span>
                      <span className="badge">Lobak</span>
                      <span className="badge">Telur</span>
                      <span className="badge">Kepiting Matsuba</span>
                    </div>
                    <div className="plating-pick-row">
                      {['daikon', 'egg', 'matsuba_crab', 'chikuwa', 'gyusuji'].map(id => (
                        <button
                          key={id}
                          className="btn plate-pick-btn"
                          onClick={() => Gm.addPlatingItem(g.grandPrixSession, id)}
                        >
                          + {item(id)?.n || id}
                        </button>
                      ))}
                    </div>
                    <div className="placed-status">
                      Piring Anda: {g.grandPrixSession.round2Data.placedItems.map(id => item(id)?.n || id).join(', ') || '(Kosong)'}
                    </div>
                  </div>
                )}

                {g.grandPrixSession.round === 3 && !g.grandPrixSession.finished && (
                  <div className="round3-arena">
                    <p className="round-instruction">
                      Klik tombol kuali secepat mungkin untuk menyempurnakan karamelisasi Kaldu Imperial sebelum Ryuji menyusul!
                    </p>
                    <div className="duel-gauge-bar">
                      <div className="bar-fill player" style={{width: `${Math.min(100, (g.grandPrixSession.round3Data.potHeatClicks / 25) * 100)}%`}}>
                        Anda: {g.grandPrixSession.round3Data.potHeatClicks}/25
                      </div>
                      <div className="bar-fill rival" style={{width: `${Math.min(100, (g.grandPrixSession.round3Data.rivalClicks / 25) * 100)}%`}}>
                        Ryuji: {Math.floor(g.grandPrixSession.round3Data.rivalClicks)}/25
                      </div>
                    </div>
                    <button className="btn stir-pot-btn" onClick={() => Gm.clickGrandPrixStir(g.grandPrixSession)}>
                      🔥 ADUK KUALI SECEPATNYA!
                    </button>
                  </div>
                )}

                {/* Log Pertandingan */}
                <div className="grandprix-log-box">
                  {g.grandPrixSession.log.map((line, lIdx) => (
                    <div key={lIdx} className="log-line">{line}</div>
                  ))}
                </div>

                {g.grandPrixSession.finished && (
                  <button className="btn finish-gp-btn" onClick={() => { setGrandPrixOpen(false) }}>
                    Selesai & Terima Hasil Turnamen
                  </button>
                )}
              </div>
            ) : (
              <div className="grandprix-intro box">
                <div className="trophy-display">
                  <span className="big-trophy">🏆</span>
                  <h3>Piala Bergilir Kaisar Showa</h3>
                  <p>
                    {g.grandPrixTrophy
                      ? 'Selamat! Anda telah memenangkan trofi tertinggi dan gelar Master Itamae Nasional!'
                      : 'Trofi legendaris saat ini dipegang oleh Master Ryuji dari distrik Kansai.'}
                  </p>
                </div>
                <button className="btn start-gp-btn" onClick={Gm.startGrandPrix}>
                  ⚔️ Mulai Pertarungan Grand Prix Nasional Sekarang!
                </button>
              </div>
            )}

            <button className="btn close-btn" onClick={() => setGrandPrixOpen(false)}>Tutup Grand Prix</button>
          </div>
        </div>
      )}

      {/* 3. Modal Gudang Fermentasi Bawah Tanah & Sommelier Sake */}
      {cellarOpen && (
        <div className="modal-overlay" onClick={() => setCellarOpen(false)}>
          <div className="cellar-modal box" onClick={e => e.stopPropagation()}>
            <div className="cellar-header">
              <h2>🏺 Gudang Fermentasi Bawah Tanah & Sommelier Sake</h2>
              <p className="cellar-subtitle">
                Gentong keramik Showa (Kame) untuk mematangkan hidangan bernilai tinggi dan memadukan aroma sake legendaris.
              </p>
            </div>

            <div className="vats-grid">
              {g.fermentation?.vats?.map((vat, vIdx) => {
                const recipe = FERMENTATION_RECIPES[vat.recipeId]
                return (
                  <div key={vat.id} className={`vat-card box ${vat.status}`}>
                    <div className="vat-icon">{recipe.yieldIcon}</div>
                    <div className="vat-title">{recipe.name}</div>
                    <div className="vat-desc">{recipe.desc}</div>
                    <div className="vat-progress-bar">
                      <div
                        className="vat-fill"
                        style={{
                          width: vat.status === 'ready'
                            ? '100%'
                            : `${Math.min(100, (vat.currentDays / recipe.daysRequired) * 100)}%`
                        }}
                      />
                    </div>
                    <div className="vat-status-text">
                      Status: <strong>
                        {vat.status === 'empty'
                          ? 'Kosong'
                          : vat.status === 'fermenting'
                          ? `Sedang Menua (${vat.currentDays}/${recipe.daysRequired} Hari)`
                          : '✨ SIAP PANEN!'}
                      </strong>
                    </div>
                    {vat.status === 'empty' && (
                      <button className="btn ferment-btn" onClick={() => Gm.startCellarFerment(vIdx)}>
                        Mulai Fermentasi (Biaya ¥{recipe.cost})
                      </button>
                    )}
                    {vat.status === 'ready' && (
                      <button className="btn harvest-btn" onClick={() => Gm.harvestCellarVat(vIdx)}>
                        🌾 Panen 2x {recipe.yieldName}!
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="cellar-inventory-box box">
              <h3>📦 Inventaris Hasil Fermentasi Siap Saji:</h3>
              <div className="inv-chips-row">
                <span className="inv-chip">
                  🥚 Telur Selai Emas: <strong>{g.fermentation?.inventory?.tamago_selai || 0}</strong> porsi
                </span>
                <span className="inv-chip">
                  🌶️ Karashi Miso Antik: <strong>{g.fermentation?.inventory?.aged_karashi_cond || 0}</strong> porsi
                </span>
                <span className="inv-chip">
                  🍶 Botol Koshu Vintage 1975: <strong>{g.fermentation?.inventory?.vintage_koshu || 0}</strong> botol
                </span>
              </div>
            </div>

            <div className="sommelier-guide-box box">
              <h3>🍶 Panduan Harmoni Pasangan Makanan (Food-Sake Pairing Matrix)</h3>
              <div className="pairing-guide-grid">
                <div className="guide-item">
                  <strong>🍶 Atsukan Hangat:</strong>
                  <p>Pasangan sempurna untuk tahu sutra, telur rebus, dan mochi kinchaku. Menciptakan kehangatan jiwa.</p>
                </div>
                <div className="guide-item">
                  <strong>🍶 Junmai Ginjo Kering:</strong>
                  <p>Aroma bunga segar yang mengangkat rasa manis alami kuah lobak daikon dan konnyaku bening.</p>
                </div>
                <div className="guide-item">
                  <strong>🍶 Koshu Vintage 1975:</strong>
                  <p>Kepekatan kayu cedar tua yang meledakkan rasa gurih urat sapi empuk, gurita Tsukiji, dan kepiting Matsuba (+150% tip!).</p>
                </div>
              </div>
            </div>

            <button className="btn close-btn" onClick={() => setCellarOpen(false)}>Tutup Gudang Bawah Tanah</button>
          </div>
        </div>
      )}

      {/* 4. Modal Segitiga Pengaruh Faksi Distrik */}
      {factionsOpen && (
        <div className="modal-overlay" onClick={() => setFactionsOpen(false)}>
          <div className="factions-modal box" onClick={e => e.stopPropagation()}>
            <div className="factions-header">
              <h2>⚖️ Segitiga Pengaruh Faksi Distrik (District Triad Politics)</h2>
              <p className="factions-subtitle">
                Pilihan diplomasi dan pelayanan Anda menentukan dinamika kekuasaan jalanan antara hukum, mafia, dan warga pasar.
              </p>
            </div>

            <div className="factions-grid">
              {['police', 'yakuza', 'shoutengai'].map(fId => {
                const fData = FACTION_INFO[fId]
                const repVal = g.factions?.rep?.[fId] || 50
                const isPerkActive = repVal >= 70
                return (
                  <div key={fId} className={`faction-card box ${isPerkActive ? 'perk-active' : ''}`}>
                    <div className="faction-icon">{fData.icon}</div>
                    <div className="faction-name">{fData.name}</div>
                    <div className="faction-title">{fData.title}</div>
                    <div className="faction-rep-bar">
                      <div className="rep-fill" style={{width: `${repVal}%`}} />
                    </div>
                    <div className="rep-score">Pengaruh: {repVal}/100</div>
                    <p className="faction-desc">{fData.desc}</p>
                    <div className="faction-perk-box">
                      <span className="perk-label">🎁 Hak Istimewa (Rep 70+):</span>
                      <p className="perk-text">{fData.perk}</p>
                      <span className={`perk-status ${isPerkActive ? 'active' : 'inactive'}`}>
                        {isPerkActive ? '✅ Hak Istimewa Aktif!' : '🔒 Belum Aktif (Butuh Reputasi 70+)'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dilema Harian Distrik Aktif */}
            {g.factions?.activeDilemma && (
              <div className="dilemma-box box">
                <div className="dilemma-header">
                  <span className="dilemma-icon">⚖️</span>
                  <h3>Dilema Distrik: {g.factions.activeDilemma.title}</h3>
                </div>
                <p className="dilemma-desc">{g.factions.activeDilemma.desc}</p>
                <div className="dilemma-choices">
                  {g.factions.activeDilemma.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      className="btn dilemma-choice-btn"
                      onClick={() => Gm.chooseFactionOption(cIdx)}
                    >
                      <span className="choice-text">{choice.text}</span>
                      {choice.cost > 0 && <span className="choice-cost"> (Biaya: ¥{choice.cost})</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="btn close-btn" onClick={() => setFactionsOpen(false)}>Tutup Hubungan Faksi</button>
          </div>
        </div>
      )}
    </div>
  )
}
