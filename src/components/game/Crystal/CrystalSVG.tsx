import { rarityConfig } from '../../../game/data/crystals';
import type { Crystal } from '../../../game/types';
import { crystalPolygon } from '../../../game/utils/crystalGen';

export function CrystalSVG({ crystal, compact = false }: { crystal: Crystal; compact?: boolean }) {
  const rarity = rarityConfig[crystal.rarity];
  const points = crystalPolygon(crystal.shape, crystal.seed, crystal.growthLevel);
  const inner = crystalPolygon(crystal.shape, crystal.seed + 17, Math.max(12, crystal.growthLevel - 18));
  const gradientId = `crystal-${crystal.id}`;
  const glowStyle = { filter: `drop-shadow(0 0 ${compact ? 10 : 18}px ${rarity.glow})` };

  return (
    <svg className={compact ? 'crystal-svg compact' : 'crystal-svg'} viewBox="0 0 100 110" role="img" aria-label={crystal.name} style={glowStyle}>
      <defs>
        <linearGradient id={gradientId} x1="18%" x2="82%" y1="4%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="42%" stopColor={`hsl(${crystal.hue} ${crystal.saturation}% 72%)`} stopOpacity="0.82" />
          <stop offset="100%" stopColor={rarity.color} stopOpacity="0.68" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="98" rx="34" ry="6" fill="rgba(0,0,0,0.24)" />
      <polygon points={points} fill={`url(#${gradientId})`} stroke="rgba(255,255,255,0.78)" strokeWidth="1.1" />
      <polygon points={inner} fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.34)" strokeWidth="0.8" />
      <path d="M50 8 L50 92" stroke="rgba(255,255,255,0.48)" strokeWidth="0.9" />
      <path d="M30 38 L50 28 L72 40" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="0.9" />
      {crystal.isMutant && <circle cx="70" cy="25" r="4" fill="#fff" opacity="0.65" />}
    </svg>
  );
}
