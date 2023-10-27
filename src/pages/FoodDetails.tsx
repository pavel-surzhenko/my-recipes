import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { FoodCardProps } from '../types';

const FoodDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState<FoodCardProps | null>(null);

    useEffect(() => {
        if (id) {
            api.get.byId(id).then((res) => setData(res));
        }
    }, []);

    return <section className='page'>foods</section>;
};

export default FoodDetails;
