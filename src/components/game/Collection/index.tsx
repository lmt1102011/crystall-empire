import { CollectionStats } from './CollectionStats';
import { DisplayCase } from './DisplayCase';

export function CollectionPage() {
  return (
    <div className="collection-layout">
      <CollectionStats />
      <section className="panel wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Showcase</p>
            <h2>Display cases</h2>
          </div>
        </div>
        <div className="display-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <DisplayCase key={index} slot={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
