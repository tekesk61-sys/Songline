import { useCallback, useEffect, useState } from 'react';
import type { Game, Song, Team } from '../types';
import { DEFAULT_SETTINGS } from '../types';
import { storage } from '../storage/storage';

const uid = (): string =>
  // crypto.randomUUID is available in all modern browsers (and iOS Safari 16+).
  // The fallback handles older WebViews so the PWA never crashes.
  (globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`);

const DEFAULT_TEAM_NAMES = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

function createGame(teamCount: number, names: string[]): Game {
  const now = Date.now();
  return {
    id: uid(),
    createdAt: now,
    updatedAt: now,
    teams: Array.from({ length: teamCount }, (_, i) => ({
      id: uid(),
      name: names[i]?.trim() || DEFAULT_TEAM_NAMES[i],
      songs: [],
    })),
    settings: DEFAULT_SETTINGS,
  };
}

export interface GameApi {
  game: Game | null;
  hasSavedGame: boolean;
  startNewGame: (teamCount: number, names: string[]) => Game;
  resumeGame: () => void;
  endGame: () => void;
  addSong: (
    teamId: string,
    data: { title: string; artist: string; year: number; note?: string }
  ) => void;
  updateSong: (
    teamId: string,
    songId: string,
    data: { title: string; artist: string; year: number; note?: string }
  ) => void;
  deleteSong: (teamId: string, songId: string) => void;
  renameTeam: (teamId: string, name: string) => void;
}

export function useGame(): GameApi {
  const [game, setGame] = useState<Game | null>(null);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  // Check for an existing game on first mount — but don't auto-load it.
  // The user explicitly taps "Spiel fortsetzen".
  useEffect(() => {
    const saved = storage.loadGame();
    setHasSavedGame(saved != null && saved.teams.length > 0);
  }, []);

  // Auto-persist whenever the game changes.
  useEffect(() => {
    if (game) storage.saveGame(game);
  }, [game]);

  const startNewGame = useCallback((teamCount: number, names: string[]): Game => {
    const fresh = createGame(teamCount, names);
    setGame(fresh);
    setHasSavedGame(true);
    return fresh;
  }, []);

  const resumeGame = useCallback(() => {
    const saved = storage.loadGame();
    if (saved) setGame(saved);
  }, []);

  const endGame = useCallback(() => {
    storage.clearGame();
    setGame(null);
    setHasSavedGame(false);
  }, []);

  const mutateTeam = useCallback(
    (teamId: string, transform: (t: Team) => Team) => {
      setGame((prev) => {
        if (!prev) return prev;
        const teams = prev.teams.map((t) => (t.id === teamId ? transform(t) : t));
        return { ...prev, teams, updatedAt: Date.now() };
      });
    },
    []
  );

  const addSong: GameApi['addSong'] = useCallback(
    (teamId, data) => {
      const now = Date.now();
      const song: Song = {
        id: uid(),
        title: data.title.trim(),
        artist: data.artist.trim(),
        year: data.year,
        note: data.note?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      };
      mutateTeam(teamId, (team) => {
        const next = [...team.songs, song].sort((a, b) => a.year - b.year);
        return { ...team, songs: next };
      });
    },
    [mutateTeam]
  );

  const updateSong: GameApi['updateSong'] = useCallback(
    (teamId, songId, data) => {
      mutateTeam(teamId, (team) => {
        const next = team.songs
          .map((s) =>
            s.id === songId
              ? {
                  ...s,
                  title: data.title.trim(),
                  artist: data.artist.trim(),
                  year: data.year,
                  note: data.note?.trim() || undefined,
                  updatedAt: Date.now(),
                }
              : s
          )
          .sort((a, b) => a.year - b.year);
        return { ...team, songs: next };
      });
    },
    [mutateTeam]
  );

  const deleteSong: GameApi['deleteSong'] = useCallback(
    (teamId, songId) => {
      mutateTeam(teamId, (team) => ({
        ...team,
        songs: team.songs.filter((s) => s.id !== songId),
      }));
    },
    [mutateTeam]
  );

  const renameTeam: GameApi['renameTeam'] = useCallback(
    (teamId, name) => {
      mutateTeam(teamId, (team) => ({ ...team, name: name.trim() || team.name }));
    },
    [mutateTeam]
  );

  return {
    game,
    hasSavedGame,
    startNewGame,
    resumeGame,
    endGame,
    addSong,
    updateSong,
    deleteSong,
    renameTeam,
  };
}
