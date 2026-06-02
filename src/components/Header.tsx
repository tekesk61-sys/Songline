import type { ReactNode } from 'react';

interface Props {
  title: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function Header({ title, onBack, trailing }: Props) {
  return (
    <div className="screen-header">
      {onBack && (
        <button
          className="icon-button"
          onClick={onBack}
          aria-label="Zurück"
          type="button"
        >
          ‹
        </button>
      )}
      <h1>{title}</h1>
      {trailing}
    </div>
  );
}
