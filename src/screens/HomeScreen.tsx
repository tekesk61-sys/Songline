import type { CSSProperties } from 'react';
import { Button } from '../components/Button';

interface Props {
  hasSavedGame: boolean;
  onNewGame: () => void;
  onResume: () => void;
  onInstructions: () => void;
  onSettings: () => void;
}

export function HomeScreen({
  hasSavedGame,
  onNewGame,
  onResume,
  onInstructions,
  onSettings,
}: Props) {
  const cornerStyle: CSSProperties = {
    position: 'absolute',
    fontSize: 11,
    opacity: 0.45,
    letterSpacing: 0.5,
    pointerEvents: 'none',
  };

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <div style={{ ...cornerStyle, top: 12, left: 16 }}>
        Sophie ist eine diktatorin
      </div>
      <div style={{ ...cornerStyle, top: 12, right: 16 }}>Sara stinkt</div>
      <div style={{ ...cornerStyle, bottom: 12, left: 16 }}>Ana ist gemein</div>
      <div style={{ ...cornerStyle, bottom: 12, right: 16 }}>
        Niki ist schlecht in rocket league
      </div>

      <div className="spacer" />
      <div className="brand">
        <div className="brand-mark">♪</div>
      </div>
      <div className="center">
        <div className="brand-name">Songline</div>
      </div>
      <div className="brand-sub">
        Die digitale Timeline für eure Musik-Zeitstrahl-Spiele
      </div>

      <div className="stack gap-lg">
        <Button onClick={onNewGame}>Neues Spiel</Button>
        {hasSavedGame && (
          <Button variant="secondary" onClick={onResume}>
            Spiel fortsetzen
          </Button>
        )}
        <Button variant="ghost" onClick={onInstructions}>
          Anleitung
        </Button>
      </div>

      <div className="spacer" />

      <button
        className="btn-ghost"
        style={{ alignSelf: 'center', padding: 12 }}
        onClick={onSettings}
      >
        ⚙️ Einstellungen
      </button>
    </div>
  );
}
