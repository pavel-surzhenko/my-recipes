import { BASE_URL } from './options';
import { FoodCardProps } from '../types';
import { fetchData } from '../hooks/useFetch';

export const api = {
    async getAllFood(): Promise<FoodCardProps[]> {
        return fetchData(`${BASE_URL}food`);
    },

    async getMain(): Promise<FoodCardProps[]> {
        return fetchData(`${BASE_URL}food/main`);
    },

    async getSoups(): Promise<FoodCardProps[]> {
        return fetchData(`${BASE_URL}food/soups`);
    },

    async getSalads(): Promise<FoodCardProps[]> {
        return fetchData(`${BASE_URL}food/salads`);
    },

    async getDesserts(): Promise<FoodCardProps[]> {
        return fetchData(`${BASE_URL}food/desserts`);
    },
};
