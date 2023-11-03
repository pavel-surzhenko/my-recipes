import axios from 'axios';

export async function fetchData<T>(url: string): Promise<T> {
    try {
        const { data } = await axios.get<T>(url);
        return data;
    } catch (error) {
        throw new Error(`Failed to get data from ${url}: ${error}`);
    }
}
