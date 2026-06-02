import { useState } from 'react';
import type { SettingsApi } from '../hooks/useSettings';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

interface Props {
  settings: SettingsApi;
  hasSavedGame: boolean;
  onBack: () => void;
  onClearGame: () => void;
}

export function SettingsScreen({
  settings,
  hasSavedGame,
  onBack,
  onClearGame,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="screen">
      <Header title="Einstellungen" onBack={onBack} />

      <Card>
        <Row label="Dunkles Design">
          <select
            value={settings.settings.themeMode}
            onChange={(e) =>
              settings.setThemeMode(e.target.value as 'dark' | 'light')
            }
            style={{
              background: 'var(--bg-elevated-2)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '8px 12px',
              minHeight: 40,
            }}
          >
            <option value="dark">Dunkel</option>
            <option value="light">Hell</option>
          </select>
        </Row>

        <div className="divider" />

        <Row label="Kompakter Auto-Modus" sub="Größere Buttons, dickere Jahreszahlen">
          <input
            type="checkbox"
            checked={settings.settings.compactCarMode}
            onChange={(e) => settings.setCompactCarMode(e.target.checked)}
            style={{ width: 24, height: 24 }}
          />
        </Row>

        <div className="divider" />

        <Row label="Automatisch sortieren" sub="Songs nach Jahr ordnen">
          <input
            type="checkbox"
            checked={settings.settings.autoSort}
            onChange={(e) => settings.setAutoSort(e.target.checked)}
            style={{ width: 24, height: 24 }}
          />
        </Row>
      </Card>

      {hasSavedGame && (
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Spielstand</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
            Löscht alle Teams und Songs unwiderruflich.
          </div>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Spielstand löschen
          </Button>
        </Card>
      )}

      <Card style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Datenhinweis</div>
        <div className="muted" style={{ fontSize: 14 }}>
          Diese App speichert alle Daten nur lokal in deinem Browser. Es werden keine
          Daten an Server gesendet, kein Tracking, keine Cookies. Bei einem
          Browser-Reset oder Datenlöschen geht der Spielstand verloren.
        </div>
      </Card>

      <Modal
        open={confirmOpen}
        title="Spielstand wirklich löschen?"
        onClose={() => setConfirmOpen(false)}
      >
        <p className="muted">Diese Aktion kann nicht rückgängig gemacht werden.</p>
        <div className="stack" style={{ marginTop: 16 }}>
          <Button
            variant="danger"
            onClick={() => {
              onClearGame();
              setConfirmOpen(false);
            }}
          >
            Ja, löschen
          </Button>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Abbrechen
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Row({
  label,
  sub,
  children,
}: {
  label: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '4px 0',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        {sub && (
          <div className="dim" style={{ fontSize: 13 }}>
            {sub}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
