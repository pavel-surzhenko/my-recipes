import * as yup from 'yup';
import { foodCategory } from '../types';

export const formSchema = yup.object().shape({
    category: yup.string().required('Оберіть категорію') as yup.StringSchema<foodCategory>,
    name: yup.string().required('Введіть назву'),
    images: yup.array().of(yup.string().required()).required('Додайте зображення'),
    time: yup.string().required('Введіть час приготування'),
    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string().required('Введіть назву інгредієнту'),
                quantity: yup.string().required('Введіть кількість'),
                unit: yup.string().required('Оберіть одиниці виміру'),
            })
        )
        .min(1, 'Додайте принаймні один інгредієнт')
        .nullable()
        .required('Додайте інгредієнти'),
    instruction: yup
        .array()
        .of(yup.string().required('Введіть інструкцію'))
        .min(1, 'Додайте принаймні один крок')
        .required('Додайте опис приготування'),
});
