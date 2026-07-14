import { useState, useEffect, useRef, useCallback } from 'react';
import { BREEDS, byName, STAT_COLORS, TYPE_COLORS, GROUPS } from './breeds';

/* ─── API base URL: set VITE_API_URL in .env for production ─── */
const API_URL = import.meta.env.VITE_API_URL ?? '';

const pad = (n) => String(n).padStart(3, '0');

/* ════════════════════════════════════════
   IMG CACHE (module-level, persists across renders)
════════════════════════════════════════ */
const imgCache = {};

async function fetchBreedImg(breed) {
  if (imgCache[breed.name]) return imgCache[breed.name];
  const ep = breed.api
    ? `https://dog.ceo/api/breed/${breed.api}/images/random`
    : 'https://dog.ceo/api/breeds/image/random';
  try {
    const d = await (await fetch(ep)).json();
    const url = d.status === 'success' ? d.message : null;
    if (url) imgCache[breed.name] = url;
    return url;
  } catch {
    return null;
  }
}

/* ════════════════════════════════════════
   SPARKS
════════════════════════════════════════ */
function spawnSparks() {
  const cols = ['#dc2626','#fbbf24','#a78bfa','#34d399','#38bdf8','#fb923c'];
  for (let i = 0; i < 44; i++) {
    const el = document.createElement('div');
    el.className = 'spark';
    const sz = 4 + Math.random() * 6;
    const dur = 1.4 + Math.random() * 2;
    el.style.cssText = `left:${Math.random() * 100}vw;top:-8px;width:${sz}px;height:${sz}px;background:${cols[Math.floor(Math.random() * cols.length)]};animation-delay:${Math.random() * .45}s;animation-duration:${dur}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 0.7) * 1000);
  }
}

/* ════════════════════════════════════════
   BREED CARD
════════════════════════════════════════ */
function BreedCard({ breed, onOpen, animDelay = 0 }) {
  const imgRef = useRef(null);
  const observed = useRef(false);

  const loadImg = useCallback(async () => {
    if (observed.current) return;
    observed.current = true;
    const url = await fetchBreedImg(breed);
    if (url && imgRef.current) {
      imgRef.current.onload = () => imgRef.current?.classList.add('loaded');
      imgRef.current.src = url;
    }
  }, [breed]);

  useEffect(() => {
    const el = imgRef.current?.closest('.breed-card');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { loadImg(); obs.disconnect(); } },
      { rootMargin: '180px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadImg]);

  const handleClick = useCallback(() => {
    const src = imgRef.current?.classList.contains('loaded') ? imgRef.current.src : null;
    onOpen(breed, null, null, src);
  }, [breed, onOpen]);

  return (
    <div
      className={`breed-card bg-${breed.group}`}
      style={{ animationDelay: `${animDelay}ms` }}
      onClick={handleClick}
    >
      <div className="card-img-wrap">
        <img className="breed-img" ref={imgRef} alt={breed.name} />
        <div className="card-placeholder">{breed.name.substring(0, 3)}</div>
        <div className="card-num">#{pad(breed.id)}</div>
      </div>
      <div className="card-body">
        <div className="card-name">{breed.name}</div>
        <span className={`type-badge t-${breed.group}`}>{breed.group}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SCAN VIEW
════════════════════════════════════════ */
function ScanView({ onResult }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const prevURL = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f?.type.startsWith('image/')) return;
    if (prevURL.current) URL.revokeObjectURL(prevURL.current);
    const url = URL.createObjectURL(f);
    prevURL.current = url;
    setFile(f);
    setPreviewURL(url);
    setError('');
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewURL(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const identify = useCallback(async () => {
    if (!file || scanning) return;
    setScanning(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${API_URL}/predict`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const preds = data.predictions;
      const best = preds[0];
      const breed = byName[best.breed] || {
        id: 0, name: best.breed, group: 'Unknown', api: null,
        stats: { Loyalty: 75, Intelligence: 75, Energy: 75, Fluffiness: 50, Trainability: 75, Friendliness: 75 },
        fact: 'A wonderful dog breed identified by our neural network.',
      };
      spawnSparks();
      onResult(breed, best.confidence, prevURL.current, preds.slice(1));
    } catch (err) {
      setError(err.message || 'Please try again with a clearer photo.');
    } finally {
      setScanning(false);
    }
  }, [file, scanning, onResult]);

  return (
    <div className="scan-view view active">
      <div className="scan-inner">
        <div className="scan-heading">
          <h1>Identify any<br /><strong>dog breed</strong></h1>
          <p>Upload a photo and our neural network will classify it across 69 breeds in seconds.</p>
        </div>

        {!previewURL ? (
          <div
            className={`upload-zone${drag ? ' drag-over' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="upload-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <h3>Drop a photo here</h3>
            <p>or <span>click to browse</span> — JPG, PNG, WEBP</p>
          </div>
        ) : (
          <>
            <div className="preview-card">
              <img className="preview-img" src={previewURL} alt="Uploaded dog" />
              {scanning && (
                <div className="scan-overlay">
                  <div className="scan-line" />
                  <div className="scan-rings">
                    <div className="scan-ring" />
                    <div className="scan-ring" />
                    <div className="scan-ring" />
                  </div>
                  <div className="scan-label">
                    Analyzing breed signatures<span className="scan-dot">...</span>
                  </div>
                </div>
              )}
              <div className="preview-meta">
                <span className="preview-filename">{file?.name}</span>
                <button className="change-photo" onClick={reset}>Remove</button>
              </div>
            </div>

            {!scanning && (
              <button className="scan-btn" onClick={identify}>
                Identify Breed
              </button>
            )}
          </>
        )}

        {error && <div className="scan-error">{error}</div>}

        <div className="scan-meta">
          {[['69','Breeds'],['95.75%','Accuracy'],['8.6K','Train Images'],['CPU','Inference']].map(([num, lbl]) => (
            <div key={lbl} className="scan-meta-item">
              <span className="scan-meta-num">{num}</span>
              <span className="scan-meta-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   LIBRARY VIEW
════════════════════════════════════════ */
function LibraryView({ onOpen }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');

  const filtered = BREEDS.filter((b) => {
    const q = query.toLowerCase().trim();
    return (!q || b.name.toLowerCase().includes(q)) && (group === 'All' || b.group === group);
  });

  return (
    <div className="library-view view active">
      <div className="lib-toolbar">
        <div className="search-wrap">
          <span className="search-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Search breeds…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="count-chip"><b>{filtered.length}</b> / {BREEDS.length}</div>
      </div>

      <div className="filter-row">
        {GROUPS.map((g) => {
          const active = g === group;
          const col = TYPE_COLORS[g];
          return (
            <button
              key={g}
              className={`filter-btn${active ? ' active' : ''}`}
              style={active && col ? { background: col, borderColor: 'transparent', color: '#fff' } : {}}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          );
        })}
      </div>

      <div className="breed-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="ei">No results</span>
            <p>Try a different search or filter</p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <BreedCard key={b.id} breed={b} onOpen={onOpen} animDelay={Math.min(i * 18, 400)} />
          ))
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MODAL
════════════════════════════════════════ */
function BreedModal({ data, onClose, onScanAgain }) {
  const { breed, confidence, uploadedSrc, altPreds, libSrc } = data;
  const [heroSrc, setHeroSrc] = useState(uploadedSrc || libSrc || null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statRefs = useRef([]);

  /* Fetch hero image if no src provided */
  useEffect(() => {
    if (!heroSrc && breed.api) {
      fetchBreedImg(breed).then((url) => { if (url) setHeroSrc(url); });
    }
    const t = setTimeout(() => setStatsVisible(true), 550);
    return () => clearTimeout(t);
  }, [breed, heroSrc]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
          </svg>
        </button>

        <div className="modal-hero">
          {heroSrc
            ? <img src={heroSrc} alt={breed.name} />
            : <span className="hero-placeholder">Specimen</span>
          }
          <div className="modal-hero-fade" />
        </div>

        <div className={`modal-body modal-bg-${breed.group}`}>
          <div className="modal-identity">
            <div>
              <div className="modal-name">{breed.name}</div>
              <span className="modal-num">#{pad(breed.id)}</span>
              <span className={`type-badge t-${breed.group}`}>{breed.group}</span>
            </div>
            {confidence != null && (
              <div className="modal-conf">{confidence}% confidence</div>
            )}
          </div>

          <div className="rule" />

          <div className="section-lbl">Story</div>
          <div className="story-text">{breed.fact}</div>

          <div className="stats-section">
            <div className="section-lbl" style={{ marginTop: 20 }}>Base Stats</div>
            {Object.entries(breed.stats).map(([k, v], i) => (
              <div key={k} className="stat-row" ref={(el) => (statRefs.current[i] = el)}>
                <div className="stat-name">{k}</div>
                <div className="stat-track">
                  <div
                    className="stat-fill"
                    style={{
                      background: STAT_COLORS[k],
                      width: statsVisible ? `${v}%` : '0%',
                      transitionDelay: statsVisible ? `${i * 90}ms` : '0ms',
                    }}
                  />
                </div>
                <div className="stat-val">{v}</div>
              </div>
            ))}
          </div>

          {altPreds && altPreds.length > 0 && (
            <div className="alt-section">
              <div className="section-lbl" style={{ marginTop: 20 }}>Also Considered</div>
              {altPreds.map((p, i) => (
                <div key={p.breed} className="alt-row" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
                  <div className="alt-rank">{i + 2}</div>
                  <div className="alt-name">{p.breed}</div>
                  <div className="alt-track">
                    <div
                      className="alt-fill"
                      style={{ width: statsVisible ? `${p.confidence}%` : '0%', transitionDelay: `${600 + i * 80}ms` }}
                    />
                  </div>
                  <div className="alt-pct">{p.confidence}%</div>
                </div>
              ))}
            </div>
          )}

          {uploadedSrc && (
            <button className="try-again" onClick={onScanAgain}>
              Scan another photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT APP
════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState('scan');
  const [modal, setModal] = useState(null);

  const openModal = useCallback((breed, confidence, uploadedSrc, libSrc, altPreds = []) => {
    setModal({ breed, confidence, uploadedSrc, libSrc, altPreds });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    document.body.style.overflow = '';
  }, []);

  const handleScanResult = useCallback((breed, confidence, uploadedSrc, altPreds) => {
    openModal(breed, confidence, uploadedSrc, null, altPreds);
  }, [openModal]);

  const handleScanAgain = useCallback(() => {
    closeModal();
    setView('scan');
  }, [closeModal]);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-title">Pluto's Repawsitory</span>
          <span className="nav-sub">Group 2 · The Knowledge House</span>
        </div>
        <div className="nav-tabs">
          {['scan', 'library'].map((v) => (
            <button
              key={v}
              className={`tab-btn${view === v ? ' active' : ''}`}
              onClick={() => setView(v)}
            >
              {v === 'scan' ? 'Scan' : 'Library'}
            </button>
          ))}
        </div>
        <div className="nav-stat">MobileNetV2<br />95.75% accuracy</div>
      </nav>

      {/* VIEWS */}
      <div className="view-container">
        {view === 'scan'
          ? <ScanView onResult={handleScanResult} />
          : <LibraryView onOpen={(b, conf, up, lib) => openModal(b, conf, up, lib)} />
        }
      </div>

      {/* FOOTER */}
      <footer>
        <span className="footer-left">Pluto's Repawsitory · Sprint 4</span>
        <span className="footer-right">PyTorch · MobileNetV2 · The Knowledge House Data Science Fellowship</span>
      </footer>

      {/* MODAL */}
      {modal && (
        <BreedModal
          data={modal}
          onClose={closeModal}
          onScanAgain={handleScanAgain}
        />
      )}
    </>
  );
}
