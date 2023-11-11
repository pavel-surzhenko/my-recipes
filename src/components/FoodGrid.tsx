import React, { Suspense } from 'react';
import { foodCardProps } from '../types';

const FoodCard = React.lazy(() => import('../components/FoodCard'));

const FoodGrid: React.FC<{ data: foodCardProps[] }> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 justify-center sm:grid-cols-2 smd:grid-cols-3 xl:grid-cols-4 gap-7 my-5 md:my-10 mx-auto'>
            <Suspense>
                {data &&
                    data?.map((food) => (
                        <FoodCard
                            key={food._id}
                            {...food}
                        />
                    ))}
            </Suspense>
        </div>
    );
};

export default FoodGrid;
