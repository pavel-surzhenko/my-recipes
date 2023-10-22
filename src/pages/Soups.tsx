import axios from 'axios';
import { useState, useEffect } from 'react';
import { FoodCardProps } from '../types';

const Soups = () => {
    const [data, setData] = useState<FoodCardProps[]>();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food/soups').then((res) => setData(res.data));

    console.log(data);

    useEffect(() => {
        fetch();
    }, []);
    return <></>;
};

export default Soups;
