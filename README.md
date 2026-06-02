# Songline – Private Musik-Timeline-PWA

Eine schlanke, installierbare Progressive Web App für Musik-Zeitstrahl-Spiele. Funktioniert offline, läuft auf Android & iPhone, lebt kostenlos auf GitHub Pages.

| Eigenschaft | Wert |
|---|---|
| Stack | React 18 · Vite · TypeScript · vite-plugin-pwa |
| Speicher | Browser-LocalStorage (kein Server, keine Cloud) |
| Hosting | GitHub Pages (kostenlos) |
| Offline | Ja (Service Worker) |
| Installierbar | Android: Chrome → „App installieren". iPhone: Safari → „Zum Home-Bildschirm" |

---

## Inhalt

1. [Lokal starten](#1-lokal-starten)
2. [GitHub-Pages-Deployment](#2-githubpages-deployment)
3. [App auf Android installieren](#3-app-auf-android-installieren)
4. [App auf iPhone installieren](#4-app-auf-iphone-installieren)
5. [Anpassungen](#5-anpassungen)
6. [Ordnerstruktur](#6-ordnerstruktur)

---

## 1. Lokal starten

### Voraussetzung
- **Node.js ≥ 20** — Download: https://nodejs.org → LTS-Version, „Recommended for Most Users".

### Schritte

```bash
# In den Projektordner wechseln
cd "C:\Users\tekes\OneDrive\Desktop\Hitser Handy\songline"

# Pakete installieren (einmalig, dauert ~2 Min)
npm install

# Dev-Server starten
npm run dev
```

Im Terminal erscheint eine URL, z. B. `http://localhost:5173/`. Öffne sie im Browser.

> **Tipp**: Damit du die App auf deinem Handy im selben WLAN testen kannst, starte den Dev-Server mit `npm run dev -- --host`. Dann zeigt das Terminal zusätzlich eine `192.168.x.x`-URL, die du am Handy aufrufst.

### Production-Preview lokal testen

```bash
npm run build
npm run preview
```

---

## 2. GitHub-Pages-Deployment

### 2.1 Repository erstellen

1. Gehe auf https://github.com und klicke oben rechts **+ → New repository**.
2. Name: `songline` (oder beliebig).
   - **Visibility**: *Public* (Pages funktioniert auch mit Private, braucht aber GitHub Pro).
3. Häkchen bei **„Add a README"** weglassen.
4. **Create repository**.

### 2.2 `base`-Pfad in `vite.config.ts` anpassen

Öffne `vite.config.ts` und passe diese Zeile an deinen Repo-Namen an:

```ts
const REPO_BASE = '/songline/';   // ← muss exakt dem Repo-Namen entsprechen
```

Beispiele:
- Repo heißt `songline` → `'/songline/'`
- Repo heißt `meine-app` → `'/meine-app/'`
- Sonderfall **User-Pages-Repo** (`USERNAME.github.io`) → `'/'`

### 2.3 Projekt hochladen

```bash
cd "C:\Users\tekes\OneDrive\Desktop\Hitser Handy\songline"

git init
git add .
git commit -m "Initial commit"
git branch -M main

# URL aus dem GitHub-Repo unter "Code → HTTPS" kopieren:
git remote add origin https://github.com/DEIN-USERNAME/songline.git
git push -u origin main
```

> Wenn `git` nicht installiert ist: https://git-scm.com/download/win → installieren, PowerShell neu öffnen.

### 2.4 GitHub Pages aktivieren

1. Im GitHub-Repo: **Settings** (oben) → **Pages** (linke Spalte).
2. Bei **Source**: **GitHub Actions** auswählen.
3. **Speichern**.

### 2.5 Deployment auslösen

Die mitgelieferte Datei `.github/workflows/deploy.yml` startet automatisch beim Push auf `main`. Du musst nichts weiter tun.

Im Tab **Actions** kannst du den Build live verfolgen (~1–2 Min). Wenn alles grün ist:

- **Settings → Pages** zeigt oben die fertige URL, z. B. `https://dein-username.github.io/songline/`
- Diese URL schickst du deinen Freunden 🎉

### 2.6 Updates veröffentlichen

```bash
git add .
git commit -m "Update"
git push
```

Der GitHub-Action-Workflow baut und deployt automatisch.

---

## 3. App auf Android installieren

1. Den Link im **Chrome-Browser** (oder Edge / Brave) auf dem Android-Handy öffnen.
2. Nach ~3 Sekunden erscheint unten ein Banner **„App installieren"** → tippen.
   - Falls nicht: oben rechts auf das **⋮**-Menü → **„App installieren"** oder **„Zum Startbildschirm hinzufügen"**.
3. Bestätigen → die App liegt jetzt als Icon auf dem Home-Bildschirm.

Beim Öffnen startet sie ohne Adressleiste wie eine native App und funktioniert auch ohne Internet.

---

## 4. App auf iPhone installieren

iOS lässt PWAs nur via **Safari** installieren (nicht Chrome).

1. Link in **Safari** auf dem iPhone öffnen.
2. Unten auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben) tippen.
3. Im Menü nach unten scrollen → **„Zum Home-Bildschirm"** → **„Hinzufügen"**.
4. Die App liegt jetzt als Icon auf dem Home-Bildschirm und startet ohne Adressleiste.

> iOS-Hinweis: Wenn du die App löschst und neu installierst, werden die LocalStorage-Daten gelöscht. Das ist eine Apple-Einschränkung – nichts, was die App falsch macht.

---

## 5. Anpassungen

| Was | Wo |
|---|---|
| App-Name | `vite.config.ts` (`manifest.name` / `short_name`), `index.html` (`<title>`) |
| Farben | `src/styles/global.css` (CSS-Variablen ganz oben) |
| Icons | `public/pwa-*.png` ersetzen (Größen beibehalten) |
| Standard-Teamnamen | `src/hooks/useGame.ts` (`DEFAULT_TEAM_NAMES`) |

---

## 6. Ordnerstruktur

```
songline/
├── .github/workflows/deploy.yml      # Auto-Deploy auf GH Pages
├── public/
│   ├── pwa-192x192.png               # PWA-Icon klein
│   ├── pwa-512x512.png               # PWA-Icon groß
│   ├── pwa-maskable-512.png          # Android-Maskable-Icon
│   ├── apple-touch-icon.png          # iOS-Homescreen-Icon
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── main.tsx                       # Entry, registriert Service Worker
│   ├── App.tsx                        # Screen-Routing
│   ├── vite-env.d.ts
│   ├── types/
│   │   └── index.ts                   # Game / Team / Song / Settings
│   ├── storage/
│   │   └── storage.ts                 # LocalStorage-Wrapper
│   ├── hooks/
│   │   ├── useGame.ts                 # Spielstand + Auto-Save
│   │   └── useSettings.ts             # Theme + Auto-Modus
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── SongItem.tsx
│   │   ├── EmptyState.tsx
│   │   └── Header.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── TeamSetupScreen.tsx
│   │   ├── GameOverviewScreen.tsx
│   │   ├── TeamDetailScreen.tsx
│   │   ├── SongFormScreen.tsx
│   │   ├── InstructionsScreen.tsx
│   │   └── SettingsScreen.tsx
│   └── styles/
│       └── global.css                 # Theme + Layout
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                     # Vite + PWA-Plugin
```

---

## Was die App nicht tut (bewusst)

- Keine Anmeldung, kein Tracking, keine Cookies.
- Keine Musik-Wiedergabe, kein Spotify, keine Kamera, kein QR-Scanner.
- Kein Backend, kein Cloud-Sync.
- Alle Daten bleiben ausschließlich im Browser des Geräts.

Viel Spaß. 🎵
