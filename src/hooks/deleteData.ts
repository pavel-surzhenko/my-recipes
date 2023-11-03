import axios, { AxiosResponse } from 'axios';

export async function deleteData(url: string): Promise<AxiosResponse> {
    try {
        const response = await axios.delete(url);

        return response;
    } catch (error) {
        throw new Error(`Failed to post data ${url}: ${error}`);
    }
}
