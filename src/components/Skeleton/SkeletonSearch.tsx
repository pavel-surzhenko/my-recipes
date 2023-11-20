import Skeleton from 'react-loading-skeleton';
import useTailwind from '../../hooks/useTailwind';
import { useContext } from 'react';
import { ThemeContext } from '../../lib/context';

const SkeletonSearch = () => {
    const {
        theme: {
            colors: { secondary, secondaryDark },
        },
    } = useTailwind();

    const { isThemeDark } = useContext(ThemeContext);

    return (
        <Skeleton
            width='100%'
            className='h-12'
            borderRadius={8}
            baseColor={isThemeDark ? secondaryDark : secondary}
        />
    );
};

export default SkeletonSearch;
