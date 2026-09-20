import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// ऐप स्टार्ट होते ही सर्विस वर्कर को ऑटो-रजिस्टर और अपडेट करेगा
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
