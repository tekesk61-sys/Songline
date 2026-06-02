interface Props {
  icon?: string;
  title: string;
  message?: string;
}

export function EmptyState({ icon = '🎵', title, message }: Props) {
  return (
    <div className="empty">
      <div style={{ fontSize: 42, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
      {message && <div className="dim" style={{ fontSize: 14 }}>{message}</div>}
    </div>
  );
}
