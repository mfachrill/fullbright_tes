import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        compression({ algorithm: 'gzip', exclude: [/\.(br)$/, /\.(gz)$/] }),
        compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/] }),
    ],
    resolve: { alias: { '@': '/resources/js' } },
    build: {
        rollupOptions: {
            input: {
                landing: 'index.html',
                admin: 'admin/index.html',
                login: 'login/index.html',
            },
        },
    },
});
