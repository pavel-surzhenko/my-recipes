import { ImageIcon } from '../assets/ImageIcon';
import { FoodCardProps } from '../types';

const FoodCard: React.FC<FoodCardProps> = ({ name, category }) => {
    return (
        <div className=' bg-secondary max-w-[300px]'>
            <div className='w-full  h-[150px] object-contain'>
                <ImageIcon />
            </div>
            <div>{category}</div>
            <h2>{name}</h2>
        </div>
    );
};

export default FoodCard;
