# Deploy Laravel Full Bright ke InfinityFree

Dokumen ini berlaku untuk branch `infinityfree-laravel`. Branch tersebut memakai satu stack: Laravel, Inertia, dan MySQL. Jangan mencampurkannya dengan konfigurasi static Vercel atau Supabase.

## Prasyarat

- Akun hosting dan database MySQL InfinityFree sudah dibuat.
- PHP 8.3 tersedia pada hosting.
- Aplikasi dibuild secara lokal sebelum di-upload.

## Membuat paket upload

Jalankan di komputer lokal:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File scripts/package-infinityfree.ps1
```

Paket berada di `deploy/infinityfree/fullbright-infinityfree.zip`.

Jika File Manager menolak ZIP karena ukuran file, upload lewat FTP menggunakan FileZilla. Upload ZIP ke `/htdocs`, lalu extract dari File Manager. Bila extract tidak tersedia, upload isi folder `deploy/infinityfree/upload` secara langsung ke `/htdocs`.

## Konfigurasi environment

Setelah extract, edit `htdocs/core/.env` dan isi `DB_PASSWORD` dengan password database yang dibuat pada panel InfinityFree. Jangan commit file `.env` atau membagikan password tersebut.

Nilai yang harus cocok dengan panel:

```env
APP_URL=https://your-subdomain.example
DB_HOST=sqlXXX.infinityfree.com
DB_DATABASE=if0_xxxxx_database
DB_USERNAME=if0_xxxxx
DB_PASSWORD=your-secret-password
```

Gunakan `SESSION_DRIVER=file`, `CACHE_STORE=file`, dan `QUEUE_CONNECTION=sync` karena free hosting tidak menyediakan queue worker atau cron.

## Import database

1. Buka phpMyAdmin dari panel InfinityFree.
2. Pilih database aplikasi.
3. Import `htdocs/database.sql`.
4. Buka landing page, lalu klik CTA WhatsApp untuk memeriksa alur CTWA.

## Keterbatasan free hosting

InfinityFree tidak menjalankan scheduler dan queue worker. Untuk demo landing page, gunakan proses sinkron agar semua request selesai pada saat pengunjung melakukan aksi.
