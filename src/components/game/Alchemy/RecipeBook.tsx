import { recipes } from '../../../game/data/recipes';
import { ingredientById, useGameStore } from '../../../game/store/gameStore';
import { rarityConfig } from '../../../game/data/crystals';

export function RecipeBook() {
  const discovered = useGameStore((state) => state.discoveredRecipes);

  return (
    <section className="panel recipe-book">
      <p className="eyebrow">Recipe Book</p>
      <div className="recipe-list">
        {recipes.map((recipe) => {
          const known = discovered.includes(recipe.id);
          const rarity = rarityConfig[recipe.result.rarity];
          return (
            <article className={known ? 'recipe-row known' : 'recipe-row'} key={recipe.id}>
              <div>
                <h3>{known ? recipe.name : 'Unknown Formula'}</h3>
                <p>{recipe.temperatureRange[0]}-{recipe.temperatureRange[1]}C / {rarity.label}</p>
              </div>
              <small>{known ? recipe.ingredients.map((item) => ingredientById.get(item.id)?.name).join(', ') : 'Discover by brewing'}</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}
