import { ingredients } from '../../../game/data/ingredients';
import { useGameStore } from '../../../game/store/gameStore';

export function IngredientShelf({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  const inventory = useGameStore((state) => state.inventory);
  const owned = ingredients.filter((ingredient) => (inventory[ingredient.id] ?? 0) > 0);

  return (
    <section className="panel ingredient-shelf-game">
      <p className="eyebrow">Ingredient Shelf</p>
      <div className="ingredient-grid-game">
        {owned.map((ingredient) => (
          <button
            className={selected.includes(ingredient.id) ? 'ingredient-token selected' : 'ingredient-token'}
            key={ingredient.id}
            type="button"
            onClick={() => onToggle(ingredient.id)}
            style={{ '--ingredient': ingredient.color } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={ingredient.iconPath} />
            </svg>
            <span>{ingredient.name}</span>
            <b>{inventory[ingredient.id]}</b>
          </button>
        ))}
      </div>
    </section>
  );
}
