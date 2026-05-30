import { regions } from '../../../game/data/regions';
import { useGameStore } from '../../../game/store/gameStore';

export function WorldMapSVG() {
  const activeRegion = useGameStore((state) => state.activeRegion);
  const setActiveRegion = useGameStore((state) => state.actions.setActiveRegion);

  return (
    <svg className="world-map-svg" viewBox="0 0 600 520" role="img" aria-label="Crystal Empire world map">
      <defs>
        {regions.map((region) => (
          <linearGradient id={`region-${region.id}`} key={region.id} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={region.accentColor} stopOpacity="0.72" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.86" />
          </linearGradient>
        ))}
      </defs>
      <rect width="600" height="520" rx="34" fill="rgba(255,255,255,0.04)" />
      {regions.map((region) => (
        <path
          className={`${activeRegion === region.id ? 'active' : ''} ${region.unlocked ? '' : 'locked'}`}
          d={region.svgPath}
          fill={`url(#region-${region.id})`}
          key={region.id}
          onClick={() => region.unlocked && setActiveRegion(region.id)}
        />
      ))}
    </svg>
  );
}
