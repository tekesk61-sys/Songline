import type { Team } from '../types';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { SongItem } from '../components/SongItem';
import { EmptyState } from '../components/EmptyState';

interface Props {
  team: Team;
  onBack: () => void;
  onAddSong: () => void;
  onEditSong: (songId: string) => void;
}

export function TeamDetailScreen({ team, onBack, onAddSong, onEditSong }: Props) {
  return (
    <div className="screen">
      <Header
        title={team.name}
        onBack={onBack}
        trailing={<span className="badge">{team.songs.length} Songs</span>}
      />

      <div className="timeline timeline-large" style={{ marginBottom: 16 }}>
        {team.songs.length === 0 ? (
          <EmptyState
            icon="🎶"
            title="Noch keine Songs in der Timeline"
            message="Trage den ersten Song ein, um zu starten."
          />
        ) : (
          team.songs.map((song) => (
            <SongItem
              key={song.id}
              song={song}
              onEdit={() => onEditSong(song.id)}
            />
          ))
        )}
      </div>

      <div className="fab">
        <Button onClick={onAddSong}>+ Song hinzufügen</Button>
      </div>
    </div>
  );
}
