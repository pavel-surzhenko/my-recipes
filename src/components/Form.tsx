import { ChangeEvent, useState } from 'react';
import { AddIcon, CloseIcon, DeleteIcon } from '../assets';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { foodCardProps, formProps } from '../types';
import Skeleton from 'react-loading-skeleton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { formSchema } from '../lib/schema';
import SkeletonButton from './Skeleton/SkeletonButton';

const Form: React.FC<Partial<foodCardProps>> = ({
    _id,
    images: existingImages,
    name: existingName,
    ingredients: existingIngredients,
    instruction: existingInstruction,
    category: existingCategory,
    time: existingTime,
}) => {
    const navigate = useNavigate();

    const [images, setImages] = useState<string[]>(existingImages || []);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const { register, handleSubmit, setValue, watch, formState, trigger } = useForm<formProps>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            category: existingCategory || 'soups',
            name: existingName || '',
            images: existingImages || [],
            time: existingTime || '',
            ingredients: existingIngredients || [],
            instruction: existingInstruction || [],
        },
    });

    const category = watch('category');
    const ingredients = watch('ingredients');
    const instructionSteps = watch('instruction');

    const onSubmit: SubmitHandler<formProps> = (data) => {
        setFormLoading(true);
        if (_id) {
            api.update
                .food(_id, data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Рецепт оновлено', toastOptions);
                        navigate(`/${category}/${_id}`);
                    }
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                })
                .finally(() => setFormLoading(false));
        } else {
            api.post
                .food(data)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success('Рецепт доданий', toastOptions);
                        navigate(`/${category}/${res.data.id}`);
                    }
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                })
                .finally(() => setFormLoading(false));
        }
    };

    const addStep = () => {
        setValue('instruction', [...instructionSteps, '']);
    };

    const removeLastStep = () => {
        if (instructionSteps.length > 1) {
            setValue('instruction', instructionSteps.slice(0, -1));
        }
        trigger('instruction');
    };

    const addIngredient = () => {
        setValue('ingredients', [...ingredients, { name: '', quantity: '', unit: 'шт' }]);
    };

    const removeIngredient = () => {
        if (ingredients.length > 1) {
            setValue('ingredients', ingredients.slice(0, -1));
        }
        trigger('ingredients');
    };

    const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsImageLoading(true);
        const file = e.target.files?.[0];

        if (!validFiles.find((type) => type === file?.type)) {
            toast.error('Файл повинен бути JPG/NPG формату', toastOptions);
            setIsImageLoading(false);
            return;
        }

        const form = new FormData();
        form.append('image', file as Blob);

        await api.post
            .image(form)
            .then((res) => {
                setImages([res.data.link, ...images]);
                setValue('images', [res.data.link, ...images]);
            })
            .catch((error) => {
                toast.error(`Упс, сталась помилка ${error.message}`, toastOptions);
            })
            .finally(() => setIsImageLoading(false));
    };

    const handleDeleteImage = async (image: string) => {
        const parts = image.split('/');

        const id = parts[parts.length - 1];

        await api.delete
            .image(id)
            .then(() => {
                setImages(images.filter((img) => img !== image));
                setValue(
                    'images',
                    images.filter((img) => img !== image)
                );
            })
            .catch((error) => {
                toast.error(`Упс, сталась помилка ${error.message}`, toastOptions);
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col p-5 bg-secondary dark:bg-secondaryDark space-y-3 m-5 w-[min(100%,700px)] mx-auto'
        >
            <label htmlFor='category'>
                Оберіть категорію <span className='text-red'>*</span>
            </label>
            <select
                {...register('category')}
                className='input'
            >
                <option value='soups'>Супи</option>
                <option value='main'>Другі страви</option>
                <option value='salads'>Салати</option>
                <option value='desserts'>Десерти</option>
            </select>
            <label htmlFor='name'>
                Назва <span className='text-red'>*</span>
            </label>
            <input
                placeholder='Назва...'
                className='input'
                {...register('name')}
            />
            <span className='error'>{formState.errors.name?.message}</span>
            <label>Завантажити фото</label>
            <label
                htmlFor='image'
                className='cursor-pointer btn-suc self-start'
            >
                Вибрати файл
            </label>
            <input
                id='image'
                type='file'
                onChange={handleFileChange}
                className='hidden'
            />
            <span className='error'>{formState.errors.images?.message}</span>
            <div className='flex space-x-3'>
                {isImageLoading && (
                    <div className='leading-none'>
                        <Skeleton
                            width={window.innerWidth > 1024 ? 150 : 100}
                            height={window.innerWidth > 1024 ? 150 : 100}
                        />
                    </div>
                )}
                {images?.map((img) => (
                    <div
                        key={img}
                        className='relative'
                    >
                        <img
                            className='w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] object-cover rounded-md'
                            src={img}
                            key={img}
                            alt='food'
                        />
                        <button
                            className='absolute top-1 right-1 bg-secondary dark:bg-secondaryDark rounded-sm text-red cursor-pointer'
                            onClick={() => handleDeleteImage(img)}
                            type='button'
                        >
                            <CloseIcon />
                        </button>
                    </div>
                ))}
            </div>
            <label htmlFor='time'>
                Час приготування (хв) <span className='text-red'>*</span>
            </label>
            <input
                type='number'
                placeholder='Хвилин...'
                className='input w-1/3 md:w-1/4 xl:w-1/5'
                {...register('time')}
            />
            <span className='error'>{formState.errors.time?.message}</span>
            <label htmlFor='ingredients'>
                Інгредієнти <span className='text-red'>*</span>
            </label>
            {ingredients?.map((_, index) => (
                <div
                    key={index}
                    className='space-x-2 sm:space-x-3 flex'
                >
                    <input
                        {...register(`ingredients.${index}.name`)}
                        type='text'
                        placeholder='Назва інгредієнту...'
                        className='input w-full'
                    />
                    <input
                        type='number'
                        placeholder='Кількість...'
                        className='input w-full basis-1/3'
                        {...register(`ingredients.${index}.quantity`)}
                    />
                    <select
                        className='select text-center'
                        {...register(`ingredients.${index}.unit`)}
                    >
                        <option value='шт'>шт</option>
                        <option value='гр'>гр</option>
                    </select>
                </div>
            ))}
            <span className='error'>
                {formState.errors.ingredients
                    ? Array.isArray(formState.errors.ingredients) &&
                      formState.errors.ingredients.map((item, index) => (
                          <p
                              key={index}
                              className='flex flex-col'
                          >
                              <span>{item?.name?.message}</span>
                              <span>{item?.quantity?.message}</span>
                              <span>{item?.unit?.message}</span>
                          </p>
                      ))
                    : null}
            </span>
            {ingredients?.length > 1 && (
                <button
                    type='button'
                    onClick={removeIngredient}
                    className='btn-del self-start flex space-x-2'
                >
                    <DeleteIcon />
                    <span>Видалити</span>
                </button>
            )}
            <button
                type='button'
                className='btn-suc self-start flex space-x-2'
                onClick={addIngredient}
            >
                <AddIcon />
                <span>Додати Інгредієнт</span>
            </button>

            {instructionSteps?.map((_, index) => (
                <div
                    key={index}
                    className='flex flex-col space-y-3'
                >
                    <label htmlFor={`instruction-${index + 1}`}>
                        Крок<span className='text-red'>*</span> {index + 1}
                    </label>
                    <textarea
                        rows={3}
                        placeholder='Інструкція...'
                        className='input'
                        {...register(`instruction.${index}`)}
                    />
                </div>
            ))}
            <p className='flex flex-col'>
                {formState.errors.instruction
                    ? Array.isArray(formState.errors.instruction) &&
                      formState.errors.instruction.map((item, index) => (
                          <span
                              className='error'
                              key={index}
                          >
                              {item.message}
                          </span>
                      ))
                    : null}
            </p>
            {instructionSteps?.length > 1 && (
                <button
                    type='button'
                    onClick={removeLastStep}
                    className='btn-del self-start flex space-x-2'
                >
                    <DeleteIcon />
                    <span>Видалити</span>
                </button>
            )}
            <button
                type='button'
                className='self-start btn-suc flex space-x-2'
                onClick={addStep}
            >
                <AddIcon />
                <span>Додати крок</span>
            </button>
            {formLoading ? (
                <SkeletonButton />
            ) : (
                <button
                    type='submit'
                    className='btn'
                    disabled={!formState.isValid}
                >
                    {_id ? 'Оновити' : 'Зберегти'}
                </button>
            )}
            {!formState.isValid && <span className='error'>*заповніть всі поля</span>}
        </form>
    );
};

export default Form;
