import axios from 'axios';
import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';

const Salads = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food/salads').then((res) => setData(res.data));

    console.log(data);

    useEffect(() => {
        fetch();
    }, []);
    return <></>;
};

export default Salads;
