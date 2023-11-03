import SkeletonCard from './SkeletonCard';

const SkeletonGrid = () => {
    return (
        <div className='grid grid-cols-1 justify-center sm:grid-cols-2 smd:grid-cols-3 xl:grid-cols-4 gap-7 my-5 mx-auto'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
};

export default SkeletonGrid;
