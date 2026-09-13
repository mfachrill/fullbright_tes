export async function recordLandingEvent(zone: string, action: string, label: string) {
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
    if (!url || !key) return;
    await fetch(`${url}/rest/v1/landing_events`, {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ zone, action, label, page_url: location.href }),
        keepalive: true,
    }).catch(() => undefined);
}
