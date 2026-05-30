import { RegionPanel } from './RegionPanel';
import { WorldMapSVG } from './WorldMapSVG';

export function WorldMapPage() {
  return (
    <div className="map-layout">
      <section className="panel map-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">World Map</p>
            <h2>Explore the empire</h2>
          </div>
        </div>
        <WorldMapSVG />
      </section>
      <RegionPanel />
    </div>
  );
}
