// Naïade SCADA — facility detail view

const { useState: _useState2, useEffect: _useEffect2, useMemo: _useMemo2 } = React;

// —————————————————————————— Process diagram ——————————————————————————

function ProcessNode({ node, state, onPick, selected, facStatus, problemNode }) {
  const isProblem = node.id === problemNode;
  const tone = isProblem ? (facStatus === "critical" ? "critical" : facStatus === "major" ? "major" : "minor") : "ok";
  const c = STATUS_COLORS[tone];

  // pump rotation when running
  const isPump = node.kind === "pump";
  const isTank = node.kind === "tank" || node.kind === "source" || node.kind === "sink";
  const fillPct = isTank && node.id === "reservoir" ? state.reservoirLevel : 78;

  return (
    <g
      className={"pnode " + (selected === node.id ? "sel " : "") + (isProblem ? "alert" : "")}
      onClick={() => onPick(node.id)}
      style={{ cursor: "pointer" }}
    >
      {/* selection halo */}
      {selected === node.id && (
        <rect x={node.x - 5} y={node.y - 5} width={node.w + 10} height={node.h + 10}
              fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3 2" rx="3"/>
      )}

      <rect x={node.x} y={node.y} width={node.w} height={node.h}
            fill="var(--panel)" stroke={c} strokeWidth={isProblem ? 1.4 : 1}
            opacity={isProblem ? 1 : 0.96} rx="2"/>

      {/* status corner */}
      <rect x={node.x} y={node.y} width="4" height={node.h} fill={c}/>

      {/* tank fill viz */}
      {node.id === "reservoir" && (
        <>
          <rect x={node.x + 8} y={node.y + 22} width={node.w - 16} height={node.h - 30}
                fill="none" stroke="var(--text-faint)" strokeWidth="0.5"/>
          <rect x={node.x + 8} y={node.y + 22 + (node.h - 30) * (1 - fillPct/100)}
                width={node.w - 16} height={(node.h - 30) * fillPct/100}
                fill="var(--accent)" opacity="0.25"/>
          <line x1={node.x + 8} x2={node.x + node.w - 8}
                y1={node.y + 22 + (node.h - 30) * (1 - fillPct/100)}
                y2={node.y + 22 + (node.h - 30) * (1 - fillPct/100)}
                stroke="var(--accent)" strokeWidth="1"/>
        </>
      )}

      {/* pump glyph (rotor) */}
      {isPump && (
        <g transform={`translate(${node.x + node.w - 16},${node.y + 18})`}>
          <circle r="7" fill="none" stroke={c} strokeWidth="0.8"/>
          <g className="pump-rotor">
            <line x1="-5" y1="0" x2="5" y2="0" stroke={c} strokeWidth="1.2"/>
            <line x1="0" y1="-5" x2="0" y2="5" stroke={c} strokeWidth="1.2"/>
          </g>
        </g>
      )}

      <text x={node.x + 8} y={node.y + 16} fill="var(--text)" fontSize="11" fontFamily="IBM Plex Sans" fontWeight="500">
        {node.label}
      </text>
      <text x={node.x + 8} y={node.y + 30} fill="var(--text-dim)" fontSize="9" fontFamily="IBM Plex Mono">
        {node.sub}
      </text>
      <text x={node.x + 8} y={node.y + node.h - 10} fill={c} fontSize="13" fontFamily="IBM Plex Mono" fontWeight="500">
        {typeof node.metric.v === "number" && node.metric.v % 1 === 0 ? node.metric.v : (+node.metric.v).toFixed(node.metric.u === "%" ? 0 : 2)}
        <tspan fill="var(--text-dim)" fontSize="9"> {node.metric.u}</tspan>
      </text>
    </g>
  );
}

function ProcessDiagram({ facility, alarms, onPickNode, selectedNode }) {
  const problemNode = alarms.find(a => !a.ack)?.node;
  const state = { reservoirLevel: 78 };

  const W = 1300, H = 420;
  const nodeById = {};
  window.PROCESS_NODES.forEach(n => nodeById[n.id] = n);

  return (
    <div className="process">
      <div className="panel-h">
        <div className="panel-t">Schéma synoptique</div>
        <div className="panel-c mono dim">FLUX EAU BRUTE → DISTRIBUTION</div>
      </div>
      <div className="process-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="process-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--pipe)"/>
            </marker>
            <marker id="arr-alert" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--status-critical)"/>
            </marker>
          </defs>

          {/* background grid */}
          <g opacity="0.4">
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <line key={i} x1="0" x2={W} y1={i*50} y2={i*50} stroke="var(--grid-line)" strokeWidth="0.3"/>
            ))}
            {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
              <line key={i} y1="0" y2={H} x1={i*100} x2={i*100} stroke="var(--grid-line)" strokeWidth="0.3"/>
            ))}
          </g>

          {/* edges (pipes) */}
          {window.PROCESS_EDGES.map(([a, b], i) => {
            const A = nodeById[a], B = nodeById[b];
            const ax = A.x + A.w, ay = A.y + A.h/2;
            const bx = B.x,       by = B.y + B.h/2;
            const isAlert = (a === problemNode || b === problemNode);
            const stroke = isAlert ? "var(--status-critical)" : "var(--pipe)";
            const w = isAlert ? 2 : 1.5;
            // S-curve path
            const mx = (ax + bx) / 2;
            const d = `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
            return (
              <g key={i}>
                <path d={d} stroke={stroke} strokeWidth={w} fill="none" markerEnd={`url(#${isAlert ? "arr-alert" : "arr"})`} opacity={isAlert ? 1 : 0.85}/>
                {/* flow dash */}
                <path d={d} stroke={stroke} strokeWidth={w + 1.5} fill="none" strokeDasharray="3 6" opacity="0.45" className="flow-dash"/>
              </g>
            );
          })}

          {/* nodes */}
          {window.PROCESS_NODES.map(n => (
            <ProcessNode key={n.id} node={n} state={state}
                         onPick={onPickNode} selected={selectedNode}
                         facStatus={facility.status} problemNode={problemNode}/>
          ))}

          {/* sample point markers */}
          <g opacity="0.7">
            {["sed","sandfilt","chlor","outlet"].map((id, i) => {
              const n = nodeById[id];
              return (
                <g key={id} transform={`translate(${n.x + n.w/2}, ${n.y - 14})`}>
                  <circle r="4" fill="var(--panel-2)" stroke="var(--accent)" strokeWidth="0.8"/>
                  <text y="3" textAnchor="middle" fontSize="6" fill="var(--accent)" fontFamily="IBM Plex Mono">{i+1}</text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="process-legend">
        <span><span className="lg-line" style={{background: "var(--pipe)"}}></span>Flux nominal</span>
        <span><span className="lg-line" style={{background: "var(--status-critical)"}}></span>Flux dégradé</span>
        <span><span className="lg-dot" style={{background: "var(--accent)"}}></span>Point d'analyse</span>
        <span className="dim mono">Cliquer un équipement pour les détails</span>
      </div>
    </div>
  );
}

// —————————————————————————— Equipment table ——————————————————————————

function EquipmentTable({ facility, focusedNode }) {
  const stress = facility.status === "critical" ? 2 : facility.status === "major" ? 1 : 0;
  const eq = window.EQUIPMENT_TEMPLATE.map((e, i) => {
    let state = e.state;
    if (stress >= 2 && i === 0) state = "FAULT";
    if (stress >= 1 && i === 1) state = "FAULT";
    return { ...e, state };
  });

  return (
    <div className="equip">
      <div className="panel-h">
        <div className="panel-t">Équipements</div>
        <div className="panel-c mono dim">{eq.length} actifs</div>
      </div>
      <div className="equip-table-wrap">
        <table className="equip-table">
          <thead>
            <tr>
              <th>Tag</th><th>Type</th><th>Modèle</th><th>État</th><th>Vitesse</th><th>Compteur</th>
            </tr>
          </thead>
          <tbody>
            {eq.map(e => (
              <tr key={e.tag}>
                <td className="mono"><span className="eq-tag">{e.tag}</span></td>
                <td>{e.type}</td>
                <td className="dim">{e.model}</td>
                <td><EqState state={e.state}/></td>
                <td className="mono num">{e.rpm == null ? "—" : `${e.rpm} rpm`}</td>
                <td className="mono num dim">{e.runtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EqState({ state }) {
  const map = {
    RUN:    { c: "ok",       label: "EN MARCHE" },
    STBY:   { c: "minor",    label: "SECOURS" },
    OPEN:   { c: "ok",       label: "OUVERTE" },
    CLOSED: { c: "ok",       label: "FERMÉE" },
    OK:     { c: "ok",       label: "OK" },
    FAULT:  { c: "critical", label: "DÉFAUT" },
  };
  const m = map[state] || { c: "ok", label: state };
  return (
    <span className="eq-state" style={{ color: STATUS_COLORS[m.c], background: STATUS_COLORS[m.c] + "14", borderColor: STATUS_COLORS[m.c] + "55" }}>
      <StatusDot status={m.c} size={5} glow={false}/>
      <span className="mono">{m.label}</span>
    </span>
  );
}

// —————————————————————————— Trend chart ——————————————————————————

function TrendChart({ kpis, activeKey, setActiveKey }) {
  const k = kpis.find(x => x.key === activeKey) || kpis[0];
  const w = 700, h = 200, pad = { l: 44, r: 16, t: 14, b: 24 };
  const inner = { w: w - pad.l - pad.r, h: h - pad.t - pad.b };
  const min = Math.min(...k.hist), max = Math.max(...k.hist);
  const span = max - min || 1;
  const tone = k.value >= k.max * 0.85 ? "minor" : k.value <= k.min * 1.15 ? "minor" : "ok";

  const pts = k.hist.map((v, i) => {
    const x = pad.l + (i / (k.hist.length - 1)) * inner.w;
    const y = pad.t + (1 - (v - min) / span) * inner.h;
    return [x, y];
  });
  const poly = pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${pad.l},${pad.t + inner.h} ${poly} ${pad.l + inner.w},${pad.t + inner.h}`;

  return (
    <div className="trend">
      <div className="panel-h">
        <div className="panel-t">Tendances · 24 h</div>
        <div className="trend-tabs">
          {kpis.map(t => (
            <button key={t.key} className={"tt " + (t.key === activeKey ? "on" : "")} onClick={() => setActiveKey(t.key)}>
              <span className="tt-l">{t.label}</span>
              <span className="tt-v mono">{t.value}<span className="dim"> {t.unit}</span></span>
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="trend-svg" preserveAspectRatio="xMidYMid meet">
        {/* y-axis grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => {
          const y = pad.t + p * inner.h;
          return (
            <g key={p}>
              <line x1={pad.l} x2={pad.l + inner.w} y1={y} y2={y} stroke="var(--grid-line)" strokeWidth="0.4"/>
              <text x={pad.l - 6} y={y + 3} fontSize="9" fill="var(--text-dim)" fontFamily="IBM Plex Mono" textAnchor="end">
                {((max - p * span)).toFixed(span < 2 ? 2 : 0)}
              </text>
            </g>
          );
        })}
        {/* x-axis ticks */}
        {[0,6,12,18,24].map(t => {
          const x = pad.l + (t/24) * inner.w;
          return (
            <g key={t}>
              <line x1={x} x2={x} y1={pad.t + inner.h} y2={pad.t + inner.h + 3} stroke="var(--text-faint)" strokeWidth="0.5"/>
              <text x={x} y={pad.t + inner.h + 14} fontSize="9" fill="var(--text-dim)" fontFamily="IBM Plex Mono" textAnchor="middle">
                {String(t).padStart(2,"0")}:00
              </text>
            </g>
          );
        })}
        {/* threshold line (75% of max) */}
        <line x1={pad.l} x2={pad.l + inner.w}
              y1={pad.t + (1 - (k.max*0.85 - min)/span) * inner.h}
              y2={pad.t + (1 - (k.max*0.85 - min)/span) * inner.h}
              stroke="var(--status-minor)" strokeDasharray="4 4" strokeWidth="0.7" opacity="0.5"/>

        <polyline points={area} fill={`var(--status-${tone}-12)`} stroke="none"/>
        <polyline points={poly} fill="none" stroke={`var(--status-${tone})`} strokeWidth="1.6"/>
        {/* current value pin */}
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3" fill={`var(--status-${tone})`}/>
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="6" fill={`var(--status-${tone})`} opacity="0.25"/>
      </svg>
    </div>
  );
}

// —————————————————————————— Alarms & log ——————————————————————————

function FacilityAlarms({ alarms, onAck }) {
  return (
    <div className="fac-alarms">
      <div className="panel-h">
        <div className="panel-t">Alarmes du site</div>
        <div className="panel-c mono dim">{alarms.filter(a => !a.ack).length} ouvertes</div>
      </div>
      <div className="alarm-list compact">
        {alarms.length === 0 && (
          <div className="empty">
            <StatusDot status="ok" size={8}/>
            <span>Aucune alarme active</span>
          </div>
        )}
        {alarms.map(a => (
          <div key={a.id} className={"alarm-row sev-" + a.sev + (a.ack ? " acked" : "")}>
            <div className="al-bar" style={{ background: STATUS_COLORS[a.sev] }}/>
            <div className="al-body">
              <div className="al-head">
                <span className="al-code mono">{a.code}</span>
                <span className="al-ts mono dim">{a.ts}</span>
              </div>
              <div className="al-msg">{a.msg}</div>
              <div className="al-foot">
                <span className="al-src mono dim">src · {a.src}</span>
                {!a.ack
                  ? <button className="btn-xs" onClick={() => onAck(a.id)}>ACK</button>
                  : <span className="al-acked mono dim">acquittée</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperatorLog({ facId }) {
  const entries = window.OPLOG.filter(e => e.facId === facId).concat(
    [
      { ts: "06:00:00", facId, who: "SYSTEM", text: "Rapport journalier généré (export OK)" },
      { ts: "00:14:11", facId, who: "SYSTEM", text: "Maintenance programmée — fin (durée 47 min)" },
      { ts: "00:00:00", facId, who: "SYSTEM", text: "Bascule cycle nuit · seuils nominaux" },
    ]
  );
  return (
    <div className="oplog">
      <div className="panel-h">
        <div className="panel-t">Journal opérateur</div>
        <div className="panel-c mono dim">{entries.length} entrées · 24 h</div>
      </div>
      <ul className="log-list">
        {entries.map((e, i) => (
          <li key={i} className={"log-row " + (e.who === "SYSTEM" ? "sys" : "op")}>
            <span className="log-ts mono dim">{e.ts}</span>
            <span className="log-who mono">{e.who}</span>
            <span className="log-text">{e.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// —————————————————————————— Equipment detail panel ——————————————————————————

function NodeDetail({ node, facility, onClose }) {
  if (!node) return null;
  const eqMap = { pump1: "P-HP-01", pump2: "P-HP-02", chlor: "DOS-CL-1", ozone: "OZ-GEN-1", coag: "DOS-CO-1" };
  const tag = eqMap[node.id];
  const eq = tag ? window.EQUIPMENT_TEMPLATE.find(e => e.tag === tag) : null;
  const isControllable = node.kind === "pump" || node.kind === "dose";
  const [running, setRunning] = _useState2(eq?.state === "RUN" || eq?.state === "OPEN");

  return (
    <div className="node-detail">
      <div className="nd-h">
        <div>
          <div className="nd-tag mono">{node.sub}</div>
          <div className="nd-name">{node.label}</div>
        </div>
        <button className="x" onClick={onClose}>✕</button>
      </div>
      <div className="nd-grid">
        <div className="nd-cell">
          <div className="nd-l">Mesure principale</div>
          <div className="nd-v mono">{node.metric.v}<span className="dim"> {node.metric.u}</span></div>
        </div>
        <div className="nd-cell">
          <div className="nd-l">État</div>
          <div className="nd-v"><EqState state={eq?.state || "OK"}/></div>
        </div>
        {eq && (
          <>
            <div className="nd-cell">
              <div className="nd-l">Modèle</div>
              <div className="nd-v sm">{eq.model}</div>
            </div>
            <div className="nd-cell">
              <div className="nd-l">Compteur</div>
              <div className="nd-v mono">{eq.runtime}</div>
            </div>
          </>
        )}
      </div>
      {isControllable && (
        <div className="nd-controls">
          <div className="nd-l">Commande</div>
          <div className="ctrl-row">
            <button className={"toggle " + (running ? "on" : "")} onClick={() => setRunning(r => !r)}>
              <span className="toggle-knob"></span>
              <span className="toggle-on">MARCHE</span>
              <span className="toggle-off">ARRÊT</span>
            </button>
            <button className="btn-sec">FORÇAGE LOCAL</button>
            <button className="btn-sec">CONSIGNATION</button>
          </div>
          <div className="nd-meta mono dim sm">Dernière commande: 09:50 par Mme Dubois · Mode AUTO</div>
        </div>
      )}
    </div>
  );
}

// —————————————————————————— Facility View root ——————————————————————————

function FacilityView({ facility, alarms, allAlarms, onAck, onBack, onPickFacility }) {
  const [tab, setTab] = _useState2("trends");
  const [kpiKey, setKpiKey] = _useState2("flow");
  const [selectedNode, setSelectedNode] = _useState2(null);
  const kpis = _useMemo2(() => window.KPIS_FOR(facility.id), [facility.id]);
  const nodeObj = window.PROCESS_NODES.find(n => n.id === selectedNode);

  // siblings for the mini-list
  const nearby = _useMemo2(() => {
    return [...window.FACILITIES]
      .filter(f => f.id !== facility.id)
      .map(f => ({ ...f, d: Math.hypot(f.x - facility.x, f.y - facility.y) }))
      .sort((a,b) => a.d - b.d)
      .slice(0, 6);
  }, [facility.id]);

  return (
    <main className="main facility-layout">
      {/* Header strip */}
      <div className="fac-head">
        <button className="back-btn" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          <span>Carte</span>
        </button>
        <div className="fac-title">
          <div className="ft-row">
            <h1>{facility.name}</h1>
            <Pill status={facility.status}>{window.STATUS_FR[facility.status]}</Pill>
          </div>
          <div className="ft-sub mono dim">
            <span>{facility.region}</span>
            <span className="sep">·</span>
            <span>{facility.city}</span>
            <span className="sep">·</span>
            <span>EAU {facility.kind === "surface" ? "DE SURFACE" : "SOUTERRAINE"}</span>
            <span className="sep">·</span>
            <span>NOM. {facility.capacity} m³/h</span>
          </div>
        </div>
        <div className="fac-head-stats">
          <FacHeadStat label="Production" value={Math.round(facility.load)} unit="m³/h" tone={facility.status}/>
          <FacHeadStat label="Charge" value={Math.round((facility.load/facility.capacity)*100)} unit="%" tone="ok"/>
          <FacHeadStat label="Alarmes" value={alarms.filter(a=>!a.ack).length} unit="" tone={facility.status === "critical" ? "critical" : facility.status === "major" ? "major" : alarms.length ? "minor" : "ok"}/>
        </div>
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        {kpis.map(k => {
          const pct = (k.value - k.min) / (k.max - k.min);
          let tone = "ok";
          if (pct > 1.0 || pct < 0.0)        tone = "critical";
          else if (pct > 0.92 || pct < 0.08) tone = "major";
          else if (pct > 0.82 || pct < 0.18) tone = "minor";
          return (
            <div key={k.key} className={"kpi big tone-" + tone} onClick={() => setKpiKey(k.key)} style={{ cursor: "pointer" }}>
              <div className="kpi-l">{k.label}</div>
              <div className="kpi-v">
                <span className="mono" style={{ color: STATUS_COLORS[tone] }}>{typeof k.value === "number" && k.value % 1 !== 0 ? k.value.toFixed(2) : k.value}</span>
                <span className="kpi-u mono dim">{k.unit}</span>
              </div>
              <Sparkline data={k.hist} tone={tone} w={150} h={28}/>
              <div className="kpi-range mono dim">
                <span>min {Math.min(...k.hist).toFixed(k.unit === "m³/h" || k.unit === "%" ? 0 : 2)}</span>
                <span>max {Math.max(...k.hist).toFixed(k.unit === "m³/h" || k.unit === "%" ? 0 : 2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid: process + sidebar tabs */}
      <div className="fac-body">
        <div className="fac-col main-col">
          <ProcessDiagram
            facility={facility}
            alarms={alarms}
            onPickNode={(id) => setSelectedNode(prev => prev === id ? null : id)}
            selectedNode={selectedNode}
          />
          {selectedNode && (
            <NodeDetail node={nodeObj} facility={facility} onClose={() => setSelectedNode(null)}/>
          )}
          <TrendChart kpis={kpis} activeKey={kpiKey} setActiveKey={setKpiKey}/>
          <EquipmentTable facility={facility} focusedNode={selectedNode}/>
        </div>

        <div className="fac-col side-col">
          <FacilityAlarms alarms={alarms} onAck={onAck}/>
          <OperatorLog facId={facility.id}/>
          <div className="nearby">
            <div className="panel-h">
              <div className="panel-t">Sites voisins</div>
            </div>
            <div className="nearby-list">
              {nearby.map(f => (
                <button key={f.id} className="nearby-row" onClick={() => onPickFacility(f.id)}>
                  <StatusDot status={f.status} size={6}/>
                  <span className="nb-name">{f.name}</span>
                  <span className="nb-d mono dim">{(f.d / 8).toFixed(0)} km</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FacHeadStat({ label, value, unit, tone }) {
  return (
    <div className="fhs">
      <div className="fhs-l">{label}</div>
      <div className="fhs-v">
        <span className="mono" style={{ color: STATUS_COLORS[tone] }}>{value}</span>
        <span className="fhs-u mono dim">{unit}</span>
      </div>
    </div>
  );
}

Object.assign(window, { FacilityView });
