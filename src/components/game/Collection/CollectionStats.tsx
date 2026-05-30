import { rarityConfig } from '../../../game/data/crystals';
import { useGameStore } from '../../../game/store/gameStore';
import type { CrystalRarity } from '../../../game/types';

export function CollectionStats() {
  const crystals = useGameStore((state) => state.crystals);
  const counts = crystals.reduce<Record<string, number>>((all, crystal) => {
    all[crystal.rarity] = (all[crystal.rarity] ?? 0) + 1;
    return all;
  }, {});

  return (
    <section className="panel collection-stats">
      <p className="eyebrow">Collection</p>
      <h2>{crystals.length} specimens</h2>
      <div className="rarity-breakdown">
        {(Object.keys(rarityConfig) as CrystalRarity[]).map((rarity) => (
          <span key={rarity} style={{ '--rarity': rarityConfig[rarity].color } as React.CSSProperties}>
            {rarityConfig[rarity].label}
            <b>{counts[rarity] ?? 0}</b>
          </span>
        ))}
      </div>
    </section>
  );
}
