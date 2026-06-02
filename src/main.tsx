import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Auto-update Service-Worker: lädt im Hintergrund neue Version,
// aktiviert sich beim nächsten Reload.
registerSW({ immediate: true });
