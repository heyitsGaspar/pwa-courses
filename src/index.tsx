// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';  // Solo necesitas importar ReactDOM desde 'react-dom/client'
import './index.css';
import App from './App.tsx';

// Crear el root y renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// Comprobar si el navegador soporta service workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker: Registered', registration);
      })
      .catch((error) => {
        console.log('Service Worker: Registration failed', error);
      });
  });
}
