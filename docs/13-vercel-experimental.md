# Deployment Vercel (Eksperimental)

Konfigurasi `vercel.json` di repository ini menjalankan Laravel melalui runtime PHP komunitas `vercel-php`. Ini **bukan** deployment static React. Seluruh request, termasuk `/`, `/login`, `/admin`, dan endpoint analytics, diteruskan ke `api/index.php`, lalu ke `public/index.php` Laravel.

Gunakan jalur ini hanya setelah staging berhasil. Untuk production yang membutuhkan reliabilitas paling tinggi, gunakan VPS/Forge atau image Docker pada hosting yang mendukung container. Panduan utama tetap ada di [Deployment Production](09-deployment.md).

## Yang harus disiapkan di Vercel

1. Import repository GitHub dan gunakan pengaturan dari `vercel.json`.
2. Buat database MySQL eksternal yang dapat diakses dari Vercel. Database lokal XAMPP tidak dapat digunakan.
3. Tambahkan environment variables production berikut pada Vercel:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.vercel.app
APP_KEY=base64:...
LOG_CHANNEL=stderr
VIEW_COMPILED_PATH=/tmp
CRON_SECRET=buat-random-secret-minimal-16-karakter
DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=s3
WHATSAPP_NUMBER=628xxxxxxxxxx
WHATSAPP_DEFAULT_MESSAGE="Halo, saya tertarik dengan program ini."
PROJECT_MODE=ctwa
PAYMENT_MODE=none
```

Tambahkan juga `AWS_*` atau konfigurasi S3-compatible bila aplikasi nanti menyimpan file dinamis. Asset landing page yang sudah berada pada `public/assets` tetap dilayani sebagai asset statis deployment.

4. Jalankan migration dari mesin yang memiliki akses ke database produksi:

```bash
php artisan migrate --force
php artisan pbm:create-admin --name="Fullbright Analytics" --email="admin@example.com" --password="password-kuat"
```

5. Buka `/login`, login sebagai admin, lalu buka `/admin`. Uji CTA WhatsApp dan periksa event `whatsapp_lead` di dashboard.

## Batasan penting

- Runtime PHP yang dipakai adalah runtime komunitas, sehingga perlu diuji kembali pada setiap upgrade Laravel atau Vercel.
- Filesystem Function tidak boleh digunakan untuk file persisten. Gunakan database untuk session/cache dan S3/R2 untuk upload atau media dinamis.
- Konfigurasi Vercel menjalankan `/internal/cron/analytics-archive` pada `19:30 UTC`, setara `02:30 WIB`. Vercel mengirim header Authorization menggunakan `CRON_SECRET`; jangan membagikan nilai ini.
- `NEW.mp4` berada di `public/assets`. Untuk traffic tinggi, pindahkan video ke object storage/CDN agar ukuran deployment dan cold start lebih terkendali.

Vercel Cron memanggil endpoint HTTP, sehingga tidak dapat langsung menjalankan `php artisan schedule:run` tanpa endpoint Laravel khusus. Dokumentasi Vercel: https://vercel.com/docs/cron-jobs
