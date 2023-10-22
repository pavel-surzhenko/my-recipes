import axios from 'axios';
import { useState, useEffect, Suspense } from 'react';
import { AddIcon } from '../assets';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FoodCardProps } from '../types';

const FoodCard = React.lazy(() => import('../components/FoodCard'));

const Home = () => {
    const [data, setData] = useState<FoodCardProps[]>();
    const navigate = useNavigate();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food').then((res) => setData(res.data));

    useEffect(() => {
        fetch();
    }, []);
    return (
        <section className='page'>
            <Container>
                <div className='flex justify-end items-center py-5 border-b border-secondary'>
                    <button
                        className='btn-suc flex space-x-2'
                        onClick={() => navigate('/new-recipe')}
                    >
                        <span>Додати новий рецепт</span> <AddIcon />
                    </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                    <Suspense>
                        {data &&
                            data.map((food) => (
                                <FoodCard
                                    key={food._id}
                                    {...food}
                                />
                            ))}
                    </Suspense>
                </div>
            </Container>
        </section>
    );
};

export default Home;
