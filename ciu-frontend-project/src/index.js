import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure you have an App component in the src directory
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
