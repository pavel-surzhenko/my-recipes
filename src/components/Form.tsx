import { ChangeEvent, useState } from 'react';
import { AddIcon, DeleteIcon } from '../assets';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { foodCategory } from '../types';
import Skeleton from 'react-loading-skeleton';

const Form = () => {
    const navigate = useNavigate();
    const [instructionSteps, setInstructionSteps] = useState<string[]>(['']);
    const [images, setImages] = useState<string[]>([]);
    const [isImageLoading, setIsImageLoading] = useState(false);

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

    const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsImageLoading(true);
        const file = e.target.files?.[0];

        if (!validFiles.find((type) => type === file?.type)) {
            toast.error('Файл повинен бути JPG/NPG формату', toastOptions);
            return;
        }

        const form = new FormData();
        form.append('image', file as Blob);

        await api.post
            .image(form)
            .then((res) => setImages([res.data.link, ...images]))
            .then(() => setIsImageLoading(false))
            .catch((error) => toast.error(`Упс, сталася помилка ${error.message}`, toastOptions));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = formData.get('category') as foodCategory;
        const name = formData.get('name') as string;

        if (category && name && instructionSteps.length > 0) {
            api.post
                .food(category, name, instructionSteps, images)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Рецепт доданий', toastOptions);
                        navigate('/');
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
            className='flex flex-col p-5 bg-secondary dark:bg-secondaryDark space-y-3 m-5 w-[min(75%,700px)] mx-auto'
        >
            <label htmlFor='category'>Оберіть категорію</label>
            <select
                name='category'
                className='input'
            >
                <option value='soups'>Супи</option>
                <option value='main'>Другі страви</option>
                <option value='salads'>Салати</option>
                <option value='desserts'>Десерти</option>
            </select>
            <label htmlFor='name'>Назва</label>
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

            {instructionSteps.map((step, index) => (
                <div
                    key={index}
                    className='flex flex-col space-y-3'
                >
                    <label htmlFor={`instruction-${index + 1}`}>Крок {index + 1}</label>
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
        </form>
    );
};

export default Form;
