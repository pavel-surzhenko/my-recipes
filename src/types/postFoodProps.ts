import { IngredientsProps, foodCategory } from '.';

export type postFoodProps = {
    category: foodCategory;
    name: string;
    instruction: string[];
    time: string;
    ingredients: IngredientsProps[];
    images: string[];
};
