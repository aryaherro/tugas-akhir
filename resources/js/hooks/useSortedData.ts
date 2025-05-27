// hooks/useSortedData.ts
import { useMemo } from 'react';

const getNestedValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc?.[part], obj);

export function useSortedData<T>(data: T[], sortBy: string | null, sortOrder: 'asc' | 'desc') {
    return useMemo(() => {
        if (!sortBy) return data;

        return [...data].sort((a, b) => {
            const aVal = getNestedValue(a, sortBy) ?? '';
            const bVal = getNestedValue(b, sortBy) ?? '';

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return String(aVal).localeCompare(String(bVal)) * (sortOrder === 'asc' ? 1 : -1);
        });
    }, [data, sortBy, sortOrder]);
}
