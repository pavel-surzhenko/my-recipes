import { Link } from 'react-router-dom';
import { ImageIcon } from '../assets/ImageIcon';
import { FoodCardProps } from '../types';

const categoryUA = {
    soups: 'Супи',
    main: 'Другі страви',
    salads: 'Салати',
    desserts: 'Десерти',
};
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
                <div className={`px-2 py-1 rounded-md font-semibold text-sm ${category}`}>
                    {categoryUA[category]}
                </div>
            </Link>
            <Link to={`/${category}/${_id}`}>
                <h2 className='font-medium text-lg text-center'>{name}</h2>
            </Link>
        </div>
    );
};

export default FoodCard;
