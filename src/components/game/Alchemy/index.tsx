import { useState } from 'react';
import { useGameStore } from '../../../game/store/gameStore';
import { CrystalSVG } from '../Crystal/CrystalSVG';
import { BrewingBench } from './BrewingBench';
import { IngredientShelf } from './IngredientShelf';
import { RecipeBook } from './RecipeBook';

export function AlchemyPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [temperature, setTemperature] = useState(56);
  const lastResult = useGameStore((state) => state.lastResult);
  const clearResult = useGameStore((state) => state.actions.clearResult);

  const toggle = (id: string) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-5)));
  };

  return (
    <div className="alchemy-layout">
      <IngredientShelf selected={selected} onToggle={toggle} />
      <BrewingBench selected={selected} temperature={temperature} setTemperature={setTemperature} clearSelected={() => setSelected([])} />
      <RecipeBook />
      {lastResult && (
        <div className="modal-backdrop">
          <section className="result-modal">
            <p className="eyebrow">{lastResult.ok ? 'Brew Result' : 'Failed Brew'}</p>
            <h2>{lastResult.message}</h2>
            {lastResult.crystal && <CrystalSVG crystal={lastResult.crystal} />}
            <button className="primary-button" type="button" onClick={clearResult}>
              Continue
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
