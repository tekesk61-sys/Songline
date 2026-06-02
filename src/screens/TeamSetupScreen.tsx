import { useState } from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface Props {
  onBack: () => void;
  onStart: (teamCount: number, names: string[]) => void;
}

export function TeamSetupScreen({ onBack, onStart }: Props) {
  const [count, setCount] = useState<number>(2);
  const [names, setNames] = useState<string[]>([
    'Team 1',
    'Team 2',
    'Team 3',
    'Team 4',
  ]);

  const updateName = (i: number, value: string) => {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  };

  return (
    <div className="screen">
      <Header title="Teams auswählen" onBack={onBack} />

      <Card>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Wie viele Teams?</div>
        <div className="muted" style={{ fontSize: 13 }}>1 bis 4 Teams möglich</div>
        <div className="count-picker">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={count === n ? 'active' : ''}
              onClick={() => setCount(n)}
              type="button"
            >
              {n}
            </button>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Teamnamen</div>
        {names.slice(0, count).map((name, i) => (
          <div className="field" key={i}>
            <label>Team {i + 1}</label>
            <input
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              maxLength={24}
              placeholder={`Team ${i + 1}`}
            />
          </div>
        ))}
      </Card>

      <div className="fab">
        <Button onClick={() => onStart(count, names.slice(0, count))}>
          Spiel starten
        </Button>
      </div>
    </div>
  );
}
