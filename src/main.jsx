import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PreviousCards from './PreviousCards';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/previous" element={<PreviousCards />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
