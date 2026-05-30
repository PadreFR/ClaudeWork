// Naïade — fixture data for the SCADA prototype
// Coords are on the France SVG canvas (viewBox 0 0 900 1000)

window.FACILITIES = [
  // —————————————————————————— Île-de-France ——————————————————————————
  { id: "f01", name: "Choisy-le-Roi",        city: "Paris",        region: "Île-de-France",          x: 458.34, y: 291.62, status: "ok",      capacity: 800,  load: 612, kind: "surface" },
  { id: "f02", name: "Méry-sur-Oise",        city: "Val-d'Oise",   region: "Île-de-France",          x: 446.11, y: 266.5, status: "ok",      capacity: 340,  load: 248, kind: "surface" },
  { id: "f03", name: "Neuilly-sur-Marne",    city: "Seine-St-Denis",region: "Île-de-France",         x: 465.56, y: 283.52, status: "minor",   capacity: 620,  load: 510, kind: "surface" },
  { id: "f04", name: "Orly",                 city: "Val-de-Marne", region: "Île-de-France",          x: 458.34, y: 293.24, status: "ok",      capacity: 450,  load: 322, kind: "surface" },

  // —————————————————————————— Hauts-de-France / Normandie ——————————————————————————
  { id: "f05", name: "Lille-Sud",            city: "Lille",        region: "Hauts-de-France",        x: 495.01, y: 140.1, status: "ok",      capacity: 280,  load: 196, kind: "ground" },
  { id: "f06", name: "Amiens-Aval",          city: "Amiens",       region: "Hauts-de-France",        x: 452.22, y: 200.06, status: "ok",      capacity: 145,  load: 102, kind: "surface" },
  { id: "f07", name: "Calais-Côte d'Opale",  city: "Calais",       region: "Hauts-de-France",        x: 427.77, y: 114.17,  status: "ok",      capacity: 92,   load: 64,  kind: "ground" },
  { id: "f08", name: "Rouen-Robec",          city: "Rouen",        region: "Normandie",              x: 386.09, y: 236.52, status: "ok",      capacity: 210,  load: 144, kind: "surface" },
  { id: "f09", name: "Le Havre-Estuaire",    city: "Le Havre",     region: "Normandie",              x: 331.08, y: 232.47, status: "ok",      capacity: 175,  load: 121, kind: "surface" },
  { id: "f10", name: "Caen-Orne",            city: "Caen",         region: "Normandie",              x: 304.41, y: 257.59, status: "ok",      capacity: 130,  load: 89,  kind: "ground" },

  // —————————————————————————— Grand Est ——————————————————————————
  { id: "f11", name: "Strasbourg-Polygone",  city: "Strasbourg",   region: "Grand Est",              x: 755.64, y: 306.2, status: "ok",      capacity: 310,  load: 218, kind: "ground" },
  { id: "f12", name: "Reims-Auménancourt",   city: "Reims",        region: "Grand Est",              x: 548.92, y: 251.11, status: "ok",      capacity: 168,  load: 119, kind: "ground" },
  { id: "f13", name: "Metz-Moulins",         city: "Metz",         region: "Grand Est",              x: 668.39, y: 262.45, status: "ok",      capacity: 142,  load: 93,  kind: "surface" },
  { id: "f14", name: "Nancy-Messein",        city: "Nancy",        region: "Grand Est",              x: 668.39, y: 297.29, status: "minor",   capacity: 138,  load: 110, kind: "surface" },
  { id: "f15", name: "Mulhouse-Bourtzwiller",city: "Mulhouse",     region: "Grand Est",              x: 732.85, y: 373.46, status: "ok",      capacity: 115,  load: 79,  kind: "ground" },

  // —————————————————————————— Bourgogne-FC / CVL ——————————————————————————
  { id: "f16", name: "Dijon-Poncey",         city: "Dijon",        region: "Bourgogne-FC",           x: 605.04, y: 408.3, status: "ok",      capacity: 165,  load: 112, kind: "ground" },
  { id: "f17", name: "Besançon-Chenecey",    city: "Besançon",     region: "Bourgogne-FC",           x: 659.5, y: 414.78, status: "ok",      capacity: 88,   load: 60,  kind: "surface" },
  { id: "f18", name: "Orléans-La-Source",    city: "Orléans",      region: "Centre-Val de Loire",    x: 431.11, y: 361.3, status: "ok",      capacity: 154,  load: 108, kind: "ground" },
  { id: "f19", name: "Tours-Bellevue",       city: "Tours",        region: "Centre-Val de Loire",    x: 363.31, y: 402.63, status: "ok",      capacity: 132,  load: 91,  kind: "surface" },

  // —————————————————————————— Pays de la Loire / Bretagne ——————————————————————————
  { id: "f20", name: "Nantes-La-Roche",      city: "Nantes",       region: "Pays de la Loire",       x: 238.83, y: 416.4, status: "ok",      capacity: 245,  load: 168, kind: "surface" },
  { id: "f21", name: "Angers-Bouchemaine",   city: "Angers",       region: "Pays de la Loire",       x: 294.4, y: 396.15, status: "ok",      capacity: 118,  load: 81,  kind: "surface" },
  { id: "f22", name: "Le Mans-Antonnière",   city: "Le Mans",      region: "Pays de la Loire",       x: 336.08, y: 353.2, status: "ok",      capacity: 96,   load: 66,  kind: "surface" },
  { id: "f23", name: "Rennes-Mézières",      city: "Rennes",       region: "Bretagne",               x: 231.61, y: 344.29, status: "ok",      capacity: 145,  load: 99,  kind: "surface" },
  { id: "f24", name: "Brest-Pont-Cabioch",   city: "Brest",        region: "Bretagne",               x: 75.46, y: 321.6, status: "critical",capacity: 78,   load: 31,  kind: "surface" },

  // —————————————————————————— Nouvelle-Aquitaine ——————————————————————————
  { id: "f25", name: "Bordeaux-Cap-de-Bos",  city: "Bordeaux",     region: "Nouvelle-Aquitaine",     x: 292.74, y: 609.25, status: "ok",      capacity: 295,  load: 207, kind: "ground" },
  { id: "f26", name: "Poitiers-Sarzec",      city: "Poitiers",     region: "Nouvelle-Aquitaine",     x: 343.86, y: 468.26, status: "ok",      capacity: 102,  load: 71,  kind: "ground" },
  { id: "f27", name: "La Rochelle-Coulonge", city: "La Rochelle",  region: "Nouvelle-Aquitaine",     x: 261.06, y: 502.29, status: "ok",      capacity: 86,   load: 60,  kind: "surface" },
  { id: "f28", name: "Limoges-Vienne",       city: "Limoges",      region: "Nouvelle-Aquitaine",     x: 394.99, y: 529.03, status: "ok",      capacity: 110,  load: 76,  kind: "surface" },
  { id: "f29", name: "Pau-Gave",             city: "Pau",          region: "Nouvelle-Aquitaine",     x: 304.41, y: 734.03, status: "ok",      capacity: 74,   load: 51,  kind: "surface" },

  // —————————————————————————— Occitanie ——————————————————————————
  { id: "f30", name: "Toulouse-Pech-David",  city: "Toulouse",     region: "Occitanie",              x: 404.99, y: 709.72, status: "ok",      capacity: 270,  load: 188, kind: "surface" },
  { id: "f31", name: "Montpellier-Arago",    city: "Montpellier",  region: "Occitanie",              x: 540.58, y: 708.91, status: "minor",   capacity: 192,  load: 162, kind: "surface" },
  { id: "f32", name: "Nîmes-Carré-de-Boue",  city: "Nîmes",        region: "Occitanie",              x: 567.25, y: 690.28, status: "ok",      capacity: 124,  load: 87,  kind: "ground" },
  { id: "f33", name: "Perpignan-Lavall",     city: "Perpignan",    region: "Occitanie",              x: 486.12, y: 782.65, status: "ok",      capacity: 96,   load: 67,  kind: "ground" },

  // —————————————————————————— Auvergne-Rhône-Alpes ——————————————————————————
  { id: "f34", name: "Lyon-Croix-Luizet",    city: "Lyon",         region: "Auvergne-Rhône-Alpes",   x: 593.37, y: 534.7, status: "ok",      capacity: 410,  load: 286, kind: "ground" },
  { id: "f35", name: "Grenoble-Rochefort",   city: "Grenoble",     region: "Auvergne-Rhône-Alpes",   x: 642.83, y: 580.89, status: "ok",      capacity: 165,  load: 113, kind: "ground" },
  { id: "f36", name: "St-Étienne-Solaure",   city: "Saint-Étienne",region: "Auvergne-Rhône-Alpes",   x: 568.92, y: 561.44, status: "ok",      capacity: 138,  load: 95,  kind: "surface" },
  { id: "f37", name: "Annecy-Pringy",        city: "Annecy",       region: "Auvergne-Rhône-Alpes",   x: 665.61, y: 523.36, status: "ok",      capacity: 95,   load: 65,  kind: "ground" },
  { id: "f38", name: "Clermont-Côte-Verse",  city: "Clermont-Fd",  region: "Auvergne-Rhône-Alpes",   x: 496.12, y: 533.08, status: "ok",      capacity: 152,  load: 105, kind: "surface" },

  // —————————————————————————— PACA / Corse ——————————————————————————
  { id: "f39", name: "Marseille-Sainte-Marthe",city: "Marseille",  region: "PACA",                   x: 623.38, y: 734.03, status: "major",   capacity: 360,  load: 198, kind: "surface" },
  { id: "f40", name: "Nice-Rimiez",          city: "Nice",         region: "PACA",                   x: 728.96, y: 701.62, status: "ok",      capacity: 215,  load: 148, kind: "surface" },
  { id: "f41", name: "Toulon-La-Valette",    city: "Toulon",       region: "PACA",                   x: 654.5, y: 748.62, status: "ok",      capacity: 158,  load: 109, kind: "surface" },
  { id: "f42", name: "Avignon-Saze",         city: "Avignon",      region: "PACA",                   x: 592.26, y: 681.36, status: "ok",      capacity: 142,  load: 97,  kind: "ground" },
  { id: "f43", name: "Ajaccio-Sainte-Lucie", city: "Ajaccio",      region: "Corse",                  x: 810.65, y: 845.85, status: "minor",   capacity: 68,   load: 54,  kind: "surface" },
];

// Stylized France outline path (viewBox 0 0 900 1000) — counter-clockwise from Calais
window.FRANCE_PATH = "M 457.22 106.88 L 466.67 115.79 L 485.01 122.27 L 501.68 127.94 L 517.8 150.63 L 527.8 154.68 L 545.58 161.98 L 557.25 180.61 L 572.26 196.01 L 577.81 194.39 L 593.37 178.18 L 595.04 197.63 L 613.93 208.97 L 646.16 227.61 L 678.39 234.9 L 688.95 246.24 L 710.07 259.21 L 717.85 268.93 L 744.52 268.12 L 766.75 268.93 L 761.19 300.53 L 757.86 328.89 L 748.41 366.17 L 746.75 385.61 L 716.74 394.53 L 705.62 409.92 L 683.4 442.33 L 668.39 482.85 L 706.18 529.03 L 709.51 580.08 L 716.74 600.34 L 733.97 661.11 L 744.52 695.14 L 730.63 701.62 L 715.63 713.78 L 694.51 736.46 L 669.5 747.81 L 654.5 748.62 L 636.16 742.14 L 625.05 734.03 L 608.38 725.93 L 594.48 729.17 L 558.36 721.88 L 530.02 725.93 L 508.35 738.08 L 495.57 758.34 L 494.46 782.65 L 500.57 803.72 L 463.89 798.85 L 405.54 781.03 L 372.2 774.55 L 336.08 764.82 L 294.4 752.67 L 254.39 742.14 L 226.05 729.17 L 238.83 717.83 L 247.17 661.11 L 259.95 623.83 L 258.28 580.08 L 266.06 550.1 L 277.73 551.72 L 271.62 520.12 L 261.06 502.29 L 238.83 490.95 L 226.05 475.55 L 208.27 438.28 L 202.16 412.35 L 183.26 393.72 L 171.59 380.75 L 137.69 373.46 L 107.13 366.98 L 97.13 354.01 L 80.46 365.36 L 61.56 349.96 L 72.12 328.89 L 75.46 321.6 L 66.56 312.69 L 80.46 299.72 L 103.24 294.86 L 133.25 294.05 L 155.48 290 L 183.26 300.53 L 196.04 298.1 L 212.16 300.53 L 241.06 301.34 L 238.83 272.17 L 233.28 247.86 L 234.94 219.5 L 217.16 213.83 L 252.72 219.5 L 263.84 239.76 L 290.51 244.62 L 318.3 249.49 L 337.75 238.14 L 330.52 231.66 L 361.09 204.11 L 384.43 196.82 L 401.1 186.28 L 411.1 150.63 L 414.99 131.99 L 427.77 114.17 Z";

// Corsica — small island
window.CORSE_PATH = "M 848.44 758.34 L 855.66 782.65 L 855.66 794.8 L 855.66 815.06 L 847.33 851.52 L 836.21 875.83 L 820.66 875.83 L 812.88 867.73 L 810.65 845.85 L 802.87 823.16 L 805.65 800.48 L 827.88 786.7 L 844.55 770.5 Z";

// Major rivers (Seine, Loire, Rhône, Garonne) — decorative
window.RIVERS = [
  "M 581.7 378.32 Q 551.69 328.89 530.02 322.815 Q 508.35 316.74 481.95500000000004 300.53499999999997 Q 455.56 284.33 436.11 274.2 Q 416.66 264.07 401.375 250.29500000000002 Q 386.09 236.52 366.64 236.115 Q 347.19 235.71 338.855 233.685 T 330.52 231.66",
  "M 557.25 610.06 Q 544.47 571.98 526.4100000000001 539.565 Q 508.35 507.15 504.46000000000004 472.31 Q 500.57 437.47 479.455 423.69500000000005 Q 458.34 409.92 444.725 385.61 Q 431.11 361.3 414.15999999999997 375.48 Q 397.21 389.66 380.26 396.145 Q 363.31 402.63 328.855 399.39 Q 294.4 396.15 266.615 406.275 Q 238.83 416.4 220.495 414.375 T 202.16 412.35",
  "M 666.72 499.05 Q 641.72 519.31 617.5450000000001 527.005 Q 593.37 534.7 593.925 553.34 Q 594.48 571.98 594.48 602.365 Q 594.48 632.75 593.37 657.0550000000001 Q 592.26 681.36 583.645 697.5699999999999 Q 575.03 713.78 584.755 721.4749999999999 T 594.48 729.17",
  "M 361.09 774.55 Q 383.32 750.24 394.155 729.98 Q 404.99 709.72 392.765 689.465 Q 380.54 669.21 361.09000000000003 655.03 Q 341.64 640.85 317.19 625.05 Q 292.74 609.25 284.96000000000004 586.56 Q 277.18 563.87 271.62 556.985 T 266.06 550.1",
];

// Process diagram nodes — same shape for all facilities, instance state per fac
window.PROCESS_NODES = [
  { id: "intake",   x: 60,  y: 220, w: 90,  h: 60, label: "Prise d'eau",     sub: "INTAKE",       kind: "source",  metric: { v: 612, u: "m³/h" } },
  { id: "screen",   x: 190, y: 220, w: 90,  h: 60, label: "Dégrillage",      sub: "SCREEN",       kind: "filter",  metric: { v: 99.4, u: "%" } },
  { id: "coag",     x: 320, y: 220, w: 100, h: 60, label: "Coagulation",     sub: "COAG-A1",      kind: "dose",    metric: { v: 32, u: "mg/L" } },
  { id: "sed",      x: 460, y: 220, w: 110, h: 60, label: "Décantation",    sub: "SED-B2",       kind: "tank",    metric: { v: 4.1, u: "NTU" } },
  { id: "sandfilt", x: 610, y: 180, w: 100, h: 60, label: "Filtre sable",    sub: "SF-1",         kind: "filter",  metric: { v: 0.42, u: "NTU" } },
  { id: "carbon",   x: 610, y: 260, w: 100, h: 60, label: "Filtre charbon",  sub: "CF-1",         kind: "filter",  metric: { v: 0.35, u: "NTU" } },
  { id: "ozone",    x: 750, y: 220, w: 100, h: 60, label: "Ozonation",       sub: "OZ-1",         kind: "dose",    metric: { v: 1.2, u: "mg/L" } },
  { id: "chlor",    x: 750, y: 320, w: 100, h: 60, label: "Chloration",      sub: "CL-1",         kind: "dose",    metric: { v: 0.42, u: "mg/L" } },
  { id: "reservoir",x: 900, y: 270, w: 110, h: 70, label: "Réservoir",       sub: "RES-NORD",     kind: "tank",    metric: { v: 78, u: "%" } },
  { id: "pump1",    x: 1060,y: 240, w: 80,  h: 50, label: "Pompe HP 1",      sub: "P-HP-01",      kind: "pump",    metric: { v: 6.8, u: "bar" } },
  { id: "pump2",    x: 1060,y: 310, w: 80,  h: 50, label: "Pompe HP 2",      sub: "P-HP-02",      kind: "pump",    metric: { v: 6.7, u: "bar" } },
  { id: "outlet",   x: 1180,y: 275, w: 95,  h: 60, label: "Distribution",    sub: "OUT",          kind: "sink",    metric: { v: 608, u: "m³/h" } },
];

window.PROCESS_EDGES = [
  ["intake","screen"], ["screen","coag"], ["coag","sed"],
  ["sed","sandfilt"], ["sed","carbon"],
  ["sandfilt","ozone"], ["carbon","ozone"],
  ["ozone","chlor"],
  ["chlor","reservoir"],
  ["reservoir","pump1"], ["reservoir","pump2"],
  ["pump1","outlet"], ["pump2","outlet"],
];

// Equipment list per facility (template, modulated by status)
window.EQUIPMENT_TEMPLATE = [
  { tag: "P-HP-01",  type: "Pompe haute pression",     model: "KSB Etanorm 80-200",   state: "RUN",     rpm: 1480, runtime: "14 217 h" },
  { tag: "P-HP-02",  type: "Pompe haute pression",     model: "KSB Etanorm 80-200",   state: "RUN",     rpm: 1485, runtime: "12 902 h" },
  { tag: "P-BP-01",  type: "Pompe basse pression",     model: "Grundfos NK 65-160",   state: "RUN",     rpm: 980,  runtime: "21 044 h" },
  { tag: "P-BP-02",  type: "Pompe basse pression",     model: "Grundfos NK 65-160",   state: "STBY",    rpm: 0,    runtime: "18 561 h" },
  { tag: "V-IN-01",  type: "Vanne motorisée",           model: "Bürkert 3320 DN200",  state: "OPEN",    rpm: null, runtime: "5 122 cy" },
  { tag: "V-CL-01",  type: "Vanne motorisée",           model: "Bürkert 3320 DN150",  state: "OPEN",    rpm: null, runtime: "8 305 cy" },
  { tag: "V-BP-01",  type: "Vanne by-pass",             model: "Bürkert 3320 DN100",  state: "CLOSED",  rpm: null, runtime: "412 cy" },
  { tag: "DOS-CO-1", type: "Pompe doseuse coagulant",   model: "ProMinent Sigma 3",   state: "RUN",     rpm: null, runtime: "9 870 h" },
  { tag: "DOS-CL-1", type: "Pompe doseuse chlore",      model: "ProMinent Sigma 2",   state: "RUN",     rpm: null, runtime: "11 220 h" },
  { tag: "OZ-GEN-1", type: "Générateur ozone",          model: "Wedeco GSO-30",       state: "RUN",     rpm: null, runtime: "3 612 h" },
  { tag: "AN-TU-1",  type: "Analyseur turbidité",        model: "Hach 1720E",          state: "OK",     rpm: null, runtime: "—" },
  { tag: "AN-PH-1",  type: "Analyseur pH",              model: "Endress CPS11D",      state: "OK",     rpm: null, runtime: "—" },
  { tag: "AN-CL-1",  type: "Analyseur chlore libre",    model: "Hach CLF10sc",        state: "OK",     rpm: null, runtime: "—" },
];

// Active alarms — one feed for the whole network
window.ALARMS = [
  { id: "a1",  facId: "f24", sev: "critical", code: "TURB-HI-HI",   msg: "Turbidité brute > 35 NTU (seuil HH)",            ts: "10:42:18", ack: false, node: "sed",  src: "AN-TU-1" },
  { id: "a2",  facId: "f24", sev: "critical", code: "FLOW-LOW",     msg: "Débit aval < 50% nominal",                       ts: "10:42:31", ack: false, node: "outlet", src: "FT-OUT" },
  { id: "a3",  facId: "f39", sev: "major",    code: "PUMP-FAIL",    msg: "P-HP-02 arrêt sur défaut surcharge",             ts: "09:18:04", ack: true,  node: "pump2",  src: "P-HP-02" },
  { id: "a4",  facId: "f39", sev: "major",    code: "RES-LO",       symbol: "RES-NORD", msg: "Réservoir nord < 35% capacité",                  ts: "08:55:12", ack: false, node: "reservoir", src: "LT-RES" },
  { id: "a5",  facId: "f03", sev: "minor",    code: "CL-DEV",       msg: "Chlore libre dérive +0.18 mg/L sur 4 h",         ts: "07:33:50", ack: false, node: "chlor",  src: "AN-CL-1" },
  { id: "a6",  facId: "f14", sev: "minor",    code: "VALVE-SLOW",   msg: "V-CL-01 temps de manœuvre 24s (seuil 18s)",      ts: "06:12:21", ack: true,  node: "chlor",  src: "V-CL-01" },
  { id: "a7",  facId: "f31", sev: "minor",    code: "PH-HI",        msg: "pH sortie 8.4 (seuil haut 8.3)",                 ts: "05:47:09", ack: false, node: "chlor",  src: "AN-PH-1" },
  { id: "a8",  facId: "f43", sev: "minor",    code: "COMM-INT",     msg: "Perte communication 2 min — auto-rétabli",        ts: "04:21:55", ack: true,  node: "intake", src: "RTU-03" },
];

// Operator log — recent events per facility (we'll use a global pool)
window.OPLOG = [
  { ts: "10:42:31", facId: "f24", who: "SYSTEM",    text: "Alarme FLOW-LOW déclenchée sur OUT" },
  { ts: "10:42:18", facId: "f24", who: "SYSTEM",    text: "Alarme TURB-HI-HI déclenchée sur SED-B2" },
  { ts: "10:38:02", facId: "f24", who: "M. Lefevre",text: "Inspection visuelle prise d'eau — débris constatés" },
  { ts: "10:30:00", facId: "f24", who: "M. Lefevre",text: "Bascule sur ligne 2 demandée" },
  { ts: "09:55:42", facId: "f01", who: "SYSTEM",    text: "Cycle de rétrolavage SF-1 terminé (12 min)" },
  { ts: "09:50:11", facId: "f01", who: "Mme Dubois",text: "Acquittement alarme COMM-INT (résolu)" },
  { ts: "09:18:04", facId: "f39", who: "SYSTEM",    text: "P-HP-02 arrêt — surintensité 142% In" },
  { ts: "09:17:58", facId: "f39", who: "SYSTEM",    text: "P-HP-01 démarrage automatique (secours)" },
  { ts: "08:55:12", facId: "f39", who: "SYSTEM",    text: "RES-NORD niveau bas — alerte" },
  { ts: "08:30:00", facId: "f34", who: "Mme Achard",text: "Prise de service quart matin" },
  { ts: "08:12:33", facId: "f34", who: "Mme Achard",text: "Consigne chlore libre ajustée 0.42 → 0.45 mg/L" },
  { ts: "07:45:08", facId: "f01", who: "SYSTEM",    text: "Filtre CF-1 — perte de charge 0.6 bar (normal)" },
  { ts: "07:33:50", facId: "f03", who: "SYSTEM",    text: "Alarme CL-DEV — dérive lente" },
  { ts: "06:12:21", facId: "f14", who: "SYSTEM",    text: "V-CL-01 temps manœuvre hors seuil" },
];

// Per-facility KPIs — current value + 48-pt history (30-min intervals over 24 h)
function gen(seed, base, jit, range){
  // generate smoothly varying samples bounded near `base`
  const arr = [];
  let v = base;
  for (let i = 0; i < 48; i++) {
    const wave = Math.sin(seed + i*0.27) * 0.55 + Math.sin(seed*1.7 + i*0.13) * 0.3;
    const noise = (Math.random() - 0.5) * 0.25;
    v = base + (wave + noise) * jit;
    if (range) v = Math.max(range[0], Math.min(range[1], v));
    arr.push(v);
  }
  return arr;
}

window.KPIS_FOR = function(facId) {
  const f = window.FACILITIES.find(x => x.id === facId) || window.FACILITIES[0];
  const seed = parseInt(f.id.replace(/\D/g,''),10) || 1;
  const stress = f.status === "critical" ? 2.4 : f.status === "major" ? 1.6 : f.status === "minor" ? 1.15 : 1;
  const flowBase = f.load;
  const flowJit  = f.capacity * 0.04 * stress;
  return [
    { key: "flow",   label: "Débit sortie",   unit: "m³/h", value: Math.round(flowBase),                  min: 0,    max: f.capacity, hist: gen(seed*1.1, flowBase, flowJit, [0, f.capacity]) },
    { key: "turb",   label: "Turbidité",      unit: "NTU",  value: +(0.32 + (stress-1)*0.55).toFixed(2),   min: 0,    max: 1.0,        hist: gen(seed*1.7, 0.34 + (stress-1)*0.35, 0.06 + (stress-1)*0.18, [0, 2.5]) },
    { key: "ph",     label: "pH sortie",      unit: "",     value: +(7.4 + (stress-1)*0.1).toFixed(2),    min: 6.5,  max: 8.5,        hist: gen(seed*2.3, 7.45, 0.08 + (stress-1)*0.06, [6.8, 8.4]) },
    { key: "cl",     label: "Chlore libre",   unit: "mg/L", value: +(0.42 + (stress-1)*0.05).toFixed(2),  min: 0.1,  max: 1.0,        hist: gen(seed*2.9, 0.42, 0.04 + (stress-1)*0.03, [0.2, 0.8]) },
    { key: "press",  label: "Pression aval",  unit: "bar",  value: +(6.8 - (stress-1)*0.35).toFixed(2),   min: 4,    max: 9,          hist: gen(seed*3.7, 6.7, 0.18 + (stress-1)*0.15, [4, 8.5]) },
    { key: "level",  label: "Réservoir",      unit: "%",    value: Math.round(78 - (stress-1)*22),        min: 0,    max: 100,        hist: gen(seed*4.3, 76 - (stress-1)*15, 4 + (stress-1)*4, [10, 95]) },
  ];
};

window.STATUS_LABEL = { ok: "OK", minor: "Mineur", major: "Majeur", critical: "Critique" };
window.STATUS_FR    = { ok: "Nominal", minor: "Anomalie mineure", major: "Anomalie majeure", critical: "Critique" };
