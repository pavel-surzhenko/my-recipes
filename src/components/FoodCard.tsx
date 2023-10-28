import { Link } from 'react-router-dom';
import { ImageIcon } from '../assets/ImageIcon';
import { FoodCardProps } from '../types';
import CategoryLabel from './CategoryLabel';

const FoodCard: React.FC<FoodCardProps> = ({ name, category, img, _id }) => {
    return (
        <div className='bg-secondary dark:bg-secondaryDark rounded-md px-5 py-3 space-y-2 flex flex-col'>
            <Link to={`/${category}/${_id}`}>
                <div className='w-full h-[150px] object-contain bg-third dark:bg-thirdDark'>
                    {img ? '' : <ImageIcon />}
                </div>
            </Link>
            <Link
                to={`/${category} `}
                className='self-end'
            >
                <CategoryLabel category={category} />
            </Link>
            <Link to={`/${category}/${_id}`}>
                <h2 className='font-medium text-lg text-center'>{name}</h2>
            </Link>
        </div>
    );
};

export default FoodCard;
