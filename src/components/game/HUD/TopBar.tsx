import { Coins, Gem, Sparkles, Star } from 'lucide-react';
import type { CloudStatus } from '../../../game/store/cloudSync';
import { useGameStore } from '../../../game/store/gameStore';
import { ResourceChip } from './ResourceChip';

const cloudLabels: Record<CloudStatus, string> = {
  local: 'Local save',
  connecting: 'Cloud...',
  synced: 'Cloud synced',
  saving: 'Saving...',
  offline: 'Cloud offline',
};

export function TopBar({ cloudStatus }: { cloudStatus: CloudStatus }) {
  const player = useGameStore((state) => state.player);
  const resources = useGameStore((state) => state.resources);
  const crystals = useGameStore((state) => state.crystals.length);

  return (
    <header className="game-topbar">
      <div className="empire-brand">
        <span className="brand-crystal"><Gem size={22} /></span>
        <div>
          <p className="eyebrow">Crystal Empire Online</p>
          <h1>{player.name}</h1>
        </div>
      </div>
      <div className="level-pill">
        <Star size={16} />
        Lv {player.level}
        <i><b style={{ width: `${Math.round((player.xp / 120) * 100)}%` }} /></i>
      </div>
      <div className="resource-row">
        <ResourceChip icon={Coins} label="Gold" value={resources.gold} />
        <ResourceChip icon={Sparkles} label="Essence" value={resources.essence} />
        <ResourceChip icon={Gem} label="Crystals" value={crystals} />
        <span className={`cloud-chip ${cloudStatus}`}>{cloudLabels[cloudStatus]}</span>
      </div>
    </header>
  );
}
