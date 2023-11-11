import { foodCardProps } from '.';

export type foodResponse = {
    data: foodCardProps[];
    page: number;
    totalPages: number;
};
