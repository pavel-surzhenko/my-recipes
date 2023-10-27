import axios from 'axios';
import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';
import Container from '../components/Container';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';

const Main = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food/main').then((res) => setData(res.data));

    useEffect(() => {
        fetch();
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
