import { useGameStore } from '../../../game/store/gameStore';
import { CrystalSVG } from '../Crystal/CrystalSVG';

export function DisplayCase({ slot }: { slot: number }) {
  const crystals = useGameStore((state) => state.crystals);
  const displayed = useGameStore((state) => state.displayedCrystals[slot]);
  const equip = useGameStore((state) => state.actions.equipToDisplay);
  const crystal = crystals.find((item) => item.id === displayed) ?? null;

  return (
    <article className="display-case">
      <div className="display-art">{crystal ? <CrystalSVG compact crystal={crystal} /> : <span>Empty</span>}</div>
      <select value={displayed ?? ''} onChange={(event) => equip(event.target.value, slot)}>
        <option value="">Select crystal</option>
        {crystals.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </article>
  );
}
