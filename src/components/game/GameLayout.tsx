import type { ReactNode } from 'react';
import type { CloudStatus } from '../../game/store/cloudSync';
import { BottomNav } from './HUD/BottomNav';
import { TopBar } from './HUD/TopBar';

export function GameLayout({ children, cloudStatus }: { children: ReactNode; cloudStatus: CloudStatus }) {
  return (
    <main className="empire-shell">
      <TopBar cloudStatus={cloudStatus} />
      <section className="game-surface">{children}</section>
      <BottomNav />
    </main>
  );
}
