import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import LandingPage from './pages/fullbright/LP';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <LandingPage />
    </StrictMode>,
);
