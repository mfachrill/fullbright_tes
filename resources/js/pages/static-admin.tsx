import { FormEvent, useEffect, useState } from 'react';
import '../../css/static-admin.css';

type EventRow = {
    id: number;
    created_at: string;
    zone: string;
    action: string;
    label: string;
    page_url: string;
};

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const tokenKey = 'fullbright_admin_token';

function request(path: string, init: RequestInit = {}) {
    if (!url || !key) throw new Error('Supabase belum dikonfigurasi.');
    return fetch(`${url}${path}`, {
        ...init,
        headers: { apikey: key, ...(init.headers ?? {}) },
    });
}

export default function StaticAdmin() {
    const [token, setToken] = useState(() => localStorage.getItem(tokenKey) ?? '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rows, setRows] = useState<EventRow[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const loadRows = async (accessToken = token) => {
        if (!accessToken) return;
        setLoading(true);
        try {
            const response = await request('/rest/v1/landing_events?select=*&order=created_at.desc&limit=200', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!response.ok) throw new Error('Tidak dapat memuat data. Silakan login ulang.');
            setRows(await response.json() as EventRow[]);
            setMessage('');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void loadRows(); }, []);

    const login = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await request('/auth/v1/token?grant_type=password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json() as { access_token?: string; error_description?: string };
            if (!response.ok || !data.access_token) throw new Error(data.error_description ?? 'Email atau password salah.');
            localStorage.setItem(tokenKey, data.access_token);
            setToken(data.access_token);
            await loadRows(data.access_token);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Login gagal.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(tokenKey);
        setToken('');
        setRows([]);
    };

    const visits = rows.filter((row) => row.action === 'visit').length;
    const whatsapp = rows.filter((row) => row.action === 'whatsapp').length;
    const interactions = rows.filter((row) => ['click', 'scroll', 'engagement'].includes(row.action)).length;

    return <main className="admin-page"><div className="admin-shell">
        <a href="/" style={{ color: '#d70808', fontWeight: 700 }}>← Kembali ke landing page</a>
        <h1 style={{ marginBottom: 8 }}>Full Bright — Analytics</h1>
        <p style={{ color: '#666', marginTop: 0 }}>Riwayat klik CTA dari landing page.</p>
        {!token ? <form onSubmit={login} style={{ maxWidth: 390, display: 'grid', gap: 12, marginTop: 28 }}>
            <input required type="email" placeholder="Email admin" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 12 }} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 12 }} />
            <button disabled={loading} style={{ padding: 12, background: '#d70808', color: '#fff', border: 0, borderRadius: 6, fontWeight: 700 }}>{loading ? 'Memproses...' : 'Masuk'}</button>
        </form> : <>
            <div style={{ display: 'flex', gap: 10, margin: '24px 0' }}>
                <button onClick={() => void loadRows()} disabled={loading}>Muat ulang</button>
                <button onClick={logout}>Keluar</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '20px 0' }}>
                {[['Total event', rows.length], ['Page visit', visits], ['Klik WhatsApp', whatsapp], ['Interaksi', interactions]].map(([label, value]) => <div key={String(label)} style={{ minWidth: 145, padding: 16, border: '1px solid #eee', borderRadius: 8 }}><small>{label}</small><strong style={{ display: 'block', fontSize: 26 }}>{value}</strong></div>)}
            </div>
            <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}><thead><tr>{['Waktu', 'Area', 'Aksi', 'Label'].map((text) => <th key={text} style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #ddd' }}>{text}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td style={{ padding: 10, borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{new Date(row.created_at).toLocaleString('id-ID')}</td><td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{row.zone}</td><td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{row.action}</td><td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{row.label}</td></tr>)}</tbody></table></div>
        </>}
        {message && <p style={{ color: '#d70808', marginTop: 18 }}>{message}</p>}
    </div></main>;
}
