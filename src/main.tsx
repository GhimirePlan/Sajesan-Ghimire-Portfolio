import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';
axios.defaults.timeout = 10000;

import App from './App';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
