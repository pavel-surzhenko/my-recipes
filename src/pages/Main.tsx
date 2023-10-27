import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';
import Container from '../components/Container';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { toast } from 'react-toastify';
import { api } from '../api';

const Main = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    useEffect(() => {
        api.get
            .main()
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

export default Main;
