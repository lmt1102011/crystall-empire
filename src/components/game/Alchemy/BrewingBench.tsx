import { FlaskConical } from 'lucide-react';
import { ingredientById, useGameStore } from '../../../game/store/gameStore';
import { CauldronSVG } from './CauldronSVG';

export function BrewingBench({
  selected,
  temperature,
  setTemperature,
  clearSelected,
}: {
  selected: string[];
  temperature: number;
  setTemperature: (value: number) => void;
  clearSelected: () => void;
}) {
  const brew = useGameStore((state) => state.actions.brew);
  const selectedIngredients = selected.map((id) => ingredientById.get(id)).filter(Boolean);
  const color = selectedIngredients[0]?.color ?? '#67e8f9';

  return (
    <section className="panel brewing-bench">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Brewing Bench</p>
          <h2>Cauldron array</h2>
        </div>
      </div>
      <div className="cauldron-wrap">
        <CauldronSVG color={color} />
        <div className="brew-slots">
          {Array.from({ length: 5 }, (_, index) => {
            const ingredient = selectedIngredients[index];
            return (
              <span className="brew-slot" key={index} style={{ '--ingredient': ingredient?.color ?? '#334155' } as React.CSSProperties}>
                {ingredient ? ingredient.name : 'Empty'}
              </span>
            );
          })}
        </div>
      </div>
      <label className="thermo-slider">
        <span>Temperature</span>
        <input min="20" max="100" type="range" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} />
        <b>{temperature}C</b>
      </label>
      <div className="bench-actions">
        <button
          className="primary-button"
          type="button"
          disabled={selected.length < 2}
          onClick={() => {
            brew(selected, temperature);
            clearSelected();
          }}
        >
          <FlaskConical size={17} />
          Brew
        </button>
        <button className="ghost-button" type="button" onClick={clearSelected}>
          Clear
        </button>
      </div>
    </section>
  );
}
