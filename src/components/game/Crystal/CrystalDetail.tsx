import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { rarityConfig } from '../../../game/data/crystals';
import type { Crystal } from '../../../game/types';
import { useGameStore } from '../../../game/store/gameStore';
import { CrystalSVG } from './CrystalSVG';

export function CrystalDetail({ crystal, onClose }: { crystal: Crystal; onClose: () => void }) {
  const nurtureCrystal = useGameStore((state) => state.actions.nurtureCrystal);
  const [cooldown, setCooldown] = useState(0);
  const rarity = rarityConfig[crystal.rarity];

  useEffect(() => {
    const updateCooldown = () => setCooldown(Math.max(0, 12 - Math.floor((Date.now() - crystal.lastNurturedAt) / 1000)));
    updateCooldown();
    const timer = window.setInterval(updateCooldown, 1000);
    return () => window.clearInterval(timer);
  }, [crystal.lastNurturedAt]);

  return (
    <div className="modal-backdrop">
      <section className="crystal-detail" style={{ '--rarity': rarity.color } as React.CSSProperties}>
        <button className="icon-button close-button" type="button" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="detail-art">
          <CrystalSVG crystal={crystal} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{rarity.label} {crystal.shape}</p>
          <h2>{crystal.name}</h2>
          <p className="body-text">{crystal.traits.join(' / ')}</p>
          <div className="growth-bar">
            <i style={{ width: `${Math.min(100, crystal.growthLevel)}%` }} />
          </div>
          <div className="stat-grid">
            <span>Power <b>{crystal.stats.power}</b></span>
            <span>Magic <b>{crystal.stats.magic}</b></span>
            <span>Defense <b>{crystal.stats.defense}</b></span>
            <span>Spirit <b>{crystal.stats.spirit}</b></span>
          </div>
          <div className="effect-list">
            {crystal.effects.map((effect) => (
              <span key={effect}>{effect}</span>
            ))}
          </div>
          <button className="primary-button" type="button" disabled={cooldown > 0 || crystal.growthLevel >= 100} onClick={() => nurtureCrystal(crystal.id)}>
            {crystal.growthLevel >= 100 ? 'Fully grown' : cooldown > 0 ? `Nurture in ${cooldown}s` : 'Nurture crystal'}
          </button>
        </div>
      </section>
    </div>
  );
}
