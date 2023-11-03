import { ChangeEvent, useState } from 'react';
import { AddIcon, DeleteIcon } from '../assets';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { IngredientsProps, foodCategory } from '../types';
import Skeleton from 'react-loading-skeleton';

const Form = () => {
    const navigate = useNavigate();
    const [instructionSteps, setInstructionSteps] = useState<string[]>(['']);
    const [images, setImages] = useState<string[]>([]);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);
    const [isAllFields, setIsAllFields] = useState<boolean>(true);

    const addStep = () => {
        setInstructionSteps([...instructionSteps, '']);
    };

    const removeLastStep = () => {
        if (instructionSteps.length > 1) {
            const updatedSteps = [...instructionSteps];
            updatedSteps.pop();
            setInstructionSteps(updatedSteps);
        }
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...instructionSteps];
        updatedSteps[index] = value;
        setInstructionSteps(updatedSteps);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: 'шт' }]);
    };

    const removeIngredient = () => {
        if (ingredients.length > 1) {
            const updatedIngredients = [...ingredients];
            updatedIngredients.pop();
            setIngredients(updatedIngredients);
        }
    };

    const handleIngredientChange = (
        index: number,
        field: keyof IngredientsProps,
        value: string
    ) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
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
            .then((res) => setImages([res.data.link, ...images]))
            .catch((error) => {
                toast.error(`Упс, сталася помилка ${error.message}`, toastOptions);
            })
            .finally(() => setIsImageLoading(false));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = formData.get('category') as foodCategory;
        const name = formData.get('name') as string;
        const time = formData.get('time') as string;

        if (category && name && instructionSteps.length > 0 && ingredients.length > 0) {
            setIsAllFields(true);
            api.post
                .food({ category, name, instruction: instructionSteps, time, ingredients, images })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Рецепт доданий', toastOptions);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                });
        } else {
            setIsAllFields(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col p-5 bg-secondary dark:bg-secondaryDark space-y-3 m-5 w-[min(75%,700px)] mx-auto'
        >
            <label htmlFor='category'>
                Оберіть категорію <span className='text-red'>*</span>
            </label>
            <select
                name='category'
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
                name='name'
                type='text'
                placeholder='Назва...'
                className='input'
            />
            <label>Завантажити фото</label>
            <label
                htmlFor='image'
                className='cursor-pointer btn-suc self-start'
            >
                Вибрати файл
            </label>
            <input
                id='image'
                name='image'
                type='file'
                onChange={handleFileChange}
                className='hidden'
            />
            <div className='flex space-x-3'>
                {isImageLoading && (
                    <div className='leading-none'>
                        <Skeleton
                            width={100}
                            height={100}
                        />
                    </div>
                )}
                {images?.map((img) => (
                    <img
                        className='w-[100px] h-[100px] object-cover rounded-md'
                        src={img}
                        key={img}
                        alt='food'
                    />
                ))}
            </div>
            <label htmlFor='time'>
                Час приготування (хв) <span className='text-red'>*</span>
            </label>
            <input
                name='time'
                type='number'
                placeholder='Хвилин...'
                className='input w-1/3 md:w-1/4 xl:w-1/5'
            />
            <label htmlFor='ingredients'>
                Інгредієнти <span className='text-red'>*</span>
            </label>
            {ingredients.map((ingredient, index) => (
                <div
                    key={index}
                    className='space-x-2 sm:space-x-3 flex'
                >
                    <input
                        name='ingredients'
                        type='text'
                        placeholder='Назва інгредієнту...'
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className='input w-full'
                    />
                    <input
                        type='number'
                        placeholder='Кількість...'
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        className='input w-full basis-1/3'
                    />
                    <select
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        className='select'
                    >
                        <option value='шт'>шт</option>
                        <option value='гр'>гр</option>
                    </select>
                </div>
            ))}
            {ingredients.length > 1 && (
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

            {instructionSteps.map((step, index) => (
                <div
                    key={index}
                    className='flex flex-col space-y-3'
                >
                    <label htmlFor={`instruction-${index + 1}`}>
                        Крок<span className='text-red'>*</span> {index + 1}
                    </label>
                    <textarea
                        name={`instruction-${index + 1}`}
                        rows={3}
                        placeholder='Інструкція...'
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        className='input'
                    />
                </div>
            ))}
            {instructionSteps.length > 1 && (
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
                <span>Наступний крок</span>
            </button>
            <button
                type='submit'
                className='btn'
            >
                Зберегти
            </button>
            {!isAllFields && (
                <div>
                    <span className='text-red'>*</span> Заповніть всі обовя'зкові поля{' '}
                </div>
            )}
        </form>
    );
};

export default Form;
