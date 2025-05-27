// hooks/useFilteredData.ts
import { useMemo } from 'react';

export function useFilteredData<T extends object>(data: T[], filterValue: string) {
    return useMemo(() => {
        if (!filterValue) return data;
        const lowerFilter = filterValue.toLowerCase();

        return data.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === 'object'
                    ? value && Object.values(value).some((v) => String(v).toLowerCase().includes(lowerFilter))
                    : String(value).toLowerCase().includes(lowerFilter),
            ),
        );
    }, [data, filterValue]);
}
