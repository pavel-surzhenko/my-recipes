import axios, { AxiosResponse } from 'axios';

export async function postData<T>(url: string, data: T): Promise<AxiosResponse> {
    try {
        const response = await axios.post(url, data);

        return response;
    } catch (error) {
        throw new Error(`Failed to post data ${url}: ${error}`);
    }
}
