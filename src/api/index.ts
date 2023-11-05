import { BASE_URL, LOCAL_URL } from './options';
import { FoodCardProps, foodCategory, postFoodProps } from '../types';
import { fetchData } from '../hooks/fetchData';
import { postData } from '../hooks/postData';
import { deleteData } from '../hooks/deleteData';
import { updateData } from '../hooks/updateData';

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
    },
    post: {
        async food(data: postFoodProps) {
            return postData<postFoodProps>(`${BASE_URL}food`, data);
        },

        async image(img: FormData) {
            return postData<FormData>(`${BASE_URL}image`, img);
        },
    },

    delete: {
        async image(id: string) {
            return deleteData(`${BASE_URL}image/${id}`);
        },

        async food(id: string) {
            return deleteData(`${BASE_URL}food/${id}`);
        },
    },

    update: {
        async food(id: string, data: postFoodProps) {
            return updateData(`${BASE_URL}food`, { id, ...data });
        },
    },
};
