import { IngredientsProps } from '.';

export type foodCardProps = {
    _id: string;
    images: string[];
    name: string;
    category: foodCategory;
    instruction: string[];
    time: string;
    ingredients: IngredientsProps[];
    createdAt: Date;
    updatedAt: Date;
    _v: number;
};

export type foodCategory = 'soups' | 'main' | 'salads' | 'desserts';
