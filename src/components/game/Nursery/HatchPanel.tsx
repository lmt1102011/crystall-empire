import { Gem, Sparkles } from 'lucide-react';
import { useGameStore } from '../../../game/store/gameStore';

export function HatchPanel() {
  const essence = useGameStore((state) => state.resources.essence);
  const hatchCrystal = useGameStore((state) => state.actions.hatchCrystal);

  return (
    <section className="panel hatch-panel">
      <div>
        <p className="eyebrow">Nursery</p>
        <h2>Hatch a crystal seed</h2>
        <p className="body-text">Essence condenses into a new deterministic crystal specimen.</p>
      </div>
      <div className="hatch-actions">
        <button className="primary-button" type="button" disabled={essence < 22} onClick={() => hatchCrystal()}>
          <Gem size={17} />
          Hatch 22
        </button>
        <button className="ghost-button" type="button" disabled={essence < 48} onClick={() => hatchCrystal('epic')}>
          <Sparkles size={17} />
          Focus 48
        </button>
      </div>
    </section>
  );
}
