import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';
import Container from '../components/Container';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { toast } from 'react-toastify';
import { api } from '../api';
import SkeletonGrid from '../components/Skeleton/SkeletonGrid';
import Sort from '../components/Sort';

const Main = () => {
    const [data, setData] = useState<FoodCardProps[]>();
    const [loading, setLoading] = useState(false);
    const [sorting, setSorting] = useState('date_desc');

    const handleSortingChange = (value: string) => {
        setSorting(value);
    };

    useEffect(() => {
        setLoading(true);
        api.get
            .main(sorting)
            .then((res) => setData(res))
            .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
            .finally(() => setLoading(false));
    }, [sorting]);
    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                <Sort
                    sorting={sorting}
                    setSorting={handleSortingChange}
                />
                {loading ? <SkeletonGrid /> : <>{data && <FoodGrid data={data} />}</>}
            </Container>
        </section>
    );
};

export default Main;
