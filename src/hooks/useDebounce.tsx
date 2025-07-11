// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
};
