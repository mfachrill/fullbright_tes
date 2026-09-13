import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
    ref?: Ref<HTMLAnchorElement>;
    zone: string;
    action: string;
    label: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

async function recordClick(zone: string, action: string, label: string) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) return;

    await fetch(`${url}/rest/v1/landing_events`, {
        method: 'POST',
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
        },
        body: JSON.stringify({ zone, action, label, page_url: location.href }),
    }).catch(() => undefined);
}

export function StaticTrackedCTA({ zone, action, label, children, onClick, ...props }: Props) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        void recordClick(zone, action, label);
        onClick?.(event);
    };

    return <a {...props} onClick={handleClick}>{children}</a>;
}
