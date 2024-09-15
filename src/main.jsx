import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import UseEffect from './App.jsx';
import './index.css';

// Create root element and render app inside StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseEffect />
  </StrictMode>
);

