export type FoodCardProps = {
    _id: string;
    img: string;
    name: string;
    category: foodCategory;
    instruction: string[];
    createdAt: Date;
    updatedAt: Date;
    _v: number;
};

type foodCategory = 'soups' | 'main' | 'salads' | 'desserts';
