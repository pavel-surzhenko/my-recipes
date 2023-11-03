import Skeleton from 'react-loading-skeleton';
import useTailwind from '../../hooks/useTailwind';
import { useContext } from 'react';
import { ThemeContext } from '../../lib/context';

const SkeletonCard = () => {
    const {
        theme: {
            colors: { secondary, secondaryDark },
        },
    } = useTailwind();

    const { isThemeDark } = useContext(ThemeContext);

    return (
        <div className='max-w-[250px] space-y-2 '>
            <Skeleton
                width={250}
                className='h-[200px] sm:h-[225px]  lg:h-[250px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <div className='flex justify-between'>
                <Skeleton
                    width={70}
                    height={20}
                    containerClassName='flex-1'
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
                <Skeleton
                    width={90}
                    height={20}
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
            </div>
            <div className='flex justify-center'>
                <Skeleton
                    width={120}
                    height={25}
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
            </div>
        </div>
    );
};

export default SkeletonCard;
