import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CrytoContext from './CrytoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CrytoContext> 
    <App />
    </CrytoContext>
  </React.StrictMode>
);