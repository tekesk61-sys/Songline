import { Header } from '../components/Header';
import { Card } from '../components/Card';

interface Props {
  onBack: () => void;
}

export function InstructionsScreen({ onBack }: Props) {
  return (
    <div className="screen">
      <Header title="Anleitung" onBack={onBack} />

      <Card>
        <h3 style={{ marginTop: 0 }}>Was ist Songline?</h3>
        <p className="muted">
          Songline ist eine private digitale Timeline-Hilfe für Musik-Zeitstrahl-Spiele.
          Ihr spielt ein Brett- oder Kartenspiel, bei dem Songs nach Erscheinungsjahr
          sortiert werden? Diese App ersetzt das Auslegen auf dem Tisch – ideal im Auto.
        </p>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>So funktioniert's</h3>
        <ol style={{ paddingLeft: 18, margin: 0 }}>
          <li>Auf der Startseite „Neues Spiel" antippen.</li>
          <li>1 bis 4 Teams auswählen und Namen vergeben.</li>
          <li>Pro Team Songs manuell eintragen (Titel, Interpret, Jahr).</li>
          <li>Die App sortiert die Timeline automatisch nach Jahr.</li>
          <li>Mit „Groß anzeigen" gibt's eine fahrerfreundliche Übersicht.</li>
        </ol>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Was die App NICHT tut</h3>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          <li>Sie spielt keine Musik ab.</li>
          <li>Sie scannt keine Karten und nutzt keine Kamera.</li>
          <li>Sie benötigt keine Anmeldung und keinen Internetzugang.</li>
          <li>Alle Daten bleiben auf deinem Gerät.</li>
        </ul>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Tipp für die Autofahrt</h3>
        <p className="muted">
          Aktiviere in den Einstellungen den <strong>kompakten Auto-Modus</strong> –
          das vergrößert Buttons und Jahreszahlen.
        </p>
      </Card>
    </div>
  );
}
