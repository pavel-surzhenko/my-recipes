import { BASE_URL } from './options';
import { FoodCardProps, foodCategory, IngredientsProps } from '../types';
import { fetchData } from '../hooks/useFetch';
import axios from 'axios';

export const api = {
    get: {
        async allFood(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food`);
        },

        async main(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}main`);
        },

        async soups(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}soups`);
        },

        async salads(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}salads`);
        },

        async desserts(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}desserts`);
        },

        async byId(id: string): Promise<FoodCardProps> {
            return fetchData<FoodCardProps>(`${BASE_URL}food/${id}`);
        },
    },
    post: {
        async food(
            category: foodCategory,
            name: string,
            instruction: string[],
            time: string,
            ingredients: IngredientsProps[],
            images?: string[]
        ) {
            const data = await axios.post('http://localhost:4000/food', {
                category,
                name,
                instruction,
                time,
                ingredients,
                images,
            });
            return data;
        },

        async image(img: FormData) {
            const data = await axios.post('http://localhost:4000/image', img);

            return data;
        },
    },
};
