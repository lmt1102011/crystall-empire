import { BookOpen, FlaskConical, Gem, Map, Trophy, type LucideIcon } from 'lucide-react';
import type { GameTab } from '../../../game/types';
import { useGameStore } from '../../../game/store/gameStore';

const tabs: Array<{ id: GameTab; label: string; icon: LucideIcon }> = [
  { id: 'nursery', label: 'Nursery', icon: Gem },
  { id: 'alchemy', label: 'Alchemy', icon: FlaskConical },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'collection', label: 'Collection', icon: Trophy },
  { id: 'quests', label: 'Quests', icon: BookOpen },
];

export function BottomNav() {
  const activeTab = useGameStore((state) => state.activeTab);
  const setTab = useGameStore((state) => state.actions.setTab);

  return (
    <nav className="bottom-nav" aria-label="Game navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button className={activeTab === tab.id ? 'active' : ''} key={tab.id} type="button" onClick={() => setTab(tab.id)}>
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
