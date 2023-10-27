import React, { Suspense } from 'react';
import { FoodCardProps } from '../types';

const FoodCard = React.lazy(() => import('../components/FoodCard'));

const FoodGrid: React.FC<{ data: FoodCardProps[] }> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 my-5'>
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
