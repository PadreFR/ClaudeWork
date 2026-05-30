// Naïade — Tweaks panel
function NaiadeTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Couleur d'accent" />
      <TweakColor
        label="Accent"
        value={tweaks.accent}
        options={["#4dd0e1", "#f6c453", "#5bd8a5"]}
        onChange={(v) => setTweak("accent", v)}
      />

      <TweakSection label="Carte" />
      <TweakRadio
        label="Style"
        value={tweaks.mapStyle}
        options={[
          { value: "minimal", label: "Minimal" },
          { value: "topo",    label: "Topo" },
          { value: "grid",    label: "Grille" },
        ]}
        onChange={(v) => setTweak("mapStyle", v)}
      />

      <TweakSection label="Interface" />
      <TweakRadio
        label="Densité"
        value={tweaks.density}
        options={[
          { value: "comfortable", label: "Confort" },
          { value: "compact",     label: "Compact" },
        ]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakToggle
        label="Mode opérateur (gros texte)"
        value={!!tweaks.bigText}
        onChange={(v) => setTweak("bigText", v)}
      />
    </TweaksPanel>
  );
}

window.NaiadeTweaks = NaiadeTweaks;
