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
  return (
    <div className="screen">
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
