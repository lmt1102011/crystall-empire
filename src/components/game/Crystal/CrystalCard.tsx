import { Sparkles } from 'lucide-react';
import { rarityConfig } from '../../../game/data/crystals';
import type { Crystal } from '../../../game/types';
import { CrystalSVG } from './CrystalSVG';

export function CrystalCard({ crystal, onOpen }: { crystal: Crystal; onOpen: (crystal: Crystal) => void }) {
  const rarity = rarityConfig[crystal.rarity];
  return (
    <button className="crystal-card-game" type="button" onClick={() => onOpen(crystal)} style={{ '--rarity': rarity.color } as React.CSSProperties}>
      <div className="crystal-art">
        <CrystalSVG crystal={crystal} />
      </div>
      <div className="crystal-card-copy">
        <span>{rarity.label}</span>
        <h3>{crystal.name}</h3>
        <p>{crystal.shape} / growth {Math.round(crystal.growthLevel)}%</p>
      </div>
      {crystal.isMutant && (
        <b className="mutant-chip">
          <Sparkles size={13} />
          Mutant
        </b>
      )}
    </button>
  );
}
