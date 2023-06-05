'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ProgressBar from "@badrap/bar-of-progress";

export function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const progress = new ProgressBar(
        {
            size: 4,
            color: "#020570",
            className: "z-50",
            delay: 100,
        }
    );
    useEffect(() => {
        const url = searchParams && (pathname + searchParams.toString());
        console.log(url);
        progress.start();
        progress.finish();
    }, [pathname, searchParams]);

    return null;
}