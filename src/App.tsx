import { useEffect, useState } from 'react';
import type { Screen } from './types';
import { useGame } from './hooks/useGame';
import { useSettings } from './hooks/useSettings';

import { HomeScreen } from './screens/HomeScreen';
import { TeamSetupScreen } from './screens/TeamSetupScreen';
import { GameOverviewScreen } from './screens/GameOverviewScreen';
import { TeamDetailScreen } from './screens/TeamDetailScreen';
import { SongFormScreen } from './screens/SongFormScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function App() {
  const game = useGame();
  const settings = useSettings();
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  // Wire up Android's hardware back button + iOS swipe back via history API.
  useEffect(() => {
    const onPop = () => {
      // Whatever the browser thinks "back" is, we just go to a sensible
      // parent screen. This avoids any 404/route mismatch on GitHub Pages.
      setScreen((s) => {
        switch (s.name) {
          case 'team-detail':
          case 'instructions':
          case 'settings':
          case 'team-setup':
            return { name: 'home' };
          case 'song-form':
            return s.teamId
              ? { name: 'team-detail', teamId: s.teamId }
              : { name: 'overview' };
          case 'overview':
            return { name: 'home' };
          default:
            return s;
        }
      });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Push a history entry whenever the screen changes so the back button works.
  useEffect(() => {
    history.pushState({ screen: screen.name }, '');
  }, [screen]);

  const goHome = () => setScreen({ name: 'home' });
  const goOverview = () => setScreen({ name: 'overview' });

  return (
    <div className="app">
      {screen.name === 'home' && (
        <HomeScreen
          hasSavedGame={game.hasSavedGame}
          onNewGame={() => setScreen({ name: 'team-setup' })}
          onResume={() => {
            game.resumeGame();
            setScreen({ name: 'overview' });
          }}
          onInstructions={() => setScreen({ name: 'instructions' })}
          onSettings={() => setScreen({ name: 'settings' })}
        />
      )}

      {screen.name === 'team-setup' && (
        <TeamSetupScreen
          onBack={goHome}
          onStart={(count, names) => {
            game.startNewGame(count, names);
            setScreen({ name: 'overview' });
          }}
        />
      )}

      {screen.name === 'overview' && game.game && (
        <GameOverviewScreen
          game={game.game}
          onHome={goHome}
          onSettings={() => setScreen({ name: 'settings' })}
          onAddSong={(teamId) => setScreen({ name: 'song-form', teamId })}
          onEditSong={(teamId, songId) =>
            setScreen({ name: 'song-form', teamId, songId })
          }
          onOpenTeam={(teamId) => setScreen({ name: 'team-detail', teamId })}
          onRenameTeam={game.renameTeam}
        />
      )}

      {screen.name === 'team-detail' &&
        game.game &&
        (() => {
          const team = game.game.teams.find((t) => t.id === screen.teamId);
          if (!team) {
            goOverview();
            return null;
          }
          return (
            <TeamDetailScreen
              team={team}
              onBack={goOverview}
              onAddSong={() =>
                setScreen({ name: 'song-form', teamId: team.id })
              }
              onEditSong={(songId) =>
                setScreen({ name: 'song-form', teamId: team.id, songId })
              }
            />
          );
        })()}

      {screen.name === 'song-form' && game.game && (
        <SongFormScreen
          game={game.game}
          teamId={screen.teamId}
          songId={screen.songId}
          onBack={() =>
            setScreen(
              screen.songId
                ? { name: 'team-detail', teamId: screen.teamId }
                : { name: 'overview' }
            )
          }
          onSubmit={(data) => {
            if (screen.songId) {
              game.updateSong(screen.teamId, screen.songId, data);
            } else {
              game.addSong(screen.teamId, data);
            }
            setScreen({ name: 'team-detail', teamId: screen.teamId });
          }}
          onDelete={
            screen.songId
              ? () => {
                  game.deleteSong(screen.teamId, screen.songId!);
                  setScreen({ name: 'team-detail', teamId: screen.teamId });
                }
              : undefined
          }
        />
      )}

      {screen.name === 'instructions' && (
        <InstructionsScreen onBack={goHome} />
      )}

      {screen.name === 'settings' && (
        <SettingsScreen
          settings={settings}
          hasSavedGame={game.hasSavedGame}
          onBack={goHome}
          onClearGame={() => {
            game.endGame();
            goHome();
          }}
        />
      )}
    </div>
  );
}
