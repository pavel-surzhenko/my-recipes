import axios, { AxiosResponse } from 'axios';

export async function updateData<T>(url: string, data: T): Promise<AxiosResponse> {
    try {
        const response = await axios.put(url, data);

        return response;
    } catch (error) {
        throw new Error(`Failed to post data ${url}: ${error}`);
    }
}
