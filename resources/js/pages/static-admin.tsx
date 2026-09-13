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

function LoginScreen({ email, password, loading, message, onEmail, onPassword, onSubmit }: { email: string; password: string; loading: boolean; message: string; onEmail: (value: string) => void; onPassword: (value: string) => void; onSubmit: (event: FormEvent) => void }) {
    return <section className="fb-login-page"><div className="fb-login-shell"><aside className="fb-login-visual"><img className="fb-login-logo" src="/assets/Logo-Fullbright.webp" alt="Full Bright Indonesia" /><h1>Data yang lebih jelas, keputusan yang lebih tepat.</h1><p>Pantau performa campaign dan interaksi calon peserta langsung dari satu dashboard.</p><span className="fb-login-caption">CTWA Analytics · Full Bright Indonesia</span></aside><section className="fb-login-panel"><div className="fb-login-form"><div className="admin-brand"><span className="admin-mark">F</span>Full Bright <span className="admin-muted">/ Analytics</span></div><h2>Hai, selamat datang kembali</h2><p>Masukkan akun admin untuk melanjutkan.</p><form onSubmit={onSubmit}><label>Email admin<input required type="email" placeholder="nama@contoh.com" value={email} onChange={(event) => onEmail(event.target.value)} /></label><label>Password<input required type="password" placeholder="Masukkan kata sandi" value={password} onChange={(event) => onPassword(event.target.value)} /></label>{message && <div className="admin-alert">{message}</div>}<div className="fb-login-help"><span>Area khusus administrator</span><a href="/">Kembali ke website</a></div><button className="admin-btn primary" disabled={loading}>{loading ? 'Memverifikasi...' : 'Masuk'}</button></form><p className="fb-login-note">Dengan melanjutkan, Anda menyetujui penggunaan sistem analytics Full Bright Indonesia secara bertanggung jawab.</p></div></section></div></section>;
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
        {token ? <><a href="/" style={{ color: '#176b42', fontWeight: 700 }}>← Kembali ke landing page</a>
        <h1 style={{ marginBottom: 8 }}>Full Bright — Analytics</h1>
        <p style={{ color: '#666', marginTop: 0 }}>Riwayat klik CTA dari landing page.</p></> : null}
        {!token ? <LoginScreen email={email} password={password} loading={loading} message={message} onEmail={setEmail} onPassword={setPassword} onSubmit={login} /> : <>
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
