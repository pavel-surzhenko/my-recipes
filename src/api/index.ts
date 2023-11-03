import { BASE_URL } from './options';
import { FoodCardProps, foodCategory, postFoodProps } from '../types';
import { fetchData } from '../hooks/fetchData';
import { postData } from '../hooks/postData';

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

        async random(category: foodCategory): Promise<FoodCardProps> {
            return fetchData<FoodCardProps>(`${BASE_URL}random?category=${category}`);
        },

        // async r(category: foodCategory): Promise<FoodCardProps> {
        //     return fetchData<FoodCardProps>(`http://localhost:4000/random?category=${category}`);
        // },
    },
    post: {
        async food(data: postFoodProps) {
            return postData<postFoodProps>(`${BASE_URL}food`, data);
        },

        async image(img: FormData) {
            return postData<FormData>(`${BASE_URL}image`, img);
        },
    },
};
