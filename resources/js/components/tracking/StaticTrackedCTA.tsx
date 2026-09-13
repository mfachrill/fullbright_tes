import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';
import { recordLandingEvent } from '@/analytics/supabase-tracking';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
    ref?: Ref<HTMLAnchorElement>;
    zone: string;
    action: string;
    label: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function StaticTrackedCTA({ zone, action, label, children, onClick, ...props }: Props) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        void recordLandingEvent(zone, action, label);
        onClick?.(event);
    };

    return <a {...props} data-analytics-cta="true" onClick={handleClick}>{children}</a>;
}
