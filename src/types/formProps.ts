import { IngredientsProps, foodCategory } from '.';

export type formProps = {
    category: foodCategory;
    name: string;
    images?: string[];
    time: string;
    ingredients: IngredientsProps[];
    instruction: string[];
};
