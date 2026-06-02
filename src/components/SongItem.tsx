import type { Song } from '../types';

interface Props {
  song: Song;
  onEdit?: () => void;
}

export function SongItem({ song, onEdit }: Props) {
  return (
    <div className="song">
      <div className="song-year">{song.year}</div>
      <div className="song-body">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist || '—'}</div>
        {song.note && <div className="song-note">{song.note}</div>}
      </div>
      {onEdit && (
        <button className="song-edit" onClick={onEdit} aria-label="Bearbeiten">
          ✏️
        </button>
      )}
    </div>
  );
}
