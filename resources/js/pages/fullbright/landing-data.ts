export type PricingMode = 'self' | 'tutor';

const whatsappNumber = '6285255499299';

export const waUrl = (text: string): string =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

export const WA_SCREENSHOTS = [
    { src: '/assets/toefl1.webp', score: '547' },
    { src: '/assets/toefl2.webp', score: '543' },
    { src: '/assets/toefl3.webp', score: '563' },
    { src: '/assets/toefl4.webp', score: '560' },
    { src: '/assets/toefl5.webp', score: '507' },
    { src: '/assets/toefl6.webp', score: '513' },
    { src: '/assets/toefl7.webp', score: '537' },
    { src: '/assets/toefl9.webp', score: '560' },
];

export const REVIEW_COUNT = 19;
export const reviewSrc = (index: number): string => `/assets/Riview (${index + 1}).webp`;

export const RETURN_OPTIONS = [
    'Harganya masih terlalu mahal buatku',
    'Belum yakin bisa mencapai target TOEFL-ku',
    'Belum yakin program ini cocok untuk kebutuhanku',
    'Masih membandingkan dengan program lain',
];

export const RETURN_WA_MSGS = [
    'Halo Admin Full Bright Indonesia. Saya mau konsultasi soal paket dan harga sebelum daftar.',
    'Halo Admin Full Bright Indonesia. Saya mau konsultasi soal metode belajar dan hasil yang bisa dicapai sebelum daftar.',
    'Halo Admin Full Bright Indonesia. Saya mau konsultasi apakah program ini cocok dengan kebutuhan saya sebelum daftar.',
    'Halo Admin Full Bright Indonesia. Saya masih membandingkan dengan program lain, mau tanya-tanya dulu.',
];

export const RETURN_SUBTEXTS = [
    'Ada yang ingin ditanyakan soal harga atau paket?',
    'Mau tahu apakah program ini cocok untuk target skor kamu?',
    'Konsultasikan dulu apakah program ini cocok untukmu.',
    'Masih membandingkan? Tanya tim kami tentang programnya.',
];

export const FAQ_CATEGORIES = [
    'Belajar Mandiri (LMS)',
    'Metode & Efektivitas',
    'Dibimbing Tutor',
    'Sertifikat & Legalitas',
    'Pendaftaran & Pembayaran',
    'Jaminan & Garansi',
];

export const FAQ_ITEM_CATEGORIES = [
    'Belajar Mandiri (LMS)', 'Belajar Mandiri (LMS)', 'Belajar Mandiri (LMS)', 'Belajar Mandiri (LMS)', 'Belajar Mandiri (LMS)',
    'Metode & Efektivitas', 'Metode & Efektivitas', 'Metode & Efektivitas', 'Metode & Efektivitas', 'Metode & Efektivitas',
    'Dibimbing Tutor', 'Dibimbing Tutor', 'Dibimbing Tutor', 'Sertifikat & Legalitas', 'Sertifikat & Legalitas',
    'Pendaftaran & Pembayaran', 'Jaminan & Garansi',
];
