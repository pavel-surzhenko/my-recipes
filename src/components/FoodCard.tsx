import { Link } from 'react-router-dom';
import { ImageIcon, TimeIcon } from '../assets';
import { foodCardProps } from '../types';
import CategoryLabel from './CategoryLabel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const FoodCard: React.FC<foodCardProps> = ({ name, category, images, _id, time }) => {
    return (
        <div className='bg-secondary dark:bg-secondaryDark rounded-md space-y-3 flex flex-col min-w-[250px] max-w-[300px] shadow-card hover:shadow-cardHover h-full hover:-translate-y-2 transition-all duration-30 group'>
            <Link to={`/${category}/${_id}`}>
                <div className='w-full h-[200px] sm:h-[225px] lg:h-[250px] rounded-t-md overflow-hidden group-hover:opacity-80'>
                    {images?.length ? (
                        <LazyLoadImage
                            alt={name}
                            src={images[0]}
                            effect='blur'
                            className='xs:w-full h-[200px] sm:h-[225px]  lg:h-[250px] object-cover aspect-video '
                        />
                    ) : (
                        <ImageIcon />
                    )}
                </div>
            </Link>
            <div className='flex justify-between items-center pt-2 px-5 text-black/50 dark:text-white/50 group-hover:text-black group-hover:dark:text-white'>
                <div className='flex space-x-2'>
                    <TimeIcon />
                    <p className='font-semibold'>{time} хв</p>
                </div>
                <Link to={`/${category} `}>
                    <CategoryLabel category={category} />
                </Link>
            </div>

            <h2 className='font-medium text-lg dark:text-blue text-center px-5 pb-5'>
                <Link
                    to={`/${category}/${_id}`}
                    className='group-hover:border-b-2 '
                >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
            </h2>
        </div>
    );
};

export default FoodCard;
