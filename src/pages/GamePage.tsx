import { useEffect } from 'react';
import { AlchemyPage } from '../components/game/Alchemy';
import { CollectionPage } from '../components/game/Collection';
import { GameLayout } from '../components/game/GameLayout';
import { NurseryPage } from '../components/game/Nursery';
import { QuestsPage } from '../components/game/Quests';
import { WorldMapPage } from '../components/game/WorldMap';
import { useCloudSync } from '../game/store/cloudSync';
import { useGameStore } from '../game/store/gameStore';

export function GamePage() {
  const activeTab = useGameStore((state) => state.activeTab);
  const tickIdle = useGameStore((state) => state.actions.tickIdle);
  const cloudStatus = useCloudSync();

  useEffect(() => {
    tickIdle();
    const onFocus = () => tickIdle();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [tickIdle]);

  return (
    <GameLayout cloudStatus={cloudStatus}>
      {activeTab === 'nursery' && <NurseryPage />}
      {activeTab === 'alchemy' && <AlchemyPage />}
      {activeTab === 'map' && <WorldMapPage />}
      {activeTab === 'collection' && <CollectionPage />}
      {activeTab === 'quests' && <QuestsPage />}
    </GameLayout>
  );
}
