import axios from 'axios';
import { useState } from 'react';
import { AddIcon, DeleteIcon } from '../assets';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [instructionSteps, setInstructionSteps] = useState<string[]>(['']);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = formData.get('category');
        const name = formData.get('name');

        if (category && name && instructionSteps.length > 0) {
            await axios
                .post('http://localhost:4000/food1', {
                    category,
                    name,
                    instruction: instructionSteps,
                })
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
                placeholder='Назва'
                className='input'
            />

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
