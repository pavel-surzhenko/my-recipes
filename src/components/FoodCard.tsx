import { Link } from 'react-router-dom';
import { ImageIcon } from '../assets/ImageIcon';
import { FoodCardProps } from '../types';
import CategoryLabel from './CategoryLabel';
import TimeIcon from '../assets/TimeIcon';

const FoodCard: React.FC<FoodCardProps> = ({ name, category, images, _id }) => {
    return (
        <div className='bg-secondary dark:bg-secondaryDark rounded-md space-y-3 flex flex-col min-w-[250px] shadow-card'>
            <Link to={`/${category}/${_id}`}>
                <div className='w-full h-[200px] sm:h-[225px]  lg:h-[250px] rounded-t-md overflow-hidden border-b border-[#ddd]'>
                    {images?.length ? (
                        <img
                            src={images[0]}
                            alt={name}
                            className='w-full h-[200px] sm:h-[225px]  lg:h-[250px] object-cover aspect-video'
                        />
                    ) : (
                        <ImageIcon />
                    )}
                </div>
            </Link>
            <div className='flex justify-between items-center pt-2 px-5'>
                <div>
                    <TimeIcon />
                </div>
                <Link to={`/${category} `}>
                    <CategoryLabel category={category} />
                </Link>
            </div>
            <Link to={`/${category}/${_id}`}>
                <h2 className='font-medium text-lg text-center px-5 pb-5'>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </h2>
            </Link>
        </div>
    );
};

export default FoodCard;
