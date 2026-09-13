import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

export function Head({ title, children }: PropsWithChildren<{ title: string }>) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <>{children}</>;
}
