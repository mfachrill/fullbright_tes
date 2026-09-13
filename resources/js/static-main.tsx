import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import LandingPage from './pages/fullbright/LP';
import StaticAdmin from './pages/static-admin';
import { recordLandingEvent } from './analytics/supabase-tracking';

if (window.location.pathname !== '/admin') {
    const startedAt = Date.now();
    const milestones = new Set<number>();
    void recordLandingEvent('page', 'visit', 'Landing page opened');
    window.addEventListener('scroll', () => {
        const percent = Math.round(((scrollY + innerHeight) / Math.max(document.documentElement.scrollHeight, 1)) * 100);
        [25, 50, 75, 100].forEach((milestone) => {
            if (percent >= milestone && !milestones.has(milestone)) {
                milestones.add(milestone);
                void recordLandingEvent('page', 'scroll', `Reached ${milestone}%`);
            }
        });
    }, { passive: true });
    document.addEventListener('click', (event) => {
        const element = (event.target as HTMLElement).closest('button,a');
        if (element && !(element as HTMLElement).dataset.analyticsCta) {
            const label = (element.textContent || element.getAttribute('aria-label') || 'Interaction').trim().slice(0, 120);
            if (label) void recordLandingEvent('interaction', 'click', label);
        }
    });
    window.addEventListener('pagehide', () => {
        void recordLandingEvent('page', 'engagement', `Active ${Math.round((Date.now() - startedAt) / 1000)}s`);
    });
}

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        {window.location.pathname === '/admin' ? <StaticAdmin /> : <LandingPage />}
    </StrictMode>,
);
