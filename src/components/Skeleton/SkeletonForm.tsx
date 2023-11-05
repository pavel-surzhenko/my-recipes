import Skeleton from 'react-loading-skeleton';
import useTailwind from '../../hooks/useTailwind';
import { useContext } from 'react';
import { ThemeContext } from '../../lib/context';

const SkeletonForm = () => {
    const {
        theme: {
            colors: { secondary, secondaryDark },
        },
    } = useTailwind();

    const { isThemeDark } = useContext(ThemeContext);

    return (
        <div className='p-5 m-5 bg-secondary dark:bg-secondaryDark flex flex-col space-y-3 w-[min(100%,700px)] mx-auto'>
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='100%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='100%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='20%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='20%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <div className='flex space-x-3'>
                <Skeleton
                    containerClassName='flex-1 basis-1/3'
                    className='h-[35px]'
                    borderRadius={8}
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
                <Skeleton
                    containerClassName='flex-1 basis-1/6'
                    className='h-[35px]'
                    borderRadius={8}
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
                <Skeleton
                    containerClassName='flex-1 '
                    className='h-[35px]'
                    borderRadius={8}
                    baseColor={isThemeDark ? secondaryDark : secondary}
                />
            </div>
            <Skeleton
                width='30%'
                className='h-[25px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='100%'
                className='h-[100px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='20%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
            <Skeleton
                width='100%'
                className='h-[35px]'
                borderRadius={8}
                baseColor={isThemeDark ? secondaryDark : secondary}
            />
        </div>
    );
};

export default SkeletonForm;
