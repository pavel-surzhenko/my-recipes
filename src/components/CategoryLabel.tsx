import { foodCategory } from '../types/foodCardProps';

const categoryUA = {
    soups: 'Супи',
    main: 'Другі страви',
    salads: 'Салати',
    desserts: 'Десерти',
};

const CategoryLabel: React.FC<{ category: foodCategory }> = ({ category }) => {
    return (
        <div
            className={`px-2 py-1 rounded-md font-semibold text-sm dark:text-black whitespace-nowrap ${category}`}
        >
            {categoryUA[category]}
        </div>
    );
};

export default CategoryLabel;
