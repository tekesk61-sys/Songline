import { useMemo, useState } from 'react';
import type { Game } from '../types';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface Props {
  game: Game;
  teamId: string;
  songId?: string;
  onBack: () => void;
  onSubmit: (data: {
    title: string;
    artist: string;
    year: number;
    note?: string;
  }) => void;
  onDelete?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export function SongFormScreen({
  game,
  teamId,
  songId,
  onBack,
  onSubmit,
  onDelete,
}: Props) {
  const team = useMemo(() => game.teams.find((t) => t.id === teamId)!, [game, teamId]);
  const editing = useMemo(
    () => (songId ? team.songs.find((s) => s.id === songId) : undefined),
    [team, songId]
  );

  const [title, setTitle] = useState(editing?.title ?? '');
  const [artist, setArtist] = useState(editing?.artist ?? '');
  const [year, setYear] = useState<string>(
    editing?.year ? String(editing.year) : ''
  );
  const [note, setNote] = useState(editing?.note ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = 'Titel ist erforderlich';
    const y = parseInt(year, 10);
    if (!Number.isFinite(y)) next.year = 'Jahr ist erforderlich';
    else if (y < 1900 || y > CURRENT_YEAR)
      next.year = `Jahr muss zwischen 1900 und ${CURRENT_YEAR} liegen`;
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({
      title,
      artist,
      year: y,
      note: note.trim() || undefined,
    });
  };

  return (
    <div className="screen">
      <Header title={editing ? 'Song bearbeiten' : 'Song hinzufügen'} onBack={onBack} />

      <Card>
        <div className="muted" style={{ marginBottom: 10, fontSize: 13 }}>
          Team: <strong style={{ color: 'var(--text)' }}>{team.name}</strong>
        </div>

        <div className="field">
          <label>Songtitel *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Wonderwall"
            autoFocus={!editing}
            maxLength={120}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="field">
          <label>Interpret</label>
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="z. B. Oasis"
            maxLength={120}
          />
        </div>

        <div className="field">
          <label>Erscheinungsjahr *</label>
          <input
            type="number"
            inputMode="numeric"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={String(CURRENT_YEAR)}
            min={1900}
            max={CURRENT_YEAR}
          />
          {errors.year && <div className="error">{errors.year}</div>}
        </div>

        <div className="field">
          <label>Notiz (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="z. B. lustige Anekdote"
            maxLength={240}
          />
        </div>
      </Card>

      <div className="fab stack">
        <Button onClick={handleSubmit}>
          {editing ? 'Speichern' : 'Hinzufügen'}
        </Button>
        {editing && onDelete && (
          <Button variant="danger" onClick={onDelete}>
            Löschen
          </Button>
        )}
      </div>
    </div>
  );
}
