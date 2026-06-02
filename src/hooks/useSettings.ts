import { useCallback, useEffect, useState } from 'react';
import type { Settings } from '../types';
import { storage } from '../storage/storage';

export interface SettingsApi {
  settings: Settings;
  setThemeMode: (mode: Settings['themeMode']) => void;
  setCompactCarMode: (value: boolean) => void;
  setAutoSort: (value: boolean) => void;
}

export function useSettings(): SettingsApi {
  const [settings, setSettings] = useState<Settings>(() => storage.loadSettings());

  // Apply theme to <html> so the CSS variables react.
  useEffect(() => {
    document.documentElement.dataset.theme = settings.themeMode;
    document.documentElement.dataset.car = settings.compactCarMode ? '1' : '0';
    storage.saveSettings(settings);
  }, [settings]);

  const setThemeMode: SettingsApi['setThemeMode'] = useCallback((mode) => {
    setSettings((s) => ({ ...s, themeMode: mode }));
  }, []);

  const setCompactCarMode: SettingsApi['setCompactCarMode'] = useCallback((value) => {
    setSettings((s) => ({ ...s, compactCarMode: value }));
  }, []);

  const setAutoSort: SettingsApi['setAutoSort'] = useCallback((value) => {
    setSettings((s) => ({ ...s, autoSort: value }));
  }, []);

  return { settings, setThemeMode, setCompactCarMode, setAutoSort };
}
