import { ChangeEvent, useState } from 'react';
import { AddIcon, CloseIcon, DeleteIcon } from '../assets';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { FoodCardProps, IngredientsProps, foodCategory } from '../types';
import Skeleton from 'react-loading-skeleton';

const Form: React.FC<Partial<FoodCardProps>> = ({
    _id,
    images: existingImages,
    name: existingName,
    ingredients: existingIngredients,
    instruction: existingInstruction,
    category: existingCategory,
    time: existingTime,
}) => {
    const navigate = useNavigate();

    const [category, setCategory] = useState<foodCategory>(existingCategory || 'soups');
    const [name, setName] = useState<string>(existingName || '');
    const [images, setImages] = useState<string[]>(existingImages || []);
    const [time, setTime] = useState<string>(existingTime || '');
    const [ingredients, setIngredients] = useState<IngredientsProps[]>(existingIngredients || []);
    const [instructionSteps, setInstructionSteps] = useState<string[]>(existingInstruction || ['']);

    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

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
                toast.error(`Упс, сталась помилка ${error.message}`, toastOptions);
            })
            .finally(() => setIsImageLoading(false));
    };

    const handleDeleteImage = async (image: string) => {
        const parts = image.split('/');

        const id = parts[parts.length - 1];

        await api.delete
            .image(id)
            .then(() => setImages(images.filter((img) => img !== image)))
            .catch((error) => {
                toast.error(`Упс, сталась помилка ${error.message}`, toastOptions);
            });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (_id) {
            api.update
                .food(_id, {
                    category,
                    name,
                    instruction: instructionSteps,
                    time,
                    ingredients,
                    images,
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Рецепт оновлено', toastOptions);
                        navigate(`/${category}/${_id}`);
                    }
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                });
        } else {
            api.post
                .food({ category, name, instruction: instructionSteps, time, ingredients, images })
                .then((res) => {
                    if (res.status === 201) {
                        toast.success('Рецепт доданий', toastOptions);
                        navigate(`/${category}/${res.data.id}`);
                    }
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col p-5 bg-secondary dark:bg-secondaryDark space-y-3 m-5 w-[min(100%,700px)] mx-auto'
        >
            <label htmlFor='category'>
                Оберіть категорію <span className='text-red'>*</span>
            </label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as foodCategory)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                name='time'
                type='number'
                placeholder='Хвилин...'
                className='input w-1/3 md:w-1/4 xl:w-1/5'
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
                        className='select text-center'
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
                {_id ? 'Оновити' : 'Зберегти'}
            </button>
        </form>
    );
};

export default Form;
