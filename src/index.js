import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';

// Punto de entrada moderno con React 18+
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
