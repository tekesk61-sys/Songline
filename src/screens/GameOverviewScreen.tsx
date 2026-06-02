import { useState } from 'react';
import type { Game } from '../types';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SongItem } from '../components/SongItem';
import { EmptyState } from '../components/EmptyState';

interface Props {
  game: Game;
  onHome: () => void;
  onSettings: () => void;
  onAddSong: (teamId: string) => void;
  onEditSong: (teamId: string, songId: string) => void;
  onOpenTeam: (teamId: string) => void;
  onRenameTeam: (teamId: string, name: string) => void;
}

export function GameOverviewScreen({
  game,
  onHome,
  onSettings,
  onAddSong,
  onEditSong,
  onOpenTeam,
  onRenameTeam,
}: Props) {
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  return (
    <div className="screen">
      <Header
        title="Übersicht"
        onBack={onHome}
        trailing={
          <button className="icon-button" onClick={onSettings} aria-label="Einstellungen">
            ⚙️
          </button>
        }
      />

      <div className="stack gap-lg">
        {game.teams.map((team) => (
          <Card key={team.id} className="team-card">
            <div className="team-head">
              <input
                className="team-name"
                value={team.name}
                readOnly={editingTeamId !== team.id}
                onFocus={() => setEditingTeamId(team.id)}
                onBlur={(e) => {
                  setEditingTeamId(null);
                  onRenameTeam(team.id, e.target.value);
                }}
                onChange={(e) => onRenameTeam(team.id, e.target.value)}
                maxLength={24}
              />
              <span className="badge">{team.songs.length} Songs</span>
            </div>

            {team.songs.length === 0 ? (
              <EmptyState
                icon="📭"
                title="Noch keine Songs"
                message={'Tippe auf „Song hinzufügen".'}
              />
            ) : (
              <div className="timeline">
                {team.songs.slice(0, 4).map((song) => (
                  <SongItem
                    key={song.id}
                    song={song}
                    onEdit={() => onEditSong(team.id, song.id)}
                  />
                ))}
                {team.songs.length > 4 && (
                  <div className="dim center" style={{ fontSize: 13 }}>
                    + {team.songs.length - 4} weitere
                  </div>
                )}
              </div>
            )}

            <div className="actions">
              <Button variant="primary" onClick={() => onAddSong(team.id)}>
                + Song
              </Button>
              <Button variant="secondary" onClick={() => onOpenTeam(team.id)}>
                Groß anzeigen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
