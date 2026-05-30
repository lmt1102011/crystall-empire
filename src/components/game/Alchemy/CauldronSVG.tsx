export function CauldronSVG({ color }: { color: string }) {
  return (
    <svg className="cauldron-svg" viewBox="0 0 220 180" aria-label="Alchemy cauldron">
      <defs>
        <radialGradient id="brewGlow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.78" />
          <stop offset="55%" stopColor={color} stopOpacity="0.74" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="58" rx="78" ry="22" fill="url(#brewGlow)" />
      <path d="M36 62 C42 132 70 162 110 162 C150 162 178 132 184 62 Z" fill="#111827" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
      <ellipse cx="110" cy="62" rx="78" ry="24" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="5" />
      <circle cx="82" cy="48" r="5" fill="#fff" opacity="0.58" />
      <circle cx="118" cy="40" r="4" fill="#fff" opacity="0.5" />
      <circle cx="144" cy="54" r="6" fill="#fff" opacity="0.42" />
      <path d="M58 160 L42 176 M162 160 L178 176" stroke="#020617" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
