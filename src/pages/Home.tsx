import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from '../components/Container';
import { FoodCardProps } from '../types';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';

const Home = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food').then((res) => setData(res.data));

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

export default Home;
