// React
import { useMemo } from 'react';

// secondary Party
import resolveConfig from 'tailwindcss/resolveConfig';

// Project
import tailwindConfig from '../../tailwind.config';

export default function useTailwind() {
    const tailwind = useMemo(() => resolveConfig(tailwindConfig), []);

    return tailwind;
}
