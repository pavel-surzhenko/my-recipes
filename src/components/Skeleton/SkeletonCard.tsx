import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => {
    return (
        <div className='max-w-[250px] space-y-2 rounded-md overflow-hidden'>
            <Skeleton
                width={250}
                className='h-[200px] sm:h-[225px]  lg:h-[250px]'
            />
            <div className='flex justify-between'>
                <Skeleton
                    width={70}
                    height={20}
                    containerClassName='flex-1'
                />
                <Skeleton
                    width={90}
                    height={20}
                />
            </div>
            <div className='flex justify-center'>
                <Skeleton
                    width={120}
                    height={25}
                />
            </div>
        </div>
    );
};

export default SkeletonCard;
