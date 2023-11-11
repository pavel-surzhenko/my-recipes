import { BASE_URL } from './options';
import { foodCardProps_old, foodCategory, postFoodProps, foodResponse } from '../types';
import { fetchData } from '../hooks/fetchData';
import { postData } from '../hooks/postData';
import { deleteData } from '../hooks/deleteData';
import { updateData } from '../hooks/updateData';

export const api = {
    get: {
        async allFood(sorting = 'date_desc', page = 1): Promise<foodResponse> {
            return fetchData<foodResponse>(`${BASE_URL}food?sort=${sorting}&page=${page}`);
        },

        async main(sorting = 'date_desc', page = 1): Promise<foodResponse> {
            return fetchData<foodResponse>(`${BASE_URL}main?sort=${sorting}&page=${page}`);
        },

        async soups(sorting = 'date_desc', page = 1): Promise<foodResponse> {
            return fetchData<foodResponse>(`${BASE_URL}soups?sort=${sorting}&page=${page}`);
        },

        async salads(sorting = 'date_desc', page = 1): Promise<foodResponse> {
            return fetchData<foodResponse>(`${BASE_URL}salads?sort=${sorting}&page=${page}`);
        },

        async desserts(sorting = 'date_desc', page = 1): Promise<foodResponse> {
            return fetchData<foodResponse>(`${BASE_URL}desserts?sort=${sorting}&page=${page}`);
        },

        async byId(id: string): Promise<foodCardProps_old> {
            return fetchData<foodCardProps_old>(`${BASE_URL}food/${id}`);
        },

        async random(category: foodCategory): Promise<foodCardProps_old> {
            return fetchData<foodCardProps_old>(`${BASE_URL}random?category=${category}`);
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
