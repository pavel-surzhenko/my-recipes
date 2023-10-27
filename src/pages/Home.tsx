import { useState, useEffect } from 'react';
import Container from '../components/Container';
import { FoodCardProps } from '../types';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { api } from '../api';
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    useEffect(() => {
        api.get
            .allFood()
            .then((res) => setData(res))
            .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
    }, []);
    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                {data && <FoodGrid data={data} />}
            </Container>
        </section>
    );
};

export default Home;
