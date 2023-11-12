import { useEffect, useState } from 'react';
import Container from '../components/Container';
import { foodCardProps, foodCategory } from '../types';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { api } from '../api';
import { toast } from 'react-toastify';
import FoodCard from '../components/FoodCard';
import SkeletonCard from '../components/Skeleton/SkeletonCard';
import Sort from '../components/Sort';
import FoodGrid from '../components/FoodGrid';
import SkeletonGrid from '../components/Skeleton/SkeletonGrid';
import ReactPaginate from 'react-paginate';
import { LeftArrowLong } from '../assets/LeftArrowLong';
import { RightArrowLong } from '../assets/RightArrowLong';

const Home = () => {
    const [randomFood, setRandomFood] = useState<foodCardProps>();
    const [allFood, setAllFood] = useState<foodCardProps[]>();
    const [randomLoading, setRandomLoading] = useState(false);
    const [foodLoading, setFoodLoading] = useState(false);
    const [sorting, setSorting] = useState('date_desc');
    const [page, setPage] = useState<number>(1);
    const [countPages, setCountPages] = useState<number>(1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setRandomLoading(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const category = formData.get('category') as foodCategory;

        if (category) {
            api.get
                .random(category)
                .then((res) => setRandomFood(res))
                .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
                .finally(() => setRandomLoading(false));
        }
    };

    const handleSortingChange = (value: string) => {
        setSorting(value);
    };

    useEffect(() => {
        setFoodLoading(true);
        api.get
            .allFood(sorting, page)
            .then((res) => {
                setAllFood(res.data);
                setCountPages(res.totalPages);
            })
            .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
            .finally(() => setFoodLoading(false));
    }, [sorting, page]);

    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                <div className='space-y-3 md:space-y-5 mb-10'>
                    <h1 className='text-xl md:text-2xl font-semibold text-center mt-5'>
                        Що готуємо сьогодні?
                    </h1>
                    <h3 className='text-sm md:text-base text-center'>
                        Втомились обирати? Отримуй випадковий рецепт, можливо, це саме те, що тобі
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
                            className='btn flex space-x-2'
                        >
                            Пошук
                        </button>
                    </form>
                    <div className='flex justify-center '>
                        <div className='w-[300px] h-[308px] md:h-[350px]'>
                            {randomLoading ? (
                                <SkeletonCard />
                            ) : (
                                <>
                                    {randomFood ? (
                                        <FoodCard {...randomFood} />
                                    ) : (
                                        <div className='bg-secondary dark:bg-secondaryDark rounded-md h-[308px] lg:h-[350px] py-10 px-5 space-y-5 opacity-50'>
                                            <div className='text-center text-9xl'>?</div>
                                            <div className='text-center'>випадковий рецепт</div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Sort
                    sorting={sorting}
                    setSorting={handleSortingChange}
                />
                {foodLoading ? <SkeletonGrid /> : <>{allFood && <FoodGrid data={allFood} />}</>}
                {countPages > 1 && (
                    <ReactPaginate
                        breakLabel={`... `}
                        nextLabel={<RightArrowLong />}
                        onPageChange={(e) => {
                            setPage(e.selected + 1);
                        }}
                        forcePage={page - 1}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={3}
                        pageCount={countPages}
                        previousLabel={<LeftArrowLong />}
                        renderOnZeroPageCount={null}
                        containerClassName='flex text-xl items-center justify-center my-5'
                        pageClassName='mr-3'
                        breakClassName='mr-3'
                        activeLinkClassName='font-semibold bg-secondary dark:bg-secondaryDark px-2 py-1 rounded-lg'
                        disabledLinkClassName='hidden'
                        previousClassName='mr-3'
                    />
                )}
            </Container>
        </section>
    );
};

export default Home;
