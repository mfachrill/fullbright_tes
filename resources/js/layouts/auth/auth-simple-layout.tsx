import { Link } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="fullbright-auth min-h-svh bg-[#f8f7f5] p-3 sm:p-5 lg:p-7">
            <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-[1280px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_70px_rgba(55,22,18,0.1)] lg:grid-cols-[0.95fr_1.05fr] sm:min-h-[calc(100svh-2.5rem)] lg:min-h-[calc(100svh-3.5rem)]">
                <aside className="relative hidden overflow-hidden bg-[#D70808] p-10 text-white lg:flex lg:flex-col xl:p-14">
                    <div className="pointer-events-none absolute -top-28 -right-24 size-[340px] rounded-full border-[52px] border-white/10" />

                    <Link href={home()} className="relative z-10 inline-flex w-fit rounded-2xl bg-white px-5 py-4 shadow-[0_12px_32px_rgba(84,0,0,0.2)]">
                        <img
                            src="/assets/Logo-Fullbright.webp"
                            alt="Full Bright Indonesia"
                            className="h-auto w-[150px]"
                        />
                    </Link>

                    <div className="relative z-10 my-auto max-w-md">
                        <div className="mb-6 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.12em] text-white/75 uppercase">
                            <BarChart3 className="size-4" />
                            Fullbright Analytics
                        </div>
                        <h2 className="font-display text-4xl leading-[1.12] font-black tracking-tight xl:text-[44px]">
                            Data yang jelas untuk keputusan yang tepat.
                        </h2>
                        <p className="mt-5 max-w-sm text-base leading-7 text-white/75">
                            Lihat performa landing page TOEFL dan interaksi calon peserta dari satu tempat.
                        </p>
                    </div>
                    <p className="relative z-10 text-xs font-semibold tracking-wide text-white/55">FULL BRIGHT INDONESIA</p>
                </aside>

                <main className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
                    <div className="w-full max-w-[390px]">
                        <div className="mb-10">
                            <Link href={home()} className="mb-8 inline-flex lg:hidden">
                                <img src="/assets/Logo-Fullbright.webp" alt="Full Bright Indonesia" className="h-auto w-[150px]" />
                            </Link>
                            <p className="mb-3 text-xs font-extrabold tracking-[0.14em] text-[#D70808] uppercase">Admin portal</p>
                            <h1 className="font-display text-[30px] font-black tracking-tight text-[#151515]">{title}</h1>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-[#6b7280]">{description}</p>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
