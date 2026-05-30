import { useState } from 'react';
import type { Crystal } from '../../../game/types';
import { useGameStore } from '../../../game/store/gameStore';
import { CrystalCard } from '../Crystal/CrystalCard';
import { CrystalDetail } from '../Crystal/CrystalDetail';
import { HatchPanel } from './HatchPanel';

export function NurseryPage() {
  const crystals = useGameStore((state) => state.crystals);
  const [selected, setSelected] = useState<Crystal | null>(null);

  return (
    <div className="page-grid">
      <HatchPanel />
      <section className="panel wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Crystal Nursery</p>
            <h2>Growing specimens</h2>
          </div>
          <span className="count-pill">{crystals.length} total</span>
        </div>
        <div className="crystal-grid">
          {crystals.map((crystal) => (
            <CrystalCard crystal={crystal} key={crystal.id} onOpen={setSelected} />
          ))}
        </div>
      </section>
      {selected && <CrystalDetail crystal={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
