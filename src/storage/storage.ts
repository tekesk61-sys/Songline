import type { Game, Settings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

const GAME_KEY = 'songline:game:v1';
const SETTINGS_KEY = 'songline:settings:v1';

/**
 * Tiny safe-wrapper around localStorage. Falls back silently if
 * storage is disabled (e.g. iOS private mode).
 */
function safeRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded or storage disabled — silently ignore */
  }
}

export const storage = {
  loadGame(): Game | null {
    return safeRead<Game>(GAME_KEY);
  },
  saveGame(game: Game): void {
    safeWrite(GAME_KEY, game);
  },
  clearGame(): void {
    try {
      localStorage.removeItem(GAME_KEY);
    } catch {
      /* noop */
    }
  },
  loadSettings(): Settings {
    return safeRead<Settings>(SETTINGS_KEY) ?? DEFAULT_SETTINGS;
  },
  saveSettings(settings: Settings): void {
    safeWrite(SETTINGS_KEY, settings);
  },
};
