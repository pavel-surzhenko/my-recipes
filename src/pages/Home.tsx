import { useState } from 'react';
import Container from '../components/Container';
import { FoodCardProps, foodCategory } from '../types';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { api } from '../api';
import { toast } from 'react-toastify';
import FoodCard from '../components/FoodCard';

const Home = () => {
    const [data, setData] = useState<FoodCardProps>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = formData.get('category') as foodCategory;

        if (category) {
            api.get
                .random(category)
                .then((res) => setData(res))
                .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
        }
    };

    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                <div className='space-y-3 md:space-y-5 mb-10'>
                    <h1 className='text-xl md:text-2xl font-semibold text-center mt-5'>
                        Що готуємо сьогодні?
                    </h1>
                    <h3 className='text-sm md:text-base text-center'>
                        Втомились обирати? Отримуй випадковий рецепт, можливо це саме те, що тобі
                        потрібно :)
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className='flex space-x-3 md:space-x-5 justify-center md:items-center'
                    >
                        <label
                            htmlFor='category'
                            className='hidden md:block'
                        >
                            Оберіть категорію
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
                        <button
                            type='submit'
                            className='btn-suc flex space-x-2'
                        >
                            Пошук
                        </button>
                    </form>
                    <div className='flex justify-center '>
                        <div className='w-[300px]'>
                            {data ? (
                                <FoodCard {...data} />
                            ) : (
                                <div className='bg-secondary dark:bg-secondaryDark rounded-md h-[308px] lg:h-[333px] py-10 px-5 space-y-5 opacity-50'>
                                    <div className='text-center text-9xl'>?</div>
                                    <div className='text-center'>випадковий рецепт</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Home;
