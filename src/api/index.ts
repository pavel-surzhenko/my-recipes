import { BASE_URL } from './options';
import { FoodCardProps } from '../types';
import { fetchData } from '../hooks/useFetch';

export const api = {
    get: {
        async allFood(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food`);
        },

        async main(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food/main`);
        },

        async soups(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food/soups`);
        },

        async salads(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food/salads`);
        },

        async desserts(): Promise<FoodCardProps[]> {
            return fetchData<FoodCardProps[]>(`${BASE_URL}food/desserts`);
        },

        async byId(id: string): Promise<FoodCardProps> {
            return fetchData<FoodCardProps>(`${BASE_URL}food/${id}`);
        },
    },
};
