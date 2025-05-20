import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const can = (permission: string | undefined) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    if (!auth) return false;
    return auth.permissions.some((p) => p.name === permission);
};

export const hasRole = (role: string | undefined) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    if (!auth) return false;
    return auth.roles.some((r) => r.name === role);
};
