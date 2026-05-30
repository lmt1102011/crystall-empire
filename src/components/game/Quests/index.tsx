import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../../game/store/gameStore';

export function QuestsPage() {
  const crystals = useGameStore((state) => state.crystals);
  const recipes = useGameStore((state) => state.discoveredRecipes);
  const resources = useGameStore((state) => state.resources);
  const quests = [
    { label: 'Raise 5 crystals', done: crystals.length >= 5, progress: `${Math.min(crystals.length, 5)}/5` },
    { label: 'Discover 3 recipes', done: recipes.length >= 3, progress: `${Math.min(recipes.length, 3)}/3` },
    { label: 'Hold 500 gold', done: resources.gold >= 500, progress: `${Math.min(resources.gold, 500)}/500` },
  ];

  return (
    <section className="panel quests-panel">
      <div className="section-heading">
        <BookOpen size={22} />
        <div>
          <p className="eyebrow">Quests</p>
          <h2>Empire objectives</h2>
        </div>
      </div>
      <div className="quest-list">
        {quests.map((quest) => (
          <article className={quest.done ? 'quest-row done' : 'quest-row'} key={quest.label}>
            <CheckCircle2 size={20} />
            <div>
              <h3>{quest.label}</h3>
              <p>{quest.progress}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
