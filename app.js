// Naïade SCADA — main app + map view
// Loads after data.js, React, Babel.

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// —————————————————————————————— utilities ——————————————————————————————

const STATUS_COLORS = {
  ok:       "var(--status-ok)",
  minor:    "var(--status-minor)",
  major:    "var(--status-major)",
  critical: "var(--status-critical)",
};

const STATUS_ORDER = { critical: 0, major: 1, minor: 2, ok: 3 };

function StatusDot({ status, size = 8, glow = true }) {
  return (
    <span
      className={"status-dot " + (status === "critical" ? "pulse" : "")}
      style={{
        width: size, height: size, borderRadius: 999,
        background: STATUS_COLORS[status],
        boxShadow: glow ? `0 0 ${size}px ${STATUS_COLORS[status]}` : "none",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

function Pill({ status, children }) {
  return (
    <span className="pill" style={{
      color: STATUS_COLORS[status],
      borderColor: STATUS_COLORS[status] + "55",
      background: STATUS_COLORS[status] + "12",
    }}>
      <StatusDot status={status} size={6} glow={false} />
      {children}
    </span>
  );
}

// —————————————————————————————— Top Bar ——————————————————————————————

function TopBar({ counts, query, setQuery, onPickFacility, view, onBack, selectedFac, now, filter, setFilter }) {
  const toggleFilter = (s) => {
    const next = new Set(filter);
    next.has(s) ? next.delete(s) : next.add(s);
    setFilter(next);
  };
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return window.FACILITIES.filter(f =>
      f.name.toLowerCase().includes(q) || f.city.toLowerCase().includes(q) || f.region.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <header className="topbar">
      <div className="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3 C 7 11, 4 14, 4 17 a 8 8 0 0 0 16 0 c 0 -3, -3 -6, -8 -14 Z" stroke="var(--accent)" strokeWidth="1.4" fill="var(--accent-12)" />
          <path d="M8 16 q 2 -2 4 0 t 4 0" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
        </svg>
        <div className="brand-text">
          <div className="brand-name">NAÏADE</div>
          <div className="brand-sub">SCADA · v4.2</div>
        </div>
      </div>

      {view === "map" ? (
        <nav className="crumbs">
          <span className="crumb active">Réseau France</span>
          <span className="sep">›</span>
          <span className="crumb dim">43 sites</span>
        </nav>
      ) : (
        <nav className="crumbs">
          <button className="link-btn" onClick={onBack}>← Réseau</button>
          <span className="sep">›</span>
          <span className="crumb active">{selectedFac?.name}</span>
          <span className="sep">›</span>
          <span className="crumb dim">{selectedFac?.region}</span>
        </nav>
      )}

      <div className="search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input
          placeholder="Rechercher une station, une ville…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        <kbd>/</kbd>
        {open && matches.length > 0 && (
          <div className="search-results">
            {matches.map(f => (
              <button key={f.id} className="search-row" onClick={() => { onPickFacility(f.id); setOpen(false); setQuery(""); }}>
                <StatusDot status={f.status} size={6} />
                <span className="sr-name">{f.name}</span>
                <span className="sr-city">{f.city}</span>
                <span className="sr-region">{f.region}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="status-counts">
        {["critical","major","minor","ok"].map(s => {
          const active = filter.has(s);
          const anyOn = filter.size > 0;
          return (
            <button
              key={s}
              className={"sc " + (active ? "on " : "") + (anyOn && !active ? "off" : "")}
              onClick={() => toggleFilter(s)}
              title={`Filtrer · ${window.STATUS_LABEL[s]}`}
              style={active ? { borderColor: STATUS_COLORS[s], background: STATUS_COLORS[s] + "18" } : {}}
            >
              <StatusDot status={s} size={7} />
              <span className="sc-n">{counts[s] || 0}</span>
            </button>
          );
        })}
      </div>

      <div className="topbar-meta">
        <div className="clock"><span className="mono">{now}</span><span className="dim">UTC+1</span></div>
        <div className="user">
          <div className="avatar">ML</div>
          <div>
            <div className="user-name">M. Lefevre</div>
            <div className="user-role">Opérateur · N2</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// —————————————————————————————— France Map ——————————————————————————————

function FranceMap({ facilities, filter, hover, setHover, onPick, mapStyle, selectedId, zoomTarget }) {
  const visible = facilities.filter(f => filter.size === 0 || filter.has(f.status));
  const dim = facilities.filter(f => !visible.includes(f));

  // zoom transform
  const t = zoomTarget;
  const zoomStyle = t
    ? { transform: `translate(${(450 - t.x) * 1.6}px, ${(500 - t.y) * 1.6}px) scale(2.6)`, transformOrigin: "center" }
    : { transform: "translate(0,0) scale(1)", transformOrigin: "center" };

  return (
    <div className="map-wrap">
      <svg viewBox="0 0 900 1000" className="france-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="var(--grid-dot)" />
          </pattern>
          <pattern id="hatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--grid-line)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        <g style={{ transition: "transform 700ms cubic-bezier(.4,.0,.2,1)", ...zoomStyle }}>
          {/* background grid */}
          {mapStyle === "grid" && <rect width="900" height="1000" fill="url(#dots)" />}
          {mapStyle === "topo" && (
            <g opacity="0.35">
              {[120,200,280,360,440,520,600,680,760,840,920].map(y => (
                <line key={y} x1="0" x2="900" y1={y} y2={y} stroke="var(--grid-line)" strokeWidth="0.4" />
              ))}
              {[80,180,280,380,480,580,680,780].map(x => (
                <line key={x} y1="0" y2="1000" x1={x} x2={x} stroke="var(--grid-line)" strokeWidth="0.4" />
              ))}
            </g>
          )}

          {/* France polygon */}
          <path d={window.FRANCE_PATH} fill="url(#hatch)" stroke="var(--country-line)" strokeWidth="1.2" />
          <path d={window.FRANCE_PATH} fill="var(--country-fill)" stroke="var(--country-line)" strokeWidth="1.6" opacity="0.9" />
          <path d={window.CORSE_PATH}  fill="var(--country-fill)" stroke="var(--country-line)" strokeWidth="1.4" />

          {/* rivers (decor) */}
          {mapStyle !== "minimal" && window.RIVERS.map((d,i) => (
            <path key={i} d={d} fill="none" stroke="var(--river)" strokeWidth="1" strokeDasharray="0" opacity="0.45"/>
          ))}

          {/* dimmed (filtered out) facilities */}
          {dim.map(f => (
            <circle key={f.id} cx={f.x} cy={f.y} r="3" fill="var(--text-faint)" opacity="0.35" />
          ))}

          {/* facility dots */}
          {visible.map(f => {
            const c = STATUS_COLORS[f.status];
            const isSel = f.id === selectedId;
            const isHov = f.id === hover;
            return (
              <g key={f.id}
                 className={"fac-dot " + (f.status === "critical" ? "pulse-ring" : "") + (f.status === "major" ? " pulse-slow" : "")}
                 onMouseEnter={() => setHover(f.id)}
                 onMouseLeave={() => setHover(null)}
                 onClick={() => onPick(f.id)}
                 style={{ cursor: "pointer" }}>
                {(f.status === "critical" || f.status === "major") && (
                  <circle cx={f.x} cy={f.y} r="14" fill="none" stroke={c} strokeOpacity="0.35" className="halo"/>
                )}
                <circle cx={f.x} cy={f.y} r={isHov || isSel ? 11 : 8} fill={c} opacity="0.18" />
                <circle cx={f.x} cy={f.y} r={isHov || isSel ? 6 : 4.5} fill={c} />
                <circle cx={f.x} cy={f.y} r="1.4" fill="#fff" opacity="0.9" />
                {(isHov || isSel) && (
                  <g>
                    <line x1={f.x} y1={f.y - 14} x2={f.x} y2={f.y - 26} stroke={c} strokeWidth="0.8" />
                    <text x={f.x + 12} y={f.y - 14} fill="var(--text)" fontSize="11" fontFamily="IBM Plex Mono" >
                      {f.name}
                    </text>
                    <text x={f.x + 12} y={f.y - 2} fill="var(--text-dim)" fontSize="9" fontFamily="IBM Plex Mono" >
                      {f.region}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* compass / scale */}
          <g transform="translate(60, 920)" opacity="0.55">
            <line x1="0" y1="0" x2="80" y2="0" stroke="var(--text-faint)" strokeWidth="1"/>
            <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--text-faint)" strokeWidth="1"/>
            <line x1="80" y1="-4" x2="80" y2="4" stroke="var(--text-faint)" strokeWidth="1"/>
            <text x="0" y="16" fill="var(--text-faint)" fontSize="9" fontFamily="IBM Plex Mono">200 km</text>
          </g>
          <g transform="translate(820, 60)" opacity="0.55">
            <circle r="14" fill="none" stroke="var(--text-faint)" strokeWidth="0.6"/>
            <line x1="0" y1="-14" x2="0" y2="-18" stroke="var(--text)" strokeWidth="1"/>
            <text x="-3" y="-22" fill="var(--text)" fontSize="9" fontFamily="IBM Plex Mono">N</text>
          </g>
        </g>
      </svg>

      <div className="map-corner tl">
        <div className="mono dim sm">NETWORK · FRANCE MÉTROPOLITAINE + CORSE</div>
        <div className="mono sm">43 STATIONS · 7 814 m³/h NOMINAL</div>
      </div>
      <div className="map-corner br">
        <div className="mono dim sm">LAT 41.4°N → 51.1°N</div>
        <div className="mono dim sm">LON -5.1°W → 9.6°E</div>
      </div>
    </div>
  );
}

// —————————————————————————————— Side Panels ——————————————————————————————

function FacilityList({ facilities, filter, setFilter, onPick, hover, setHover, selectedId }) {
  const counts = useMemo(() => {
    const c = { ok: 0, minor: 0, major: 0, critical: 0 };
    facilities.forEach(f => c[f.status]++);
    return c;
  }, [facilities]);

  const visible = useMemo(() => {
    const list = filter.size === 0 ? facilities : facilities.filter(f => filter.has(f.status));
    return [...list].sort((a,b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.name.localeCompare(b.name));
  }, [facilities, filter]);

  const toggle = s => {
    const next = new Set(filter);
    next.has(s) ? next.delete(s) : next.add(s);
    setFilter(next);
  };

  return (
    <aside className="side left">
      <div className="panel-h">
        <div className="panel-t">Stations</div>
        <div className="panel-c mono dim">{visible.length}/{facilities.length}</div>
      </div>
      <div className="filter-row">
        {["critical","major","minor","ok"].map(s => (
          <button
            key={s}
            className={"chip " + (filter.has(s) ? "on" : "")}
            onClick={() => toggle(s)}
            style={filter.has(s) ? { borderColor: STATUS_COLORS[s], color: STATUS_COLORS[s] } : {}}
          >
            <StatusDot status={s} size={6} glow={false} />
            <span className="chip-l">{window.STATUS_LABEL[s]}</span>
            <span className="chip-n mono">{counts[s]}</span>
          </button>
        ))}
      </div>
      <div className="fac-list">
        {visible.map(f => (
          <button
            key={f.id}
            className={"fac-row " + (f.id === hover ? "hover " : "") + (f.id === selectedId ? "sel" : "")}
            onClick={() => onPick(f.id)}
            onMouseEnter={() => setHover(f.id)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="fr-status"><StatusDot status={f.status} size={7} /></span>
            <span className="fr-main">
              <span className="fr-name">{f.name}</span>
              <span className="fr-sub mono dim">{f.city} · {f.region}</span>
            </span>
            <span className="fr-load mono">
              <span className="fr-load-v">{Math.round(f.load)}</span>
              <span className="fr-load-u dim">/{f.capacity}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function AlarmFeed({ alarms, onPickFacility, onAck }) {
  const sorted = useMemo(() => [...alarms].sort((a,b) => STATUS_ORDER[a.sev] - STATUS_ORDER[b.sev]), [alarms]);
  const open = sorted.filter(a => !a.ack);
  return (
    <aside className="side right">
      <div className="panel-h">
        <div className="panel-t">Alarmes actives</div>
        <div className="panel-c">
          <span className="mono dim">{open.length} ouvertes</span>
          <span className="dot-sep">·</span>
          <span className="mono dim">{alarms.length - open.length} ack</span>
        </div>
      </div>
      <div className="alarm-list">
        {sorted.map(a => {
          const f = window.FACILITIES.find(x => x.id === a.facId);
          return (
            <div key={a.id} className={"alarm-row sev-" + a.sev + (a.ack ? " acked" : "")}>
              <div className="al-bar" style={{ background: STATUS_COLORS[a.sev] }}/>
              <div className="al-body">
                <div className="al-head">
                  <span className="al-code mono">{a.code}</span>
                  <span className="al-ts mono dim">{a.ts}</span>
                </div>
                <div className="al-msg">{a.msg}</div>
                <div className="al-foot">
                  <button className="al-fac" onClick={() => onPickFacility(a.facId)}>
                    <StatusDot status={f.status} size={5} glow={false}/>
                    <span>{f.name}</span>
                  </button>
                  <span className="al-src mono dim">{a.src}</span>
                  {!a.ack ? (
                    <button className="btn-xs" onClick={() => onAck(a.id)}>ACK</button>
                  ) : (
                    <span className="al-acked mono dim">acquittée</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="kpi-strip">
        <KpiTile label="Production réseau" value="5 421" unit="m³/h" tone="ok" tiny/>
        <KpiTile label="Disponibilité 24h" value="99.6" unit="%" tone="ok" tiny/>
        <KpiTile label="Stations en alerte" value="6" unit="/43" tone="minor" tiny/>
      </div>
    </aside>
  );
}

// —————————————————————————————— KPI tile ——————————————————————————————

function KpiTile({ label, value, unit, tone = "ok", tiny = false, hist }) {
  return (
    <div className={"kpi " + (tiny ? "tiny " : "") + "tone-" + tone}>
      <div className="kpi-l">{label}</div>
      <div className="kpi-v">
        <span className="mono">{value}</span>
        <span className="kpi-u mono dim">{unit}</span>
      </div>
      {hist && <Sparkline data={hist} tone={tone}/>}
    </div>
  );
}

function Sparkline({ data, tone = "ok", h = 28, w = 120 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg className="spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={`var(--status-${tone})`} strokeWidth="1.2" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={`var(--status-${tone}-12)`} stroke="none" />
    </svg>
  );
}

// —————————————————————————————— App root ——————————————————————————————

function App() {
  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "accent": "#4dd0e1",
    "mapStyle": "topo",
    "density": "comfortable",
    "bigText": false
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(tweakDefaults);

  const [facilities, setFacilities] = useState(() => window.FACILITIES.map(f => ({...f})));
  const [alarms, setAlarms] = useState(() => window.ALARMS.map(a => ({...a})));
  const [filter, setFilter] = useState(new Set());
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState("map");
  const [now, setNow] = useState(() => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

  // accent color
  useEffect(() => {
    const root = document.documentElement;
    const hex = tweaks.accent || "#4dd0e1";
    // lighter shade — just add 30 to each channel, clamped
    const lighten = (h) => {
      const n = parseInt(h.slice(1), 16);
      const r = Math.min(255, ((n >> 16) & 0xff) + 40);
      const g = Math.min(255, ((n >> 8)  & 0xff) + 40);
      const b = Math.min(255, ( n        & 0xff) + 40);
      return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
    };
    root.style.setProperty("--accent", hex);
    root.style.setProperty("--accent-l", lighten(hex));
    root.style.setProperty("--accent-12", hex + "1f");
    root.setAttribute("data-density", tweaks.density);
    root.setAttribute("data-bigtext", tweaks.bigText ? "1" : "0");
  }, [tweaks.accent, tweaks.density, tweaks.bigText]);

  // subtle live updates — load drifts slightly, clock ticks
  useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    const drift = setInterval(() => {
      setFacilities(prev => prev.map(f => {
        const jitter = f.status === "critical" ? 8 : f.status === "major" ? 4 : 2;
        const next = f.load + (Math.random() - 0.5) * jitter;
        const min = f.status === "critical" ? f.capacity * 0.2 : f.capacity * 0.4;
        const max = f.capacity * 0.95;
        return { ...f, load: Math.max(min, Math.min(max, next)) };
      }));
    }, 4000);
    return () => { clearInterval(tick); clearInterval(drift); };
  }, []);

  // keyboard: / to focus search, esc to back
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector(".search input")?.focus();
      }
      if (e.key === "Escape" && view === "facility") setView("map");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  const counts = useMemo(() => {
    const c = { ok: 0, minor: 0, major: 0, critical: 0 };
    facilities.forEach(f => c[f.status]++);
    return c;
  }, [facilities]);

  const selectedFac = facilities.find(f => f.id === selectedId);

  const handlePick = useCallback((id) => {
    setSelectedId(id);
    setTimeout(() => setView("facility"), 600); // let zoom animation play
  }, []);

  const handleBack = () => {
    setView("map");
    setTimeout(() => setSelectedId(null), 600);
  };

  const handleAck = (alarmId) => {
    setAlarms(prev => prev.map(a => a.id === alarmId ? { ...a, ack: true } : a));
  };

  return (
    <div className="app" data-view={view}>
      <TopBar
        counts={counts}
        query={query}
        setQuery={setQuery}
        onPickFacility={handlePick}
        view={view}
        onBack={handleBack}
        selectedFac={selectedFac}
        now={now}
        filter={filter}
        setFilter={setFilter}
      />

      {view === "map" && (
        <main className="main map-layout">
          <FacilityList
            facilities={facilities}
            filter={filter}
            setFilter={setFilter}
            onPick={handlePick}
            hover={hover}
            setHover={setHover}
            selectedId={selectedId}
          />
          <FranceMap
            facilities={facilities}
            filter={filter}
            hover={hover}
            setHover={setHover}
            onPick={handlePick}
            mapStyle={tweaks.mapStyle}
            selectedId={selectedId}
            zoomTarget={view === "facility" && selectedFac ? selectedFac : (selectedId ? selectedFac : null)}
          />
          <AlarmFeed alarms={alarms} onPickFacility={handlePick} onAck={handleAck} />
        </main>
      )}

      {view === "facility" && selectedFac && (
        <FacilityView
          facility={selectedFac}
          alarms={alarms.filter(a => a.facId === selectedFac.id)}
          allAlarms={alarms}
          onAck={handleAck}
          onBack={handleBack}
          onPickFacility={handlePick}
        />
      )}

      <NaiadeTweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

// Expose useful helpers to other Babel scripts
Object.assign(window, {
  StatusDot, Pill, KpiTile, Sparkline, STATUS_COLORS, STATUS_ORDER,
});
