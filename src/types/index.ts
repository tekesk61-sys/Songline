export type ThemeMode = 'dark' | 'light';

export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  note?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Team {
  id: string;
  name: string;
  songs: Song[];
}

export interface Settings {
  themeMode: ThemeMode;
  compactCarMode: boolean;
  autoSort: boolean;
}

export interface Game {
  id: string;
  createdAt: number;
  updatedAt: number;
  teams: Team[];
  settings: Settings;
}

export const DEFAULT_SETTINGS: Settings = {
  themeMode: 'dark',
  compactCarMode: false,
  autoSort: true,
};

export type Screen =
  | { name: 'home' }
  | { name: 'team-setup' }
  | { name: 'overview' }
  | { name: 'team-detail'; teamId: string }
  | { name: 'song-form'; teamId: string; songId?: string }
  | { name: 'instructions' }
  | { name: 'settings' };
