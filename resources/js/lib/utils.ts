import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const can = (permission: string | undefined) => {
    const page = usePage<SharedData>();
    console.log(page);
    const { auth } = page.props;
    if (!auth) return false;
    return !!(permission && !auth.permissions.some((p) => p.name === permission));
};

export const hasRole = (role: string | undefined) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    if (!auth) return false;
    return !!(role && !auth.roles.some((r) => r.name === role));
};
