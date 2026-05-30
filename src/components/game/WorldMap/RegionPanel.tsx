import { Lock, Pickaxe } from 'lucide-react';
import { regions } from '../../../game/data/regions';
import { ingredientById, useGameStore } from '../../../game/store/gameStore';

export function RegionPanel() {
  const activeRegionId = useGameStore((state) => state.activeRegion);
  const collectResources = useGameStore((state) => state.actions.collectResources);
  const region = regions.find((item) => item.id === activeRegionId) ?? regions[0];

  return (
    <section className="panel region-panel" style={{ '--region': region.accentColor } as React.CSSProperties}>
      <p className="eyebrow">Region</p>
      <h2>{region.name}</h2>
      <p className="body-text">{region.description}</p>
      <div className="monster-list">
        {region.monsters.map((monster) => (
          <span key={monster.id}>{monster.name} Lv {monster.level}</span>
        ))}
      </div>
      <div className="resource-preview">
        {region.resources.slice(0, 5).map((id) => (
          <span key={id}>{ingredientById.get(id)?.name}</span>
        ))}
      </div>
      <button className="primary-button" disabled={!region.unlocked} type="button" onClick={() => collectResources(region.id)}>
        {region.unlocked ? <Pickaxe size={17} /> : <Lock size={17} />}
        {region.unlocked ? 'Collect resources' : 'Locked'}
      </button>
    </section>
  );
}
