import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';
import Container from '../components/Container';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { toast } from 'react-toastify';
import { api } from '../api';
import SkeletonGrid from '../components/Skeleton/SkeletonGrid';

const Soups = () => {
    const [data, setData] = useState<FoodCardProps[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get
            .soups()
            .then((res) => setData(res))
            .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);
    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                {loading ? <SkeletonGrid /> : <>{data && <FoodGrid data={data} />}</>}
            </Container>
        </section>
    );
};

export default Soups;
