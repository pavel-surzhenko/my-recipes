import axios from 'axios';
import { FoodCardProps } from '../types';

export const fetchData = async (url: string): Promise<FoodCardProps[]> => {
    try {
        const { data } = await axios.get<FoodCardProps[]>(url);
        return data;
    } catch (error) {
        throw new Error(`Failed to get data from ${url}: ${error}`);
    }
};
