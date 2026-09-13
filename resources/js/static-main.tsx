import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import LandingPage from './pages/fullbright/LP';
import StaticAdmin from './pages/static-admin';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        {window.location.pathname === '/admin' ? <StaticAdmin /> : <LandingPage />}
    </StrictMode>,
);
